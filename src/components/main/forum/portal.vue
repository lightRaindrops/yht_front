<template>
<div class="welcome-wallper">
    <div class="welcome">
        <h2 class="wel-title">欢迎</h2>
        <p>系统论坛是一个可以交流各种工作经验的地方</p>
    </div>
    <div class="main-content">
        <h3 class="main-hd-title">
            最新图集
        </h3>
        <div class="main-content-list">
            <a class="content-item" v-for="(item,key) in list" :key="key" >
                <img :src="item" alt="">
                <div class="main-item-foot">
                    <span>{{item}}</span>
                </div>
            </a>
        </div>
        
        <div class="hr"></div>
        <h3 class="main-hd-title">
            热门内容
        </h3>
        <div class="hot-content-list">
            <div class="hot-item" v-for="(item,key) in contentList" :key="key" >
                <div class="item-content">
                    <div class="rich-pic">
                        <img :src="item">
                    </div>
                    <div class="rich-text">
                        <a href="javascript:void(0)">
                            中国人口这么多，为什么顶端人才比不了西方？
                        </a>
                        <div class="content">
                            {{str}}
                            <span class="read-article">阅读全文<i class="el-icon-arrow-down"></i></span>
                        </div>
                    </div>
                </div>
                <div class="foot-list">
                    <span class="foot-item">
                        <i class="iconfont icon-zuozhe"></i>
                        <span class="foot-name">
                            作者：Mr.5
                        </span>
                    </span>
                    <span class="foot-item">
                        <i class="iconfont icon-shijian01"></i>
                        <span class="foot-name">
                            发表时间：2018-2018
                        </span>
                    </span>
                    <span class="foot-item">
                        <i class="iconfont icon-ai45"></i>
                        <span class="foot-name">
                            点赞：666
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
        <div class="more">查看更多精彩内容</div>
    </div>
</div>
</template>
<script>
export default {
   data() {
		return {
			str: '鹤云声： 这个事非常容易，我在河南工作的时候，经常去一些非常贫困的县村里。比如，在河南的平顶山叶县。叶县下面的各乡镇非常的贫穷，有些村甚至没有电，没有自来水，甚至有的连砖房都没有。 那么，这种村子就会充斥…'
		}
	},
	computed: {
		list: function() {
			let data = [];

			for (let i = 0; i < 16; ++i) {
				let index = Math.ceil(Math.random()*500);
				data.push('http://dev.miaoyi09.com/storage/thumb/default/'+index+'.jpg');
			}

			return data;
		},
		contentList: function() {
			let data = [];

			for (let i = 0; i < 10; ++i) {
				let index = Math.ceil(Math.random()*500);
				data.push('http://dev.miaoyi09.com/storage/thumb/default/'+index+'.jpg');
			}

			return data;
		}
	} 
}
</script>
<style lang="stylus" scoped>
.welcome-wallper
    width: 100%;
    height: 100%;
    .welcome
        padding-bottom: 45px;
        maring-bottom: 45px;
        width: 100%;
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
        .main-content-list
            padding: 20px;
            display: flex;
            flex-wrap: wrap;
            .content-item
                width: 120px;
                height: 120px;
                margin-right: 10px;
                cursor: pointer;
                background-size: 100% 100%;
                position: relative;
                margin-top: 10px;
                // overflow:hidden;
                img 
                    width: 120px;
                    height: 120px;
                    transition: all 0.3s;
                    &:hover
                        //transform-origin:0 0;
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
                width: 710px;
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
            width: 710px;
            text-align:center;
            font-size: 15px;
            padding-top:15px;
            color:	#175199;
            cursor:pointer;
            &:hover
                color:#646464;
</style>


