app.controller('produceCtrl', function ($scope, ionicDatePicker,$stateParams) {
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
    $scope.queryDate=dateFormat(new Date());
    // datepicker配置与调用
    var ipObj1 = {
      callback: function (val) {  //Mandatory
        $scope.queryDate=dateFormat(new Date(val)); 
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      },
      disabledDates: [            //Optional
        new Date(2016, 2, 16),
        new Date(2015, 3, 16),
        new Date(2015, 4, 16),
        new Date(2015, 5, 16),
        new Date('Wednesday, August 12, 2015'),
        new Date("08-16-2016"),
        new Date(1439676000000)
      ],
      from: new Date(2012, 1, 1), //Optional
      to: new Date(2016, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };
    // 调用datepicker
    $scope.openDatePicker = function(e){
      e.stopPropagation();
      ionicDatePicker.openDatePicker(ipObj1);
    };

    $scope.query=function(){
 
    }

    $scope.indicatorName=$stateParams.name;
});