const PassInfoModel = require('../models/pass-fields.model');

async function selectPassBySerialNumber(serialNumber) {
  const seletedData = await PassInfoModel
    .find({serialNumber: serialNumber})
    .exec();

  if (!seletedData?.length) {
    throw 'Pass\'s not found';
  }

  return seletedData[0];
}

async function selectPassIdBySerialNumber(serialNumber) {
  const seletedData = await PassInfoModel
    .find({serialNumber: serialNumber}, {_id : 1})
    .exec();

  if (!seletedData?.length) {
    throw 'Template\'s not found';
  }

  return seletedData[0];
}

module.exports = {
  selectPassBySerialNumber, 
  selectPassIdBySerialNumber
}