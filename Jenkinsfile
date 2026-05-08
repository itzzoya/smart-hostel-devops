pipeline {
    agent any

    environment {
        PATH = "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/bin"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/itzzoya/smart-hostel-devops.git'
            }
        }

        stage('Build') {
            steps {
                sh '''
                docker version
                docker build -t smart-hostel-app .
                '''
            }
        }

        stage('Stop') {
            steps {
                sh '''
                docker stop smart-hostel || true
                docker rm smart-hostel || true
                '''
            }
        }

        stage('Run') {
            steps {
                sh '''
                docker run -d -p 5000:3000 --name smart-hostel smart-hostel-app
                '''
            }
        }
    }
}