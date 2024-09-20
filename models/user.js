const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

// Add auto-increment plugin for id field
userSchema.plugin(AutoIncrement, { inc_field: 'id' });

const User = mongoose.model('User', userSchema);

module.exports = User;
