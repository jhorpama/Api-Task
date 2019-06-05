const { model, Schema } =  require('mongoose');

const subTask = new Schema({
    name: { type: String },
    description: { type: String },
    task_id: { type: String},
    create_at: { type: Date, default: Date.now },
});

module.exports = model('subtask', subTask);