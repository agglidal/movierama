// jshint latedef:nofunc
(function() {
  'use strict';

  // Movies controller
  angular.module('movies').controller('MoviesController', MoviesController);

  MoviesController.$inject = [
    '$scope',
    '$state',
    '$window',
    'Authentication',
    'movieResolve'
  ];

  function MoviesController($scope, $state, $window, Authentication, movie) {
    var vm = this;

    vm.authentication = Authentication;
    vm.movie = movie;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Movie
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.movie.$remove($state.go('movies.list'));
      }
    }

    // Save Movie
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.movieForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.movie._id) {
        vm.movie.$update(successCallback, errorCallback);
      } else {
        vm.movie.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('movies.view', {
          movieId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
