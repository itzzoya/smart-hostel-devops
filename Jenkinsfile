
pipeline {
    agent any

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
                sh 'docker build -t smart-hostel-app .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh 'docker stop smart-hostel || true'
                sh 'docker rm smart-hostel || true'
            }
        }

        stage('Run New Container') {
            steps {
                sh '''
                docker run -d \
                --name smart-hostel \
                -p 5000:3000 \
                smart-hostel-app
                '''
            }
        }
    }

    post {
        success {
            echo 'Website deployed successfully'
        }
    }
}