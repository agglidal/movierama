// Movies service used to communicate Movies REST endpoints
// jshint latedef:nofunc
(function() {
  'use strict';

  angular
    .module('movies')
    .factory('MoviesService', MoviesService)
    .factory('MoviesServiceSortDate', MoviesServiceSortDate)
    .factory('MoviesServiceSortLikes', MoviesServiceSortLikes)
    .factory('MoviesServiceSortHates', MoviesServiceSortHates)
    .factory('MoviesServicePerUser', MoviesServicePerUser)
    .factory('MoviesServiceAddOpinion', MoviesServiceAddOpinion)
    .factory(
      'MoviesServiceUpadteOpinionToUser',
      MoviesServiceUpadteOpinionToUser
    );

  MoviesService.$inject = ['$resource'];

  function MoviesService($resource) {
    return $resource(
      'api/movies/:movieId',
      {
        movieId: '@_id'
      },
      {
        update: {
          method: 'PUT'
        }
      }
    );
  }

  MoviesServiceSortDate.$inject = ['$resource'];

  function MoviesServiceSortDate($resource) {
    var service = {
      getMovieList: getMovieList
    };

    return service;

    function getMovieList(order) {
      return $resource('api/movies').query({ order: order });
    }
  }

  MoviesServiceSortLikes.$inject = ['$resource'];

  function MoviesServiceSortLikes($resource) {
    var service = {
      getMovieListLiked: getMovieListLiked
    };

    return service;

    function getMovieListLiked(order) {
      return $resource('api/movies/liked/' + order).query();
    }
  }

  MoviesServiceSortHates.$inject = ['$resource'];

  function MoviesServiceSortHates($resource) {
    var service = {
      getMovieListHated: getMovieListHated
    };

    return service;

    function getMovieListHated(order) {
      return $resource('api/movies/hated/' + order).query();
    }
  }

  MoviesServicePerUser.$inject = ['$resource'];

  function MoviesServicePerUser($resource) {
    var service = {
      getUserMovieList: getUserMovieList
    };

    return service;

    function getUserMovieList(userId) {
      return $resource('api/movies/byUser/:userId').query({
        userId: userId
      });
    }
  }

  MoviesServiceAddOpinion.$inject = ['$resource'];

  function MoviesServiceAddOpinion($resource) {
    var service = {
      updateMovieOpinion: updateMovieOpinion
    };

    return service;

    function updateMovieOpinion(movieId, opinion, userId) {
      return $resource(
        'api/movies/' + movieId + '/opinion/' + opinion + '/user/' + userId,
        {},
        { update: { method: 'PUT' } }
      ).update();
    }
  }

  MoviesServiceUpadteOpinionToUser.$inject = ['$resource'];

  function MoviesServiceUpadteOpinionToUser($resource) {
    var service = {
      updateMovieOpinionToUser: updateMovieOpinionToUser
    };

    return service;

    function updateMovieOpinionToUser(movieId, opinion, userId) {
      return $resource(
        'api/movies/' +
          movieId +
          '/opinion/' +
          opinion +
          '/user/' +
          userId +
          '/userUpdate',
        {},
        { update: { method: 'PUT' } }
      ).update();
    }
  }
})();
