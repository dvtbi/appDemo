app.controller('homeCtrl',['$scope','$state','$stateParams',function($scope,$state,$stateParams){
	$scope.query=$stateParams.query?$stateParams.query:'';
	$scope.icons=[
		{name:"领导驾驶舱",src:"img/ionic.png"},
		{name:"安全生产",src:"img/ionic.png"},
		{name:"市场营销",src:"img/ionic.png"},
		{name:"燃料经营",src:"img/ionic.png"},
		{name:"财务经营",src:"img/ionic.png"}
	];   
	$scope.search=function(event){
		var keycode=window.event?event.keyCode:event.which;
		if (keycode==13) {
			$state.go('search',{query:$scope.query});
		} 
	}
}]) 