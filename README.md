# Super Multi-Language Code Playground

A modern, web-based code editor and execution environment supporting multiple programming languages. Built with React, TypeScript, Node.js, and Docker.

![Code Playground Screenshot](screenshot.png)

## Features

- 🌈 Support for multiple programming languages:
  - JavaScript
  - C++
  - Ruby
  - Go

- 💻 Modern Code Editor:
  - Monaco Editor (VS Code's editor)
  - Syntax highlighting
  - Code completion
  - Error detection
  - Multiple themes (Dark, Light, High Contrast)

- 🎨 Modern UI:
  - Responsive design
  - Dark mode by default
  - Split-screen layout
  - Custom scrollbars
  - Loading animations

## Installation

### Prerequisites
- Docker and Docker Compose
- Node.js 16+
- npm or yarn

### Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/code-playground.git
   cd code-playground
   ```

2. Start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. Access the application:
   Open your browser and navigate to http://localhost:3007

### Manual Setup

1. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

4. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

## Configuration

### Environment Variables

Frontend (.env):
- REACT_APP_API_URL=http://localhost:5007 - Backend API URL
- REACT_APP_REPORT_WEB_VITALS=true - Enable web vitals reporting
- WDS_SOCKET_PORT=0 - WebSocket port for development server

Backend (.env):
- NODE_ENV=development - Environment mode
- PORT=5002 - Port number for backend server


## Features

- 🌈 Multiple Programming Language Support:
  - C++ (⚡)
  - JavaScript (📜) 
  - Ruby (💎)
  - Go (🔵)

- 💻 Rich Code Editor:
  - Syntax highlighting
  - Auto-completion
  - Multiple themes (Dark, Light, High Contrast)
  - Customizable settings
  - Vim/Emacs keybindings support
  - Line numbers
  - Minimap
  - Word wrap options

- ⚙️ Real-time Code Execution:
  - Secure sandboxed environment
  - Quick feedback
  - Error handling
  - Output display

- 🎨 Modern UI:
  - Clean and intuitive interface
  - Responsive design
  - Split-pane layout
  - Settings modal
  - Language selector

## Architecture

The application follows a client-server architecture:

### Frontend
- Built with React + TypeScript
- Monaco Editor for code editing
- Tailwind CSS for styling
- Framer Motion for animations

### Backend
- Node.js + Express server
- Docker containers for language runtimes
- Secure code execution environment

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Running Locally (Without Docker)

### Prerequisites
- Node.js v16 or higher
- npm or yarn
- Required language runtimes:
  - C++ compiler (g++)
  - Go
  - Ruby
  - Python 3.9+

### Frontend Setup
1. Navigate to the frontend directory:
