pipeline {
  agent none
  stages {
    stage("test-and-build") {
      agent {
        docker {
          image 'node:18.14.0-alpine3.15'
        }
      }
      stages {
        stage('install-deps') {
          steps {
            sh 'npm install'
          }
        }
        stage('unit-test') {
          steps {
            sh 'npm run test'
          }
        }
        stage('code-coverage') {
          steps {
            sh 'npm run pipe:coverage'
          }
        }
        stage('code-lint') {
          steps {
            sh 'npm run lint'
          }
        }
        stage('build') {
          steps {
            sh 'npm run build'
          }
        }
      }
    }
  }
}