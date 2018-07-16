'use strict';

/**
 * Module dependencies
 */
var moviesPolicy = require('../policies/movies.server.policy'),
  movies = require('../controllers/movies.server.controller');

module.exports = function(app) {
  // Movies Routes
  app
    .route('/api/movies')
    .all(moviesPolicy.isAllowed)
    .get(movies.list)
    .post(movies.create);

  app
    .route('/api/movies/:movieId')
    .all(moviesPolicy.isAllowed)
    .get(movies.read)
    .put(movies.update)
    .delete(movies.delete);
  // Binding the Movie to middleware
  app.param('movieId', movies.movieByID);

  app
    .route('/api/movies/byUser/:userId')
    .all(moviesPolicy.isAllowed)
    .get(movies.listUser);

  app
    .route(
      '/api/movies/:movieId/opinion/:opinion/user/:userId/userUpdate/hasOpinion/:hasOpinion'
    )
    // .all(moviesPolicy.isAllowed)
    .get(movies.read)
    .put(movies.addOpinion);

  app
    .route('/api/movies/:movieId/opinion/:opinion/user/:userId/userUpdate')
    // .all(moviesPolicy.isAllowed)
    .get(movies.read)
    .put(movies.updateOpinionToUser);

  app
    .route(
      '/api/movies/:movieId/opinion/:opinion/user/:userId/userUpdate/hasOpinion'
    )
    // .all(moviesPolicy.isAllowed)
    // .get(movies.read)
    .get(movies.hasOpinion);

  app
    .route('/api/movies/hated/:order')
    // .all(moviesPolicy.isAllowed)
    .get(movies.sortHates);

  app
    .route('/api/movies/liked/:order')
    // .all(moviesPolicy.isAllowed)
    .get(movies.sortLikes);
};
