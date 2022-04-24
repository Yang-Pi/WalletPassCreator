const express = require('express');
const {getPassBySerialNumber} = require('../../../services/passes.service')

var router = express.Router();

/* Getting the Latest Version of a Pass */
router.get(
  '/:passTypeIdentifier/:serialNumber',
  async function(req, res) {
    try {
      console.log(req.params?.serialNumber);
      const passAsBuffer = await getPassBySerialNumber(req.params?.serialNumber);
      res.type('application/vnd.apple.pkpass');
      res.send(passAsBuffer);
    } catch(err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
);

module.exports = {router};