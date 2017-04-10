'use strict';

angular.module('myApp', [
  'oc.lazyLoad',
  'ui.router',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
])
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/view1');
})
;
