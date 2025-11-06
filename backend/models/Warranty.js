import mongoose from 'mongoose';

const warrantySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  issuingDate: { type: Date, required: true },
  scadentDate: { type: Date, required: true },
  fiscalCode: { type: Number, required: false },
  companyName: { type: String, required: false },
  totalAmount: { type: Number, required: true },
  guaranteeId: { type: Number, required: true, unique: true },
  productName: { type: String, required: true }
});

// Virtual field for expirationDate
warrantySchema.virtual('expirationDate').get(function () {
  const currentDate = new Date();
  const scadentDate = this.scadentDate;
  const timeDifference = scadentDate - currentDate; // Difference in milliseconds
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days
  return daysDifference;
});

// Ensure virtual fields are included in toJSON output
warrantySchema.set('toJSON', { virtuals: true });

export default mongoose.model('Warranty', warrantySchema);