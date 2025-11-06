import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // ****************** Import UUID library

const warrantySchema = new mongoose.Schema({
  guaranteeId: { type: String, default: uuidv4, unique: true }, // ****************** Add guaranteeId with a default UUID
  name: String, // Original file name
  data: Buffer, // Binary data of the PDF
  contentType: String, // MIME type of the file
});

const Warranty = mongoose.model('Warranty', warrantySchema);

export default Warranty;