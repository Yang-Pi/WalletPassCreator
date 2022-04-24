const express = require('express');

const authMiddleware = require('../middleware/auth-middleware');
const {createNewTemplate, getTemplateBySerialNumber, updateTemplateFully} = require('../../services/templates.service');

var router = express.Router();

router.post(
  '/create',
  authMiddleware(),
  async function(req, res) {
    try {
      const serialNumber = await createNewTemplate(req.body);
      res.json({
        serialNumber: serialNumber
      });
    } 
    catch(err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
);

router.get(
  '/get/:serialNumber',
  async function(req, res) {
    try {
      const passAsBuffer = await getTemplateBySerialNumber(req.params.serialNumber);
      res.type('application/vnd.apple.pkpass');
      res.send(passAsBuffer);
    } 
    catch(err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
);

router.put(
  '/update/',
  async function(req, res) {
    try {
      await updateTemplateFully(req.body);
      res.sendStatus(200);
    } 
    catch(err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
);

module.exports = {router};