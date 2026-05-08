pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/itzzoya/smart-hostel-devops.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                /usr/bin/docker build -t smart-hostel-app .
                '''
            }
        }

        stage('Stop Old Container') {
            steps {
                sh '''
                /usr/bin/docker stop smart-hostel || true
                /usr/bin/docker rm smart-hostel || true
                '''
            }
        }

        stage('Run New Container') {
            steps {
                sh '''
                /usr/bin/docker run -d -p 5000:3000 --name smart-hostel smart-hostel-app
                '''
            }
        }
    }

    post {
        success {
            echo "Deployment SUCCESS - Website Updated"
        }
        failure {
            echo "Deployment FAILED"
        }
    }
}