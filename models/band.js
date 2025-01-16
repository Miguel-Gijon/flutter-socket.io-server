const { v4: uuidV4 } = require('uuid');

class Band {

    constructor(name = 'no-name'){

        this.id = uuidV4(); // Genera un id único
        this.name = name;
        this.votes = 0;
    }
}


module.exports = Band;