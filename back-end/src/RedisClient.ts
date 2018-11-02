import * as redis from 'redis';
export async function createClient(opts){
const client = redis.createClient(opts);
return client
}