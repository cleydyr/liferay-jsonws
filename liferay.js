'use strict';

const request = require('request')

class Liferay {
  constructor(config) {
    this.server = config.server;
    this.user = config.user;
    this.password = config.password;
  }

  service(path, obj) {
    return new Promise ((fulfill, reject) => {
      let url = `${this.server}/api/jsonws${path}`;
      request
        .post(
          url,
          {
            auth: {
              user: this.user,
              password: this.password
            },
            form: obj
          },
          (err, res, body) => {
            if (err) reject(err);
            else if (res && res.statusCode != 200) {
              reject(new Error(`Server responded with ${res.statusCode}: ${res.statusMessage}`));
            }
            else if (body) {
              fulfill(JSON.parse(body));
            }
            else {
              reject(new Error(`Undefined error.`))
            }
          }
      );
    });
  }
}

module.exports = Liferay;

