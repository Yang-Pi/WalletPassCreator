require('dotenv').config()
const { Template } = require("@walletpass/pass-js");
const {getImageFromLinkAsBuffer, checkVariablesPopulation} = require('./utils');

async function createPassTemplate(templateToCreateInfo) {
  checkVariablesPopulation([templateToCreateInfo]);
  return await buildTemplate(templateToCreateInfo);
}

async function buildTemplate(templateToCreateInfo) {
  const template = new Template(
    templateToCreateInfo.passType, 
    {
      formatVersion : 1,
      passTypeIdentifier: process.env.PASS_ID,
      teamIdentifier: process.env.TEAM_ID,
      serialNumber: templateToCreateInfo.serialNumber,
      webServiceURL : process.env.WEB_SERVICE_URL,
      
      authenticationToken : "vxwxd7J8AlNNFPS8k0a0FfUFtq0ewzFdc",

      organizationName : templateToCreateInfo.organizationName,
      description : templateToCreateInfo.description,
      logoText : templateToCreateInfo.logoText,
      foregroundColor : templateToCreateInfo.foregroundColor,
      backgroundColor : templateToCreateInfo.backgroundColor
    }
  );

  if (templateToCreateInfo.iconImageLink) {
    template.images.add("icon", await getImageFromLinkAsBuffer(templateToCreateInfo.iconImageLink));
  }
  if (templateToCreateInfo.logoImageLink) {
    template.images.add("logo", await getImageFromLinkAsBuffer(templateToCreateInfo.logoImageLink));
  }
  if (templateToCreateInfo.stripImageLink) {
    template.images.add("strip", await getImageFromLinkAsBuffer(templateToCreateInfo.stripImageLink));
  }

  template.barcodes = [{
    message: templateToCreateInfo.barcode?.message || 'Sample',  
    format: templateToCreateInfo.barcode?.format || 'PKBarcodeFormatQR',
    messageEncoding: templateToCreateInfo.barcode?.messageEncoding || 'iso-8859-1'}];
  
  await template.loadCertificate(
      "./certificates/com.example.passbook.pem",
      process.env.WALLET_PEM_PRIVATE_KEY_PASSPHRASE);

  return template;
}

async function createPass(templateInfo, passFieldsInfo) {
  checkVariablesPopulation([templateInfo, passFieldsInfo]);
  const template = await buildTemplate(templateInfo);
  const pass = await buildPassFields(template, passFieldsInfo);

  return pass;
}

async function buildPassFields(template, passInfo) {
  const pass = template.createPass();

  pass.serialNumber = passInfo.serialNumber;

  passInfo.primaryFields?.forEach(field => {
    pass.primaryFields.add({ 
      key: field.key, 
      label: field.label, 
      value: field.value
    });
  });

  passInfo.auxiliaryFields?.forEach(field => {
    pass.auxiliaryFields.add({ 
      key: field.key, 
      label: field.label, 
      value: field.value
    });
  });

  passInfo.secondaryFields?.forEach(field => {
    pass.secondaryFields.add({ 
      key: field.key, 
      label: field.label, 
      value: field.value
    });
  })

  return pass;
}

module.exports = {createPassTemplate, createPass}