# platform-utils

Utility scripts provided by the Platform team

## Installation

Check out the platform-utils project and run the install script:

    git clone git@github.com:mergermarket/platform-utils.git
    # or
    git clone https://github.com/mergermarket/platform-utils.git
    
    platform-utils/install

Can now run commands from anywhere with:

    platutils help

    # or (for improved completion):
    
    platutils-help

## Subcommands

### access-aws

Used to generated temporary security credentails for the mmgdev and mmgprod accounts (e.g. for the awscli):

#### read-only access to the mmgdev account

Run the following to set up your shell with readonly access to mmgdev (lasts for one hour):

    eval $(platutils-access-aws readonly mmgdev)

#### admin access to the mmgdev account

Run the following to set up your shell with admin access to mmgdev (lasts for one hour):

    eval $(platutils-access-aws developer mmgdev)
    
#### read-only access to the mmgprod account

Run the following to set up your shell with readonly access to mmgprod (lasts for one hour):

    eval $(platutils-access-aws readonly mmgprod)
    
#### admin access to the mmgprod account

Run the following to set up your shell with admin access to mmgprod (lasts for one hour):

    eval $(platutils-access-aws developer mmgprod)

### create-or-update-stack

Script to create or update a cloudformation stack, outputting events and waiting for completion. Run `platutils create-or-update-stack` for usage.

### upload-jenkins-config / download-jenkins-config

These Scripts upload jenkins configuration to / download jenkins configuration from your jenkins-config directory.  The script will search iteratively from where you run the command until it finds one.

NOTE: If you want to download/upload from/to a different path in the Jenkins folder strucuture, then set the 
TEAM_PATH variable.  If not set it will default to job/$TEAM.  For example to upload to https://jenkins.mergermarket.it/job/the-expendables/job/next/... then set TEAM_PATH to job/the-expendables/job/next 

### write-npm-config

Writes an npm config file. The filename is the first and only parameter to the script, which defaults to "~/.npmrc". If present it will use the `NPM_USERNAME` and `NPM_PASSWORD` environment variables to get an authentication token from Artifactory. If these are not set and the script is being run interactively, you will be prompted for them.

## Usage in your repository

If you are using this to automate a pipeline, you may want to add `platform-utils` to your project using git subtree (this is already included as part of ecs-deployment-scripts):

### Add remote

So we can refer to it as simply `platform-utils` (you will need to do this for each new clone):

    git remote add -f platform-utils \
        git@github.com:mergermarket/platform-utils.git

### Add subtree

This pulls the code into your own repository:

    git subtree add --prefix platform-utils platform-utils master --squash

### Update subtree

Note: if you update in a new clone, you will need to add the remote again (see "Add remote" above).

The following will output these commands in your terminal to make them easy to copy and paste:

    cat platform-utils/README.md

This code pulls updates to the code into your own repository:

    git fetch platform-utils master
    
    git subtree pull --prefix platform-utils platform-utils master --squash 
