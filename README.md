# 🚀 Multi-Language Code Playground

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Twitter Follow](https://img.shields.io/twitter/follow/AmirHaytham_?style=social)](https://twitter.com/AmirHaytham_)
[![GitHub followers](https://img.shields.io/github/followers/AmirHaytham?style=social)](https://github.com/AmirHaytham)

A modern, secure, and powerful web-based code execution environment supporting multiple programming languages. Built with React, TypeScript, Node.js, and Docker for secure code execution.

<div align="center">
  <img src="screenshot.png" alt="Code Playground Screenshot" width="800"/>
</div>

## 📑 Table of Contents
- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [🔧 Configuration](#-configuration)
- [🏗️ Architecture](#️-architecture)
- [🔍 Troubleshooting](#-troubleshooting)
- [📚 API Documentation](#-api-documentation)
- [🧪 Testing](#-testing)
- [🔒 Security](#-security)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)
- [📞 Support](#-support)

## ✨ Features

### 🌈 Multiple Language Support
- **JavaScript** 📜: Full ES6+ support with Node.js runtime
- **C++** ⚡: C++17 standard with STL support
- **Ruby** 💎: Latest Ruby with gem support
- **Go** 🔵: Latest Go version with package management

### 💻 Professional Code Editor
- **Monaco Editor** (VS Code's editor)
  ```typescript
  // Example of editor configuration
  const editorOptions = {
    theme: 'vs-dark',
    language: 'javascript',
    automaticLayout: true,
    minimap: { enabled: true },
    fontSize: 14,
  };
  ```
- Intelligent code completion
- Real-time syntax highlighting
- Error detection and linting
- Multiple themes (Dark/Light/High Contrast)

### 🛡️ Secure Execution
- Containerized code execution with resource limits:
  ```yaml
  # Example Docker container limits
  services:
    code-runner:
      mem_limit: 512m
      cpus: 0.5
      pids_limit: 100
      ulimits:
        nproc: 100
        nofile:
          soft: 1024
          hard: 2048
  ```

## 🚀 Quick Start

### Prerequisites
- Docker Desktop 20.10.0+
- Git

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/AmirHaytham/multi-lang-playground.git
   cd multi-lang-playground
   ```

2. **Create necessary environment files**
   
   Create `backend/.env`:
   ```env
   NODE_ENV=development
   PORT=5002
   ```

   Create `frontend/.env`:
   ```env
   REACT_APP_API_URL=http://localhost:5007
   REACT_APP_REPORT_WEB_VITALS=true
   WDS_SOCKET_PORT=0
   ```

3. **Start Docker Desktop**
   - Make sure Docker Desktop is running
   - Open Docker Desktop
   - Wait until you see "Docker Desktop is running" in the system tray

4. **Build and Run**
   ```bash
   # Clean up any old containers (if needed)
   docker-compose down --rmi all

   # Build and start services
   docker-compose up --build

   # If you see any errors, try running the services separately:
   docker-compose up --build backend    # In first terminal
   docker-compose up --build frontend   # In second terminal
   ```

5. **Verify Installation**
   - Backend API should be running at: http://localhost:5007
   - Frontend should be running at: http://localhost:3007
   - Try opening the frontend URL in your browser
   - Test code execution with a simple program

### Troubleshooting Common Setup Issues

1. **Port Conflicts**
   ```bash
   # If you see "port already in use" error:
   # Windows:
   netstat -ano | findstr "5007"
   netstat -ano | findstr "3007"
   # Then kill the process using the PID shown
   ```

2. **Docker Build Fails**
   ```bash
   # Clean Docker system
   docker system prune -a
   docker volume prune
   
   # Rebuild from scratch
   docker-compose build --no-cache
   ```

3. **Frontend Can't Connect to Backend**
   - Check if both containers are running:
   ```bash
   docker-compose ps
   ```
   - Verify backend logs:
   ```bash
   docker-compose logs backend
   ```
   - Make sure your firewall isn't blocking the ports

4. **Container Startup Issues**
   ```bash
   # Stop all containers and remove volumes
   docker-compose down -v
   
   # Start with detailed logs
   docker-compose up --build --force-recreate
   ```

### Example Test Code

After setup, try these examples to verify everything works:

**JavaScript**:
```javascript
console.log("Hello from JavaScript!");
```

**C++**:
```cpp
#include <iostream>
int main() {
    std::cout << "Hello from C++!" << std::endl;
    return 0;
}
```

**Ruby**:
```ruby
puts "Hello from Ruby!"
```

**Go**:
```go
package main
import "fmt"
func main() {
    fmt.Println("Hello from Go!")
}
```

## 📚 API Documentation

### REST Endpoints

#### Code Execution
```http
POST /api/execute
Content-Type: application/json

{
  "language": "javascript", // Supported: javascript, cpp, ruby, go
  "code": "console.log('Hello, World!')",
  "timeout": 30000
}
```

#### Language Support
```http
GET /api/languages
Response:
{
  "languages": [
    {
      "id": "javascript",
      "version": "ES6+",
      "runtime": "Node.js"
    },
    {
      "id": "cpp",
      "version": "C++17",
      "compiler": "g++"
    },
    {
      "id": "ruby",
      "version": "Latest",
      "runtime": "Ruby"
    },
    {
      "id": "go",
      "version": "Latest",
      "runtime": "Go"
    }
  ]
}
```

## 🧪 Testing

### Running Tests
```bash
# Backend Tests
cd backend
npm test

# Frontend Tests
cd frontend
npm test

# E2E Tests
npm run test:e2e
```

### Test Coverage
```bash
# Generate coverage reports
npm run test:coverage
```

## 🔒 Security

### Security Features
1. **Container Isolation**
   - Separate containers for each execution
   - Network isolation
   - Resource limits
   - No persistent storage

2. **Code Execution Limits**
   ```typescript
   const executionLimits = {
     timeout: 30000, // 30 seconds
     memory: '512m',
     processes: 100,
     fileSize: '10m'
   };
   ```

3. **Input Validation**
   - Code size limits
   - Language validation
   - Syntax checking
   - Malicious code detection

## 🔍 Advanced Troubleshooting

### Docker Issues

1. **Container Build Failures**
   ```bash
   # Clean Docker cache
   docker builder prune
   
   # Remove all containers and images
   docker-compose down --rmi all
   ```

2. **Performance Issues**
   ```bash
   # Check container stats
   docker stats
   
   # Monitor container logs
   docker-compose logs -f --tail=100
   ```

3. **Network Problems**
   ```bash
   # Inspect network
   docker network ls
   docker network inspect multi-lang-playground_app-network
   ```

### Application Issues

1. **Frontend Connection Issues**
   - Check API URL in `.env`
   - Verify CORS settings
   - Check browser console logs

2. **Backend Errors**
   ```bash
   # Check backend logs
   docker-compose logs backend
   
   # Access container shell
   docker-compose exec backend sh
   ```

## 📈 Performance Optimization

### Frontend Optimization
- Code splitting
- Lazy loading
- Caching strategies
- Asset optimization

### Backend Optimization
- Request queuing
- Caching layer
- Load balancing
- Resource pooling

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork and Clone**
   ```bash
   git clone https://github.com/AmirHaytham/multi-lang-playground.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Commit Changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```

4. **Push and Create PR**
   ```bash
   git push origin feature/amazing-feature
   ```

### Development Guidelines
- Follow TypeScript best practices
- Write unit tests
- Update documentation
- Follow code style guide

## 📞 Support

Need help? We're here to assist:

1. 📚 Check the [Documentation](#-documentation)
2. 🔍 Search [Issues](https://github.com/AmirHaytham/multi-lang-playground/issues)
3. 💬 Follow on [Twitter](https://twitter.com/AmirHaytham_)
4. 📧 Email: amir.haytham.salama@gmail.com

---

<div align="center">

**[GitHub](https://github.com/AmirHaytham)** • **[Twitter](https://twitter.com/AmirHaytham_)** • **[Report Bug](https://github.com/AmirHaytham/multi-lang-playground/issues)** • **[Request Feature](https://github.com/AmirHaytham/multi-lang-playground/issues)**

Made with ❤️ by [Amir Haytham](https://github.com/AmirHaytham)

</div>
