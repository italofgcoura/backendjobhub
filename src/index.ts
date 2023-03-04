
import http from 'http';
import app from './app';
const server = http.createServer(app);

const port = 3001;

server.listen(port || 3001, '0.0.0.0', () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});



