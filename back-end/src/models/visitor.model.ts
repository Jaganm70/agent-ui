import * as mongoose from 'mongoose';
const VisitorSchema = new mongoose.Schema({
    _id : {type: String, required: true},
    name: { type: String, required: true },
    email: { type: String },
  });
  
  const Visitor  = mongoose.model('Visitor', VisitorSchema);

export default Visitor;
