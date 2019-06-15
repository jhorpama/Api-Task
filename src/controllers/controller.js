const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Task = require('../models/task');
const SubTasks = require('../models/subtask');

const taskCtrl = {};

const secret = 'jhor2019';

taskCtrl.getTasks = async (req, res) => {
      const task = await Task.find({email: req.params.email});
      res.json(
        task
      );
};

taskCtrl.setTask = async (req, res) => {

      const task = new Task();

      task.name = req.body.name
      task.description = req.body.description
      task.email = req.body.email

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

taskCtrl.getSubtasks = async (req, res) => {
      const subtasks = await SubTasks.find();
      res.json(
        subtasks
      )
      /*SubTasks.find()
              .populate("creator")
              .exec()
              .then( subtask => {
                 res.json(subtask)
              }).catch(err => {
                  res.json(
                      err
                  )
              })*/
};

taskCtrl.createdSubtask = async (req, res) => {
      const subtask = new SubTasks();
      subtask.name = req.body.name
      subtask.description = req.body.description
      subtask.mytask = req.body.mytask
      //subtask.creator = req.body.creator
      await subtask.save();
      res.json(
          subtask
      )
};

taskCtrl.updateSubtask = async (req, res) => {
      await SubTasks.findOneAndUpdate({_id:req.params.id},req.body,{new:true}, (err, data) => {
          res.json(
            data
          )
      })
};

taskCtrl.deleteSubtask = async (req, res) => {
     const deleteTask = await SubTasks.findByIdAndRemove(req.params.id);
     res.json(
        deleteTask
     )
}

taskCtrl.register = async (req, res) => {
      const users = new User();

      users.email = req.body.email
      //Bcrypt
      const salt = bcrypt.genSaltSync(10);
      users.password = bcrypt.hashSync(req.body.password, salt);

      users.name = req.body.name

     await users.save();

      res.json(
          users
      )
};

taskCtrl.login = async (req, res) => {
      const email = { email: req.body.email };
      const password = req.body.password;

      const userDatos = await User.findOne(email);

      if(userDatos !== null) {
            
        const validate = bcrypt.compareSync(password, userDatos.password);
   
            if(userDatos.email === req.body.email && validate === true){
                  
                const token = jwt.sign({
                    data: {
                        email: req.body.email,
                        password: validate
                    }
                },secret,{ expiresIn: '1h' });

                console.log(token);

                res.json({
                    token: token
                });
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