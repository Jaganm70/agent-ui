import * as request from 'request';
import {Promise} from 'bluebird';
import * as config from 'config';
const WEBHOOK_URL: string = config.get('WEBHOOK_URL');

export default function sendMessage(data){
  const opts ={
    url : WEBHOOK_URL,
    method: 'POST',
    headers: {
        'Content-Type':'application/json'
    },
    body: data,
    json: true,

}
  return new Promise((resolve, reject)=>{
    request(opts, (err, response, body)=>{
      if(err) {
        console.log("Response....", err);
        reject(err)
      }

      resolve(body);
    })
  })
}

 
