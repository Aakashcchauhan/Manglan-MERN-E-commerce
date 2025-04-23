const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  role :{
    type : String,
    default : 'user'
  },
  loginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date, default: null },
  lockCount: { type: Number, default: 0 } 
});

UserSchema.methods.isLocked = function () {
  return this.lockUntil && this.lockUntil > Date.now();
};

// Hash the password before saving
UserSchema.pre ('save',async function (next) {
  const User = this;
  if(!User.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(User.password, salt);
    User.password = hashedPassword;
    next();
} catch (err) {
    next(err);
}
})

  // Hash the password before updating
UserSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  if (update.password) {
      try {
          const salt = await bcrypt.genSalt(10);
          update.password = await bcrypt.hash(update.password, salt);
          this.setUpdate(update);
      } catch (err) {
          return next(err);
      }
  }
  next();
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
      const isMatch = await bcrypt.compare(candidatePassword, this.password);
      return isMatch;
  } catch (err) {
      throw err;
  }
};




const User = mongoose.model('User',UserSchema);
module.exports = User;