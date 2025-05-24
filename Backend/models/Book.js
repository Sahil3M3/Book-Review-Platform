const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true,
    minlength: [2, 'Title must be at least 2 characters long']
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Book description is required'],
    minlength: [10, 'Description must be at least 10 characters']
  },
  genre: {
    type: [String],
    validate: {
      validator: function (arr) {
        return arr.length > 0;
      },
      message: 'At least one genre is required'
    }
  },
  publishedDate: {
    type: Date
  },
  coverImage: {
    type: String,
    validate: {
      validator: function (url) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/.test(url);
      },
      message: 'Invalid image URL'
    }
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  }
});

module.exports = mongoose.model('Book', bookSchema);
