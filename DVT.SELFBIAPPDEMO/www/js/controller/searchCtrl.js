app.controller('searchCtrl',function($scope,$state,$stateParams,$http,$ionicViewSwitcher){
	$scope.IndicatorName=$stateParams.query?$stateParams.query:'';
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
	})();  
	$scope.goback=function(event){
		$ionicViewSwitcher.nextDirection('back');
		$state.go('home',{query:$scope.IndicatorName});
	};
	$scope.goProduce=function(i,n){
		$state.go('produce',{id:i,name:n});
	}
});