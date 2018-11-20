import * as mongoose from 'mongoose';
const VisitorSchema = new mongoose.Schema({
    _id : {type: String, required: true},
    name: String,
    email: String,
    city : String,
    country : String,
    createdDate : {type: Date, required: true, default: Date.now},
    updatedDate : {type: Date, required: true, default: Date.now},
    lastVisited: Date,
    visits : Number
  });
  
  const Visitor  = mongoose.model('visitor', VisitorSchema);

export default Visitor;
