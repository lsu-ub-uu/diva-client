pipeline {
    agent none

    triggers {
        pollSCM('')
    }

    stages {
        stage('Checkout') {
            agent any
            steps {
                git branch: 'vitest-browser-mode',
                    url: 'https://github.com/lsu-ub-uu/diva-client.git'
                stash name: 'source', excludes: 'node_modules/**,target/**,coverage/**,dist/**'
            }
        }
        stage('Test') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.61.0-noble'
                    args '--user root'
                }
            }
            steps {
                unstash 'source'
                sh 'npm ci && npm run test:ci'
            }
        }
        stage('Build & Deploy') {
            agent any
            steps {
                unstash 'source'
                sh 'mvn clean deploy -DskipTests'
            }
        }
    }
}
