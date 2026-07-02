pipeline {
    agent any

    environment {
        // Artifactory Server ID as configured in Jenkins
        ARTIFACTORY_SERVER = 'my-artifactory'
        // Base version number
        BASE_VERSION = '1.0.0'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build & Test') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'mvn clean test'
                    } else {
                        bat 'mvn clean test'
                    }
                }
            }
        }

        stage('Semantic Versioning') {
            steps {
                script {
                    // Generate timestamp based dynamic version
                    def timestamp = new Date().format('yyyyMMdd-HHmmss')
                    env.APP_VERSION = "${BASE_VERSION}-${timestamp}"
                    echo "Generated Version: ${env.APP_VERSION}"
                    
                    // Update pom.xml version dynamically using maven-versions-plugin
                    if (isUnix()) {
                        sh "mvn versions:set -DnewVersion=${env.APP_VERSION} -DgenerateBackupPoms=false"
                    } else {
                        bat "mvn versions:set -DnewVersion=${env.APP_VERSION} -DgenerateBackupPoms=false"
                    }
                }
            }
        }

        stage('Package') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'mvn package -DskipTests'
                    } else {
                        bat 'mvn package -DskipTests'
                    }
                }
            }
        }

        stage('Deploy to Artifactory') {
            steps {
                script {
                    // Standard Maven deploy to the distribution management registry
                    if (isUnix()) {
                        sh 'mvn deploy -DskipTests'
                    } else {
                        bat 'mvn deploy -DskipTests'
                    }
                }
            }
        }
    }

    post {
        always {
            junit 'target/surefire-reports/*.xml'
        }
        success {
            echo "Pipeline completed successfully! Version deployed: ${env.APP_VERSION}"
        }
        failure {
            echo "Pipeline failed."
        }
    }
}
