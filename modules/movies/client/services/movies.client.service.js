// Movies service used to communicate Movies REST endpoints
// jshint latedef:nofunc
(function() {
  'use strict';

  angular
    .module('movies')
    .factory('MoviesService', MoviesService)
    .factory('MoviesServiceSortDate', MoviesServiceSortDate);

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
})();
