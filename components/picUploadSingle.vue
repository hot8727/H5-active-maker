<template>
    <div class="add_pic_single g c rc" :style="{width:`${width}px`, height:`${height}px`}">
        <img v-if="src" :src="`${src}`" />
        <!-- .indexOf('http')?src: -->
        <i v-else class="el-icon-upload"></i>
        <input type="file" multiple="multiple" ref="upPhoto" @change="e=>{upPhoto(e)}" />
    </div>
</template>

<script>
/* 
w	指定目标缩略图的宽度	1-4096
h	指定目标缩略图的高度。	1-4096
e	缩放优先边， 默认值：0，表示按长边优先。
由于图片缩放过程中，原图尺寸与缩放尺寸不一定是相同比例，需要指定以长边还是短边优先进行缩放，如原图200 * 400（比例1:2），需要缩放为100 * 100（比例1:1）。长边优先时（e=0），缩放为50 * 100；短边优先时（e=1），缩放为100 200；若不特别指定，则代表长边优先。

默认值0：表示按长边优先

1表示按短边优先

l	目标缩略图大于原图是否处理。如果值是1, 即不处理；是0，表示处理。	0/1， 默认是0

http://image-demo.img-cn-hangzhou.aliyuncs.com/example.jpg@100h_100w_0e
?x-oss-process=image/resize,h_200
*/
export default {
    props:{
        src:{
            type:String,
            required: true,
            default:''
        },
        width:{
            type:Number,
            default:80
        },
        height:{
            type:Number,
            default:80
        }
    },
    data () {
        return  {

        };
    },
    methods:{
        upPhoto (e) {
            const file = e.target.files[0]; // 多图列表
            // console.log(file);
            this.uploadMultiple(file).then((res) => {
                // this.$emit('update:src', res.data.url);
                 this.$emit('update:src', res);
            });
            this.$refs['upPhoto'].value = null;
        },
        delPic () {
            this.src = '';
        },
        uploadMultiple (file) {
            return new Promise(((resolve, reject) => {
                const data = new FormData();
                data.append('file', file); // 多图上传
                /* const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    params: {
                        timestamp: Date.parse(new Date()) / 1000
                    }
                };
                this.$axios.post('/portal/oss/upload', data, config).then(res => {
                    resolve(res);
                }).catch(() => {
                    reject();
                }); */
                this.pictureProcessing(file).then(res => { 
                    resolve(res);
                });
            }));
        },
        pictureProcessing(file) {
            return new Promise(resolve => {
                // FileReader api 为用户提供了方法去读取一个文件或者一个二进制大对象，
                // 并且提供了事件模型让用户可以操作读取后的结果
                const reader = new FileReader();
                // readAsDataURL：读取为base64格式
                reader.readAsDataURL(file);
                // onload 在文件读取成功时触发
                reader.onload = () => {
                    const ImgBase64 = reader.result;
                    // 实现预览，实际是拿到图片的base64数据去挂在到图片的src上
                    resolve(ImgBase64);
                };
            });
        }
    }
};
</script>

<style lang="scss">
.add_pic_single {
    width: 80px;
    height: 80px;
    text-align: center;
    position: relative;
    overflow: hidden;
    background: #fff;
    border: solid 1px #aaa;
    cursor: pointer;
    input {
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 3;
    }
    i {
        font-size: 48px;
        line-height: 100%;
        color: #aaa;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
    }

    &:hover {
        &::before {
            z-index: 2;
        }

        img {
            z-index: 1;
        }
    }
}
</style>
