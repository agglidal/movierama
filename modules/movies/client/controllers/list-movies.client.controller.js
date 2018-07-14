// jshint latedef:nofunc
(function() {
  'use strict';

  angular
    .module('movies')
    .controller('MoviesListController', MoviesListController);

  MoviesListController.$inject = [
    'MoviesService',
    'MoviesServiceSortDate',
    'MoviesServiceSortLikes',
    'MoviesServiceSortHates',
    'MoviesServicePerUser',
    'MoviesServiceAddOpinion',
    'Authentication'
  ];
  // MoviesListController.$inject = ['MoviesService'];
  function MoviesListController(
    MoviesService,
    MoviesServiceSortDate,
    MoviesServiceSortLikes,
    MoviesServiceSortHates,
    MoviesServicePerUser,
    MoviesServiceAddOpinion,
    Authentication
  ) {
    var vm = this;

    vm.authentication = Authentication;
    vm.ascending = 1;
    vm.movies = MoviesService.query();
    vm.sortDate = function() {
      vm.ascending = -vm.ascending;
      vm.movies = MoviesServiceSortDate.getMovieList(vm.ascending);
    };
    vm.sortLikes = function() {
      vm.ascending = -vm.ascending;
      vm.movies = MoviesServiceSortLikes.getMovieListLiked(vm.ascending);
    };
    vm.sortHates = function() {
      vm.ascending = -vm.ascending;
      vm.movies = MoviesServiceSortHates.getMovieListHated(vm.ascending);
    };
    vm.listUser = function(userId) {
      vm.movies = MoviesServicePerUser.getUserMovieList(userId);
    };
    vm.addOpinion = function(movieId, opinion) {
      MoviesServiceAddOpinion.updateMovieOpinion(
        movieId,
        opinion
      ).$promise.then(function(response) {
        console.log(response);
        return response;
      });
    };
  }
})();
