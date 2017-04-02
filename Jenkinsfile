pipeline {
    agent any

    stages {
        stage('git') {
            agent any
            steps {
                git url: 'https://github.com/PhilippeMorier/spiti-ui.git'
            }
        }
        stage('unit test') {
            agent { docker 'spiti-node' }
            steps {
                ansiColor('xterm') {
                    sh 'npm install'
                    sh 'npm run test -- --single-run'
                }
            }
        }
        stage('e2e test') {
            agent { docker 'spiti-node' }
            steps {
                ansiColor('xterm') {
                    sh 'npm run e2e'
                }
            }
        }
    }
}
