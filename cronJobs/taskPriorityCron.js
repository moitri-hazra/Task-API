const cron = require('node-cron');
const Task = require('../models/Task_Model');

module.exports = function() {
  cron.schedule('0 0 * * *', async () => {
    try {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const dayAfterTomorrow = new Date(today);
      dayAfterTomorrow.setDate(today.getDate() + 2);
  
      await Task.updateMany(
        { due_date: { $lt: today }, priority: 0 },
        { $set: { priority: 1 } }
      );
      await Task.updateMany(
        { due_date: { $gte: tomorrow, $lt: dayAfterTomorrow }, priority: { $in: [1, 2] } },
        { $set: { priority: 2 } }
      );
      await Task.updateMany(
        { due_date: { $gte: dayAfterTomorrow }, priority: 2 },
        { $set: { priority: 3 } }
      );
      console.log('Task priorities updated successfully');
    } catch (error) {
      console.error('Error in changing task priorities:', error);
    }
  });
};
