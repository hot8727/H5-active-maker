import Vue from 'vue'
import ECharts from 'vue-echarts' 

// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'

Vue.use(ECharts);