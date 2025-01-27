const { checkJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { userConnected, userDisconnected, saveMessage } = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    
    const[ valid, uid] = checkJWT(client.handshake.headers['x-token']);

    // Verificar autenticación
    if (!valid) { return client.disconnect(); }

    // Cliente autenticado
    userConnected(uid);

    // Ingresar al usuario a una sala en particular
    // Sala global (io.emit()), client.id, uid
    // unimos al usuario a una sala en particular
    client.join(uid);

    // Escuchar del cliente el personal-message
    client.on('personal-message', async (payload) => {
        console.log(payload);
        await saveMessage(payload);

        io.to(payload.to).emit('personal-message', payload);
    });

    client.on('disconnect', () => { 
        userDisconnected(uid);
     });

    //  client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje recibido', payload);

    //     io.emit('mensaje', {admin: 'Nuevo mensaje'});
    //  })

    //  client.on('emitir-mensaje', ( payload ) => {
    //      // io.emit('nuevo-mensaje', payload); // Emite a todos
    //      client.broadcast.emit('nuevo-mensaje', payload); // Emite a todos menos al que lo emitió
    //  })

    //   client.on('vote-band', (payload) => {
    //   bands.voteBand(payload.id);
    //   io.emit('active-bands', bands.getBands());
    //   });

    //   client.on('add-band', (payload) => {
    //     bands.addBand(new Band(payload.name));
    //     io.emit('active-bands', bands.getBands());
    //   });

    //   client.on('delete-band', (payload) => {
    //     bands.deleteBand(payload.id);
    //     io.emit('active-bands', bands.getBands());
    //   });
});