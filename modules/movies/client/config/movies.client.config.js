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
        title: 'Create Movie',
        state: 'movies.create',
        // type: 'dropdown',
        roles: ['user']
      });

      // // Add the dropdown list item
      // Menus.addSubMenuItem('topbar', 'movies', {
      //   title: 'List Movies',
      //   state: 'movies.list'
      // });

      // // Add the dropdown create item
      // Menus.addSubMenuItem('topbar', 'movies', {
      //   title: 'Create Movie',
      //   state: 'movies.create',
      //   roles: ['user']
      // });
    }
  ]);
})();
