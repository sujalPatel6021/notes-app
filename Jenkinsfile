pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('SONAR_TOKEN')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/YOUR_GITHUB_USERNAME/notes-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
                bat 'npm run coverage'
            }
        }

        stage('Build') {
            steps {
                bat 'docker build -t notes-app:%BUILD_NUMBER% .'
            }
        }

        stage('Code Quality') {
            steps {
                bat '''
                if not exist sonar-scanner (
                  powershell -Command "Invoke-WebRequest -Uri https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-6.0.0.4432-windows-x64.zip -OutFile sonar-scanner.zip"
                  powershell -Command "Expand-Archive sonar-scanner.zip -DestinationPath ."
                  ren sonar-scanner-6.0.0.4432-windows-x64 sonar-scanner
                )
                sonar-scanner\\bin\\sonar-scanner.bat
                '''
            }
        }

        stage('Security Scan') {
            steps {
                bat 'npm audit || exit /b 0'
            }
        }

        stage('Deploy to Staging') {
            steps {
                bat 'docker compose down || exit /b 0'
                bat 'docker compose up --build -d'
            }
        }

        stage('Release') {
            steps {
                bat 'docker tag notes-app:%BUILD_NUMBER% notes-app:latest'
            }
        }

        stage('Monitoring Check') {
            steps {
                bat 'curl.exe http://localhost:3000/health'
            }
        }
    }
}