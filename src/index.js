const controller = require('./controller/controller');
const database = require('./storage/storage-sources/storage-source');

controller.setup();
database.setup();
