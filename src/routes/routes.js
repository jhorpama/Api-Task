const { Router } = require('express');
const router = Router();

const taskCtrl = require('../controllers/controller');

router.get('/api/tasks/:email', taskCtrl.getTasks);
router.post('/api/task/add', taskCtrl.setTask);
router.put('/api/task/update/:id', taskCtrl.updateTask);
router.delete('/api/task/delete/:id', taskCtrl.deleteTask);
router.get('/api/subtasks/', taskCtrl.getSubtasks);
router.post('/api/subtask/add', taskCtrl.createdSubtask);
router.put('/api/subtask/update/:id', taskCtrl.updateSubtask);
router.delete('/api/subtask/delete/:id', taskCtrl.deleteSubtask);
router.post('/api/register', taskCtrl.register);
router.post('/api/login', taskCtrl.login);

module.exports = router;