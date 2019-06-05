const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    email: { type: String },
    password: { type: String },
    name: { type: String },
    create_at: { type: Date, default: Date.now }
})

module.exports = model('user', userSchema);