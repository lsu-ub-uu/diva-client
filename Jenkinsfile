pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.61.0-noble'
            args '--user root'
        }
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        githubProjectProperty(projectUrlStr: 'https://github.com/lsu-ub-uu/diva-client.git/')
    }

    triggers {
        snapshotDependencies()
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'vitest-browser-mode',
                    url: 'https://github.com/lsu-ub-uu/diva-client.git'
            }
        }
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Checks') {
            parallel {
                stage('Lint') {
                    steps {
                        sh 'npm run lint'
                    }
                }
                stage('Stylelint') {
                    steps {
                        sh 'npm run stylelint'
                    }
                }
                stage('Typecheck') {
                    steps {
                        sh 'npm run typecheck'
                    }
                }
                stage('Unit Tests') {
                    steps {
                        sh 'npm run test:ci'
                    }
                }
            }
        }
        stage('Build maven artifact') {
            steps {
                build job: 'diva-client'
                milestone label: 'promote-gate', ordinal: 1
            }
        }
        stage('Release') {
            input {
                message 'Promote this build to release?'
                ok 'Release'
            }
            steps {
                milestone label: 'promote-accepted', ordinal: 2
                build job: 'diva-client-release', wait: false
            }
        }
    }

    post {
        always {
            junit 'junit-report.xml'
        }
    }
}
