#!/usr/bin/env python

import boto3, json, sys, os
from textwrap import dedent

session_mmgprod = boto3.session.Session(profile_name='mmgprod')
session_mm = boto3.session.Session(profile_name='mergermarket')

if(len(sys.argv)) != 2:
    print "USAGE:" + sys.argv[0] + " stackName"
    sys.exit(-1)

stackName = sys.argv[1]

oldfile = stackName + '-stack-old.json'
newfile = stackName + '-stack-new.json'
skelfile = stackName + '-stack-skel.json'

print("")
print("Getting Load Balancer DNS Name from MMGProd Account...")
# Get load balancer name from mmgprod

ecsClient = session_mmgprod.client('ecs')
response = ecsClient.describe_services(
   cluster='production',
   services = [ stackName ]
)

loadbalancer = response['services'][0]['loadBalancers'][0]['loadBalancerName']

elbClient = session_mmgprod.client('elb')
response = elbClient.describe_load_balancers(
   LoadBalancerNames= [ loadbalancer ]
)

loadbalancerDns = response['LoadBalancerDescriptions'][0]['DNSName']


print("")
print("Load Balancer set to: " + loadbalancerDns)

cfClient = session_mm.client('cloudformation')

print("")
print("Getting Template from mergermarket account...")

# Get template from AWS
response = cfClient.get_template(
    StackName=stackName
)

template = response['TemplateBody']

oldf = open(oldfile, 'w')
oldf.write(json.dumps(template, sort_keys=True, indent=4, separators=(',', ':')).encode('UTF-8'))
oldf.close()

print("")
print("Changing DNS Record from A to CNAME pointing to MMGProd ELB...")

dnsPropertyName = 'DnsAlias' if template['Resources'].get('DnsAlias', False) else 'DnsCname'
dnsAliasProperties = template['Resources'][dnsPropertyName]['Properties']

if dnsAliasProperties.get('AliasTarget', False):
    del dnsAliasProperties['AliasTarget']

dnsAliasProperties['TTL'] = 300
dnsAliasProperties['Type'] = 'CNAME'
dnsAliasProperties['ResourceRecords'] = [loadbalancerDns]

newf = open(newfile, 'w')
newf.write(json.dumps(template, sort_keys=True, indent=4, separators=(',', ':')).encode('UTF-8'))
newf.close()

print("")
print("Creating Skeleton template only containing DNS Record...")

del template['Outputs']

parameters = template['Parameters'].keys()

parameterString = " ".join(["ParameterKey=" + param + ",UsePreviousValue=true" for param in parameters ])

resources = template['Resources'].keys()

# Iterate over resources and delete all resources which are not DNS Alias...
for resource in resources:
    if resource != 'DnsAlias' and resource != 'DnsCname':
        del template['Resources'][resource]



skelf = open(skelfile, 'w')
skelf.write(json.dumps(template, sort_keys=True, indent=4, separators=(',', ':')).encode('UTF-8'))
skelf.close()

with open(stackName + '-migration.txt', 'w') as f:
    f.write(dedent("""
        Files created: old (existing), new (with changed DNS Alias) and skel (only containing DNS Alias)

        Migration Step 1
        ----------------
        aws --profile=mergermarket cloudformation update-stack \\
            --stack-name {stackName} \\
            --template-body file://{newfile} \\
            --parameters {parameterString} \\
            --capabilities CAPABILITY_IAM

        Migration Step 2
        ----------------
        aws --profile=mergermarket cloudformation update-stack \\
            --stack-name {stackName} \\
            --template-body file://{skelfile} \\
            --parameters {parameterString} \\
            --capabilities CAPABILITY_IAM

        Rollback
        --------
        aws --profile=mergermarket cloudformation update-stack \\
            --stack-name {stackName} \\
            --template-body file://{oldfile} \\
            --parameters {parameterString} \\
            --capabilities CAPABILITY_IAM

    """.format(
        stackName=stackName,
        newfile=newfile,
        parameterString=parameterString,
        skelfile=skelfile,
        oldfile=oldfile,
    )).strip() + "\n\n");

print("\nSteps write to " + stackName + "-migration.txt")
