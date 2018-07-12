// jshint latedef:nofunc
(function() {
  'use strict';

  angular
    .module('movies')
    .controller('MoviesListController', MoviesListController);

  MoviesListController.$inject = [
    'MoviesService',
    'MoviesServiceSortDate',
    'Authentication'
  ];
  // MoviesListController.$inject = ['MoviesService'];
  function MoviesListController(
    MoviesService,
    MoviesServiceSortDate,
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
  }
})();
