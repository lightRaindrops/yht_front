<template>
    <div class="photos-wallper">
        <div class="edit-title">
            <input  v-model.trim="photo.title" class="titleInput" placeholder="请输入标题"  @focus="cleanErr" />
            <p class="err-msg" v-if="titleErr">{{titleErrMsg}}</p>
        </div>
        <div class="photo-content">
            <div class="photo-upload">
                <el-upload
                    class="upload"
                    drag
                    :action="action"
                    :show-file-list="false"
                    :on-success="uploadSuccess"
                    :before-upload="beforeUpload"
                    :on-progress="onProgress"
                    
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处, 或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2MB</div>
                </el-upload>
            </div>
            <div class="progress">
                <span>进度:</span>
                <div class="progress-container">
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="percent" status="success"></el-progress>
                </div>
            </div>
            <div class="photo-container">
                <div class="img-list">
                    <div class="img-item" v-for="(item, key) in ImgList" :key="key">
                        <img :src="item.thumb" alt="" class="img-animation" />
                        <div class="item-action">
                            <span title="删除" @click="removePic(item)">
                                <i class="el-icon-delete" ></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="photo-btn">
            <el-button type="primary" @click.native="submitPhoto" size="medium">提交</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            photo: {
                title: "",
                list: [],
            },
            action: this.$appConst.EDITOR_IMG_URL+'?th=120&tw=120&token='+this.$store.state.user.token,
            ImgList: [],
            titleErr: false,
            titleErrMsg: "",
            listType: 'picture-card',

            fileNums: 0,
            uploaded: 0,
            percent: 0,
        };
    },
    computed: {
        
    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
        uploadSuccess(response, file, fileList) {
            if (response.state == 'success') {
                let id = this.makeKey();
                let item = {url:response.url, thumb: response.thumb,imgkey:id};
                this.uploaded += 1;
                this.ImgList.push(item);
            }
        },
        beforeUpload(file) {
            if (!this.validatorImg(file)) {
                return false;
            }            

            if (this.uploaded == this.fileNums && this.uploaded > 0) {
                this.percent = 0;
            }
            else {
                ++this.fileNums;
            }
           
            if (this.fileNums > 0) {
                // return parseInt((this.uploaded / this.fileNums)*100);
                var self = this;
                var time = setInterval(() => {
                    
                    if (self.percent < 95 && self.uploaded < self.fileNums) {
                        //当上传的文件数量为1个时  随便
                        if (self.fileNums <= 1) {
                            ++self.percent;
                        }
                        //上传数量大于1
                        if (self.fileNums > 1) {
                            //上传完成的数量小于1个时  暂停在当前文件数平均的百分比
                            if (self.uploaded < 1 && self.percent < parseInt(100 / self.fileNums)) {
                                ++self.percent;
                            }
                            //百分比和文件数量同步
                            else if (parseInt(self.uploaded / self.fileNums * 100) > self.percent) {
                                ++self.percent;
                            }
                        }
                    }
                    else if (self.uploaded == self.fileNums) {
                        clearInterval(time);
                        self.percent = 100;
                    }
                }, 100);
            }
        },
        validatorImg(file) {
            //判断文件类型和大小
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            
            if (!isJPG) {

                this.$message.error('上传图片只能是 JPG 和 PNG 格式!');
                
            }
            
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }

            return isJPG && isLt2M;
        },
        onProgress(event, file, fileList) {
           
        },
        makeKey() {
            let len = 10;
            let string = "qwertyuiopasdfghjklzxcvbnm0123456789";
            let result = "";
            for (let i = 0; i < len; ++i) {
                let tmp = string.length;
                let index = parseInt(parseInt(tmp) * Math.random());
                result += string[index];
            }

            return result;
        },
        removePic(item) {
            this.$confirm('是否要删除该图片?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    
                   let data = this.ImgList.filter((items) => {
                        if (items.imgkey != item.imgkey) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    this.ImgList = data;
                }).catch(() => {
                       
            });
        },
        submitPhoto() {
            if (!this.photo.title) {
                this.titleErr = true;
                this.titleErrMsg = '标题不能为空';

                return false;
            }

            this.photo.list = this.ImgList;

            this.$store.dispatch('ForumPhotosAdd',this.photo).then(() => {
                let response = this.$store.state.user.ForumPhotosAdd;
               
                if (response.status == 'success') {
                    this.$notify.success('操作成功');
                    this.photo.title = "";
                    this.photo.list = [];
                    this.ImgList = [];
                    this.percent = 0;
                }
                else {
                    this.$notify.error('上传失败');
                }
            });
        },
        cleanErr() {
            this.titleErr = false;
            this.titleErrMsg = "";
        }
    },
    components: {

    },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.photos-wallper
    width: 100%;
    height: 100%;
    position: relative;
    .err-msg
        color: red;
    .edit-title
        margin: 16px 0;
        width: 100%;
        position: relative;
        padding-left: 15px;
        padding-right: 15px;
        .titleInput
            width: 100%;
            font-size: 20px;
            height: 44px;
            min-height: 44px;
            font-weight: 400;
            out-line: none;
            color: #1a1a1a;
            background: transparent;
            resize: none;
            flex: 1;
            padding: 0;		
            border: 0px;
            position: relative;
            border-bottom: 1px solid #f6f6f6;
    .photo-upload
        height: 186px;
    .photo-content
        padding: 15px;
        width: 100%;
        position: relative;
        .progress
            display: flex;
            margin-top: 30px;
            padding: 10px 10px 10px 0px;
            .progress-container
                flex: 1;
                margin-left: 15px;
        .photo-container
            height: 400px;    
            width: 100%;
            margin-top: 15px;
            border: 1px solid #e6e6e6;
            border-radius: 3px;
            border-top: 5px solid #000;
            box-shadow: 0 0 6px rgba(0,0,0,.3);
            overflow-y: auto;
            padding: 15px;
            .img-list
                display: flex;
                flex-wrap: wrap;
                .img-item
                    height: 120px;
                    width: 120px;
                    position: relative;
                    transition: all 0.3s;
                    margin: 5px 10px 5px 10px;
                    border-radius:3px;
                    overflow: hidden;
                    box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 1px 1px rgba(0,0,0,.16);
                    img 
                        transition: all 0.3s;
                    .img-animation
                        animation-name: fadeIn;
                        animation-duration: 1s;
                        animation-fill-mode: forwards;
                    .item-action
                        visibility:hidden;
                        position: absolute;
                        width:100%;
                        height: 100%;
                        top:0;
                        left:0;
                        background: rgba(255,255,255,0.3);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        span 
                            display:block;
                            width:36px;
                            height: 36px;
                            display: flex;
                            cursor: pointer;
                            border-radius: 50%;
                            background: #b8312f;
                            align-items: center;
                            justify-content: center;
                            i 
                                color: #fff;
                    &:hover
                         .item-action
                            visibility:visible;     
    .photo-btn
        padding-left:15px;                     
</style>
