const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/proj-1', {useNewUrlParser: true});
//create new Schema named Profile
const Profile = new mongoose.Schema({
    firstName: {
        type: String,
        default: '',
        trim: true
    },
    lastName: {
        type: String,
        default: '',
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        trim: true
    },
    team: {
        type: String,
        default: '',
        trim: true
    },
    position: {
        type: String,
        default: '',
        trim: true
    }
},{collection:'data'});

module.exports = mongoose.model('Profile', Profile);