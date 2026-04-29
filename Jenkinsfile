pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t smart-hostel-app .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run -d -p 3000:3000 smart-hostel-app'
            }
        }
    }
}