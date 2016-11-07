app.controller('dynamicProduceCtrl', 
  function ($scope,$http,$state,$stateParams,$ionicViewSwitcher,$window,$ionicLoading) {
    $ionicLoading.show({
        content:'Loading',
        animation:'fade-in',
        showBackDrop:true
    });
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
    $scope.indicatorUnit=$stateParams.unit;
    $scope.isDay=false;
    $scope.isMonth=false;
    // 查询按钮是否可用，true：不可用，false：可用
    $scope.isDisabled=true;

    // 获取动态纬度信息
    $http({
      method:'get',
      url:'http://dwt2.hpi.com.cn/selfbiapi/api/indicator/GetDimensionByIndicatorId',
      timeout:5000,
      params:{
        indicatorId:$scope.indicatorId
      },
      async:false
    })
    .success(function(rs){
      if (rs && rs.length && rs.length>1) {
        $scope.isDay=(/fday/i).test(rs[1].DimID);
        $scope.isMonth=(/fmonth/i).test(rs[1].DimID);
        $scope.dateType=rs[1].DimID;
      }
    })
    .error(function(rs){
      $scope.isDay=false;
      $scope.isMonth=false;
    })
    .finally(function(){
      var nowOffset=new Date();
      if ($scope.isDay) { 
        nowOffset.setDate(nowOffset.getDate()-1);
        $scope.queryDate=dateFormat(nowOffset,'yyyy-MM-dd');
      }
      if ($scope.isMonth) {
        nowOffset.setMonth(nowOffset.getMonth()-1);
        $scope.queryDate=dateFormat(nowOffset,'yyyy-MM');
      }
      $ionicLoading.hide();
    });

    (function(){
      var storage=window.localStorage;
      if (storage) {
        if (!storage.organizations) {
          $http({
            method:'get',
            url:'http://dwt2.hpi.com.cn/selfbiapi/api/indicator/GetOrganizationTest',
            timeout:5000
          })
          .success(function(data){  
            if (data) {
              storage.organizations='['+JSON.stringify(data).replace(/,"children":null/mgi, '')+']';
              $scope.organizations=JSON.parse(storage.organizations);  
            } 
          })
          .error(function(){
            //
            storage.organizations=[]; 
          });
        }else{
          $scope.organizations=JSON.parse(storage.organizations); 
        } 
      }
    })();
    //测试条目
    //$scope.organizations=[{OrganizationCode:'111',OrganizationName:'222'}];
    //$scope.selectedObject=$scope.organizations[0];
    $scope.endYear=dateFormat(new Date(),'yyyy');
    $scope.beginYear="1970";
    //$scope.queryMonth=dateFormat(new Date(),'yyyy-MM');
    $scope.queryDate=dateFormat(new Date(),'yyyy-MM-dd');
    //$scope.powerplants=[{value:"0",text:"大连"},{value:"1",text:"哈尔滨"},{value:"2",text:"北京"}];
    $scope.indicatorName=$stateParams.name;
    $scope.indicatorId=$stateParams.id;
    //$scope.queryPowerplant='请您选择一个电厂';
    $scope.queryOrganization='请您选择组织';
    $scope.orgLevel={trueValue:'电厂',falseValue:'分公司',checked:true,orgArray:[]};
    $scope.orgCallback=function(){ 
        var levelIndex=0,rs= $scope.orgLevel.orgArray;
        if (rs && rs.length>0) { 
          if ($scope.orgLevel.checked) {
              if (rs.length==3) {
                levelIndex=2;
                $scope.queryOrganization=rs[levelIndex].text;
                $scope.orgType=rs[levelIndex].OriginzationCategoryCode;
                $scope.orgId=rs[levelIndex].value;
                $scope.orgName=rs[levelIndex].text; 
                $scope.isDisabled=false;
              }else{
                $scope.queryOrganization="请您选择组织";
                $scope.isDisabled=true;
              } 
          }else{
              levelIndex=1;
              $scope.queryOrganization=rs[levelIndex].text;
              $scope.orgType=rs[levelIndex].OriginzationCategoryCode;
              $scope.orgId=rs[levelIndex].value;
              $scope.orgName=rs[levelIndex].text; 
              $scope.isDisabled=false; 
          }
        }  
      return $scope.orgLevel.checked?$scope.orgLevel.trueValue:$scope.orgLevel.falseValue;
    };

    $scope.query=function(){ 
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('quota',{
        id:$scope.indicatorId,
        name:$scope.indicatorName,
        orgType:$scope.orgType,
        orgId:$scope.orgId,
        orgName:$scope.orgName,
        date:$scope.queryDate,
        dateType:$scope.dateType,
        unit:$scope.indicatorUnit 
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
    $scope.switchObject={
      toggle:true,
      outterClass:'open1',
      innerClass:'open2',
      watch:function(){  
          $scope.orgLevel.checked=true;
        if ($scope.switchObject.toggle) {
          $scope.switchObject.outterClass='close1';
          $scope.switchObject.innerClass='close2';
          $scope.switchObject.toggle=false;
          //
          $scope.orgLevel.checked=false;
        }else{
          $scope.switchObject.outterClass='open1';
          $scope.switchObject.innerClass='open2';
          $scope.switchObject.toggle=true;
          //
           $scope.orgLevel.checked=true;
        }
        $scope.orgCallback();
        console.log($scope.switchObject.outterClass)
    }}; 

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
                     $scope.queryDate=rs.text;
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

         /* linkQueryPowerplant.addEventListener('tap',function(event){
              event.stopPropagation();
              var picker=new $.PopPicker();
              picker.setData($scope.powerplants);
              picker.show(function(rs){
                  $scope.$apply(function(){
                    $scope.queryPowerplant=rs[0].text;
                  }); 
                  picker.dispose();   
              });
          },false);*/

          linkQueryOrganization.addEventListener('tap',function(event){
              event.stopPropagation();
              var options={layer:3 },
                  level=3,
                  levelIndex; 
              // true:控件显示三级，false:控件显示二级
              if ($scope.orgLevel.checked)  level=3;
              else  level=2; 
              options.layer=level;
              levelIndex=level-1;

              var picker=new $.PopPicker(options);
              picker.setData($scope.organizations);
              picker.show(function(rs){   
                    $scope.$apply(function(){ 
                      $scope.queryOrganization=rs[levelIndex].text;
                      $scope.orgType=rs[levelIndex].OriginzationCategoryCode;
                      $scope.orgId=rs[levelIndex].value;
                      $scope.orgName=rs[levelIndex].text;
                      $scope.isDisabled=false;
                      $scope.orgLevel.orgArray=rs;
                      console.log( $scope.orgLevel);
                    }); 
                    picker.dispose();   
              });
          },false);
      })(mui);
    }); 
}); 
