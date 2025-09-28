const mongoose = require('mongoose');

const ContainerSchema = new mongoose.Schema({
  containerNumber: { type: String, required: true },
  productName: { type: String, required: true },
  color: { type: String },
  size: { type: String },
  pieces: { type: Number },
  bundles: { type: Number },
  date: { type: Date, required: true },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Container', ContainerSchema);
