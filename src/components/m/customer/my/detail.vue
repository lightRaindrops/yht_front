<template>
	<div class="wapper">
		<div class="title">
			<span class="icon" @click="returnLast">
				<i class="iconfont icon-fanhui"></i>
			</span>
			<p class="text">客户详情</p>
		</div>
		<div class="item-title">
			{{item.name}}
		</div>
		<div class="tab-container">
			<!-- <div class="item" v-for="(items) in list" >
				<div class="label">
					{{items.keys}}
				</div>
				<div class="content">
					{{items.value}}
				</div>
			</div> -->
			<div class="item">
				<div class="label">
					发布人
				</div>
				<div class="content">{{item.creator}}</div>
			</div>
			<div class="item">
				<div class="label">
					联系方式
				</div>
				<div class="content"><a :href="'tel:'+ item.phone">{{item.phone}}</a></div>
			</div>
			<div class="item">
				<div class="label">
					领取时间
				</div>
				<!-- <div class="content">{{item.sort}}</div> -->
				<div class="content">{{item.action_date}}</div>
			</div>
			<div class="item">
				<div class="label">
					微信
				</div>
				<div class="content">{{item.wechat}}</div>
			</div>
			<div class="item">
				<div class="label">
					QQ
				</div>
				<div class="content">{{item.qq}}</div>
			</div>
			<div class="item">
				<div class="label">
					咨询品牌
				</div>
				<div class="content danger">{{item.brand}}</div>
			</div>
			<div class="item">
				<div class="label">
					地区
				</div>
				<div class="content">{{item.province}} {{item.city}} {{item.area}}</div>
			</div>
			<div class="item">
				<div class="label">
					项目名
				</div>
				<div class="content">{{item.project_name}}</div>
			</div>
			<div class="item">
				<div class="label">
					产品需求
				</div>
				<div class="content">{{item.demand}}</div>
			</div>
			<div class="item">
				<div class="label">
					备注信息
				</div>
				<div class="content">{{item.description}}</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
export default {

	data() {
		return {
			item: this.$store.state.user.CurrentCustomer
		}
	},
	
	methods: {
		returnLast() {
			this.$router.go(-1);
		},
		init() {
			if (this.item.length < 1) {
				this.$router.push('/m/customer/mine');
			}

		}
	},
	created() {
		this.init();
	}
	
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.wapper
	width: 100%;
	height: 100%;
	.title
		height: 51px;
		background: #fff;
		border-top: 1px solid rgba(26,26,26,.06);
		background-clip: content;
		display: flex;
		color: rgb(133,144,166);
		font-size: 16px;
		.icon
			height: 100%;
			flex-grow: 0;//即使有多余的空间 也不放大
			flex-basis: 50px; // 固定宽度
			display: flex;
			justify-content: center;
			align-items: center;
			i
				font-size: 25px;
		.text
			flex: 1;
			margin: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			padding-right: 50px;
	.item-title
		font-size: 16px;
		color: #455a64;
		height: 50px;
		font-weight: bold;
		padding: 0px 10px;
		display: flex;
		align-items: center;
		position: relative;
		margin-top: 9px;
		background: #fff;
		border-bottom: 1px solid #e5e5e5;
	.tab-container
		width: 100%;
		height: calc(100% - 110px);
		// top: 10px;
		position: relative;
		// top: 9px;
		overflow-y: auto;
		background: #fff;
		border-bottom: 1px solid #e5e5e5;
		.item
			display:flex;
			align-items: center;
			padding: 10px 20px;
			.label
				flex-grow: 0;
				text-align: right;
				flex-basis: 80px;
			.content
				flex: 1;
				padding-left: 20px;
			.danger
				color: #ff4081;
</style>