app.controller('searchCtrl',['$scope','$state','$stateParams',function($scope,$state,$stateParams){
	$scope.query=$stateParams.query;
	$scope.goback=function(event){
		$state.go('home',{query:$scope.query});
	}
}]);