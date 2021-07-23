const db = require('../db');

module.exports = db.defineModel('apply', {
    did: db.STRING(100),
    nid: db.STRING(100),
    atime: db.STRING(100),
    archivetime: db.STRING(100)
})