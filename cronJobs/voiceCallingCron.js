const cron = require('node-cron');
const Task = require('../models/Task_Model');
const User = require('../models/User');
const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

const voiceCallingCron = () => {
  cron.schedule('0 * * * *', async () => {
    try {
      const users = await User.find().sort({ priority: 1 });

      for (const user of users) {
        const overdueTasks = await Task.find({ user_id: user.id, due_date: { $lt: new Date() } });

        if (overdueTasks.length > 0) {
          const call = await twilioClient.calls.create({
            url: 'https://demo.twilio.com/docs/voice.xml',
            to: user.phone_number,
            from: '+917679020364'
          });

          console.log(`Voice call initiated to ${user.phone_number}: ${call.sid}`);
          break;
        }
      }
    } catch (error) {
      console.error('Error in voice calling:', error);
    }
  });
};

module.exports = voiceCallingCron;

