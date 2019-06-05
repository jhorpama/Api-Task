const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
const Task = require('../models/task');
const SubTask = require('../models/subtask');

const taskCtrl = {};

taskCtrl.getTasks = async (req, res) => {
      const task = await Task.find();
      res.json(
        task
      );
};

taskCtrl.setTask = async (req, res) => {

      const task = new Task();

      task.name = req.body.name
      task.description = req.body.description

      task.save();

      res.json(
          task
      );

};

taskCtrl.updateTask = async (req, res) => {
      await Task.findOneAndUpdate({_id:req.params.id},req.body,{new: true}, (err, data) => {
          res.json(
              data
          )
      });
};

taskCtrl.deleteTask = async (req, res) => {
      const  removetask = await Task.findByIdAndRemove(req.params.id);
      res.json(
          removetask
      );
};

taskCtrl.getSubtask = async (req, res) => {
      const subtask = await SubTask.find();
      res.json(
        subtask
      )
};

taskCtrl.createdSubtask = async (req, res) => {
      const subtask = new SubTask();
      subtask.task_id = req.body.task_id
      subtask.name = req.body.name
      subtask.description = req.body.description
      await subtask.save();
      res.json(
          subtask
      )
};

taskCtrl.updateSubtask = async (req, res) => {
      await SubTask.findOneAndUpdate({_id:req.params.id},req.body,{new:true}, (err, data) => {
          res.json(
              data
          )
      })
};

taskCtrl.deleteSubtask = async (req, res) => {
     const deleteTask = await SubTask.findByIdAndRemove(req.params.id);
     res.json(
        deleteTask
     )
}

taskCtrl.registerUser = async (req, res) => {
      const users = new User();
      users.email = req.body.email
      //Bcrypt
      const salt = bcrypt.genSaltSync(10);
      users.password = bcrypt.hashSync(req.body.password, salt);

      users.name = req.body.name
      users.save();
      res.json(
          users
      )
};

taskCtrl.loginUser = async (req, res) => {
      const email = { email: req.body.email };
      const password = req.body.password;

      const userDatos = await User.findOne(email);

      if(userDatos !== null) {
            
        const validate = bcrypt.compareSync(password, userDatos.password);
   
            if(userDatos.email === req.body.email && validate === true){
                res.json({
                    message: "validated"
                })
            }else{
                res.json({
                    message: 'Incorrect Password'
                })
            }

      }else{
         res.json({
            message: 'This email is not registered'
         })
      }
};

module.exports = taskCtrl;