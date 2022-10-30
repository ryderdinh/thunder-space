const multer = require("multer");

// Multer config
module.exports = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 1000000
    }
});