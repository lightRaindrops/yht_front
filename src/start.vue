<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script type="text/javascript">
	export default {

		data() {
			return {}
		},
		methods: {
			initIconCssFile() {
				this.$store.dispatch('loadIconUrl').then(() => {
					document.querySelector('#css-link').setAttribute('href', this.$store.state.user.iconUrl.value);
				});
			},
			baseToken() {

				let params = this.parseUrl();

				if (params.token != '' && typeof (params.token) != 'undefined') {
					this.$tool.setter('token', params.token);
				}

				// console.log(this.$tool.getter('token'))
			},
			/**截取url参数**/
			parseUrl() {

				let url = window.location.href;
				let string = url.substring(url.indexOf('?') + 1).split('&');
				let params = {};

				string.forEach(item => {
					let param = item.split('=');

					params[param[0]] = param[1];
				});

				return params;
			}
		},
		created() {
			this.baseToken();
			this.parseUrl();
			this.initIconCssFile();
		},
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
    body, html
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        position: relative;
        list-style: none;
        font-family: Rubik, Helvetica Neue, Helvetica, microsoft yahei, arial, STHeiTi, sans-serif;
        transition: all 0.5s;

        #app
            width: 100%;
            height: 100%;

        // overflow:hidden;
        position: relative;

        .el-table

            th
                .cell
                    text-align: center;
                    font-size: 14px;

            .warning-row
                background: oldlace;
</style>