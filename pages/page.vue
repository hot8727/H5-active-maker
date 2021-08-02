<template>
    <div class="main">
        <preview :info.sync="form"></preview>
    </div>
</template>
<script>
// import { Toast, Dialog  } from 'vant';
import {setCookie} from 'static/base';

export default {
    data () {
        return {
            channleId: this.$route.query.channleId ? this.$route.query.channleId : 7,
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
            }
        };
    },
    computed: {
        
    },
    watch:{
        
    },
    mounted () {
        this.init();
        setTimeout(() => {
            document.title = this.form.title;
            const toolbarItems = [
                {
                    title:this.form.pageInfo.shareTitle,
                    descr:this.form.pageInfo.shareDesc,
                    thumbImage:this.form.pageInfo.shareIcon,
                    webpageUrl:`${location.href}`
                }
            ];
            this.$bridge.fun('setToolbarItems', toolbarItems).catch(() => {
                this.setShareInWechat(this);
            });
            this.$bridge.fun('hideCloseButton', 1);
        },300);
        const t = {
            'channel': 'HJQ',
            'mobile': this.$route.query.mobile,
            'UserId':this.$route.query.passId
        };
        T.vt(this.form.pageInfo.trace1,{
            eventDesc:'访问活动主页面',
            tag:this.form.pageInfo.trace1,
            ...t
        });
    },
    destroyed() {
    },
    methods: {
        init() {
            if (this.$route.query.passId) {
                setCookie('JSESSIONID', this.$route.query.JSESSIONID);
                sessionStorage.setItem('JSESSIONID', this.$route.query.JSESSIONID);
                sessionStorage.setItem('passId', this.$route.query.passId);
                sessionStorage.setItem('phone', this.$route.query.mobile);
                sessionStorage.setItem('channel', this.$route.query.channel);
            }
            if(localStorage.getItem('configInfo')){
                this.form = {
                    ...JSON.parse(localStorage.getItem('configInfo'))
                }
            }
        }
    }
};
</script>
<style lang="scss">
.main {
    min-height: 100vh;
    background: #FFF;
    background-size: 100%;
    box-sizing: border-box;
    
}
</style>
