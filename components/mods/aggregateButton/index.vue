<template>
    <div class="aggregate_button" :style="styles" @click="clickHandle">
        <template v-if="content.text">
        {{ content.text }}
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
        edit: {
            type:Boolean,
            default:false
        },
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
                switch(this.content.clickType){
                    case 1:
                        location.href = this.content.clickResult;
                        break;
                    case 2:
                        location.href = `/dh-apph5/hjbxH5/home/bookDetail/${this.content.clickResult}`;
                        break;
                }
                T.et(this.content.tract,{
                    eventDesc:this.content.tract,
                    tag:'单一内容点击',
                    ...t
                });
            }
        }
    }
}
</script>
<style lang="scss">
.aggregate_button{
    font-size: 24px;
    color: #0e4f91;
    width: 100%;
    height: 100%;
}
</style>