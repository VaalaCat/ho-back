const db = require('../db');

module.exports = db.defineModel('introduction', {
    did: {
        type: db.STRING(100),
        unique: true
    },
    info: db.TEXT,
    aff: db.STRING(100)
});