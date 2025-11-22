const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Ime je obavezno.'],
        minLenght: [2, "Minimum dva karaktera."]
    },
    email: {
        type: String,
        required: [true, 'Email je obavezan.'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Email nije u validnom formatu.'],
    },
    password: {
        type: String,
        required: [true, 'Lozinka je obavezna.'],
        minLength: 5
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    createdAt: {
        type: Date
    },
    refreshToken: {
        type: String, 
        default: null
    }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);