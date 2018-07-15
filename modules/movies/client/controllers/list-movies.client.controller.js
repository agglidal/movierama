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
    MoviesServiceUpadteOpinionToUser,
    MoviesServiceUserHasOpinion,
    Authentication
  ) {
    var vm = this;

    vm.authentication = Authentication;
    vm.ascending = 1;
    vm.movies = MoviesService.query();
    vm.isLikedByCurrentUser = false;
    vm.isHatedByCurrentUser = false;
    // .$promise.then(function(response) {
    //   console.log(response);
    //   for (var i = 0; i < response.length; i++) {
    //     console.log(response[i]._id + ' maria');
    //     vm.hasOpinion(
    //       movie._id,
    //       'like',
    //       vm.authentication.user._id
    //     ).$promise.then(function(response1) {
    //       console.log(response1);
    //       if (response[i]._id === vm.authentication._id){
    //          console.log(response[i]._id + ' maria');
    //       }
    //       return response1;
    //     });
    //     if (matchedUserLikes._id === vm.authentication._id) {
    //       vm.isLikedByCurrentUser = true;
    //     }
    //     var matchedUserHates = vm.hasOpinion(
    //       vm.movie._Id,
    //       'hate',
    //       vm.authentication.user._id
    //     );
    //     if (matchedUserHates._id === vm.authentication._id) {
    //       vm.isHatedByCurrentUser = true;
    //     }
    //   }
    //   return response;
    // });

    vm.hasOpinion = function(movieId, opinion, userId) {
      MoviesServiceUserHasOpinion.getUserHasOpinion(
        movieId,
        opinion,
        userId
      ).$promise.then(function(response) {
        console.log(response);
        // if (response > 0) {
        //   vm.isLikedByCurrentUser = true;
        //   return true;
        // } else return vm.opinionResult;
        return response;
      });
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
    vm.addOpinion = function(movieId, opinion, userId) {
      MoviesServiceAddOpinion.updateMovieOpinion(
        movieId,
        opinion,
        userId
      ).$promise.then(function(response) {
        console.log(response);
        return response;
      });
    };
    vm.updateOpinionToUser = function(movieId, opinion, userId) {
      MoviesServiceUpadteOpinionToUser.updateMovieOpinionToUser(
        movieId,
        opinion,
        userId
      ).$promise.then(function(response) {
        console.log(response);
        return response;
      });
    };
  }
})();
