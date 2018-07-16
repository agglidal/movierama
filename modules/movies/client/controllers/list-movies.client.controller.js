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
    'MoviesServiceUpadteOpinionToUser',
    'MoviesServiceUserHasOpinion',
    'Authentication',
    '$scope'
  ];
  // MoviesListController.$inject = ['MoviesService'];
  function MoviesListController(
    MoviesService,
    MoviesServiceSortDate,
    MoviesServiceSortLikes,
    MoviesServiceSortHates,
    MoviesServicePerUser,
    MoviesServiceAddOpinion,
    MoviesServiceUpadteOpinionToUser,
    MoviesServiceUserHasOpinion,
    Authentication,
    $scope
  ) {
    var vm = this;

    vm.authentication = Authentication;
    vm.ascending = 1;

    $scope.init = function() {
      MoviesService.query().$promise.then(function(response) {
        if (vm.authentication.user) {
          for (var i = 0; i < response.length; i++) {
            response[i].isLikedByCurrentUser = false;
            response[i].isHatedByCurrentUser = false;
            if (vm.authentication.user.likes.includes(response[i]._id)) {
              response[i].isLikedByCurrentUser = true;
            } else if (vm.authentication.user.hates.includes(response[i]._id)) {
              response[i].isHatedByCurrentUser = true;
            }
          }
        }
        vm.movies = response;
      });
    };
    $scope.init();

    vm.hasOpinion = function(movieId, opinion, userId) {
      MoviesServiceUserHasOpinion.getUserHasOpinion(movieId, opinion, userId);
    };

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
    vm.addOpinion = function(movieId, opinion, userId, hasOpinion) {
      MoviesServiceAddOpinion.updateMovieOpinion(
        movieId,
        opinion,
        userId,
        hasOpinion
      ).$promise.then(function(response) {
        return response;
      });
    };
    vm.updateOpinionToUser = function(movieId, opinion, userId) {
      MoviesServiceUpadteOpinionToUser.updateMovieOpinionToUser(
        movieId,
        opinion,
        userId
      ).$promise.then(function(response) {
        return response;
      });
    };
  }
})();
