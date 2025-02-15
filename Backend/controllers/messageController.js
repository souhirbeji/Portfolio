const Message = require('../models/Message');
const { sendNotificationToAdmin, sendReplyToUser } = require('../config/nodemailer');

exports.createMessage = async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    await sendNotificationToAdmin(message);
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({  
      message: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .select('-__v');
    res.json(messages);
  } catch (error) {
    res.status(500).json({  
      message: error.message });
  }
};

exports.replyToMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ 
        message: error.message });
    }

    message.reply = reply;
    message.status = 'replied';
    await message.save();
    
    await sendReplyToUser(message);

    res.json(message);
  } catch (error) {
    res.status(400).json({ 
      message: error.message
    });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ 
        message: 'Message not found '
      });
    }

    res.status(200).json({
      message: 'Message deleted'
    });
  } catch (error) {
    res.status(500).json({ 
      message: error.message
    });
  }
};
