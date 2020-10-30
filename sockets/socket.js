const { comprobarJWT } = require("../helpers/JWT");
const { io } = require("../index");
const {
  usuarioConectado,
  usuarioDesconectado,
  grabarMensaje,
} = require("../controllers/socketController");

// Mensajes de Sockets
io.on("connection", (client) => {
        console.log("Cliente conectado");
        //verificar autenticacion
        const [valido, uid] = comprobarJWT(client.handshake.headers["x-token"]); //aqui desde la app se le pasa los headers
        if (!valido) {
            return client.disconnect();
        }

        usuarioConectado(uid);

        // Ingresar al usuario a una sala en particular
        // sala global, client.id, 5f298534ad4169714548b785
        client.join(uid);

        // Escuchar del cliente el mensaje-personal
        client.on("mensaje-personal", async (payload) => {
            // TODO: Grabar mensaje
            console.log(payload);
            await grabarMensaje(payload);
            io.to(payload.para).emit("mensaje-personal", payload);
        });

        client.on("disconnect", () => {
            console.log("Cliente desconectado");
            usuarioDesconectado(uid);
        });

        client.on("mensaje", (payload) => {
            console.log("Mensaje", payload);

            io.emit("mensaje", { admin: "Nuevo mensaje" });
        });
});
