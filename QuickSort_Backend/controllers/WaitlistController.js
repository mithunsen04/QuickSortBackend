const Waitlist = require('../models/WaitlistModel');

class WaitlistController {
  async create(req, res) {
    try {
      const { name, email, message } = req.body;

      // Check if the email already exists in the waitlist
      const existingWaitlist = await Waitlist.findOne({ email });
      if (existingWaitlist) {
        return res.status(400).json({ message: 'You are already in waitlist' });
      }

      // Create a new waitlist entry
      const newWaitlist = new Waitlist({ name, email, message });
      await newWaitlist.save();

      res.status(201).json({ message: 'You have succesfully joined the Waitlist ' });
    } catch (error) {
      console.error('Error creating waitlist entry:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new WaitlistController();
