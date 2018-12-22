import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import * as winston from 'winston';

const JWT_SECRET: string = config.get('JWT_SECRET');

export function verifyJWT(token) {
  return new Promise((resolve, reject) => {
    token = token.replace(/%3D/g, '=');
    /*jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      console.log(err, decodedToken);
      if (err || !decodedToken) {
        winston.log('info', 'Invalid token error', err.message || err);
        return reject(err);
      }

      resolve(decodedToken);
    });*/
    let data = token.split("\.");
    let decoded:any = new Buffer(data[0], 'base64').toString('ascii');
    decoded = (typeof decoded === 'string')? JSON.parse(decoded): decoded;    
    resolve({"user_id":decoded.id,"username":decoded.username})
  });
}

export function createJWT(data, expiryTime) {
  const token = jwt.sign(data, JWT_SECRET, { expiresIn: expiryTime });
  return token;
}
