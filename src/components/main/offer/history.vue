<template>
    <div class="history-wappler">
        <div class="history__container shadow">
            <section class="container__section table-action">

                <div class="filter">
                    <!--过滤方案-->
                    <div class="filter__idea">
                        <span class="subtitle">快捷过滤 </span>
                        <span class="title">方案: </span>
                        <span class="program-list">
                            <div class="program-list__item"
                                v-for="(item,key) in ProgramList"
                                :key="key"
                                :class="{active:ProgramListIndex == item.id}"
                                @click="ChangeProgramHandle(item.id)"
                                >
                                {{item.name}}
                            </div>
                        </span>
                    </div>
                    <!--过滤方案 end-->
                    <!--快速过滤-->
                    <div class="filter__program">
                        <div class="filter-input-list" :class="{isActive: ProgramActive}">
                            <div class="item-container">
                                <div class="filter-input__item" v-for="(item, index) in FastQuery" :key="index" v-show="index == 0 ? true : ProgramActive">
                                    <div class="input__items">
                                        <el-select v-model="item.name" @change="QueryFieldSelect">
                                            <el-option v-for="(it, k) in FastQueryFields" :key="k" :label="it.label" :value="it.value" ></el-option>
                                        </el-select>
                                    </div>
                                    <div class="input__items">
                                        <el-select v-model="item.operate">
                                            <el-option v-for="(it, k) in Operates" :key="k" :label="it.label" :value="it.value"></el-option>
                                        </el-select>
                                    </div>
                                    <div class="text-input">
                                        <el-input v-if="item.field_type == 'string'" v-model="item.value" placeholder="请输入内容"></el-input>
                                        <el-date-picker
                                            v-if="item.field_type == 'date'"
                                            v-model="item.value"
                                            type="date"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </div>
                                    <el-button type="text" icon="el-icon-remove" style="margin-left:3px" title="移除" v-if="index > 0" @click="RemoveCondition(item.uid)"></el-button>
                                </div>
                                <div class="add-condition" v-show="ProgramActive">
                                    <el-button type="text" icon="el-icon-circle-plus" @click="AddCondition">添加条件</el-button>
                                </div>
                            </div>
                            <div class="more" :title="MoreIconTitle"><i class="el-icon-d-arrow-left" :class="{'more-up':ProgramActive}" @click="ChangeMoreCondition"></i></div>
                        </div>
                        <div class="btns">
                            <div class="btns-container">
                                <el-button type="primary">搜 索</el-button>
                                <a href="javascript:void(0)">保存</a>
                                <a href="javascript:void(0)" @click="ResetProgam">重置</a>
                            </div>
                        </div>
                    </div>
                    <!--快速过滤 end-->
                </div>
            </section>
            <section class="table-data">
                <el-table
                    :data="TableData"
                    stripe
                    border
                    highlight-current-row
                >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="id" label="序号"></el-table-column>
                    <el-table-column prop="name" label="客户名称"></el-table-column>
                    <el-table-column prop="project" label="项目名称"></el-table-column>
                    <el-table-column prop="date" label="报价日期"></el-table-column>
                    <el-table-column prop="user" label="业务员"></el-table-column>
                    <el-table-column prop="brand" label="品牌"></el-table-column>
                    <el-table-column prop="dispatch" label="配送"></el-table-column>
                    <el-table-column prop="" label="装卸"></el-table-column>
                    <el-table-column prop="tax" label="税率"></el-table-column>
                    <el-table-column prop="remark" label="备注"></el-table-column>
                    <el-table-column prop="file" label="面价快照"></el-table-column>
                    <el-table-column prop="file" label="下载报价"></el-table-column>
                </el-table>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
			Query: "",
            FastQuery:[
                {name:1,value:"",operate: 0,field_type: "string",uid: this.makeUid()},
				// {name:2,value:"",operate: 0}
            ],
			ProgramListIndex: 0,
            ProgramActive: false,
        };
    },
    computed: {
		FastQueryFields: function() {
		    return [
		        {label: '业务员',value: 1,field_type: "string"},
		        {label: '客户名称',value: 2,field_type: "string"},
		        {label: '客户电话',value: 3,field_type: "string"},
		        {label: '报价日期',value: 4,field_type: "date"}
            ];
		},
		ProgramList: function() {
		    return [{name: '缺省方案',id: 0},{name: '张学友',id:1}];
		},
		Operates: function() {
		    return [{label: '等于',value: 1},{label:'不等于',value:0}];
		},
		MoreIconTitle() {
		    if (this.ProgramActive) return "收起";
		    else return "展开";
		},
		TableData: function() {
		    return [];
		}
    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
		AddCondition() {
		    this.FastQuery.push({name:1,value:"",operate: 0,field_type: "string",uid: this.makeUid()});
		},
		ResetProgam() {
		    this.ProgramActive = false;
		},
		ChangeProgramHandle(index) {
		    this.ProgramListIndex = index;
		},
		//过滤字段选择
		QueryFieldSelect(val) {
		    let field = this.FastQueryFields.filter(item => item.value == val);

		    if (field) {
		        this.FastQuery.some((item,index) => {

		            if (item.name == val) {
		                this.FastQuery[index].field_type = field[0].field_type;
						this.FastQuery[index].value = "";
		                return true;
		            }
		        });
		    }
		},
		ChangeMoreCondition() {
		    this.ProgramActive = !this.ProgramActive;
		},
		HiddenProgram() {
			this.ProgramActive = false;
		},
		RemoveCondition(uid) {
		   let field = this.FastQuery.filter(item => item.uid != uid);
			this.FastQuery = field;
		},
		makeUid(l) {
		    let len = l || 10;
		    let str = "qwertyuioplkjhgfdsazxcvbnm0123456789";
		    let res = "";

		    for (let i = 0; i< len ; ++i) {
		        let index = Math.floor(Math.random() * str.length);
		        res += str[index];
		    }

		    return res;
		}
    },
    components: {

    },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.history-wappler
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    .history__container
        width: 90%;
        height: 100%;
        margin: 0 auto;
        border: 1px solid #ebebeb;
        border-radius: 5px;
        transition: all 0.5s;
        .filter
            width: 100%;
            padding: 15px 15px 0px 15px;
            .filter__idea
                font-size: 14px;
                display: flex;
                .subtitle
                    color: #999;
                .title
                    color: #1a1a1a;
                    font-weight: bold;
                    margin-left: 20px;
                .program-list
                    display: flex;
                    flex: 1;
                    user-select: none;
                    .program-list__item
                        padding: 1px 4px;
                        color: #2196f3;
                        font-size: 12px;
                        margin-left: 10px;
                        cursor: pointer;
                        align-items: center;
                        transition: all 0.5s;

                    .active
                        color: #fff;
                        background: url("../../../assets/image/progress.png") ;
                        background-size: 100% 100%;
                        background: linear-gradient(to right,rgb(26,180,237), rgb(89,203,185), rgb(137,201,185));
            .filter__program
                display: flex;
                margin-top: 10px;
                position: relative;
                .filter-input-list
                    transition: all 0.3s;
                    padding: 5px 3px;
                    display: flex;
                    margin-top: 3px;
                    align-items: flex-start;
                    height: 50px;
                    overflow: hidden;
                    position: relative;
                    justify-content: space-between;
                    .item-container
                        max-height: 500px;
                        overflow-y: auto;
                        transition: all 0.5s;
                        .filter-input__item
                            display: flex;
                            margin-top: 5px;
                            transition: all 0.5s;
                            .input__items
                                margin-right: 10px;
                            .text-input
                                width: 300px;
                        .add-condition
                            font-size: 12px;
                            cursor: pointer;
                            margin-top: 8px;
                            user-select: none;

                    .more
                        cursor: pointer;
                        flex-basis: 15px;
                        transform: rotate(-90deg);
                        margin: 10px;
                        i
                            transition: all 0.3s;
                            &:hover
                                text-shadow: 0px 2px 2px rgba(26, 26, 26, .3);
                        .more-up
                            transform: rotate(180deg);
                .filter-input-list.isActive
                    box-shadow: 0 0 1px 1px rgba(66,165,245, .3);
                    border: 1px solid rgba(33,150,243,.3);
                    position: static;
                    z-index: 999;
                    height: auto;
                    transition: all 0.3s;
                    background: #fff;
                .btns
                    margin: 15px 5px;
                    display: flex;
                    align-items: flex-start;
                    font-size: 16px;
                    .btns-container
                        display: flex;
                        align-items: flex-end;
                        a
                            margin-left: 8px;
                            font-size: 12px;
                            color: rgb(128,128,128);
                            &:hover
                                text-decoration: underline;
                                color: #2196f3;
        .table-data
            padding: 0px 15px;
            text-align: center;
            position: absolute;
            top: 115px;
</style>
