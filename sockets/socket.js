const { io } = require('../index');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
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