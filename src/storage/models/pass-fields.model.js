const mongoose = require('mongoose');

const passFieldsSchema = new mongoose.Schema({
  name: String,
  serialNumber: { type : String , unique : true, required : true},
  templateSerialNumber: String,
  templateId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'pass_template', 
    required: true
  },
  
  barcode: {
    message: String
  },
  
  primaryFields : [
    {
      key : String,
      label : String,
      value : String,
      currencyCode: String
    }
  ],
  secondaryFields : [
    {
      key : String,
      label : String,
      value : String
    }
  ],
  auxiliaryFields : [
    {
      key : String,
      label : String,
      value : String
    }
  ]
});

module.exports = mongoose.model('pass_fields', passFieldsSchema);