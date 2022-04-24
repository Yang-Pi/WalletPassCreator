const PassTemplateModel = require('../models/pass-template.model');

async function selectTemplateBySerialNumber(serialNumber) {
  const seletedData = await PassTemplateModel
    .find({serialNumber: serialNumber})
    .exec();
  
  if (!seletedData?.length) {
    throw 'Template\'s not found';
  }

  return seletedData[0];
}

async function selectTemplateIdBySerialNumber(serialNumber) {
  const seletedData = await PassTemplateModel
    .find({serialNumber: serialNumber}, {_id : 1})
    .exec();

  if (!seletedData?.length) {
    throw 'Template\'s not found';
  }

  return seletedData[0];
}

module.exports = {
  selectTemplateBySerialNumber,
  selectTemplateIdBySerialNumber
}