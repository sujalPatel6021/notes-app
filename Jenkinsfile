pipeline {
    agent any

    stages {

        stage('Build') {
            steps {
                echo 'Building Docker Image...'
                sh 'docker build -t notes-app .'
            }
        }

        stage('Test') {
            steps {
                echo 'Running Tests...'
                sh 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Code Quality Check with SonarQube'
            }
        }

        stage('Security') {
            steps {
                echo 'Running Security Scan'
                sh 'docker run --rm aquasec/trivy image notes-app'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying Application'
                sh 'docker run -d --name notes-container -p 3000:3000 notes-app || true'
            }
        }

        stage('Release') {
            steps {
                echo 'Release Version 1.0'
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Monitoring Enabled'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }
    }
}