pipeline {
    agent any
    stages {
        stage('unit test') {
            agent {
                docker {
                    image 'spiti-node'
                }
            }
            steps {
                git url: 'https://github.com/PhilippeMorier/spiti-ui.git'
                sh 'npm -v && node -v'
                sh 'whoami'
                sh 'printenv | more | grep "*_BIN"'
                // sh 'google-chrome --version'
                sh 'npm install --verbose'
                // sh 'npm rebuild node-sass --force'
                sh 'npm run test -- --single-run'
            }
        }
    }
}
