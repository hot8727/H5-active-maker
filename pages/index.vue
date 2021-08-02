<template>
    <div class="container" :style="{'margin-right':setAttrPanelShow ? '300px':0}">
        <div class="control_panel">
            <!-- <el-tabs v-model="type" type="border-card">
                <el-tab-pane name="0" label="折线图">用户管理</el-tab-pane>
                <el-tab-pane name="1" label="柱状图">配置管理</el-tab-pane>
                <el-tab-pane name="2" label="饼图">角色管理</el-tab-pane>
            </el-tabs> -->
            
            <div class="panel_box">
                <el-form ref="form" label-width="80px">
                    <el-collapse v-model="activeNames" accordion>
                        <el-collapse-item name="5">
                            <template slot="title"><i class="header-icon el-icon-wallet"></i>基础设置</template>
                            <div class="form_box">
                                <el-form-item label="页面背景图">
                                    <pic-upload :src.sync="form.backgroundImage"></pic-upload>
                                    <el-input v-model="form.backgroundImage"></el-input>
                                </el-form-item>
                                <el-form-item label="背景色（默认白色）">
                                    <el-color-picker v-model="form.backgroundColor"></el-color-picker>
                                </el-form-item>
                                <el-form-item label="背景图片显示方式">
                                    <el-radio-group v-model="form.backgroundSize">
                                        <el-radio-button label="100%">与屏幕等宽</el-radio-button>
                                        <el-radio-button label="cover">铺满</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="背景图片是否重复">
                                    <el-switch
                                        v-model="form.backgroundRepeat"
                                        active-text="是"
                                        active-value="repeat"
                                        inactive-text="否"
                                        inactive-value="no-repeat">
                                    </el-switch>
                                </el-form-item>
                                <el-form-item label="头部高度">
                                    <el-input v-model="form.headerHeight"></el-input>
                                </el-form-item>
                                <!-- 页面信息 -->
                                <el-form-item label="页面标题">
                                    <el-input v-model="form.pageInfo.title"></el-input>
                                </el-form-item>
                                <el-form-item label="分享标题">
                                    <el-input v-model="form.pageInfo.shareTitle"></el-input>
                                </el-form-item>
                                <el-form-item label="分享简介">
                                    <el-input v-model="form.pageInfo.shareDesc"></el-input>
                                </el-form-item>
                                <el-form-item label="分享图标">
                                    <el-input v-model="form.pageInfo.shareIcon"></el-input>
                                </el-form-item>
                                <el-form-item label="页面访问trace">
                                    <el-input v-model="form.pageInfo.trace1"></el-input>
                                </el-form-item>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="4">
                            <template slot="title"><i class="header-icon el-icon-data-analysis"></i>内容</template>
                            <div class="form_box">
                                <el-button @click="add(b)" v-for="b in componentsGroup" :key="b.id">{{b.name}}</el-button>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </el-form>
            </div>
        </div>
        <div class="charts_panel">
            <preview @setAttr="setAttr" :edit="true" :info.sync="form" @clearForm="clearAttrForm"></preview>
        </div>
        <div class="attr_panel" v-if="setAttrPanelShow">
            <div class="close" @click="setAttrPanelShow = false">×</div>
            <div class="panel_box">
            <el-form ref="form" label-width="92px">
                    <el-collapse v-model="attrActiveNames" accordion>
                        <el-collapse-item name="5">
                            <template slot="title"><i class="header-icon el-icon-wallet"></i>内容</template>
                            <div class="form_box">
                                <el-form-item label="文本" v-if="attrForm.content.text != undefined">
                                    <el-input v-model="attrForm.content.text" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="字号" v-if="attrForm.content.text != undefined">
                                    <el-input-number v-model="attrForm.style.fontSize" clearable :min="2.4" :precision="2" :step="0.2"></el-input-number>
                                </el-form-item>
                                <el-form-item label="行高" v-if="attrForm.content.text != undefined">
                                    <el-input-number v-model="attrForm.style.lineHeight" clearable :min="2.4" :precision="2" :step="0.2"></el-input-number>
                                </el-form-item>
                                <el-form-item label="文字颜色" v-if="attrForm.content.text != undefined">
                                    <el-color-picker v-model="attrForm.style.color"></el-color-picker>
                                </el-form-item>
                                <el-form-item label="文字样式" v-if="attrForm.content.text != undefined">
                                    <el-radio-group v-model="attrForm.style.fontWeight">
                                        <el-radio-button label="normal">正常</el-radio-button>
                                        <el-radio-button label="bold">加粗</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="对齐" v-if="attrForm.content.text != undefined">
                                    <el-radio-group v-model="attrForm.style.textAlign">
                                        <el-radio-button label="left">左</el-radio-button>
                                        <el-radio-button label="center">中</el-radio-button>
                                        <el-radio-button label="right">右</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="点击跳转类型" v-if="attrForm.content.clickType != undefined">
                                    <el-radio-group v-model="attrForm.content.clickType">
                                        <el-radio :label="1">链接</el-radio>
                                        <el-radio :label="2">专题</el-radio>
                                        <el-radio :label="3">专区</el-radio>
                                        <!-- <el-radio :label="4">弹窗</el-radio> -->
                                        <el-radio :label="5">不可点击</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="跳转内容" v-if="attrForm.content.clickResult != undefined">
                                    <el-input v-model="attrForm.content.clickResult" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="trace点击名称" v-if="attrForm.content.trace != undefined">
                                    <el-input v-model="attrForm.content.trace" clearable></el-input>
                                </el-form-item>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="4">
                            <template slot="title"><i class="header-icon el-icon-wallet"></i>样式</template>
                            <el-alert
                                title="宽度和左右边距之和建议不要大于100，否则会出现无法完整显示的情况"
                                type="warning">
                            </el-alert>
                            <div class="form_box">
                                <el-form-item label="定位方式">
                                    <el-input v-model="attrForm.positionStyle.position" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="宽度">
                                    <el-input v-model="attrForm.positionStyle.width" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="高度">
                                    <el-input v-model="attrForm.positionStyle.height" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="Top">
                                    <el-input v-model="attrForm.positionStyle.top" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="Left">
                                    <el-input v-model="attrForm.positionStyle.left" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="边距">
                                    上：<el-input v-model="attrForm.positionStyle.marginTop" clearable style="width:60px"></el-input>
                                    右：<el-input v-model="attrForm.positionStyle.marginRight" clearable style="width:60px"></el-input>
                                    下：<el-input v-model="attrForm.positionStyle.marginBottom" clearable style="width:60px"></el-input>
                                    左：<el-input v-model="attrForm.positionStyle.marginLeft" clearable style="width:60px"></el-input>
                                </el-form-item>
                                <el-form-item label="内边距">
                                    上：<el-input v-model="attrForm.style.paddingTop" clearable style="width:60px"></el-input>
                                    右：<el-input v-model="attrForm.style.paddingRight" clearable style="width:60px"></el-input>
                                    下：<el-input v-model="attrForm.style.paddingBottom" clearable style="width:60px"></el-input>
                                    左：<el-input v-model="attrForm.style.paddingLeft" clearable style="width:60px"></el-input>
                                </el-form-item>
                                <el-form-item label="圆角大小">
                                    <el-input v-model="attrForm.style.borderRadius" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="背景图片">
                                    <!-- <el-input v-model="attrForm.style.backgroundImage" clearable></el-input> -->
                                    <pic-upload :src.sync="attrForm.style.backgroundImage"></pic-upload>
                                </el-form-item>
                                <el-form-item label="背景色">
                                    <el-color-picker show-alpha v-model="attrForm.style.backgroundColor"></el-color-picker>
                                </el-form-item>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="3">
                            <template slot="title"><i class="header-icon el-icon-wallet"></i>专辑专题</template>
                             <div class="form_box">
                                <el-form-item label="显示标题栏?">
                                    <el-switch
                                        v-model="attrForm.content.titleShow"
                                        active-text="是"
                                        inactive-text="否"
                                        :active-value="1"
                                        :inactive-value="0"
                                    >
                                    </el-switch>
                                </el-form-item>
                                <el-form-item label="专区标题">
                                    <el-input v-model="attrForm.content.title" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="标题颜色">
                                    <el-color-picker v-model="attrForm.content.titleColor"></el-color-picker>
                                </el-form-item>
                                <el-form-item label="“更多”文字">
                                    <el-input v-model="attrForm.content.subTitle" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="“更多”颜色">
                                    <el-color-picker v-model="attrForm.content.subTitleColor"></el-color-picker>
                                </el-form-item>
                                <el-form-item label="“更多”traceId">
                                    <el-input v-model="attrForm.content.subTitleTrace"></el-input>
                                </el-form-item>
                                <el-form-item label="专区ID" v-if="attrForm.content.specialId != undefined">
                                    <el-input v-model="attrForm.content.specialId" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="起始位置" v-if="attrForm.content.pageNum != undefined">
                                    <el-input v-model="attrForm.content.pageNum" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="专辑数量" v-if="attrForm.content.pageSize != undefined">
                                    <el-input v-model="attrForm.content.pageSize" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="专辑点击traceId">
                                    <el-input v-model="attrForm.content.mediaTrace"></el-input>
                                </el-form-item>
                             </div>
                        </el-collapse-item>
                        <el-collapse-item name="3">
                            <template slot="title"><i class="header-icon el-icon-wallet"></i>点击</template>
                        </el-collapse-item>
                    </el-collapse>
            </el-form>
            </div>
        </div>
        <!--<el-dialog title="excel内容生成图表" :visible.sync="popExcel" width="500" center>
             <div class="form_box">
                <div class="form_title">
                    直接将execl中内容全部选中复制粘贴到下框中，点击确定即可。
                </div>
                <el-input type="textarea" rows="5" v-model="excelContent"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="popExcel = false">取 消</el-button>
                <el-button type="primary" @click="excelContentGet">确 定</el-button>
            </span> 
        </el-dialog>-->
    </div>
</template>

<script>
import configJSON from '../components/mods/index.js';
import picUpload from '../components/picUploadSingle';
// import aggregateButtonCfg from '../components/mods/aggregateButton/config.json';
// import singleMediaAssetCfg from '../components/mods/singleMediaAsset/config.json';
// import singleMediaAssetOutCfg from '../components/mods/singleMediaAsset2/config.json';
export default {
    components: {
        picUpload
        // aggregateButton, 
        // singleMediaAsset
    },
    data() {
        return {
            activeNames:'1',
            attrActiveNames:'4',
            setAttrPanelShow:false,
            baseAttr:{
                align:'center',
                paddingTop:0,
                paddingRight:0,
                paddingBottom:0,
                paddingLeft:0,
                backgroundImage:'',
                backgroundColor:'#e2e3e5',
                backgroundSize:'cover',
                borderRadius:2,
                // background:undefined
                // boxShadow:''
            },
            positionStyle:{
                position: 'relative',
                boxSize:'border-box',
                width:90,
                height:20,
                top:0,
                left:0,
                marginTop:5,
                marginBottom:5,
                marginLeft:5,
                marginRight:5
            },
            fontStyle:{
                fontSize:4,
                lineHeight:6,
                textAlign:'center',
                color:'#000000',
                fontWeight:'normal',
            },
            form: {
                backgroundImage: 'http://wx2.sinaimg.cn/mw600/0089jzyPly1gql2wss3luj30u01904nj.jpg',
                backgroundRepeat:'no-repeat',
                backgroundColor:'#FFFFFF',
                backgroundSize:'100%',
                headerHeight: 50,
                contentList: [],
                pageInfo:{
                    title:'页面标题',
                    shareTitle:'分享标题',
                    shareDesc:'分享简介',
                    shareIcon:'',
                    trace1:'',
                }
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入频道类型名称',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 10,
                        message: '长度为2-10个字符',
                        trigger: 'blur'
                    }
                ]
            },
            attrForm:{},
            componentsGroup:[],
            compList:[]
        };
    },
    watch: {
        
    },
    created() {
        
    },
    mounted(){
        document.title = 'Html5 builder';
        this.componentsGroup = [
            ...configJSON
        ];
        if(localStorage.getItem('configInfo')){
            this.form = {
                ...JSON.parse(localStorage.getItem('configInfo'))
            }
        }
    },
    methods: {
        getRandom(start, end, fixed=0) {
            let differ = end - start;
            let random = Math.random();
            return (start + differ * random).toFixed(fixed);
        },
        formatDate (fmt) {
            // author: meizz
            const o = {
                'M+': this.getMonth() + 1, // 月份
                'd+': this.getDate(), // 日
                'h+': this.getHours(), // 小时
                'm+': this.getMinutes(), // 分
                's+': this.getSeconds(), // 秒
                'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
                S: this.getMilliseconds() // 毫秒
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    (`${this.getFullYear()}`).substr(4 - RegExp.$1.length)
                );
            }
            for (const k in o) {
                if (new RegExp(`(${k})`).test(fmt)) {
                    fmt = fmt.replace(
                        RegExp.$1,
                        RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr((`${o[k]}`).length)
                    );
                }
            }
            return fmt;
        },
        add(b){
            let component = undefined;
            component = b;
            this.form.contentList.push({
                id:new Date().getTime(),
                class: component.class,
                title: component.title,
                ...component.attr,   // 文本等内容信息
                positionStyle:{
                    ...this.positionStyle,
                    ...component.positionStyle
                },
                fontStyle: {...this.fontStyle},  
                style:{
                    ...this.baseAttr,
                    ...component.baseAttr   // config.json中的配置覆盖此页面中的baseAttr
                }
            });
            console.log(this.form);
            // switch (id){
            //     // clickType:1, // 1 点击到链接、2 点击到教育专题 3 点击到教育专区 4 弹窗 5 不可点击
            //     case 1: // 聚合按钮
            //         this.compList.push('comp1');
            //         break;
            //     case 2:
            //         this.compList.push('comp2');
            //         break;
            // }
        },
        setAttr(li){
            this.setAttrPanelShow = true;
            this.attrForm = li;
        },
        clearAttrForm(id){
            if(id == this.attrForm.id){
                this.setAttrPanelShow = false;
            }
        }
    }
};
</script>

<style lang="scss">
.container {
    margin: 0 auto;
    margin-left: 300px;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: left;
    background: #333;
    .control_panel{
        position: fixed;
        background: #fff;
        left: 0;
        top: 0;
        z-index: 5;
        padding: 0px;
        width: 300px;
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
    }
    .charts_panel{
        width: 360px;
        height: 640px;
        overflow: overlay;
        box-sizing: border-box;
        // .chart_box {
        //     width: 100%;
        //     height: 300px;
        // }
        .echarts {
            width: 100%;
            height: 100%;
        }
    }
    .attr_panel{
        position: fixed;
        top: 0;
        right: 0;
        background: #fff;
        z-index: 5;
        padding: 0px;
        width: 300px;
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
    }
    .panel_box{
        padding: 0 0 15px 0;
    }
    .el-collapse-item__header{
        background: #ededed;
        font-size: 14px;
        padding: 0 15px;
        i{
            font-weight: bold;
            margin-right: 5px;
            color: #999;
        }
    }
    .form_box{
        padding: 10px;
        font-size: 12px;
        .form_item_row{
            margin-bottom: 10px;
        }
        .el-button+.el-button{
            margin-left: 0;
        }
        .el-form-item__label{
            font-size: 12px;
        }
    }
    .close{
        width: 32px;
        height: 32px;
        font-size: 24px;
        text-align: center;
        line-height: 24px;
        cursor: pointer;
    }
}

</style>
