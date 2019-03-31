<template>
	<div class="message-wapper">
		<div class="tabs">
			<ul class="tabs-list">
				<li 
					v-for="(item, keys) in nav"
					:class="{'tab-active': keys == navIndex}"  
					:key="keys"
					@click="changeNav(keys)"
				>
					<span>{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="tab-content">
			<component :is="nav[navIndex].template"></component>
		</div>
	</div>
</template>
<script>
import Dynamics from './dynamics.vue';
import Answer from './answer.vue';
import AgreeDetail from './detail.vue';
import AgreeCount  from './AgreeCount.vue';
export default {
	data() {
		return {
			navIndex: 0,
			nav: [
				{name: '动态',template: Dynamics},
				{name: '回答', template: Answer},
				{name: '获赞明细', template: AgreeDetail},
				{name: '获赞统计', template: AgreeCount},
				// {name: '谁赞过我'},
				// {name: '我赞过谁'}
			]
		}
	},
	methods: {
		changeNav(index) {
			this.navIndex = index;
		}
	},
	components: {

	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.message-wapper
	width: 100%;
	// padding: 15px;
	position: relative;
	max-height: 100%;
	overflow-y:auto;
	.tabs
		width: 100%;
		position: relative;
		display: block;
		// align-items: center;
		color: #1a1a1a;
		height: 50px;
		border-bottom: 1px solid #f6f6f6;
		ul
			height: 100%;
			width: 100%;
			// flex: 1;
			// display: flex;
			// align-items: center;
			position: relative;
			// position: relative;
			li
				display: inline-block;
				padding: 0 10px;
				cursor: pointer;
				position: relative;
				transition: all 0.3s;
				// height: 100%;
				span
					padding: 14px 0px;
					display: inline-block;
					font-size: 14px;
			.tab-active
				font-weight: 600;
				transition: all 0.3s;
				&::after
					content: '';
					position: absolute;
					width: 100%;
					bottom: -1px;
					left: 0;
					right: 0;
					width: 80%;
					margin: 0 auto;
					border-bottom: 3px solid #0084ff;
					transition: all 0.3s;
	.tab-content
		width: 100%;
		position: relative;
</style>