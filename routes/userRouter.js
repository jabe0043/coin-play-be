const { Router } = require('express');
const AuthUser = require("../models/authModel");
const User = require("../models/userModel");
const userRouter = Router();

userRouter.post('/', async (req, res) => {
  const userId = req.user.id;
  console.log("UserRouter user id:", userId);

  try {
    // Try to retrieve the user document
    const authDocument = await AuthUser.findOne({ _id: userId });
    if (authDocument) {
      // Auth document found, use its data to create/update user document
      const userDocument = await User.findOne({ _id: userId });
      if (userDocument) {
        // User document already exists
        console.log('User document exists');
        res.json(userDocument);
      } else {
        // User document doesn't exist, create it
        console.log('User document DOES NOT exist');
        const newUserDocument = new User({
          _id: authDocument._id,
          name: authDocument.name, // Use name from auth document
        });
        await newUserDocument.save();
        res.json(newUserDocument);
      }
    } else {
      // Auth document not found
      console.log('Auth document not found');
      res.status(404).json({ error: 'Auth document not found' });
    }
  } catch (error) {
    console.error('Error creating/retrieving user document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = userRouter;