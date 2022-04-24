const mongoose = require('mongoose');

const passTemplateSchema = new mongoose.Schema({
  name: String,
  serialNumber: { type : String , unique : true, required : true},
  passType: String,
  
  barcode: {
    message: String,
    format: String,
    messageEncoding: String
  },
  
  logoImageLink: String,
  iconImageLink: String,
  stripImageLink: String,

  organizationName: String,
  description: String,
  logoText: String,
  foregroundColor: String,
  backgroundColor: String,
});

module.exports = mongoose.model('pass_template', passTemplateSchema);