
function jenkins-config-folder {

    if [ -n "$COMPONENT_SUFFIX" ]; then
        JENKINS_CONFIG="jenkins-config-$COMPONENT_SUFFIX"
    else
        JENKINS_CONFIG="jenkins-config"
    fi
 
    if [ -z "$FOLDER" ]; then
        if [[ $(find . -name $JENKINS_CONFIG | wc -l) -eq 0 ]]; then
            echo could not find $JENKINS_CONFIG folder >&2
            exit 1
        elif [[ $(find . -name $JENKINS_CONFIG | wc -l) -gt 1 ]]; then
            echo multiple jenkins-config folders found >&2
            echo either remove the extras, or set explicitly via the FOLDER environment variable >&2
            exit 1
        else
            find . -name $JENKINS_CONFIG
        fi
    fi
    echo $FOLDER
}
