app.controller('reportListCtrl',function($scope,$state,$stateParams,$http,$window,$timeout){
	$scope.type=$stateParams.type?$stateParams.type:'';
	$scope.name=$stateParams.name?$stateParams.name:'';
	$scope.goBack=function(){
		$window.history.go(-1);
	};
	$scope.doRefresh=function(){
		$timeout(function(){
			 // Stop the ion-refresher from spinning
       		$scope.$broadcast('scroll.refreshComplete');
		},2000);
	};
	(function(){
		var storage=window.localStorage;
		if (window.localStorage) { 
			if (!storage.indicator) {
			    $http({
		          method:'get',
		          url:'http://10.2.17.32:65510/api/indicator/getindicators',
		          timeout:1000,
		          params:{}
		        })
		        .success(function(data){
		          $scope.items=data;
		          storage.indicator=JSON.stringify(data);
		        })
		        .error(function(){
		        	$scope.items=[];
		        });
		     }else{
		     	$scope.items=JSON.parse(storage.indicator);
		     }
		}   
	});
});