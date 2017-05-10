pipeline {
    agent any

    stages {
        stage('unit test') {
            agent { docker 'spiti-node' }
            steps {
                ansiColor('xterm') {
                    //sh 'npm install'
                    //sh 'npm run test -- --single-run'
                }
            }
        }
        stage('e2e test') {
            agent { docker 'spiti-node' }
            steps {
                ansiColor('xterm') {
                    //sh 'npm run e2e'
                }
            }
        }
        stage('commit') {
            agent { docker 'spiti-node' }
            steps {
                //sh 'git config user.name "PhilippeMorier"'
                //sh 'git config user.email "morier.dev@outlook.com"'

                //sh 'git checkout master'

                //sh 'echo "BUILD_NUMBER: $BUILD_NUMBER" > test5.txt'
                //sh 'git add test5.txt'

                //sh 'git commit -m "update test.txt $BUILD_NUMBER"'
                sh 'git status'
                sh 'git push origin develop'
            }
        }
    }
    post {
        success {
          slackSend(color: 'good', message: ':white_check_mark: <' + env.JOB_URL + '|' + env.JOB_NAME + '> (<' + env.BUILD_URL + '|' + env.BUILD_DISPLAY_NAME + '>)')
        }
        failure {
          slackSend(color: 'danger', message: ':x: <' + env.JOB_URL + '|' + env.JOB_NAME + '> failed')
        }
    }
}
