pipeline {
  agent any

  environment {
    // Customize as needed
    CORA_API_URL = 'https://cora.epc.ub.uu.se/diva/rest'
    CORA_LOGIN_URL = 'https://cora.epc.ub.uu.se/diva/login/rest'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Code Quality') {
      parallel {
        stage('Typecheck') {
          steps {
            sh 'npm run typecheck'
          }
        }
        stage('ESLint') {
          steps {
            sh 'npm run lint'
          }
        }
        stage('Stylelint') {
          steps {
            sh 'npm run stylelint'
          }
        }
      }
    }

    stage('Unit Tests') {
      steps {
        sh 'npm test -- --reporter junit --outputFile=vitest-report.xml'
      }
      post {
        always {
          junit 'vitest-report.xml'
        }
      }
    }

    stage('E2E Tests') {
      agent {
        docker {
          image 'mcr.microsoft.com/playwright:v1.52.0-noble'
        }
      }
      steps {
        sh 'npm run e2e:ci -- --reporter=junit --outputFile=playwright-report.xml'
      }
      post {
        always {
          junit 'playwright-report.xml'
        }
      }
    }
  }
}
