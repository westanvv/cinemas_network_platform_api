const Promise = require("bluebird");
const request = require("request");

module.exports = {
  readUrl,
  stripTags,
  matchAll,
};

function readUrl(url) {
  if (url) {
    return new Promise(function (resolve, reject) {
      request({
        uri: url,
      }, function(error, response, body) {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    });
  } else {
    return Promise.reject('Empty URL');
  }
}

function stripTags(text) {
  return text.replace(/<[^>]+>/g, '');
}

function matchAll(regex, text) {
  if (regex.constructor !== RegExp) {
    throw new Error('No RegExp');
  }

  let res = [];
  let match = null;

  if (regex.global) {
    while (match = regex.exec(text)) {
      res.push(match[1]);
    }
  } else {
    if (match = regex.exec(text)) {
      res.push(match[1]);
    }
  }

  return res;
}
