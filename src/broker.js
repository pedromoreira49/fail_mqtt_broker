import Aedes from "aedes";
import { createServer } from "net";

const PORT = 1883;

const aedes = new Aedes();
const server = createServer(aedes.handle);

server.listen(PORT, function () {
  console.log("server started and listening on port ", PORT);
});

aedes.on("publish", async function (packet, client) {
  if (client)
    console.log(
      `Mensagem publicada: ${client.id}:`,
      packet.topic,
      packet.payload.toString()
    );
});

aedes.on("client", function (client) {
  console.log(`Cliente conectado: ${client.id}`);
});
