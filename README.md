
- Primeiro, execute esses comandos para criar o server:

```bash
mkdir -p server/src/{config,models,routes}
cd server
npm init -y
npm install express mongoose dotenv cors
npm install nodemon --save-dev
```

- Conteúdo do package.json 

```json
{
  "name": "blog-server",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node ./src/server.js",
    "dev": "nodemon -L src/server.js"
  },
   "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "mongoose": "^8.10.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.9"
  }
}
```

- As rotas estarão disponíveis em:

* GET http://localhost:5001/api/posts
* POST http://localhost:5001/api/posts
* PUT/DELETE http://localhost:5001/api/posts/:id

- No Frontend (pasta client)

```bash
npm create vite@latest . -- --template react
npm install react-bootstrap bootstrap react-router-dom bootstrap-icons
```

- Para Google Fonts:

Colocar no index.html

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```