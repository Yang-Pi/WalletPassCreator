const fs = require('fs');

const PassTemplateModel = require('../storage/models/pass-template.model')
const PassBuilder = require('./pass-builder.service');
const {selectTemplateBySerialNumber, selectTemplateIdBySerialNumber} = require('../storage/selectors/tamplate.selector');
const {checkVariablesPopulation} = require('./utils');

async function createNewTemplate(data) {
  checkVariablesPopulation([data]);

  const templateInfo = new PassTemplateModel(data);
  /* Check that pass is builded form template correctly */
  const template = await PassBuilder.createPassTemplate(templateInfo);
  const pass = template.createPass();
  
  await templateInfo.save();
  fs.writeFileSync('test-template.pkpass', await pass.asBuffer());

  return templateInfo.serialNumber;
}

async function getTemplateBySerialNumber(serialNumber) {
  var template = selectTemplateBySerialNumber(serialNumber);
  template = PassBuilder.createPassTemplate(template);
  const pass = template.createPass();

  return pass.asBuffer();
}

async function updateTemplateFully(data) {
  checkVariablesPopulation([data]);
  
  const templateInfo = data;
  const templateId = await selectTemplateIdBySerialNumber(templateInfo.serialNumber);

  /* Check that pass is builded form template correctly */
  const template = await PassBuilder.createPassTemplate(templateInfo);
  const pass = template.createPass();  

  await PassTemplateModel.updateOne({_id: templateId}, {$set: templateInfo});
  fs.writeFileSync('test-template.pkpass', await pass.asBuffer());  
}

module.exports = {
  createNewTemplate,
  getTemplateBySerialNumber,
  updateTemplateFully
};