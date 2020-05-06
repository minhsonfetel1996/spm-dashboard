const mongoose = require('mongoose');
const audit = require('./common/audit');

const GallerySchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId },
  title: {
    type: String, required: true, trim: true,
  },
  description: {
    type: String, required: true, trim: true,
  },
  category: { type: String, enum: ['nature', 'food-drink', 'films'] },
  images: [],
  ...audit
});

GallerySchema.pre(["updateOne", "findOneAndUpdate"], (next) => {
  this.updatedTs = Date.now();
  next();
});

module.exports = mongoose.model('Galleries', GallerySchema);
