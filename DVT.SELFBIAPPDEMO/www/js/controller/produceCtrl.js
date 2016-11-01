app.controller('produceCtrl', function ($scope, ionicDatePicker,$state,$stateParams) {
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
      //disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };
    // 调用datepicker
    $scope.openDatePickerStart = function(e){
      e.stopPropagation();
      ionicDatePicker.openDatePicker(ipObj1);
    };

    var ipObj2 = {
      callback: function (val) {  //Mandatory
        $scope.queryDateEnd=dateFormat(new Date(val)); 
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
      //disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };
    // 调用datepicker
    $scope.openDatePickerEnd = function(e){
      e.stopPropagation();
      ionicDatePicker.openDatePicker(ipObj2);
    };

    $scope.organizations=[{value:"0",text:"大连"},{value:"1",text:"哈尔滨"},{value:"2",text:"北京"}];
    $scope.indicatorName=$stateParams.name;
    $scope.indicatorId=$stateParams.id;
    $scope.queryDateStart=$stateParams.start ||dateFormat(new Date());
    $scope.queryDateEnd=$stateParams.end ||dateFormat(new Date());
    $scope.selectedObject=$scope.organizations[0]; 
    if ($stateParams.value && $stateParams.text) {
      for (var i = 0,len=$scope.organizations.length; i < len; i++) {
        if ($stateParams.value==$scope.organizations[i].value) {
           $scope.selectedObject =$scope.organizations[i];
           break;
        }
      } 
    }
    //$scope.selectedObject=$scope.organizations[2];   
    $scope.organizationChange=function(data){ 
        $scope.selectedObject=data; 
    };
    $scope.query=function(){ 
      $state.go('quota',{
        id:$scope.indicatorId,
        name:$scope.indicatorName,
        start:$scope.queryDateStart,
        end:$scope.queryDateEnd,
        orgValue:$scope.selectedObject.value,
        orgText:$scope.selectedObject.text
      })};
});