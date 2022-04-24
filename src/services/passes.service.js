const fs = require('fs');

const PassInfoModel = require('../storage/models/pass-fields.model');
const {selectTemplateBySerialNumber} = require('../storage/selectors/tamplate.selector');
const {selectPassBySerialNumber, selectPassIdBySerialNumber} = require('../storage/selectors/pass.selector');
const {checkVariablesPopulation} = require('./utils');
const PassBuilder = require('./pass-builder.service');

async function createNewPass(data) {
  checkVariablesPopulation([data]);

  const passInfo = new PassInfoModel(data);
  const template = await selectTemplateBySerialNumber(passInfo.templateSerialNumber)
  
  passInfo.templateId = template._id;
  template.barcode.message = passInfo.barcode.message;
  /* Check that pass is builded form template correctly */
  const pass = await PassBuilder.createPass(template, passInfo);
  await passInfo.save();

  fs.writeFileSync('test-pass.pkpass', await pass.asBuffer());

  return passInfo.serialNumber;
}

async function getPassBySerialNumber(serialNumber) {
  var pass = await selectPassBySerialNumber(serialNumber);
  const template = await selectTemplateBySerialNumber(pass.templateSerialNumber);
  pass = await PassBuilder.createPass(template, pass);

  fs.writeFileSync('test-pass-get.pkpass', await pass.asBuffer());

  return await pass.asBuffer();
}

async function updatePassFully(data) {
  checkVariablesPopulation([data]);

  const passInfo = data;
  const template = await selectTemplateBySerialNumber(passInfo.templateSerialNumber)
  template.barcode.message = passInfo.barcode.message;
  /* Check that pass is builded form template correctly */
  const pass = await PassBuilder.createPass(template, passInfo);
  
  const passId = await selectPassIdBySerialNumber(passInfo.serialNumber);
  await PassInfoModel.updateOne({_id: passId}, {$set: passInfo});

  fs.writeFileSync('test-pass.pkpass', await pass.asBuffer());
}

module.exports = {
  createNewPass,
  getPassBySerialNumber,
  updatePassFully
};