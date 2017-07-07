<template>
<div>
	<el-row >
		<el-col :span="5">
			<el-input placeholder="请输入搜索名称" v-model="searchRegion" size="mini">
	    </el-input>
		</el-col>
		<el-col :span="19">
			<el-input style="width:30%;float:right;padding-right:1%" placeholder="请输入内容" 
				v-model="searchSite" size="mini">			
	    	<el-button slot="append" icon="search" size="mini">搜索</el-button>
	    </el-input>
		</el-col>
	</el-row>
	<el-row >
		<el-col :span="5" 
		:style="{height:height+'px',overflow:'auto','background-color': '#eef1f6'}">
			<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
	      <el-menu-item index="2"><i class="el-icon-menu"></i>导航二</el-menu-item>
	      <el-menu-item v-for="i in test" :index="i+''" :key="i">
	      	<i class="el-icon-setting"></i>导航三
	      </el-menu-item>
	    </el-menu>
		</el-col>
		<el-col :span="19">
			<div>
			<el-table :data="tableData" style="width: 100%" :height="tableHeight" border>
	 			
	 			<el-table-column sortable	prop="siteNumber" label="站点编号" >
	 			</el-table-column>
	 			<el-table-column sortable	prop="siteName" label="站点名称" >
	 			</el-table-column>
	 			<el-table-column label="操作">
	 				<template scope="scope">
	 					<el-button
		          size="small"
		          @click="handleViewSite(scope.$index, scope.row)">查看人员</el-button>
		        <el-button
		          size="small"
		          @click="handleEditSite(scope.$index, scope.row)">编辑</el-button>
		        <el-button
		          size="small"
		          type="danger"
		          @click="handleDeleteSite(scope.$index, scope.row)">删除</el-button>
		      </template>
	 			</el-table-column>
    	</el-table>
    	</div>
    	<div style="position:fixed;bottom:0;">
				<el-pagination
					style="width:1%;margin:0 auto"
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page.sync="currentPage"
		      :page-sizes="[10, 20, 30, 40]"
		      :page-size="pageSize"
		      :total="total"
		      layout="total, sizes, prev, pager, next, jumper">
		    </el-pagination>

			</div>
		</el-col>
	</el-row>
</div>
</template>
<script type="text/javascript">
import {mydata4} from "./data.js"
export default {
	data() {
		return {
			test: [3,4,5,6,7,8,9,10,11,12,13,14,15],
			searchSite: "",
			searchRegion: "",
			tableData: [],
			pageSize: 10,
			currentPage: 1,
			total: 150,
		}
	},
	computed: {
		height() {
			return document.documentElement.clientHeight - 60 - 24 
		},
		tableHeight() {
			return document.documentElement.clientHeight - 60 - 24 - 36
		}
	},
	methods: {
		handleOpen() {

		},
		handleClose() {

		},
		handleEditSite() {

		},
		handleDeleteSite() {

		},
		handleViewSite() {

		},
		handleSizeChange() {

		},
		handleCurrentChange() {},

	},
	created() {
		// 请求所有的region, 
		// 渲染第一个region
		this.tableData = mydata4
	}
}
</script>