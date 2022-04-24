const axios = require('axios');

async function getImageFromLinkAsBuffer(imageLink) {
  const response = await axios.get(
    imageLink, {responseType: 'arraybuffer'}
  );
  return Buffer.from(response?.data, "utf-8");
}

function checkVariablesPopulation(data = []) {
  data.forEach(item => {
    if (!item) {
      throw 'No data';
    }
  });
}

module.exports = {getImageFromLinkAsBuffer, checkVariablesPopulation}