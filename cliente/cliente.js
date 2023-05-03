const net = require('net'); //importa a biblioteca de rede


function generateNumber() {
  // Gera um número aleatório com até 30 casas decimais
  const randomNumber = Math.floor(Math.random() * 10 ** 30);
  return randomNumber.toString();
}

function connectToServer() {
  const socket = net.createConnection({ port: 8080 }, () => {
    console.log('Conexão estabelecida com o servidor.');

    const number = generateNumber();
    console.log(`Enviando o número ${number} para o servidor...`);
    socket.write(number);
  });

  socket.on('data', (data) => {
    const response = data.toString().trim();
    console.log(`Resposta recebida do servidor: ${response} FIM`);
    socket.end();
  });

  socket.on('end', () => {
    console.log('Conexão encerrada pelo servidor.');
    setTimeout(connectToServer, 10000);
  });

  socket.on('error', (err) => {
    console.error(`Erro na conexão: ${err.message}`);
    setTimeout(connectToServer, 10000);
  });
}

connectToServer();