<template>
    <div class="perview-box">
        <div class="content-box"
            :style="{
                'background-color':`${info.backgroundColor?info.backgroundColor:'#FFFFFF'}`,
                'background-image':`url('${info.backgroundImage}')`,
                'background-repeat': info.backgroundRepeat,
                'background-size':info.backgroundSize
            }"
        >
            <div>
                <div class="top" :style="{ 'padding-top': sizeFormatter(info.headerHeight) }"></div>
                <draggable :list="info.contentList" class="fw t rl" :options="{group:'content_list',animation:200}" :disabled="!edit">
                    <transition-group class="base-info fw">
                        <div class="box_row" :class="[activeId == li.id && 'active']" :key="li.id" v-for="(li, index) in info.contentList" :style="styleFormatter(li.positionStyle)" @click="showAttr(li)">
                            <!-- <template v-if="li.content.text">
                                <div class="text_box">{{li.content.text}}</div>
                            </template> -->
                            <component :is="li.title" :edit="edit" :styles="styleFormatter(li.style)" :content="li.content"></component> 
                            <div class="setup_groups" v-if="edit">
                                <div class="btn_mini" @click.stop="delRow(li, index)">
                                    <svg-icon icon-class="close"/>
                                </div>
                                <div class="btn_mini" @click.stop="copy(li, index)">
                                    <svg-icon icon-class="copy"/>
                                </div>
                            </div>
                        </div>
                    </transition-group>
                </draggable>
                <div class="top"></div>
            </div>
        </div>
    </div>
</template>
<script>
import draggable from 'vuedraggable';
import aggregateButton from './mods/aggregateButton';
import singleMediaAsset from './mods/singleMediaAsset';
import singleMediaAssetOut from './mods/singleMediaAssetOut';
import mediaGroup from './mods/mediaGroup';

export default {
    components: {draggable, aggregateButton, singleMediaAsset, singleMediaAssetOut, mediaGroup},
    data() {
        return {
            // canSlide: false,
            content:undefined,
            activeId:undefined
        };
    },
    props: {
        info: {
            type: Object,
            default: () => {
                return {
                    background: '',
                    backgroundRepeat:'no-repeat',
                    backgroundColor:'#FFFFFF',
                    headerHeight: 0,
                    trace1:'',
                    contentList: [
                    ]
                };
            },
        },
        edit: {
            type:Boolean,
            default:false
        }
    },
    // computed: {
    //     headerHeight() {
    //         return this.sizeFormatter(this.info.headerHeight, 100);
    //     },
    // },
    watch:{
        info:{
            handler(newInfo) {
                localStorage.setItem('configInfo', JSON.stringify(newInfo));
            },
            // immediate: true,
            deep: true
        }
    },
    mounted() {},
    methods: {
        sizeFormatter(styleValue) {
            if(this.edit){
                return isNaN(styleValue) ? styleValue : Number(styleValue) * 3.6 + "px";
            }else {
                return isNaN(styleValue) ? styleValue : styleValue + "vw";
            }
            
        },
        styleFormatter(styleObj){
            let a = {};
            for(const i in styleObj){
                if(!isNaN(styleObj[i]) && styleObj[i] != ''){
                    if(this.edit){
                        a[i] =  Number(styleObj[i]) * 3.6 + "px";
                    } else {
                        a[i] =  styleObj[i] + "vw";
                    }
                } else if( i == 'backgroundImage' ){
                    a[i] = `url(${styleObj[i]})`;
                } else {
                    a[i] = styleObj[i];
                }
            }
            return a;
        },
        showAttr(li){
            if(this.edit){
                this.activeId = li.id;
                this.$emit('setAttr', li);
            }
        },
        delRow(li ,index){
            this.info.contentList.splice(index,1);
            this.$emit('clearForm', li.id);
        },
        copy(li ,index){
            const newLi = {
                id:new Date().getTime(),
                type:li.type,
                content:{
                    ...li.content
                },
                style:{
                    ...li.style
                }
            }
            console.log(li, newLi);
            this.info.contentList.splice(index,0, newLi);
        },
    },
};
</script>
<style lang="scss">
    .perview-box{
        width: 100%;
        background: #FFF;
        .content-box{
            min-height: 640px;
            .top{
                height: 1px;
            }
            .box_row{
                box-sizing: border-box;
                &.active{
                    border: dashed 2px #00d037;
                }
                &:hover{
                    .setup_groups{
                        display: block;
                    }
                }
                .setup_groups{
                    text-align: center;
                    line-height: 15px;
                    position: absolute;
                    right: -20px;
                    top: 0;
                    border-radius: 3px;
                    display: none;
                    .btn_mini{
                        width: 20px;
                        height: 20px;
                        background: #efefef;
                        cursor: pointer;
                        font-size: 16px;
                        margin-bottom: 5px;
                        color: #000;
                    }
                }
            }
        }
        .aggregate_button{

        }
    }
</style>
