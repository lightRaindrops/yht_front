<template>
<div class="welcome-wallper" ref="portal" @scroll.passive="onScroll">
    <div class="welcome">
        <h2 class="wel-title">欢迎</h2>
        <p>系统论坛是一个可以交流各种工作经验的地方</p>
    </div>
    <div class="main-content">
        <h3 class="main-hd-title">
            最新图册
        </h3>
        <div class="main-content-list" v-viewer="options" :class="{'main-content-list-fade': picLoaded}">
            <img :src="item.thumb" alt="" :data-source="item.url" v-for="(item,key) in PicList.list" :key="key" class="pic-content-item" title="点击查看">
        </div>
        <h4 class="pic-title" :class="{'main-content-list-fade': picLoaded}">{{PicList.title}} <span class="change-pic" v-if="picLoaded" @click="changePhoto">换一个图册</span></h4>
        <div class="hr"></div>
        <h3 class="main-hd-title">
            最新推荐
        </h3>
        <div class="hot-content-list">
            <div class="hot-item" v-for="(item,key) in ArticleList" :key="key" >
                <div class="item-content">
                    <div class="rich-pic" v-if="item.titlepic">
                        <img :src="item.titlepic" @click="showArticle(item.id)">
                    </div>
                    <div class="rich-text">
                        <a href="javascript:void(0)" @click="showArticle(item.id)">
                            {{item.title}}
                        </a>
                        <div class="content" @click="showArticle(item.id)">
                            {{item.abstract}}
                            <span class="read-article" >阅读全文<i class="el-icon-arrow-down"></i></span>
                        </div>
                    </div>
                </div>
                <div class="foot-list">
                    <span class="foot-item">
                        <i class="iconfont icon-zuozhe"></i>
                        <span class="foot-name">
                            作者：{{item.user}}
                        </span>
                    </span>
                    <span class="foot-item">
                        <i class="iconfont icon-shijian01"></i>
                        <span class="foot-name">
                            发表时间：{{item.created}}
                        </span>
                    </span>
                    <span class="foot-item">
                        <i class="iconfont icon-ai45"></i>
                        <span class="foot-name">
                            点赞：{{item.agree}}
                        </span>
                    </span>
                     <span class="foot-item">
                        <i class="iconfont icon-Collection"></i>
                        <span class="foot-name">
                            收藏
                        </span>
                    </span>
                    
                </div>
            </div>
        </div>
        <div class="more"><span @click="LoadMore">{{LoadStr}}</span></div>
    </div>
</div>
</template>
<script>
import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer';
import Vue from 'vue';
Vue.use(Viewer);

export default {
   data() {
		return {
            options: {
                toolbar: true,
                url: 'data-source'
            },
            pagination: {
                pagesize: 10,
                pagenow: 1,
            },
            picLoaded: false,
			scrollInit: false,
            loadMoreStatus: false,
        }
	},
    created() {
        this.loadPic();
        this.loadArticle();
    },
    activated() {
        //从文章页返回到当前页  滚动到上一次浏览的位置
        this.$nextTick(() => {
            this.$refs.portal.scrollTo(0, this.$route.meta.scrollTop);
            this.scrollInit = true;
        })
    },
    deactivated() {
        this.scrollInit = false;
    },
	computed: {
		list: function() {
			let data = [];

			for (let i = 0; i < 16; ++i) {
				let index = Math.ceil(Math.random()*500);
				data.push('https://picsum.photos/120/120?t='+new Date().getTime()+'&r='+index);
			}

			return data;
		},
        PicList: function() {
            return this.$store.state.user.PortalPicList;
        },
        ArticleList: function() {
            return this.$store.state.user.PortalArticleData.data;
        },
		contentList: function() {
			let data = [];

			for (let i = 0; i < 10; ++i) {
				let index = Math.ceil(Math.random()*500);
				data.push('https://picsum.photos/190/105?t='+new Date().getTime()+'&r='+index);
			}

			return data;
		},
        loaded: function() {
            return this.$store.state.user.PortalArticleData.loaded;
        },
        LoadStr: function() {
             
            if (this.loaded) {
                return '已加载完毕';
            }
            else {
                 if (this.loadMoreStatus) {
                    return '加载中...';
                }
                else {
                    return '查看更多精彩内容';
                }
            }
           
        }
	},
    methods: {
        loadPic() {
            this.picLoaded = false;
            this.$store.dispatch('PortalPicList').then(() => {
                this.picLoaded = true;
            });
           
        },
        loadArticle() {
            this.loadMoreStatus = true;
             //获取首页文章
            this.$store.dispatch('ArticlePortalShow', this.pagination).then(() => {
                this.loadMoreStatus = false;
            });
        },
        changePhoto() {
            this.loadPic();
        },
        showArticle(id) {
            this.$router.push('/app/forum/article/'+id);
        },
        LoadMore() {
            if (!this.loaded) {
                ++this.pagination.pagenow;
                this.loadArticle();
            }
        },
        //滚动时记住当前位置
        onScroll($event) {
            if (this.scrollInit) {
                this.$route.meta.scrollTop = this.$refs.portal.scrollTop;
            }
        }
    } 
}
</script>
<style lang="stylus" scoped>
.welcome-wallper
    max-width: 1200px;
    height: 100%;
    overflow-y:auto;
    .welcome
        padding-bottom: 45px;
        maring-bottom: 45px;
        width: 90%;
        border-bottom: 1px solid #e5e5e5;
        .wel-title
            margin-bottom: 40px;
            font-size: 36px;
            line-height 38px;
            font-weight: 400;
    .main-content
        padding-bottom: 45px;
        maring-bottom: 45px;
        .main-hd-title
            display:inline-block;
            font-size: 18px;
            font-weight: 400;
        .pic-title
            margin: 0;
            text-align: center;
            .change-pic
                color: #409EFF;
                margin-left:3px;
                cursor: pointer;
        .main-content-list-fade
            animation: fadeIn 0.8s;
        .main-content-list
            padding: 20px;
            display: flex;
            flex-wrap: wrap;
            transition: all 0.3s;
            .pic-content-item
                width: 120px;
                height: 120px;
                margin-right: 10px;
                cursor: pointer;
                background-size: 100% 100%;
                position: relative;
                margin-top: 10px;
                transition: all 0.3s;
                &:hover
                    transform:scale(1.1);
                        
                .main-item-foot
                    background: rgba(0,0,0,0.5);
                    width: 100%;
                    height:20px;
                    color:#fff;
                    position: absolute;
                    bottom: 0;
                    text-align: center;
                .item-foot.active
                    visibility: visible;
        .hot-content-list
            padding: 0px;
            .hot-item
                width: 800px;
                padding: 20px;
                .item-content
                    display: flex;
                    .rich-pic
                        cursor: pointer;
                        width: 190px;
                        height: 105px;
                        flex-basis: 190px;
                        margin-right: 10px;
                        border-radius: 3px;
                        overflow: hidden;
                        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
                        img 
                            width: 100%;
                            height: 100%;
                            transition: all 0.3s;
                            &:hover
                                transform: scale(1.1);
                    .rich-text
                        flex:1;
                        a
                            font-size: 	16px;
                            font-weight: 600;
                            color: #1a1a1a;
                            margin-bottom: 15px;
                            &:hover
                                color: #175199;
                        .content
                            cursor:pointer;
                            margin-top:10px;
                            .read-article
                                cursor: pointer;
                                margin-left: 5px;
                                color: #175199;
                                &:hover
                                    color:#646464
                            &:hover
                                color: #646464;
                .foot-list
                    display: flex;
                    color: #646464;
                    padding: 10px 10px 0px 20px;
                    .foot-item
                        margin-right: 20px;
        .more
            width: 800px;
            text-align:center;
            font-size: 15px;
            padding-top:15px;
            color:	#ff4081;
            cursor:pointer;
            user-select: none;
            &:hover
                color:#ff5000;
</style>


