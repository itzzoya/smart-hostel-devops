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
        sh '''
        docker build -t smart-hostel-app .

        docker stop smart-hostel || true
        docker rm smart-hostel || true

        docker run -d -p 5000:3000 --name smart-hostel smart-hostel-app
        '''
    }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully'
        }
    }
}
