pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t smart-hostel-app .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh 'docker stop smart-hostel || true'
                sh 'docker rm smart-hostel || true'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run -d --name smart-hostel -p 3000:3000 smart-hostel-app'
            }
        }
    }
}
