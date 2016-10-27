app.controller('searchCtrl',['$scope','$state','$stateParams',function($scope,$state,$stateParams){
	$scope.query=$stateParams.query;
	$scope.goback=function(event){	
		if ($scope.query=='a') {
			$state.go('chart',{query:$scope.query});
		}else{
		$state.go('home', { query: $scope.query });			
		}
	}

}]);