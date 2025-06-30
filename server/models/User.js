const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// פונקציה להצפנת סיסמה לפני שמירה
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


userSchema.methods.matchPassword = async function (enteredPassword) {
  // השוואה בין הסיסמה שהוזנה לסיסמה המוצפנת ב-DB
  return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', userSchema);

module.exports = User;