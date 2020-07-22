const auth = require('basic-auth');
const compare = require('tsscmp');

const base64Encode = data => {
  const buff = Buffer.from(data);
  return buff.toString('base64');
};

const validate = (name, pass) => {
  let valid = true;
  valid = compare(name, process.env.AUTH_USER) && valid;
  valid = compare(pass, process.env.AUTH_PASSWORD) && valid;
  return valid;
};

const basicauth = (req, res, next) => {
  const credentials = auth(req);
  if (!credentials || !validate(credentials.name, credentials.pass)) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="example"');
    res.end('Access denied');
  } else {
    next();
  }
};

module.exports = { base64Encode, basicauth };
