pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('SONAR_TOKEN')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/sujalPatel6021/notes-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
                sh 'npm run coverage'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t notes-app:${BUILD_NUMBER} .'
            }
        }

        stage('Code Quality') {
            steps {
                sh '''
                curl -sSLo sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-6.0.0.4432-linux-x64.zip
                unzip -o sonar-scanner.zip
                ./sonar-scanner-6.0.0.4432-linux-x64/bin/sonar-scanner
                '''
            }
        }

        stage('Security Scan') {
            steps {
                sh 'npm audit || true'
            }
        }

        stage('Deploy to Staging') {
            steps {
                sh 'docker compose down || true'
                sh 'docker compose up --build -d'
            }
        }

        stage('Release') {
            steps {
                sh 'docker tag notes-app:${BUILD_NUMBER} notes-app:latest'
            }
        }

        stage('Monitoring Check') {
            steps {
                sh 'curl -f http://localhost:3000/health'
            }
        }
    }
}