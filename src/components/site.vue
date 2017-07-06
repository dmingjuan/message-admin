<template>
<div>
	<el-row>
		<el-col :span="5">
			<el-input placeholder="请输入内容" v-model="searchContent" size="mini">
	    	<el-button slot="prepend" icon="search" size="mini">搜索</el-button>
	    </el-input>
		</el-col>
	</el-row>
	<el-row >
		<el-col :span="5" 
		:style="{height:height+'px',overflow:'auto'}">
			<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
	      <el-menu-item index="2"><i class="el-icon-menu"></i>导航二</el-menu-item>
	      <el-menu-item v-for="i in test" :index="i+''" :key="i">
	      	<i class="el-icon-setting"></i>导航三
	      </el-menu-item>
	    </el-menu>
		</el-col>
	</el-row>
</div>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			test: [3,4,5,6,7,8,9],//,10,11,12,13,14,15],
			searchContent: ""
		}
	},
	computed: {
		height() {
			return document.documentElement.clientHeight - 60 - 24 
		}
	},
	methods: {
		handleOpen() {

		},
		handleClose() {

		},
	}
}
</script>