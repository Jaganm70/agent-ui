import * as mongoose from 'mongoose';
import {Schema} from 'mongoose'
const SkilSchema = new mongoose.Schema({
    _id : {type: String, required: true},
    name: String,
    desc: String,
    createdDate : {type: Date, required: true, default: Date.now},
    updatedDate : {type: Date, required: true, default: Date.now},
    createdBy : { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy : { type: Schema.Types.ObjectId, ref: 'User' },
    agents :[{ type: Schema.Types.ObjectId, ref: 'User' }]
});
  
const Skil  = mongoose.model('Skil', SkilSchema);

export default Skil;
