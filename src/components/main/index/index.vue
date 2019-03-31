<!--main 首页组件-->
<template>
<div class="indexBox">
    <div class="line">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="0"></el-progress>
    </div>
    <div class="line">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
    </div>
</div>
</template>
<script type="text/javascript">
export default {
    props: {
        mobile: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {

        }
    },
    created() {
        console.log(Element)
    },
    methods: {},
    components: {

    }
}
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
