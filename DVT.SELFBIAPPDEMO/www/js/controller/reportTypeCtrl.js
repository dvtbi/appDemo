app.controller('reportTypeCtrl',function($scope,$state,$stateParams,$http,$window,$timeout,$ionicLoading){
	$ionicLoading.show({
		content:'loading',
		showBackDrop:true,
		animation:'fade-in'
	});
	$scope.indicatorName=$stateParams.query?$stateParams.query:'';
	$scope.patternName=$stateParams.patternName?$stateParams.patternName:''; 
	$scope.goBack=function(){
		$window.history.go(-1);
	};

	var requestHttp=function(refresh){
	 	$http({
	      method:'get',
	      url:'http://dwt2.hpi.com.cn/selfbiapi/api/indicator/GetReportCateGoryList',
	      timeout:5000,
	      params:{
	      	reportName:$scope.patternName
	      }
	    })
	    .success(function(data){  
	      $scope.items=data; 
	    })
	    .error(function(){
	    	$scope.items=[];
	    })
	    .finally(function(){ 
	    	if (refresh) {
	    		$scope.$broadcast('scroll.refreshComplete');
	    	}else{
	    		$ionicLoading.hide();
	    	} 
	    });  
	}; 

	$scope.doRefresh=function(){
		/*$timeout(function(){
			 // Stop the ion-refresher from spinning
       		$scope.$broadcast('scroll.refreshComplete');
		},2000);*/
		requestHttp(1);
	}; 
	
	requestHttp(0);
});