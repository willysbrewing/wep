(function() {
    'use strict';

    angular.module('app', []);
    angular.module('app').controller('LPController', ['$timeout', LPController]);

    function LPController($timeout) {
        var vm = this;

        // Init
        var app = angular.element(document.getElementsByClassName('lp-app'));
        app.css('display', 'block');

        // Vars
        function swapColor() {
          var body = angular.element(document).find('body');
          var claim = angular.element(document.getElementsByClassName('claim')).find('h1');
          if (body.css('background-color') === 'rgb(0, 0, 0)') {
            body.css('background-color', '#fff');
            claim.css('color', '#000');
          } else {
            body.css('background-color', '#000');
            claim.css('color', '#fff');
          }
        }

    }

})();
