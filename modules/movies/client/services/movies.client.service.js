// Movies service used to communicate Movies REST endpoints
// jshint latedef:nofunc
(function() {
  'use strict';

  angular.module('movies').factory('MoviesService', MoviesService);

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
})();
