<template>
	<div class="wapper">
		我de 
	</div>
</template>
<script type="text/javascript">
import AarticlePublish from './article/publish.vue';
import AarticleDrafts from './article/drafts.vue';

export default {
	data() {
		return {
			activeName: 'first'
		}
	},
	
	methods: {
		handleClick(tab, event) {
			
		}
	},
	components: {
		'article-publish': AarticlePublish,
		'article-drafts': AarticleDrafts
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wapper
	width: 100%;
	height: 100%;
	position: relative;
	.article-container
		position: relative;
</style>