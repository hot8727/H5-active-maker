<template>
    <div class="content_box media_group g c rc">
        <div class="group_title f c rb" v-if="content.titleShow">
            <template v-if="content.title">
                <div class="text_box" :style="{color:content.titleColor}">{{content.title}}</div>
            </template>
            <template v-if="content.subTitle">
                <div class="text_box sub" :style="{color:content.subTitleColor}" @click="more">
                    {{content.subTitle}}
                    <svg-icon icon-class="more"/>
                </div>
            </template> 
        </div>
        <div class="media_list">
            <ul class="fw rb">
                <li v-for="li in list" :key="li.contentId" @click="clickHandle(li)">
                    <img :src="li.contentPicUrl">
                    <div class="m_title">
                        {{li.contentName}}
                    </div>
                    <div class="m_sub_title">
                        {{li.contentName}}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            list:[]
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
    watch:{
        'content.specialId':{
            handler() {
                this.getContent();
            },
            // immediate: true,
            deep: true
        }
    },
    mounted(){
        this.getContent();
    },
    methods:{
        more(){
            if(this.edit){
                return false;
            } else {
                // 点击去向
                
            }
        },
        clickHandle (item) {
            if(this.edit){
                return false;
            } else {
                // 点击去向
                
            }
        },
        getContent() {
            const params = {
                'equipmentId':'1',
                'pageNum':this.content.pageNum,
                'pageSize':this.content.pageSize,
                'passId':sessionStorage.getItem('passId') ? sessionStorage.getItem('passId') : undefined,
                'phone':sessionStorage.getItem('phone') ? sessionStorage.getItem('phone') : undefined,
                // 'channelId':'HJBX',
                'specialId':this.content.specialId,
                'typeId':this.content.typeId
            };
        },
    }
}
</script>
<style lang="scss">
.media_group{
    position: relative;
    font-size: 24px;
    width: 100%;
    // box-shadow: 0 0px 3px rgb(0 0 0 / 30%);
    .group_title{
        width: 100%;
        height: 30px;
        margin-bottom: 15px;
        .text_box{
            font-size: 20px;
            line-height: 30px;
            &.sub{
                font-size: 12px;
                color: #696969;
            }
        }
    }
    .media_list{
        ul{
            li{
                width: 146px;
                margin-bottom: 12px;
                img{
                    width: 100%;
                    height: 146px;
                    object-fit: cover;
                    border-radius: 5px;
                    margin-bottom: 2px;
                    box-shadow: 0 0px 4px rgb(0 0 0 / 30%);
                }
                .m_title, .m_sub_title{
                    font-size: 15px;
                    line-height: 27px;
                    overflow: hidden;
                    word-break: keep-all;
                    text-overflow: ellipsis;
                }
                .m_sub_title{
                    font-size: 12px;
                    line-height: 24px;
                    height: 18px;
                    color:#7e7e7e
                }
            }
        }
    }
    
}
</style>