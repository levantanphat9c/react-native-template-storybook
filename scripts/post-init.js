#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

console.log('🚀 Setting up your React Native project...');

// Get the project name from the current directory
const projectName = path.basename(process.cwd());

// Update package.json
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.name = projectName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  packageJson.description =
    'A React Native app created with the Storybook template';
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

// Update app.json
const appJsonPath = path.join(process.cwd(), 'app.json');
if (fs.existsSync(appJsonPath)) {
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
  appJson.name = projectName;
  appJson.displayName = projectName;
  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
}

// Create .env.example file
const envExampleContent = `# API Configuration
API_BASE_URL=https://api.example.com
API_KEY=your_api_key_here

# App Configuration
APP_ENV=development
DEBUG=true
`;

fs.writeFileSync(path.join(process.cwd(), '.env.example'), envExampleContent);

// Create .gitignore additions
const gitignoreAdditions = `

# Environment files
.env
.env.local
.env.development
.env.production

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.test

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port
`;

const gitignorePath = path.join(process.cwd(), '.gitignore');
if (fs.existsSync(gitignorePath)) {
  const currentGitignore = fs.readFileSync(gitignorePath, 'utf8');
  if (!currentGitignore.includes('# Environment files')) {
    fs.appendFileSync(gitignorePath, gitignoreAdditions);
  }
} else {
  fs.writeFileSync(gitignorePath, gitignoreAdditions);
}

// Install dependencies
console.log('📦 Installing dependencies...');
try {
  execSync('yarn install', {stdio: 'inherit'});
} catch (error) {
  console.log('⚠️  Yarn not found, trying npm...');
  try {
    execSync('npm install', {stdio: 'inherit'});
  } catch (npmError) {
    console.log(
      '❌ Failed to install dependencies. Please run "yarn install" or "npm install" manually.',
    );
  }
}

// iOS setup (macOS only)
if (process.platform === 'darwin') {
  console.log('🍎 Setting up iOS dependencies...');
  try {
    execSync('bundle install', {stdio: 'inherit'});
    execSync('cd ios && bundle exec pod install && cd ..', {stdio: 'inherit'});
  } catch (error) {
    console.log(
      '⚠️  iOS setup failed. Please run "bundle install" and "cd ios && bundle exec pod install" manually.',
    );
  }
}

console.log(`
✅ Project setup complete!

🎉 Your React Native project "${projectName}" is ready!

📱 To get started:

  # Start Metro bundler
  yarn start

  # Run on iOS (macOS only)
  yarn ios

  # Run on Android
  yarn android

📚 Check out the README.md for more information about the template features.

Happy coding! 🚀
`);
