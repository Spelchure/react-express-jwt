pipeline {
  agent none
  stages {
    stage("test-and-build") {
      matrix {
        agent {
          docker {
            image "node:${NODE_VERSION}"
          }
        }
        axes {
          axis {
            name 'NODE_VERSION'
            values '18.4.0-alpine3.15', '16-alpine3.15', '14-alpine3.15', 'lts-bullseye'
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
}