app.controller('homeCtrl',['$scope','$state','$stateParams','$http','$timeout','$ionicPopup',
	function($scope,$state,$stateParams,$http,$timeout,$ionicPopup){
	// 搜索框是否获取焦点（true），用于判断搜索box隐藏与显示
	$scope.IsSearchFocus=false;
	$scope.IndicatorName=$stateParams.query?$stateParams.query:'';

	(function(){
		var storage=window.localStorage;
		if (window.localStorage) { 
			if (!storage.indicator) {
			    $http({
		          method:'get',
		          url:'http://10.2.17.32:65510/api/indicator/getindicators',
		          timeout:5000,
		          params:{}
		        })
		        .success(function(data){
		        	if (data) {
		        		data.push({IndicatorId:0,IndicatorName:'发电量趋势图'});
		        		data.push({IndicatorId:-1,IndicatorName:'发电量走势图'});
		        		data.push({IndicatorId:-2,IndicatorName:'发电量曲线图'});
		        		data.push({IndicatorId:-3,IndicatorName:'发电量折线图'});
		        		$scope.items=data;
		          		storage.indicator=JSON.stringify(data);
		        	}else{
		        		$scope.items=[];
		        	} 
		        })
		        .error(function(){
		        	$scope.items=[];
		        });
		     }else{
		     	$scope.items=JSON.parse(storage.indicator);
		     }
		}   
	})();   

	$scope.search=function(event){  

		if ($scope.IndicatorName!=undefined && $scope.IndicatorName!=''){
			$scope.IsShowQueryList=true; 
		}else{
			$scope.IsShowQueryList=false;
		}  

		var keycode=window.event?event.keyCode:event.which;
		if (keycode==13) {
			$state.go('search',{query:$scope.IndicatorName});
		}

	};
	$scope.goProduce=function(i,n){ 
		console.log(i);
		if (i<=0) {
			/*$ionicPopup.alert({ 
			  title: '友情提示', // String. 弹窗的标题。
			  subTitle: '功能暂未开放，请选择其他关键词', // String (可选)。弹窗的子标题。
			  template: '', // String (可选)。放在弹窗body内的html模板。
			  templateUrl: '', // String (可选)。 放在弹窗body内的html模板的URL。
			  okText: '确定', // String (默认: 'OK')。OK按钮的文字。
			  okType: 'button-positive', // String (默认: 'button-positive')。OK按钮的类型。
			});*/
			//跳转到趋势图页面
			$state.go('tendency',{query:n});
		}else{
			$state.go('produce',{id:i,name:n});
		}
	};
	$scope.searchFocus=function(){
		$scope.IsSearchFocus=true;
	};
	$scope.searchBlur=function(){
		$scope.IsSearchFocus=false;
	}
	angular.element(document).ready(function(){
		var initialSearchBox=function(){
			var doc=document,
				lblSearch=doc.getElementById('lblSearch'),
			 	divContent=doc.getElementById('divContent');
			 $scope.queryListWidth=lblSearch.clientWidth+'px';
			 $scope.queryListHeight=100+'px'; 
			 $scope.queryListLeft=(divContent.clientWidth-lblSearch.clientWidth)/2 +'px';
			 $scope.queryListTop=(lblSearch.offsetHeight+1)+'px'; 
		}
		 window.onresize=function(){ 
		 	initialSearchBox();
		 };
		 initialSearchBox();
	});
}]); 
