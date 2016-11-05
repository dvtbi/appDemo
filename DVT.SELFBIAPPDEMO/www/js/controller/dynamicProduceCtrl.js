app.controller('dynamicProduceCtrl', 
  function ($scope,$http,$state,$stateParams,$ionicViewSwitcher,$window) {

    // 根据Date格式化字符串
    var dateFormat=function(o,t){
      var f=function(i,isDay){
        if (isDay) {
          return i>9?i.toString():'0'+i;
        }else{
          return ++i>9?i.toString():'0'+i;
        }
      },
      format=t;
      if (o) {
        if (format) {
          return format.replace(/yyyy/g,o.getFullYear())
                       .replace(/MM/g,f(o.getMonth()))
                       .replace(/dd/g,f(o.getDate(),1));
        }
        return o.getFullYear()+'-'+f(o.getMonth())+'-'+f(o.getDate(),1);
      }
      return '';
    };
    // 返回事件
    $scope.goBack=function(){
      $window.history.go(-1);
    };

    // 获取Url参数
    $scope.indicatorId=$stateParams.id;
    $scope.indicatorName=$stateParams.name;
    $scope.indicatorUnit=$stateParams.Unit;

    // 获取纬度信息
    $http({
      method:'get',
      url:'http://dwt2.hpi.com.cn/selfbiapi/api/indicator/GetDimensionByIndicatorId',
      timeout:5000,
      params:{
        indicatorId:$scope.indicatorId
      }
    })
    .then(function(rs){
      
    })
    .catch(function(rs){

    })
    .finally(function(){

    });

    (function(){
      var storage=window.localStorage;
      if (storage) {
        if (!storage.organizations) {
          $http({
            method:'get',
            url:'http://dwt2.hpi.com.cn/api/indicator/getOrganizationtest',
            timeout:5000
          })
          .success(function(data){ 
            storage.organizations=JSON.stringify(data);
            $scope.organizations=data;   
          })
          .error(function(){
            //
            storage.organizations=[]; 
          });
        }else{
          $scope.organizations=JSON.parse(storage.organizations); 
        } 
      }
    });
    //测试条目
    //$scope.organizations=[{OrganizationCode:'111',OrganizationName:'222'}];
    //$scope.selectedObject=$scope.organizations[0];
    $scope.endYear=dateFormat(new Date(),'yyyy');
    $scope.beginYear="1970";
    $scope.queryMonth=dateFormat(new Date(),'yyyy-MM');
    $scope.queryDate=dateFormat(new Date(),'yyyy-MM-dd');
    $scope.powerplants=[{value:"0",text:"大连"},{value:"1",text:"哈尔滨"},{value:"2",text:"北京"}];
    $scope.indicatorName=$stateParams.name;
    $scope.indicatorId=$stateParams.id;
    $scope.queryPowerplant='请您选择一个电厂';
    $scope.queryOrganization='请您选择一个分公司';

    $scope.query=function(){ 
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('quota',{
        id:$scope.indicatorId,
        name:$scope.indicatorName
        //start:$scope.queryDateStart,
        //end:$scope.queryDateEnd,
        //orgValue:$scope.selectedObject.OrganizationCode,
        //orgText:$scope.selectedObject.OrganizationName
    })};
   /* $http({
      method:'get',
      url:'http://dwt2.hpi.com.cn/api/indicator/getOrganizationtest',
      //url:'http://10.2.17.32:65510/api/indicator/getOrganization',
      params:{
        
      },
      timeout:5000
    })
    .success(function(data){ 
      $scope.organizations=data;
      $scope.selectedObject=$scope.organizations[0]; 
      if ($stateParams.value && $stateParams.text) {
        for (var i = 0,len=$scope.organizations.length; i < len; i++) {
          if ($stateParams.value==$scope.organizations[i].OrganizationCode) {
             $scope.selectedObject =$scope.organizations[i];
             break;
          }
        }
      }
    })
    .error(function(){
      //
    });*/


    //$scope.queryDateStart=$stateParams.start ||dateFormat(new Date());
    //$scope.queryDateEnd=$stateParams.end ||dateFormat(new Date());

    // 文档加载之后执行
    angular.element(document).ready(function(){ 
      ///加载日期
      (function ($) {
          $.init();
          var doc=document,
              linkQueryMonth = doc.getElementById('linkQueryMonth'),
              linkQueryDate=doc.getElementById('linkQueryDate'),
              linkQueryPowerplant=doc.getElementById('linkQueryPowerplant'),
              linkQueryOrganization=doc.getElementById('linkQueryOrganization'),
              isMonthPicker=null,
              isDatePicker=null; 
          linkQueryMonth.addEventListener('tap', function (event) {
              event.stopPropagation();   
              var picker = new $.DtPicker({
                type:"month",
                endYear:$scope.endYear,
                beginYear:$scope.beginYear
              });
              picker.show(function (rs) { 
                  $scope.$apply(function(){
                    $scope.queryMonth=rs.text;
                  });  
                  picker.dispose();  
              });
          }, false);

          linkQueryDate.addEventListener('tap', function (event) {
              event.stopPropagation();  
              var picker = new $.DtPicker({
                type:"date",
                endYear:$scope.endYear,
                beginYear:$scope.beginYear
              });
              picker.show(function (rs) {
                  //queryDate.innerText = rs.text; 
                  $scope.$apply(function(){
                    $scope.queryDate=rs.text;
                  }); 
                  picker.dispose();   
              });  
          }, false);

          linkQueryPowerplant.addEventListener('tap',function(event){
              event.stopPropagation();
              var picker=new $.PopPicker();
              picker.setData($scope.powerplants);
              picker.show(function(rs){
                  $scope.$apply(function(){
                    $scope.queryPowerplant=rs[0].text;
                  }); 
                  picker.dispose();   
              });
          },false);

          linkQueryOrganization.addEventListener('tap',function(event){
              event.stopPropagation();
              var picker=new $.PopPicker();
              picker.setData( $scope.powerplants);
              picker.show(function(rs){  
                    $scope.$apply(function(){
                      $scope.queryOrganization=rs[0].text;
                    }); 
                    picker.dispose();   
              });
          },false);

      })(mui);
    }); 
}); 