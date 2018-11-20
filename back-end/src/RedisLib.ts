import { createClient } from './RedisClient';


export async function redisLib(){
    return {
        hget,
        hset
    }
}

const hget: any = function(collection, key){
    return new Promise(async (resolve, reject) => {
        const client = await createClient({}); 
        client.hget(collection, key, function(err, res){
             if(err) return reject(err)
               
             try {
                res = JSON.parse(res);
             } catch{
                res = res;
             }
                

              return resolve(res)  
         })       
    });
}

const hset: any = function(collection, key, value){
    return new Promise(async (resolve, reject) => {
        if(typeof(value) !== "string")
         value = JSON.stringify(value)
         const client = await createClient({});
         client.hset(collection, key, value, function(err, res){
            if(err) return reject(err)
              
             return resolve(res)  
        })       
   });
}