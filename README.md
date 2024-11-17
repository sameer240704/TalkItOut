# TalkItOut: Messaging App

This repository contains both client and server applications. Below are the setup instructions for both parts.

## Client Application

### Prerequisites

- Node.js (v14 or higher)
- Yarn package manager

### Setup and Installation

1. Navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
yarn install
```

3. Create a `.env` file in the client directory and add necessary environment variables:

```env
VITE_SERVER_URL=http://localhost:3000
VITE_WEB_URL=http://localhost:5173
```

4. Available Scripts

- Start development server:

```bash
yarn start
```

- Build for production:

```bash
yarn build
```

- Run tests:

```bash
yarn test
```

- Run linting:

```bash
yarn lint
```

### Project Structure

```
client/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.js
│   └── index.js
├── package.json
├── yarn.lock
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

## Server Application

### Prerequisites

- Node.js (v14 or higher)
- Yarn package manager
- MongoDB (v4 or higher)

### Setup and Installation

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
yarn install
```

3. Create a `.env` file in the server directory and add necessary environment variables:

```env
PORT=
MONGO_URI=
WEB_URL=
JWT_SECRET=
NODE_ENV=

CLOUD_NAME=
API_KEY=
API_SECRET=
```

4. Available Scripts

- Start development server:

```bash
yarn server
```

- Start production server:

```bash
yarn start
```

- Run tests:

```bash
yarn test
```

- Run linting:

```bash
yarn lint
```

### Project Structure

```
server/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── socket.js
├── package.json
└── README.md
```

## Development

1. Start the MongoDB server
2. Start the server application
3. Start the client application
4. The client will be available at `http://localhost:5173`
5. The server will be available at `http://localhost:3000`

## License

This project is licensed under the MIT License - see the LICENSE file for details
