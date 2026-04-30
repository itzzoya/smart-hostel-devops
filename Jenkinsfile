pipeline {
    agent any

    environment {
        IMAGE_NAME = "smart-hostel-app"
        CONTAINER_NAME = "smart-hostel"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-creds',
                    url: 'https://github.com/itzzoya/smart-hostel-devops.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:latest ."
            }
        }

        stage('Stop Old Container') {
            steps {
                sh "docker stop ${CONTAINER_NAME} || true"
                sh "docker rm ${CONTAINER_NAME} || true"
            }
        }

        stage('Run Container') {
            steps {
                sh "docker run -d --name ${CONTAINER_NAME} -p 3000:3000 ${IMAGE_NAME}:latest"
            }
        }
    }

    post {
        success {
            echo "CI/CD Pipeline Successful"
        }
        failure {
            echo "Pipeline Failed - Check logs"
        }
    }
}
