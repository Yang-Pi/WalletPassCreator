const express = require('express');
var router = express.Router();

/* TODO */

/* Registering a Device to Receive Push Notifications for a Pass */
router.post(
  '/:deviceLibraryIdentifier/registrations/:passTypeIdentifier/:serialNumber', 
  function(req, res) {
    const deviceLibraryIdentifier = req.params?.deviceLibraryIdentifier;
    const serialNumber = req.params?.serialNumber;
    const pushToken = req.body?.pushToken;

    const infoToSave = {
      deviceLibraryIdentifier: deviceLibraryIdentifier,
      serialNumber: serialNumber,
      pushToken: pushToken
    };

    console.log('ADD');

    res.statusCode = 200;
    res.send();
  }
);

/* Unregistering a Device */
router.delete(
  '/:deviceLibraryIdentifier/registrations/:passTypeIdentifier/:serialNumber', 
  function(req, res) {
    const deviceLibraryIdentifier = req.params?.deviceLibraryIdentifier;
    const serialNumber = req.params?.serialNumber;

    const infoToSave = {
      deviceLibraryIdentifier: deviceLibraryIdentifier,
      serialNumber: serialNumber
    };

    console.log('DELETE');

    res.statusCode = 200;
    res.status = 'OK';
    res.send();
  }
);

/* Getting the Serial Numbers for Passes Associated with a Device */
router.get(
  '/:deviceLibraryIdentifier/registrations/:passTypeIdentifier',
  function(req, res) {
    const passesUpdatedSince = req.query.passesUpdatedSince;
    console.log('GET ALL SERIAL NUMBERS FOR DEVICE');
    
    console.log(passesUpdatedSince);
    
    /*
    res.json({
      lastUpdated: passesUpdatedSince,
      serialNumbers: ['aa2']
    })
    */
    res.sendStatus(204);
  }
);

module.exports = {router};