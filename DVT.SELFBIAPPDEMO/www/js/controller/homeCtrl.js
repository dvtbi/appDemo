app.controller('homeCtrl',['$scope','$state','$stateParams','$http','$timeout',function($scope,$state,$stateParams,$http,$timeout){
	// 搜索框是否获取焦点（true），用于判断搜索box隐藏与显示
	$scope.IsSearchFocus=false;
	$scope.IndicatorName=$stateParams.query?$stateParams.query:'';
	$scope.icons=[
		{name:"领导驾驶舱",src:"img/ionic.png"},
		{name:"安全生产",src:"img/ionic.png"},
		{name:"市场营销",src:"img/ionic.png"},
		{name:"燃料经营",src:"img/ionic.png"},
		{name:"财务经营",src:"img/ionic.png"}
	];

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
		$state.go('produce',{id:i,name:n});
	};
	$scope.searchFocus=function(){
		$scope.IsSearchFocus=true;
	};
	$scope.searchBlur=function(){
		$scope.IsSearchFocus=false;
	}
	angular.element(document).ready(function(){
		var doc=document,
			lblSearch=doc.getElementById('lblSearch'),
		 	divContent=doc.getElementById('divContent');

		 $scope.queryListWidth=lblSearch.clientWidth+'px';
		 $scope.queryListHeight=100+'px'; 
		 $scope.queryListLeft=(divContent.clientWidth-lblSearch.clientWidth)/2 +'px';
		 $scope.queryListTop=(lblSearch.offsetHeight+1)+'px'; 
	});
}]); 
