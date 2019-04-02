<!--main 首页组件-->
<template>
<div class="indexBox">
    <div class="line progress">
        <el-progress :show-text="false" :stroke-width="30" :percentage="100"></el-progress>
    </div>
    <div class="line progress">
        <el-progress :show-text="false" :stroke-width="30" color="#74c374" :percentage="70"></el-progress>
    </div>
    <div class="line progress">
        <el-progress :show-text="false" :stroke-width="30" color="#df6d69" :percentage="30"></el-progress>
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


    },
    methods: {},
    components: {

    }
}
</script>
<style lang="less">
@import "./index.less";
</style>
