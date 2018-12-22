import * as request from 'request';
import {Promise} from 'bluebird';

export default function sendMessage(data){
  const opts ={
    url :"http://requestbin.fullcontact.com/1lylvjk1",
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

 
