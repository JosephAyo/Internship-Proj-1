const mongoose = require('mongoose');

//Create new  Schema named Team
const Team = new mongoose.Schema({
    teamName: {
        type: String,
        default: '',
        trim: true
    },
    City: {
        type: String,
        default: '',
        trim: true
    },
    Conference: {
        type: String,
        default: '',
        trim: true
    },
    NBAtitles: {
        type: Number,
        default: '',
        trim: true
    },
});

module.exports = mongoose.model('Team',Team);