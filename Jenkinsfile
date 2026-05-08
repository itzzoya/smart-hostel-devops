pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-creds',
                    url: 'https://github.com/itzzoya/smart-hostel-devops.git'
            }
        }

        stage('Build Image') {
            steps {
                sh 'docker build -t smart-hostel-app .'
            }
        }

        stage('Stop Container') {
            steps {
                sh 'docker stop smart-hostel || true'
                sh 'docker rm smart-hostel || true'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run -d -p 5000:3000 --name smart-hostel smart-hostel-app'
            }
        }
    }
}