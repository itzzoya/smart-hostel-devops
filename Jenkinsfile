pipeline {
    agent any

    environment {
        PATH = "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/bin:/usr/bin"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/itzzoya/smart-hostel-devops.git'
            }
        }

        stage('Verify Docker') {
            steps {
                sh '''
                which docker
                docker --version
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t smart-hostel-app .
                '''
            }
        }

        stage('Stop Old Container') {
            steps {
                sh '''
                docker stop smart-hostel || true
                docker rm smart-hostel || true
                '''
            }
        }

        stage('Run New Container') {
            steps {
                sh '''
                docker run -d -p 5000:3000 --name smart-hostel smart-hostel-app
                '''
            }
        }
    }

    post {
        success {
            echo "Deployment SUCCESS - Website Updated"
        }
        failure {
            echo "Deployment FAILED - Check logs"
        }
    }
}