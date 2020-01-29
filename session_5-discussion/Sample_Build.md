    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('NPM Audit') {
      steps {
        sh 'npm run audit'
      }
    }
    stage('Test') {
      steps {
        sh 'npm run test'
      }
    }
    stage('Code Linting') {
      steps {
        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
          sh 'npm run lint:all'
        }
      }
    }
    stage('Code Coverage') {
      steps{
        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
          sh 'node utils/testCoverage.js'
        }
      }
    }
