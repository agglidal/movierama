(function() {
  'use strict';

  // angular.module('movies').run(menuConfig);

  // menuConfig.$inject = ['Menus'];
  angular.module('movies').run([
    'Menus',
    function(Menus) {
      // Set top bar menu items
      Menus.addMenuItem('topbar', {
        title: 'Movies List',
        state: 'movies.list',
        // type: 'dropdown',
        roles: ['*']
      });

      Menus.addMenuItem('topbar', {
        title: 'New Movie',
        state: 'movies.create',
        // type: 'dropdown',
        roles: ['user']
      });
    }
  ]);
})();
