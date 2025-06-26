const mongoose = require('mongoose')

const experienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  from: Date,
  to: Date,
  current: Boolean,
  description: String
});

const educationSchema = new mongoose.Schema({
  school: String,
  degree: String,
  fieldofstudy: String,
  from: Date,
  to: Date,
  current: Boolean,
  description: String
});


const userSchema = mongoose.Schema({
    username :{
        type : String,
        required : true,
        unique : true
    },

    email :{
         type : String,
        required : true,
        unique : true
    },
    
    password :{
        type : String,
        required : true
    },
    avatar: String,
    bio: String,
    skills: [String],
    experience: [experienceSchema],
    education: [educationSchema]
})

module.exports = mongoose.model('User', userSchema)
  