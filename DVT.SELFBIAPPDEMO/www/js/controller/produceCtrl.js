app.controller('produceCtrl', function ($scope,$http,$state,$stateParams,$ionicViewSwitcher) {
    // 根据Date格式化字符串
    var dateFormat=function(o){
      var f=function(i,isDay){
        if (isDay) {
          return i>9?i.toString():'0'+i;
        }else{
          return ++i>9?i.toString():'0'+i;
        }
      };
      if (o) {
        return o.getFullYear()+'-'+f(o.getMonth())+'-'+f(o.getDate(),1);
      }
      return '';
    };
    // 日期默认值IndicatorName 
    //$scope.queryDate=dateFormat(new Date());
    // datepicker配置与调用
    var ipObj1 = {
      callback: function (val) {  //Mandatory
        $scope.queryDateStart=dateFormat(new Date(val)); 
        //console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      
      },
      disabledDates: [            //Optional
        //new Date(2016, 2, 16),
        //new Date(2015, 3, 16),
        //new Date(2015, 4, 16),
        //new Date(2015, 5, 16),
        //new Date('Wednesday, August 12, 2015'),
        //new Date("08-16-2016"),
        //new Date(1439676000000)
      ],
      from: new Date(2012, 1, 1), //Optional
      to: new Date(2016, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup',      //Optional 其他：popup,modal
      setLabel:'设置',
      todayLabel: '今天',
      closeLabel: '关闭',
      dateFormat:'yyyy年MM月dd日',
      weeksList: ["日", "一", "二", "三", "四", "五", "六"],
      monthsList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
      /*setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      inputDate: new Date(),
      mondayFirst: true,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      showTodayButton: false,
      closeOnSelect: false,
      disableWeekdays: []*/
    };
    // 调用datepicker
    $scope.openDatePickerStart = function(e){
      e.stopPropagation();
      ionicDatePicker.openDatePicker(ipObj1);
    }; 

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
            storage.organizations=[]; 
          });
        }else{
          $scope.organizations=JSON.parse(storage.organizations);
          $scope.selectedObject=$scope.organizations[0]; 
          if ($stateParams.value && $stateParams.text) {
            for (var i = 0,len=$scope.organizations.length; i < len; i++) {
              if ($stateParams.value==$scope.organizations[i].OrganizationCode) {
                 $scope.selectedObject =$scope.organizations[i];
                 break;
              }
            }
          }
        }
        
      }
    })();
 
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

   // $scope.organizations=[{value:"0",text:"大连"},{value:"1",text:"哈尔滨"},{value:"2",text:"北京"}];
    $scope.indicatorName=$stateParams.name;
    $scope.indicatorId=$stateParams.id;
    $scope.queryDateStart=$stateParams.start ||dateFormat(new Date());
    //$scope.queryDateEnd=$stateParams.end ||dateFormat(new Date());

    //$scope.selectedObject=$scope.organizations[2];   
    $scope.organizationChange=function(data){ 
        $scope.selectedObject=data; 
    };
    $scope.query=function(){ 
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('quota',{
        id:$scope.indicatorId,
        name:$scope.indicatorName,
        start:$scope.queryDateStart,
        //end:$scope.queryDateEnd,
        orgValue:$scope.selectedObject.OrganizationCode,
        orgText:$scope.selectedObject.OrganizationName
      })};
}); 