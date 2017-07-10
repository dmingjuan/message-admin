<template>
<div v-loading="loading"	element-loading-text="加载中...">
	<el-row>
		<el-col :span="5">
		<side-bar @selectRegion="handleChangeRegion"></side-bar>
		</el-col>
		<el-col :span="19">			
			<el-row>
				<el-input style="width:30%;float:right;padding-right:1%" placeholder="请输入内容" 
					v-model="searchSite" size="mini">		
		    	<el-button slot="append" icon="search" size="mini">搜索</el-button>
		    </el-input>
	    	<el-tooltip  content="新增站点">
					<el-button size="mini" @click.native="openAddDialog">
						<i class="fa fa-plus-circle" aria-hidden="true"></i>增加
					</el-button>
				</el-tooltip>

				<el-dialog title="增加站点" :visible="showAddDialog"
				  size="tiny" :before-close="beforeCloseAddDialog">
				  <el-form :model="form" ref="addSiteForm" :rules="rules">
				    <el-form-item label="站点名称：" prop="siteName">
				      <el-input v-model="form.siteName" auto-complete="off"></el-input>
				    </el-form-item>
				    <el-form-item label="站点编码：" prop="siteNumber">
				  		<el-input v-model="form.siteNumber" auto-complete="off"></el-input>
				    </el-form-item>
				  </el-form>
				  <div slot="footer">
				    <el-button @click="beforeCloseAddDialog">取 消</el-button>
				    <el-button type="primary" @click="doAddSite">确 定</el-button>
				  </div>
				</el-dialog>
			</el-row>
			<el-row>
				<el-col>
		    	<el-table :data="tableData" style="width: 100%" :height="tableHeight" border> 			
			 			<el-table-column sortable	prop="siteNumber" label="站点编号" >
			 			</el-table-column>
			 			<el-table-column sortable	prop="siteName" label="站点名称" >
			 			</el-table-column>
			 			<el-table-column label="操作">
			 				<template scope="scope">
			 					<el-button
				          size="small"
				          @click="handleViewPeople(scope.$index, scope.row)">查看人员</el-button>
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
				</el-col>
			</el-row>
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
	<el-dialog title="编辑站点人员" :visible="showDialog"
	  size="tiny" :before-close="beforeClose">
	  <el-transfer v-model="allSubscribers" :data="partSubscribers"></el-transfer>
	  <div slot="footer">
	    <el-button @click="beforeClose">取 消</el-button>
	    <el-button type="primary" @click="doSubmit">确 定</el-button>
	  </div>
	</el-dialog>
</div>
</template>
<script type="text/javascript">
import {sites, allSubscribers, partSubscribers} from "./data.js"
import {dateFormat} from "@/util/date_format.js"
import sideBar from "./sideBar"
import is from "is_js"
export default {
	data() {
		// let columns = [
		// 	{"name": "region", "content": "区域"},
		// 	{"name": "siteNumber", "content": "站点编号"},
		// 	{"name": "siteName", "content": "站点名称"},
		// 	{"name": "action", "content": "报警动作"},
		// 	{"name": "timestamp", "content": "日期"},
		// 	{"name": "retransmission", "content": "已转发"}
		// ]
		return {
			// columns: columns,
			tableData: [],
			currentPage: 0,
			loading: true,
			currentPage: 1,
			pageSize: 10,
			total: 100,
			currentRegion: "",
			searchSite: "",
			showDialog: false,
			allSubscribers: [],
			partSubscribers: [],
			showAddDialog: false,
			form: {
				siteName: "",
				siteNumber: ""
			},
			rules: {
				siteName: [{required:true, message:"此项不可为空"}],
				siteNumber: [{required:true, message:"此项不可为空"}]
			}
		}
	},
	components: {
		sideBar
	},
	computed: {
		height() {
			// mini toolbar 24,default32
			return document.documentElement.clientHeight - 60 - 36 - 24 
		},
		tableHeight() {
			return document.documentElement.clientHeight - 60 - 24 - 36
		}
	},
	methods: {
		doAddSite() {
			
		},
		openAddDialog() {

		},
		doSubmit() {

		},
		beforeCloseAddDialog() {},
		beforeClose() {
			console.log("要关闭subscribers了", this.form)
			this.$refs.addRegionForm.resetFields();
			this.showAddRegion = false
		},
		handleViewPeople(index, row) {
			console.log(index, row, "index, row")
			let userIds = row.subscribers
			console.log(this.currentRegion, "currentRegion=")
			if(this.currentRegion) {
				// 非全部
				let regionId = this.currentRegion._id
				// 当前区域下所有的user
				// userIds 与当前subscribers 的差异值
				this.allSubscribers = allSubscribers
				this.partSubscribers = partSubscribers
			}else {
				// 全部区域
				this.allSubscribers = allSubscribers
				this.partSubscribers = partSubscribers
			}
		},
		handleEditSite(index, row) {},
		handleDeleteSite(index, row) {

		},
		handleSizeChange(val) {
			this.loading = true
			// cursor = Math.floor(this.total/val)	* val		
			this.currentPage = 1
			this.pageSize = val
			this.getData().then(data => {
				this.renderTable(data)
			})
		},
		handleCurrentChange(val) {
			this.loading = true
			// cursor 改变成 val* this.pageSize, 重新获取数据
			this.currentPage = val
			this.getData().then(data => {
				this.renderTable(data)
			})
		},
		getData(region) {
			let datas = {}
			if(region || this.currentRegion){
				this.currentRegion = region
				datas.regionCode = region.regionCode
			}
			// return this.$http.post("/api/sits", datas, {
			// 	params: {
			// 		access_token: 1,
			// 		limit: this.pageSize,
			// 		cursor: this.pageSize * (this.currentPage - 1)
			// 	}
			// })
			let promise = new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(sites)
				}, 1000)
			})
			return promise
		},
		renderTable(data) {
			this.tableData = data
			this.$nextTick(() => {
				this.loading = false
			})
		},
		handleChangeRegion(region) {
			this.loading = true
			this.currentPage = 1
			if(region === "-1"){
				console.log("导航到全部")
				this.getData().then(data => {
					this.renderTable(data)
				})
			}else{
				console.log("导航到部分", region)
				this.getData(region).then(data => {
					this.renderTable(data)
				})
			}
		},
		handleSearch(queryBean) {
			if(is.not.empty(queryBean)){
				console.log(queryBean)
				// 请求刷新数据
			}
		}
	},
	created() {
		this.loading = true
		this.getData().then(data => {
			this.renderTable(data)
		})
	}
}
</script>