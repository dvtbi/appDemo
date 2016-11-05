app.controller('tendencyCtrl', function($scope, $state, $stateParams, $http) {




    $http({
            method: 'get',
            url: 'http://dwt2.hpi.com.cn/selfbiapi/api/indicator/GetTendencyData',
            timeout: 40000,
            params: {}
        })
        .success(function(data) {
            console.log(data.times.length);
            var myChart = echarts.init(document.getElementById('main'));

            // 指定图表的配置项和数据
            option = {
                title: {
                    text: '日发电量',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['发电量', '去年同期发电量']
                },
                toolbox: {
                    show: false,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: { readOnly: false },
                        magicType: { type: ['line', 'bar'] },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: data.times
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} kw/h'
                    }
                },
                series: [{
                    name: '发电量',
                    type: 'line',
                    data: data.data,
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                }, {
                    name: '去年同期发电量',
                    type: 'line',
                    data: data.LastYearData,
                    markPoint: {
                        data: [
                            { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' },
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
                }]
            };


            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        })
        .error(function() {

        });

    var tendencyData;
    //获取两个数据list 还有两个日期list

    $scope.goback = function(event) {
        $state.go('home', { query: $scope.IndicatorName });
    };
    $scope.goProduce = function(i, n) {
        $state.go('home', { query: $scope.IndicatorName });
    }





    $scope.IndicatorName = $stateParams.query || "辽宁分公司日发电量趋势图";
    // 基于准备好的dom，初始化echarts实例



})
