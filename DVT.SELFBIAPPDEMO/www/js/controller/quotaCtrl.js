app.controller('quotaCtrl',function($scope,$http,$state,$stateParams,$ionicLoading,$window){
	$ionicLoading.show({
		content:'Loading',
		animation:'fade-in',
		showBackDrop:true
	});
	console.log($stateParams.unit);
	$scope.indicatorName=$stateParams.name;
	$scope.indicatorId=$stateParams.id;
	$scope.orgId=$stateParams.orgId;
	$scope.orgType=$stateParams.orgType;
	$scope.orgName=$stateParams.orgName;
	$scope.date=$stateParams.date;
	$scope.dateType=$stateParams.dateType; 
	$scope.unit=$stateParams.unit;

	$scope.goBack=function(){
		$window.history.go(-1);
	}

	$http({
			method:'get',
			url:'http://dwt2.hpi.com.cn/selfbiapi/api/indicator/GetData_V2',
			//url:'http://10.2.17.32:65510/api/indicator/getdata',
			//indicatorId=指标id，organizationId=组织机构id，organizationType=组织机构类型编码，time=时间类型，timeType=时间类型编码
			params:{
				indicatorId:$scope.indicatorId,
				organizationId:$scope.orgId,
				organizationType:$scope.orgType,
				time:$scope.date.replace(/-/g,''),
				timeType:$scope.dateType
			},
			timeout:15000
	})
	.success(function(data){
		console.log(data);
		if (data && data.length && data.length>0) {
					$scope.indicatorNumber=isNaN(parseFloat(data[0]))?'暂无数据':parseFloat(data[0]).toFixed(2);
				}else if (data && isNaN(parseFloat(data))==false) {
					$scope.indicatorNumber=data;
				}else{
					$scope.indicatorNumber='暂无数据';
				} 
	})
	.error(function(){
		
	})
	.finally(function(){
		 $ionicLoading.hide();
	});

	/*$scope.quotaNumber={
		requestCount:0,
		options:{
			method:'get',
			url:'http://dwt2.hpi.com.cn/selfbiapi/api/indicator/GetIndicatorsTest',
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
					$scope.quotaNumber.options.params.organizationId=id.replace(/[a-z]/gi,'');
					$scope.quotaNumber.get();
				} 
				 $ionicLoading.hide();
			});
		}
	}
	 $ionicLoading.show({
	 	content:'Loading',
	 	animation:'fade-in',
	 	showBackDrop:true
	 });
	$scope.indicatorNumber='查询中...';
	$scope.quotaNumber.get(); */
});