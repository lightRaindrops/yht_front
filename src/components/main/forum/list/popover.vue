<!--+++++
+ popover 组件封装
+	props 属性：
		list [{value: label}],
		defaultIndex: 默认显示的项，对应list中的 value	
		Itemchange: 点击后的回调,传递 list中对应的 value
+------->
<template>
	<div class="Popover-content" ref="Popver" :style="styleObj">
		<div class="Popover-title" v-show="!PopverStatus" @click="handlePopverOpen"><a href="javascript:void(0)">{{CurrentItem}}</a></div>
		<ul class="Select-list" v-show="PopverStatus">
			<li class="Select-item" v-for="items in list"  @click="handleClickItem(items.value)">
				{{items.label}}
			</li>

		</ul>
	</div>
</template>
<script>
export default{
	props: {
		list: {
			type: Array
		},
		defaultIndex: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			PopverStatus: false,
			
		}
	},
	created() {
		window.addEventListener('click', this.handlePopverClose);
	},
	destroyed() {
		window.removeEventListener('click', this.handlePopverClose);
	},
	methods: {
		handlePopverOpen() {
			this.PopverStatus = true;
		},
		handlePopverClose($event) {
    		
    		if(!this.$refs.Popver.contains($event.target)) {
    			this.PopverStatus = false;
    		}
    	},
    	handleClickItem(id) {
    		this.$emit('Itemchange', id);
    		this.PopverStatus = false;
    	}
	},
	computed: {
		CurrentItem: function() {
			for (let i in this.list) {
				if (this.list[i].value == this.defaultIndex) {
					return this.list[i].label;
				}
			}
		},
		styleObj: function() {
			if (this.PopverStatus) {
				return {'z-index': 3000};
			} else {
				return false;
			}
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.Popover-content
	position: relative;
	font-size: 14px;
	height: 40px;
	display: -webkit-box;
	-webkit-box-align: center;
	-webkit-box-pack:center;
	align-items: center;
	z-index: 999;
	.Popover-title
		// z-index: 10;
		padding: 3px 5px;
	.Select-list
		border: 1px solid #ebebeb;
		border-radius: 4px;
		background: #fff;
		box-shadow: 0 5px 20px rgba(26,26,26,.1);
		position: fixed;
		animation: fadeIn 1s;
		transition: all 0.5s;
		.Select-item
			padding: 10px 15px; 
			cursor: pointer;
			&:hover
				background: rgb(246,246,246);
</style>