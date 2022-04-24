require('dotenv').config()
const express = require('express');

const appleDeviceRouter = require('./routers/passkit-web-service/devices-router');
const applePassesRouter = require('./routers/passkit-web-service/passes-router');
const templatesRouter = require('./routers/templates-router');
const passesRouter = require('./routers/passes-router');

function setup() {
  const app = express();
  app.use(express.json());
  
  app.use('/v1/devices/', appleDeviceRouter.router);
  app.use('/v1/passes/', applePassesRouter.router);

  app.use('/templates/', templatesRouter.router);
  app.use('/passes/', passesRouter.router);

  app.listen(process.env.PORT);
}

module.exports = {setup};



