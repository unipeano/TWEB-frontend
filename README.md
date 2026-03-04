# TWEB (Web Technologies) Project - Frontend

A modern web application for sharing, discovering, and managing recipes. Built with React, TypeScript, and Vite for a fast and responsive user experience.

## Features

- **User Authentication**: Secure login and profile management
- **Recipe Management**: Create, publish, and manage your recipes
- **Recipe Discovery**: Browse and search recipes from other users
- **Recipe Collections**: Organize recipes into personal recipe books
- **User Profiles**: View other users' profiles and their published recipes
- **Community**: Connect with other cooking enthusiasts

## Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: CSS
- **Linting**: ESLint

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project-frontend
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server with hot module reloading:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

**Note**: This frontend requires the [TWEB-backend](https://github.com/unipeano/TWEB-backend) to be running on port 8080. See the backend repository for setup instructions.

## Building for Production

To build the project for production:

```bash
npm run build
```

The optimized build will be generated in the `dist/` directory.

## Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Code Quality

Run ESLint to check code quality:

```bash
npm run lint
```

## Project Structure

```
src/
├── components/          # React components
├── context/            # Context API for state management
├── data/               # Data models and types
├── assets/             # Static assets
└── main.tsx           # Application entry point
```

## Environment Configuration

Create a `.env` file in the root directory for environment variables:

```
VITE_API_URL=http://localhost:8080
```

Make sure the backend server is running on port 8080 before starting the development server.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is provided as-is for educational and personal use.
