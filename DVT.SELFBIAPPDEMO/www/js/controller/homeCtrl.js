app.controller('homeCtrl', 
	function($scope,$state,$stateParams,$http,$ionicViewSwitcher,$timeout){
	// 搜索框是否获取焦点（true），用于判断搜索box隐藏与显示
	$scope.IsSearchFocus=false;
	$scope.IndicatorName=$stateParams.query?$stateParams.query:'';

	(function(){
		var storage=window.localStorage;
		if (storage) { 
			if (!storage.indicators) {
			    $http({
		          method:'get',
		          url:'http://dwt2.hpi.com.cn/selfbiapi/api/indicator/GetIndicatorsTest',
		          //url:'http://10.2.17.32:65510/api/indicator/getindicators',
		          timeout:10000,
		          params:{}
		        })
		        .success(function(data){
		        	if (data) {
		        		data.push({IndicatorId:0,IndicatorName:'发电量趋势图',IndicatorUnit:''});
		        		//data.push({IndicatorId:-1,IndicatorName:'打开现有报表'});
		        		//data.push({IndicatorId:-1,IndicatorName:'发电量走势图'});
		        		//data.push({IndicatorId:-2,IndicatorName:'发电量曲线图'});
		        		//data.push({IndicatorId:-3,IndicatorName:'发电量折线图'});
		        		$scope.items=data;
		          		storage.indicators=JSON.stringify(data);
		        	}else{
		        		$scope.items=[];
		        	} 
		        })
		        .error(function(){
		        	$scope.items=[];
		        });
		     }else{
		     	$scope.items=JSON.parse(storage.indicators);
		     }
		}   
	})();   
	// 测试条目
	//$scope.items=[{IndicatorId:'p111',IndicatorName:'发电量测试'}];

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
	$scope.goProduce=function(i,n,e){ 
		if (i==0) {
			/*$ionicPopup.alert({ 
			  title: '友情提示', // String. 弹窗的标题。
			  subTitle: '功能暂未开放，请选择其他关键词', // String (可选)。弹窗的子标题。
			  template: '', // String (可选)。放在弹窗body内的html模板。
			  templateUrl: '', // String (可选)。 放在弹窗body内的html模板的URL。
			  okText: '确定', // String (默认: 'OK')。OK按钮的文字。
			  okType: 'button-positive', // String (默认: 'button-positive')。OK按钮的类型。
			});*/
			//跳转到趋势图页面
			$ionicViewSwitcher.nextDirection('forward');
			$state.go('tendency',{query:n});
		}else if (i==-1) {
			//openPopover(e);  
			$ionicViewSwitcher.nextDirection('forward');
			$state.go('reportType',{query:$scope.IndicatorName,patternName:$scope.patternObject.getNewString()});
		}
		else{
			$ionicViewSwitcher.nextDirection('forward');
			$state.go('dynamicProduce',{id:i,name:n});
			//$state.go('produce',{id:i,name:n});
		}
	};

	// redirect to Dynamic produce
	$scope.goDynamicProduce=function(i,n,u){
		$state.go('dynamicProduce',{id:i,name:n,unit:u});
	};

	// 判断字符串是否匹配关键字
	$scope.patternObject={
			pattern:/打开/,
			isMatch:function(){
				var str=$scope.IndicatorName,
				newStr=str.replace(this.pattern,'');
				return !(str==newStr) && newStr.length>1;
			},
			getNewString:function(){
				var str=$scope.IndicatorName;
				return str.replace(this.pattern,'');
			} 
	};

	// 搜索框获取焦点
	$scope.searchFocus=function(){
		$scope.IsSearchFocus=true;
		document.getElementById('lblSearch').classList.add('item-input-focus');
	};
	// 搜索框失去焦点
	$scope.searchBlur=function(){
		$scope.IsSearchFocus=false;
		document.getElementById('lblSearch').classList.remove('item-input-focus');
	}
	angular.element(document).ready(function(){
		var initialSearchBox=function(){
			var doc=document,
				lblSearch=doc.getElementById('lblSearch'),
			 	divContent=doc.getElementById('divContent');
			 	if (lblSearch && divContent) {
				 $scope.queryListWidth=(lblSearch.clientWidth+4)+'px';
				 $scope.queryListHeight=100+'px'; 
				 $scope.queryListLeft=((divContent.clientWidth-lblSearch.clientWidth)/2) +'px';
				 $scope.queryListTop=(lblSearch.offsetHeight+1)+'px'; 
			 }
		}
		 window.onresize=function(){ 
		 	initialSearchBox();
		 };
		 initialSearchBox();

		var doc=document,
			tags=doc.querySelectorAll('#divTags a.item-arrow-plus'),
			txtSearch=doc.getElementById('search');
		if (tags && tags.length && tags.length>0) {
			for (var i = 0,len=tags.length; i < len; i++) {
				(function(item){ 
					item.addEventListener('click',function(event){ 
						event.preventDefault();
						event.stopPropagation();
						$scope.$apply(function(){  
							$scope.IndicatorName=item.innerText.replace(/^[\s]*|[\s]*$/,''); 
							$timeout(function(){
								txtSearch.focus();
							},200);
						}); 
					});
				})(tags[i]); 
			}
		}
	});
}); 
