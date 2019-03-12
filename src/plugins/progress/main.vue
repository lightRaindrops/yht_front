<template>
    <div id="my-progress">
        <div class="progress-line" v-show="visible" :style="{width: value+'%'}"></div>
    </div>
</template>

<script>
	export default {
		data() {
		    return {
		        visible: false,
		        value: 0,
		    }
		},
		methods: {
		    start() {
		        if (this.visible) return;
				this.visible = true;
				this.value = 0;
				this.inc();
		    },
		    inc() {
		        let iSpeed = 5, end = 95;
		        this.value = 0;
                this.timer = setInterval(() => {
		            if (parseInt(this.value) >= end) clearInterval(this.timer);
		            this.value += Math.ceil((end - this.value) / iSpeed);
		        }, 300);
		    },
		    done() {
		        clearInterval(this.timer);
		        this.value = 100;
		        setTimeout(() => {
		            this.visible = false;
		        }, 300);
		    }
		},
	}
</script>

<style scoped>
#my-progress {
    width: 100%;
    height: 2px;
    position: fixed;
    top: 0px;
    left: 0px;
}
#my-progress .progress-line {
    height: 100%;
    transition: all .3s linear;
    background: url("./progress.png");
}
</style>