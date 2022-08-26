pipeline {
 agent {
  node {
   label 'master'
  }
 }
 options {
  buildDiscarder(logRotator(numToKeepStr: '100'))
 }
 stages {
  stage('Fetch') {
   steps {
    deleteDir()
    checkout scm: [
     $class: 'GitSCM',
     branches: scm.branches,
     doGenerateSubmoduleConfigurations: false,
     extensions: [
      [$class: 'SubmoduleOption',
       disableSubmodules: false,
       parentCredentials: true,
       recursiveSubmodules: true,
       reference: '',
       trackingSubmodules: false
      ]
     ],
     submoduleCfg: [],
     userRemoteConfigs: scm.userRemoteConfigs
    ]
   }
  }
  stage('Install') {
   steps {
    sh "apt-get update"
    sh "apt install -y libunwind8 gettext python3-pip"
    sh "pip3 install awscli"
   }
  }
  stage('Image') {
   steps {
    sh "docker build -t ${DOCKER_IMAGE}:latest -f Dockerfile ."
   }
  }
  stage('Tag') {
   steps {
    sh "docker tag ${DOCKER_IMAGE}:latest ${DOCKER_IMAGE}:`git rev-parse HEAD`"
    sh "docker tag ${DOCKER_IMAGE}:latest ${DOCKER_IMAGE}:latest"
   }
  }
  stage('Push') {
   steps {
    sh "\$(aws ecr get-login --no-include-email --region ${REGION})"
    sh "docker push ${DOCKER_IMAGE}:`git rev-parse HEAD`"
    sh "docker push ${DOCKER_IMAGE}:latest"
   }
  }
  stage('Bounce') {
   steps {
    sh "aws ecs update-service --force-new-deployment --cluster ${CLUSTER} --service ${SERVICE} --region ${REGION}"
    sh "aws ecs wait services-stable --cluster ${CLUSTER} --services ${SERVICE} --region ${REGION}"
   }
  }
 }
}
