<template>
    <div class="content_box single_media_asset" :style="styles">
        <template v-if="content.text">
            <div class="text_box">{{content.text}}</div>
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
                //点击去向
            }
        }
    }
}
</script>
<style lang="scss">
.single_media_asset{
    position: relative;
    font-size: 24px;
    color: #0e4f91;
    width: 100%;
    height: 100%;
    overflow: hidden;
    // box-shadow: 0 0px 3px rgb(0 0 0 / 30%);
    .text_box{
        background:rgba(0,0,0,0.6);
        padding: 3px 5px;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
    }
}
</style>