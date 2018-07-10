'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Movie = mongoose.model('Movie'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Movie
 */
exports.create = function(req, res) {
  var movie = new Movie(req.body);
  movie.user = req.user;

  movie.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(movie);
    }
  });
};

/**
 * Show the current Movie
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var movie = req.movie ? req.movie.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  movie.isCurrentUserOwner = req.user && movie.user && movie.user._id.toString() === req.user._id.toString();

  res.jsonp(movie);
};

/**
 * Update a Movie
 */
exports.update = function(req, res) {
  var movie = req.movie;

  movie = _.extend(movie, req.body);

  movie.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(movie);
    }
  });
};

/**
 * Delete an Movie
 */
exports.delete = function(req, res) {
  var movie = req.movie;

  movie.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(movie);
    }
  });
};

/**
 * List of Movies
 */
exports.list = function(req, res) {
  Movie.find().sort('-created').populate('user', 'displayName').exec(function(err, movies) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(movies);
    }
  });
};

/**
 * Movie middleware
 */
exports.movieByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Movie is invalid'
    });
  }

  Movie.findById(id).populate('user', 'displayName').exec(function (err, movie) {
    if (err) {
      return next(err);
    } else if (!movie) {
      return res.status(404).send({
        message: 'No Movie with that identifier has been found'
      });
    }
    req.movie = movie;
    next();
  });
};
