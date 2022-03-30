require('dotenv').config()
const { Template } = require("@walletpass/pass-js");
const fs = require('fs');

async function main() {
    const template = await buildPassTemplate();
    const pass = await configurePass(template);
    await writePassToFile(pass, 'test-cinema.pkpass');
}

async function buildPassTemplate() {
  const template = await Template.load(
      './pass-template.pass');
  template.teamIdentifier = process.env.WALLET_TEAM_IDENTIFIER;
  
  await template.loadCertificate(
      "./certificates/pass.com.pass-builder.pem",
      process.env.WALLET_PEM_PRIVATE_KEY_PASSPHRASE
  );

  return template;
}

async function configurePass(template) {
  const pass = template.createPass();
  pass.primaryFields.add({ 
    key: "event", 
    label: "Film", 
    value: 'TEST' 
  });
  pass.barcodes = [{
    message: "1234567890",  
    format: 'PKBarcodeFormatQR',
    messageEncoding: 'iso-8859-1'
  }];

  return pass;
}

async function writePassToFile(pass, filename) {
  await fs.writeFile(filename, await pass.asBuffer(), () => {})
}

main();