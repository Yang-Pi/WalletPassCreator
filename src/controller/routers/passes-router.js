const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const {createNewPass, getPassBySerialNumber, updatePassFully} = require('../../services/passes.service')

var router = express.Router();

router.post(
  '/create',
  authMiddleware(),
  async function(req, res) {
    try {
      const serialNumber = await createNewPass(req?.body)
      res.json({
        serialNumber: serialNumber
      });
    } catch(err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
);

router.get(
  '/get/:serialNumber',
  async function(req, res) {
    try {
      const passAsBuffer = await getPassBySerialNumber(req.params.serialNumber);
      res.type('application/vnd.apple.pkpass');
      res.send(passAsBuffer);
    } catch(err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
);

router.put(
  '/update/',
  async function(req, res) {
    try {
      await updatePassFully(req.body);
      res.sendStatus(200);
    } 
    catch(err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
);

module.exports = {router};