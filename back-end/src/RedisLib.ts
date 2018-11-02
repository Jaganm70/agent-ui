import { createClient } from './RedisClient';


export async function redisLib(){
    return {
        get,
        save
    }
}

const get: any = function(collection, key){
    return new Promise(async (resolve, reject) => {
        const client = await createClient({}); 
        client.hget(collection, key, function(err, res){
             if(err) return reject(err)
               
             if(typeof(res) === "string")
                res = JSON.parse(res);

              return resolve(res)  
         })       
    });
}

const save: any = function(collection, key, value){
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