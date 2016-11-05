app.controller('tendencyCtrl',  function($scope, $state, $stateParams) {

  
    $scope.goback=function(event){
        $state.go('home',{query:$scope.IndicatorName});
    };
    $scope.goProduce=function(i,n){
         $state.go('home',{query:$scope.IndicatorName});
    }

    $scope.IndicatorName=$stateParams.query || "趋势分析图";
      // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 指定图表的配置项和数据
    option = {
    title: {
        text: '发电量',
        subtext: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['发电量','去年同期']
    },
    toolbox: {
        show: false,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: ['10.2','10.3','10.4','10.5','10.6','10.7','10.8',"10.9"]
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} kw/h'
        }
    },
    series: [
        {
            name:'发电量',
            type:'line',
            data:[11, 11, 15, 13, 12,19,24,26],
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        },
        {
            name:'去年同期',
            type:'line',
            data:[10, 9, 12, 20, 22,],
            markPoint: {
                data: [
                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'},
                    [{
                        symbol: 'none',
                        x: '90%',
                        yAxis: 'max'
                    }, {
                        symbol: 'circle',
                        label: {
                            normal: {
                                position: 'start',
                                formatter: '最大值'
                            }
                        },
                        type: 'max',
                        name: '最高点'
                    }]
                ]
            }
        }
    ]
};


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

   
})
