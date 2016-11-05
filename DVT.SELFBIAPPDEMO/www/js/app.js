// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires' 
var app=angular.module('selfbiappdemo', ['ionic']);
 
// route config
app.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
  $urlRouterProvider.otherwise('/home/');

  $stateProvider
  .state('home',{
    cache:false,
    url:'/home/:query',
    templateUrl:'template/home.html',
    controller:'homeCtrl'
  })
  .state('search',{
    cache:false,
    url:'/search/:query',
    templateUrl:'template/search.html',
    controller:'searchCtrl'
  })
   .state('produce',{
    cache:false,
    url:'/produce/:id/:name/:start/:value/:text', 
    templateUrl:'template/produce.html',
    controller:'produceCtrl'
  })
  .state('quota',{
    cache:false,
    url:'/quota/:id/:name/:start/:orgValue/:orgText',
    templateUrl:'template/quota.html',
    controller:'quotaCtrl'
  })
   .state('tendency',{
    cache:false,
    url:'/tendency/:query',
    templateUrl:'template/tendency.html',
    controller:'tendencyCtrl'
  })
   .state('reportType',{
      cache:false,
      url:'/reportType/:query/:patternName',
      templateUrl:'template/reportType.html',
      controller:'reportTypeCtrl'
    })
   .state('reportList',{
      cache:false,
      url:'/reportList/:type/:name',
      templateUrl:'template/reportList.html',
      controller:'reportListCtrl'
    })
  .state('dynamicProduce',{
      cache:false,
      url:'/dynamicProduce/:id/:name/:unit',
      templateUrl:'template/dynamicProduce.html',
      controller:'dynamicProduceCtrl'
    });
  
  $ionicConfigProvider.views.maxCache(0);
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

