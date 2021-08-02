<template>
    <div class="content_box single_media_asset2 g c rc">
        <div class="pic" :style="styles"></div>
        <template v-if="content.text">
            <div class="text_box">{{content.text}}</div>
        </template>
        <template v-if="content.subTitle">
            <div class="text_box sub">{{content.subTitle}}</div>
        </template> 
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    props: {
        styles:{
            type: Object,
            default(){
                return { fontSize: 3 }
            }
        },
        content:{
            type: Object,
            default(){
                return { text: '' }
            }
        },
    },
    mounted(){
        
    },
    methods:{
        clickHandle () {
            if(this.edit){
                return false;
            } else {
                /* clickType : <el-radio :label="1">链接</el-radio>
                                        <el-radio :label="2">专题</el-radio>
                                        <el-radio :label="3">专区</el-radio>
                                        <!-- <el-radio :label="4">弹窗</el-radio> -->
                                        <el-radio :label="5">不可点击</el-radio> */
            }
        }
    }
}
</script>
<style lang="scss">
.single_media_asset2{
    position: relative;
    font-size: 24px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    // box-shadow: 0 0px 3px rgb(0 0 0 / 30%);
    .pic{
        width: 100%;
        flex: 1;
    }
    .text_box{
        width: 100%;
        height: 20px;
        font-size: 14px;
        line-height: 1.4;
        &.sub{
            font-size: 12px;
        }
    }
}
</style>