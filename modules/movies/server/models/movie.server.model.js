'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Movie Schema
 */
var MovieSchema = new Schema({
  title: {
    type: String,
    default: '',
    required: 'Please fill Movie title',
    trim: true
  },
  body: {
    type: String,
    default: '',
    required: 'Please fill Movie body',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  }
  // likes: {
  //   type: number,
  //   default: 0
  // },
  // hates: {
  //   type: number,
  //   default: 0
  // }
});

mongoose.model('Movie', MovieSchema);
