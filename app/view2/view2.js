//'use strict';
//
//var callbackGoogleApi = function() {};
//
//angular.module('myApp.view2', ['ui.router'])
//.config(function($stateProvider, $urlRouterProvider){
//  $stateProvider.state("view2", {
//    url: "/view2",
//    templateUrl: "view2/view2.html",
//    controller: "View2Ctrl",
//    resolve: {
//    }
//  })
//})
//.controller('View2Ctrl', ['$scope', '$ocLazyLoad', '$compile', function($scope, $ocLazyLoad, $compile) {
//  callbackGoogleApi = function() {
//    $ocLazyLoad.load([
//    {
//      files: ['bower_components/lodash/dist/lodash.js']
//    }, {
//      name: 'uiGmapgoogle-maps',
//      files: ['bower_components/angular-google-maps/dist/angular-google-maps.js']
//    }
//    ]).then(function(success) {
//      $scope.map = { center: { latitude: 45, longitude: -73}, zoom: 8};
//      var el = $compile('<ui-gmap-google-map center="map.center" zoom="map.zoom"></ui-gmap-google-map>')($scope);
//      angular.element(document.getElementById('googlemap')).append(el);
//    }, function(error) {
//    });
//  };
//
//  var script = document.createElement('script');
//  script.type = 'text/javascript';
//  script.src = 'http://maps.googleapis.com/maps/api/js?sensor=false&callback=callbackGoogleApi';
//  document.body.appendChild(script);
//}]);

'use strict';

var callbackGoogleApi = function() {};

angular.module('myApp.view2', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider.state("view2", {
            url: "/view2",
            templateUrl: "view2/view2.html",
            controller: "View2Ctrl",
            resolve: {
            }
        })
    })
    .controller('View2Ctrl', ['$scope', '$timeout', '$ocLazyLoad', '$compile', function($scope, $timeout, $ocLazyLoad, $compile) {

        var loadBingMapScript = function() {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0';
            document.body.appendChild(script);
        };

        var _isLoading = false;
        var isLoaded = function() {
            return typeof(Microsoft) != 'undefined'
                && typeof(Microsoft.Maps) != 'undefined'
                && typeof(Microsoft.Maps.Map) != 'undefined';
//            return angular.isDefined(window.Microsoft) && angular.isDefined(window.Microsoft.Maps) && angular.isDefined(window.Microsoft.Maps.Map) != 'undefined';
        };

        var __LoadCallback = function() {
            if(isLoaded()){
                $scope._callback();
                _isLoading = false;
            }else{
                $timeout(__LoadCallback, 1);
            }
        };

        var LoadMapControl = function(callback){
            var loaded = isLoaded();
            if(!_isLoading && !loaded){
                $scope._callback = callback;
                _isLoading = true;

                loadBingMapScript();
                $timeout(__LoadCallback, 1);
            }else if(loaded){
                _callback();
            }
        };

        var IsLoaded = function(){
            return isLoaded();
        };

        var GetMap = function() {
            var mapOptions = {credentials: "Your Bing Maps Key", mapTypeId: Microsoft.Maps.MapTypeId.road};
            $scope.map = new Microsoft.Maps.Map(document.getElementById("bingmap"), mapOptions);
            var center = $scope.map.getCenter();
            var pin = new Microsoft.Maps.Pushpin(center, {text: '1'});
            $scope.map.entities.push(pin);
        };

        var LoadBingMap = function() {
            if(!IsLoaded())
            {
                LoadMapControl(GetMap);
            }else if($scope.map == null){
                GetMap();
            }
        };

        LoadBingMap();
    }]);