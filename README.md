# DiVA Client 📚

This is the client for DiVA on Cora. It uses the Cora REST API to enable users to search, view and manage metadata.

It is a full stack React application with server side rendering, using the [React Router](https://reactrouter.com) framework in a custom Node.js Express server.

As this project includes server side logic, the DiVA BFF (`diva-react-spa-bff`) is obsolete and no longer in use.

## Getting started

### Prerequisites
- Node.js (version 20 or later)
- npm (version 10.8 or later)

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
DOMAIN=0.0.0.0

# Additional variables (optional)
ENVIRONMENT=local
BASE_PATH=/divaclient
PORT=5173
```

### Starting the development server
```bash
npm run dev
```

Open http://0.0.0.0:5173/divaclient in a web browser

### Running code quality checks
Unit tests
```bash
npm test
```

TypeScript check
```bash
npm run typecheck
```

Lint
```bash
npm run lint
```

### Building and running production bundle
```bash
npm run build
npm start
```

### Building and running Docker image
```bash
docker build -t diva-client .
```

```bash
docker run -d --name diva-client \
      -e CORA_API_URL=https://cora.epc.ub.uu.se/diva/rest \
      -e CORA_LOGIN_URL=https://cora.epc.ub.uu.se/diva/login/rest \
      -p 9876:5173 \
      diva-client
  ```

### Enable in-app devtools
When running the application, open the DevTools console and run the following:
```javascript
localStorage.setItem("diva-dev", "true");
```

## License
This application is released under the [GNU General Public License](https://github.com/lsu-ub-uu/diva-client/blob/master/LICENSE)
