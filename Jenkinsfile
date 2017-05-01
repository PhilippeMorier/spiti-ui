pipeline {
    agent any

    stages {
        stage('git') {
            agent any
            steps {
              deleteDir()
              //git url: 'https://github.com/PhilippeMorier/spiti-ui.git'
            }
        }
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
                //sshagent(['PhilippeMorier-github']) {
                    sh 'ls'
                    sh 'git config user.name "PhilippeMorier"'
                    sh 'git config user.email "morier.dev@outlook.com"'

                    sh 'git remote -v'
                    sh 'git checkout master'
                    sh 'git status'

                    sh 'echo "BUILD_NUMBER: $BUILD_NUMBER" > test5.txt'
                    sh 'git add test5.txt'
                    sh 'git status'

                    sh 'git commit -m "update test.txt $BUILD_NUMBER"'
                    sh 'git push origin master'
                //}
        }
      }
    }
}

