# DiVA Client 📚

This is the client for DiVA on Cora. It uses the Cora REST API to enable users to search, view and manage bibliographical metadata.

It is a full stack React application with server side rendering, using the [React Router](https://reactrouter.com) framework in a custom Node.js Express server.

The project is written in TypeScript. A code editor that supports real-time TypeScript checking is recommended.

## Getting started

### Prerequisites

- Node.js (version 22.14 or later)
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

3. Create a file named `.env` in the project root. See environment variables section below for a list of available variables.

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

### Enable in-app devtools

When running the application, open the DevTools console and run the following:

```javascript
localStorage.setItem('diva-dev', 'true');
```

## Environment variables

### Mandatory variable

The following variables must be set in order to start the server.

- `CORA_API_URL`: Path to the Cora REST API (E.g. https://preview.diva.cora.epc.ub.uu.se/rest)
- `CORA_LOGIN_URL`: Path to the Cora login API (E.g. https://cora.epc.ub.uu.se/diva/login/rest)
- `CORA_EXTERAL_SYSTEM_URL`: Public path to the Cora system. Must be accessible externally. (E.g. https://preview.diva.cora.epc.ub.uu.se)
- `APP_TOKEN_USERS`: A list of users with app tokens that will be available as test login options. (E.g. `[{"displayName":"Diva Admin","loginId":"divaAdmin@cora.epc.ub.uu.se","appToken":"xxxxx-xxxx-xxxx-xxxx-xxxxxxx"}]`)

### Additional variables (optional)

The follwing variables are optional and have some

- `BASE_PATH`: A base URL path under which all routes are served. (E.g. `/divaclient`)
  BASE_PATH=/divaclient
- `PORT`: The port on which the server will listen (Default `5173`)
- `SESSION_SECURE`: Whether to use a secure session cookie (Default `true`)
- `SESSION_SECRETS`: A comma separated list of secrets to use for the secure session cookie. Add items to the list to rotate in new secrets without breaking the old. (E.g. `s3cret,h3mlis`)

```

## License

This application is released under the [GNU General Public License](https://github.com/lsu-ub-uu/diva-client/blob/master/LICENSE)
```
