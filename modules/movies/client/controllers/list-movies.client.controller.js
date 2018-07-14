// jshint latedef:nofunc
(function() {
  'use strict';

  angular
    .module('movies')
    .controller('MoviesListController', MoviesListController);

  MoviesListController.$inject = [
    'MoviesService',
    'MoviesServiceSortDate',
    'MoviesServicePerUser',
    'Authentication'
  ];
  // MoviesListController.$inject = ['MoviesService'];
  function MoviesListController(
    MoviesService,
    MoviesServiceSortDate,
    MoviesServicePerUser,
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
    vm.listUser = function(userId) {
      vm.movies = MoviesServicePerUser.getUserMovieList(userId);
    };
  }
})();
