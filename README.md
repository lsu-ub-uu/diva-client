# DiVA Client 📚

This is the client for DiVA on Cora. It uses the Cora REST API to enable users to search, view and manage bibliographical metadata.

It is a full stack React application with server side rendering, using the [React Router](https://reactrouter.com) framework in a custom Node.js Express server.

The project is written in TypeScript. A code editor that supports real-time TypeScript checking is recommended.

## Getting started

### Prerequisites

- Node.js (version 22.14 or later)
- npm (version 10.8 or later)
- Alternatively you can [build and run with Docker](#building-and-running-docker-image)

### Installation

1. Clone the repository

```bash
git clone git@github.com:lsu-ub-uu/diva-client.git
```

2. Install dependencies

```bash
npm install
```

3. Create a file named `.env` in the project root

```.dotenv
# Cora API URLs (mandatory)
CORA_API_URL=https://cora.epc.ub.uu.se/diva/rest
CORA_LOGIN_URL=https://cora.epc.ub.uu.se/diva/login/rest

# Additional variables (optional)
BASE_PATH=/divaclient
PORT=5173
```

### Starting the development server

```bash
npm run dev
```

If using WebStorm you can also use the run configuration named "server.ts" (supports debugging)

Open http://0.0.0.0:5173/divaclient in a web browser

### Running code quality checks

#### Run unit tests

```bash
npm test
```

#### TypeScript check

```bash
npm run typecheck
```

#### Eslint (TypeScript code quality control)

```bash
npm run lint
```

#### Stylelint (CSS code quality control)

```bash
npm run stylelint
```

### Building and running production bundle

```bash
npm run build
npm start
```

### Docker

#### Build the Docker image

```bash
docker build -t diva-client .
```

#### Start the Docker container

```bash
# Stop and remove any old containers
docker kill diva-client
docker rm diva-client

# Create and run container, with environment variables and publishes port
docker run -d --name diva-client \
      -e CORA_API_URL=https://cora.epc.ub.uu.se/diva/rest \
      -e CORA_LOGIN_URL=https://cora.epc.ub.uu.se/diva/login/rest \
      -p 9876:5173 \
      diva-client
```

Docker container should now be accessible at http://localhost:9876

### Enable in-app devtools

When running the application, open the DevTools console and run the following:

```javascript
localStorage.setItem('diva-dev', 'true');
```

## License

This application is released under the [GNU General Public License](https://github.com/lsu-ub-uu/diva-client/blob/master/LICENSE)
