app.controller('reportListCtrl',function($scope,$state,$stateParams,$http,$window,$timeout){ 
	$scope.name=$stateParams.name?$stateParams.name:'';
	$scope.goBack=function(){
		$window.history.go(-1);
	};
	$scope.doRefresh=function(){
		/*$timeout(function(){
			 // Stop the ion-refresher from spinning
       		$scope.$broadcast('scroll.refreshComplete');
		},2000);*/
		requestHttp(1);
	}; 
	var requestHttp=function(refresh){
	    $http({
	      method:'get',
	      url:'http://dwt2.hpi.com.cn/selfbiapi/api/indicator/GetReportList',
	      timeout:10000,
	      params:{
	      	reportCategoryName:$scope.name
	      }
	    })
	    .success(function(data){
	    	console.log(data)
	      $scope.items=data; 
	    })
	    .error(function(){
	    	$scope.items=[];
	    })
	    .finally(function(){ 
	    	if (refresh) {
	    		$scope.$broadcast('scroll.refreshComplete');
	    	} 
	    });  
	}
});