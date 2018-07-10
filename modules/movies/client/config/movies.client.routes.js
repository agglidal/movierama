// jshint latedef:nofunc
(function() {
  'use strict';

  angular.module('movies').config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('movies', {
        abstract: true,
        url: '/movies',
        template: '<ui-view/>'
      })
      .state('movies.list', {
        url: '',
        templateUrl: 'modules/movies/views/list-movies.client.view.html',
        controller: 'MoviesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Movies List'
        }
      })
      .state('movies.create', {
        url: '/create',
        templateUrl: 'modules/movies/views/form-movie.client.view.html',
        controller: 'MoviesController',
        controllerAs: 'vm',
        resolve: {
          movieResolve: newMovie
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Movies Create'
        }
      })
      .state('movies.edit', {
        url: '/:movieId/edit',
        templateUrl: 'modules/movies/views/form-movie.client.view.html',
        controller: 'MoviesController',
        controllerAs: 'vm',
        resolve: {
          movieResolve: getMovie
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Movie {{ movieResolve.name }}'
        }
      })
      .state('movies.view', {
        url: '/:movieId',
        templateUrl: 'modules/movies/views/view-movie.client.view.html',
        controller: 'MoviesController',
        controllerAs: 'vm',
        resolve: {
          movieResolve: getMovie
        },
        data: {
          pageTitle: 'Movie {{ movieResolve.name }}'
        }
      });
  }

  getMovie.$inject = ['$stateParams', 'MoviesService'];

  function getMovie($stateParams, MoviesService) {
    return MoviesService.get({
      movieId: $stateParams.movieId
    }).$promise;
  }

  newMovie.$inject = ['MoviesService'];

  function newMovie(MoviesService) {
    return new MoviesService();
  }
})();
