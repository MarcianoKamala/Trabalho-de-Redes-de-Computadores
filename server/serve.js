
const net = require('net'); //importa a biblioteca de rede

const server = net.createServer((socket) => {
  console.log('Cliente conectado');

  socket.on('data', (data) => {
    const number = data.toString().trim();
    
    if (number.length > 10) {
      const string = generateString(number.length);
      socket.write(string);
    } else {
      if (number % 2 == 0) {
        socket.write('PAR');
      } else {
        socket.write('ÍMPAR');
      }
    }
  });

  socket.on('end', () => {
    console.log('Cliente desconectado');
  });
});

function generateString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  
  return result;
}

server.listen(8080, () => {
  console.log('Servidor iniciado na porta 8080');
});