const { model, Schema } = require('mongoose');

const userTask = new Schema({
    name: { type: String },
    description: { type: String },
    create_at: { type: Date, default: Date.now }
});

module.exports = model('task', userTask);