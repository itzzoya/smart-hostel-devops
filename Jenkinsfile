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

        stage('Build Verification') {
            steps {
                sh 'echo Build successful'
            }
        }

        stage('Deploy Simulation') {
            steps {
                sh 'echo Deployment successful'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully'
        }
    }
}
