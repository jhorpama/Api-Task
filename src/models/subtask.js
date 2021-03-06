const { model, Schema } =  require('mongoose');

const subTasks = new Schema({
    name: { type: String },
    description: { type: String },
    mytask: { type: String },
    state: { type: Boolean, default: false },
    create_at: { type: Date, default: Date.now },
    //creator: {type: Schema.Types.ObjectId, ref: "task"}
});

module.exports = model('subtasks', subTasks);