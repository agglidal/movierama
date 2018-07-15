// jshint latedef:nofunc
'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose').set('debug', true),
  Movie = mongoose.model('Movie'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve(
    './modules/core/server/controllers/errors.server.controller'
  )),
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
  movie.isCurrentUserOwner =
    req.user &&
    movie.user &&
    movie.user._id.toString() === req.user._id.toString();

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
  var order = req.query.order;
  // console.log('order');
  // console.log(req.query);
  if (!order) {
    order = 1;
  }

  Movie.find()
    .sort({ created: order })
    .populate('user', 'displayName')
    .exec(function(err, movies) {
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
 * List of Movies per User
 */
exports.listUser = function(req, res) {
  var userId = req.params.userId;
  Movie.find({ user: userId })
    // .sort({ created: order })
    .populate({
      path: 'user',
      match: { _id: userId }
    })
    .populate({
      path: 'displayName'
    })
    .exec(function(err, movies) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp(movies);
      }
    });
};

exports.sortLikes = function(req, res) {
  var order = req.params.order;
  console.log('like order');
  console.log(req.params.order);
  if (!order) {
    order = 1;
  }
  Movie.find()
    .sort({ likes: order })
    .populate('user', 'displayName')
    .exec(function(err, movies) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp(movies);
      }
    });
};

exports.sortHates = function(req, res) {
  var order = req.params.order;
  console.log('hate order');
  console.log(req.params.order);
  if (!order) {
    order = 1;
  }
  Movie.find()
    .sort({ hates: order })
    .populate('user', 'displayName')
    .exec(function(err, movies) {
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
 * Add like or hate to a Movie
 */
exports.addOpinion = function(req, res) {
  var movieId = req.params.movieId;
  var userId = req.params.userId;
  var opinion = req.params.opinion;
  var incProperty;
  var moviesOpinionProp;
  var userOpinionProp;

  console.log(' userId');
  console.log(userId);

  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return res.status(400).send({
      message: 'Movie is invalid'
    });
  }
  if (opinion === 'like') {
    incProperty = { $inc: { likes: 1 } };
    moviesOpinionProp = 'movies.likes';
  } else {
    incProperty = { $inc: { hates: 1 } };
    moviesOpinionProp = 'movies.hates';
  }
  Movie.findByIdAndUpdate(movieId, incProperty, { new: true })
    //.isCurrentUserOwner
    .populate('user', 'displayName')
    .exec(function(err, movie) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp(moviesOpinionProp);
      }
    });
};

/**
 * Upated opinion to user like/hate lists
 */
exports.updateOpinionToUser = function(req, res) {
  var movieId = req.params.movieId;
  var authorizedUserId = req.params.userId;
  var opinion = req.params.opinion;
  var userOpinionProps;
  console.log(' updateOpinionToUser');
  console.log(opinion);

  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return res.status(400).send({
      message: 'Movie is invalid'
    });
  }
  if (opinion === 'like') {
    userOpinionProps = {
      $addToSet: { likes: movieId },
      $pull: { hates: movieId }
    };
  } else if (opinion === 'hate') {
    userOpinionProps = {
      $addToSet: { hates: movieId },
      $pull: { likes: movieId }
    };
  }

  User.findByIdAndUpdate(authorizedUserId, userOpinionProps, { new: true })
    .populate('user')
    .exec(function(err, user) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp(user);
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

  Movie.findById(id)
    .populate('user', 'displayName')
    .exec(function(err, movie) {
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
