app.controller('searchCtrl',['$scope','$state','$stateParams','$http',function($scope,$state,$stateParams,$http){
	$scope.IndicatorName=$stateParams.query?$stateParams.query:'';
	$scope.items=(function(){
		var storage=window.localStorage,indicator=[];
		if (window.localStorage) { 
			if (!storage.indicator) {
			    $http({
		          method:'get',
		          url:'http://10.2.17.32:65510/api/indicator/getindicators',
		          timeout:10000,
		          params:{}
		        })
		        .success(function(data){
		          indicator=data;
		          storage.indicator=JSON.stringify(data);
		        });
		     }else{
		     	indicator=JSON.parse(storage.indicator);
		     }
		}  
		return indicator;
	})();
	$scope.goback=function(event){
		$state.go('home',{query:$scope.IndicatorName});
	};
	$scope.goProduce=function(i,n){
		$state.go('produce',{id:i,name:n});
	}
}]);