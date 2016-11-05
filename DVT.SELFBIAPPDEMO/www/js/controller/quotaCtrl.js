app.controller('quotaCtrl',function($scope,$http,$state,$stateParams,$ionicLoading,$window){
	$scope.indicatorName=$stateParams.name;
	$scope.indicatorId=$stateParams.id;
	//$scope.start=$stateParams.start;
	//$scope.end=$stateParams.end;
	//$scope.orgValue=$stateParams.orgValue;
	//$scope.orgText=$stateParams.orgText;
	$scope.goBack=function(){
		$window.history.go(-1);
	}
	$scope.quotaNumber={
		requestCount:0,
		options:{
			method:'get',
			url:'http://dwt2.hpi.com.cn/api/indicator/getdatatest',
			//url:'http://10.2.17.32:65510/api/indicator/getdata',
			params:{
				indicatorId:$scope.indicatorId,
				organizationId:$scope.orgValue,
				begintime:$scope.start,
				endtime:$scope.start
			},
			timeout:15000
		},
		get:function(){
			$http($scope.quotaNumber.options)
			.success(function(data){
				//
				//console.log(data);
				if (data && data.length && data.length>0) {
					$scope.indicatorNumber=isNaN(parseFloat(data[0]))?'暂无数据':parseFloat(data[0]).toFixed(2);
				}else if (data && isNaN(parseFloat(data))==false) {
					$scope.indicatorNumber=data;
				}else{
					$scope.indicatorNumber='暂无数据';
				}
				 $ionicLoading.hide();
			})
			.error(function(res){ 
				//console.log(res);
				if ($scope.quotaNumber.requestCount==0) {
					$scope.quotaNumber.requestCount++;
					var id=$scope.quotaNumber.options.params.organizationId;
					$scope.quotaNumber.options.params.organizationId=id.replace(/[a-z]*/gi,'');
					$scope.quotaNumber.get();
				} 
				 $ionicLoading.hide();
			});
		}
	}
	// $ionicLoading.show({
	 //	content:'Loading',
	 //	animation:'fade-in',
	 //	showBackDrop:true
	// });
	//$scope.indicatorNumber='查询中...';
	//$scope.quotaNumber.get(); 
});