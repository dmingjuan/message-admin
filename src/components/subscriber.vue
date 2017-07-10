<template>
<div v-loading="loading"	element-loading-text="加载中..." id="subscriber">
	<el-row>
		<el-col :span="5">
		<side-bar @selectRegion="handleChangeRegion"></side-bar>
		</el-col>
		<el-col :span="19">			
			<el-row>
				<el-col :span="8" :offset="15">
					<el-input placeholder="请输入内容" 
						v-model="searchSubscriber" size="mini">		
			    	<el-button slot="append" icon="search" size="mini">搜索</el-button>
			    </el-input>
		    </el-col>
		    <el-col :span="1">
			    <el-tooltip  content="新增人员">
						<el-button size="mini" @click.native="openAddDialog">
							<i class="fa fa-plus-circle" aria-hidden="true"></i>增加
						</el-button>
					</el-tooltip>
					<el-dialog title="增加运维人员" :visible="showAddDialog"
					  size="tiny" :before-close="beforeCloseAdd">
					  <el-form :model="form" ref="addPeopleForm" :rules="rules">
					    <el-form-item label="姓名：" prop="name">
					      <el-input v-model="form.name" auto-complete="off"></el-input>
					    </el-form-item>
					    <el-form-item label="手机：" prop="phone">
					  		<el-input v-model="form.phone" auto-complete="off"></el-input>
					    </el-form-item>
					  </el-form>
					  <div slot="footer">
					    <el-button @click="beforeCloseAdd">取 消</el-button>
					    <el-button type="primary" @click="doAddPeople">确 定</el-button>
					  </div>
					</el-dialog>
				</el-col>
			</el-row>
			<el-row>
				<el-col>
		    	<el-table :data="tableData" style="width: 100%" :height="tableHeight" border> 			
			 			<el-table-column sortable	prop="name" label="姓名" >
			 			</el-table-column>
			 			<el-table-column sortable	prop="phone" label="手机" >
			 			</el-table-column>
			 			<el-table-column label="操作">
			 				<template scope="scope">
			 					<el-button
				          size="small"
				          @click="handleViewSite(scope.$index, scope.row)">查看站点</el-button>
				        <el-button
				          size="small"
				          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				        <el-button
				          size="small"
				          type="danger"
				          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
	<el-dialog title="编辑站点" :visible="showEditDialog"
	   :before-close="beforeCloseEdit" top="5%" style="height:900px" ref="editDialog">
	  <transfer v-model="partSites" :data="allSites" :customQuery="true" 
	  	:search-function="searchFunction"
	  	:titles="editSiteTitles" filterable filterPlaceholder="请输入站点名称"
	  	@change="handleSiteChange" style="margin: 0 auto;width:75%">
	  	<el-pagination
	  		style="text-align:center"
	    	slot="left-footer"
			  small
			  layout="prev, pager, next"
			  :total="40">
			</el-pagination>
			<!-- <el-button-group slot="left-footer" class="subscriber_btns_group">
			  <el-button icon="arrow-left" size="mini">上一页</el-button>
			  <el-button size="mini">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
			</el-button-group> -->
	  </transfer>
	  <div slot="footer">
	    <el-button @click="beforeCloseEdit">取 消</el-button>
	    <el-button type="primary" @click="doSubmitEdit">确 定</el-button>
	  </div>
	</el-dialog>
</div>
</template>
<script type="text/javascript">
import {allSites, subscribers, partSites} from "./data.js"
import {dateFormat} from "@/util/date_format.js"
import sideBar from "./sideBar"
import transfer from "./transfer"
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
		let validatePhone = (rule, value, callback) => {
			if(value){
				if(!(/^1[34578]\d{9}$/.test(value))){ 
	        callback("请输入正确手机号")
	    	}else{
	    		callback()
	    	}
    	}else{
    		callback("此项不可为空")
    	}
		}
		return {
			// columns: columns,
			tableData: [],
			currentPage: 0,
			loading: true,
			currentPage: 1,
			pageSize: 10,
			total: 100,
			currentRegion: "",
			searchSubscriber: "",
			showEditDialog: false,
			showAddDialog: false,
			allSites: [],
			partSites: [],
			form: {
				name: "",
				phone: ""
			},
			rules: {
				name: [{required: true, message: "此项不可为空", trigger: 'blur'}],
				phone: [
					{required: true, validator: validatePhone, trigger: 'blur,change'}
				]
			},
			changedSites: {
				added: [],		// 新增的sites
				removed: []		// 移除掉的sites
			},
			editSiteTitles: ["全部站点", "已订阅站点"]
		}
	},
	components: {
		sideBar,
		transfer
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
		searchFunction() {

		},
		handleSiteChange(value, direction, movedKeys) {
			if(direction === "right") {
				// 增加site
				movedKeys.forEach(key => {
					if(is.inArray(key, this.changedSites.removed)){
						this.changedSites.removed.splice(this.changedSites.removed.indexOf(key), 1)
					}else{
						this.changedSites.added.push(key)
					}
				})			
			}else {
				// 移除site
				movedKeys.forEach(key => {
					if(is.inArray(key, this.changedSites.added)){
						this.changedSites.added.splice(this.changedSites.added.indexOf(key), 1)
					}else{
						this.changedSites.removed.push(key)
					}
				})
			}
		},
		openAddDialog() {
			this.showAddDialog = true
		},
		doAddPeople() {
			this.$refs.addPeopleForm.validate(valid => {
				if(valid) {
					// 提交信息						
					// 提交成功后回调函数中执行beforclose()
					let self = this
					setTimeout(() => {
						self.$message({
							type: "warning",
							message: `name: ${self.form.name} code: ${self.form.phone}`
						})
						self.beforeCloseAdd()
					}, 1000)
				}else {
					return false
				}
			})
		},
		beforeCloseEdit() {

		},
		doSubmitEdit() {
			console.log(this.changedSites, "changedSites")
		},
		beforeCloseAdd() {
			console.log("要关闭subscribers了", this.form)
			this.$refs.addPeopleForm.resetFields();
			this.showAddDialog = false
		},
		handleViewSite(index, row) {
			let userId = row._id
			if(this.currentRegion) {
				// 非全部
				let regionId = this.currentRegion._id
				// 当前区域下所有的user
				// userIds 与当前subscribers 的差异值
				this.allSubscribers = allSubscribers
				this.partSubscribers = partSubscribers
			}else {
				// 全部区域
				allSites.forEach(site => {
					site.key = site._id;
					site.label = site.siteName
				})
				// partSites.forEach(site => {
				// 	site.key = site._id;
				// 	site.label = site.siteName
					
				// })
				this.allSites = allSites
				this.partSites = ["4"]
			}
			console.log(this.allSites, this.partSites)
			console.log(this.$refs.editDialog.$refs.dialog)
			this.$refs.editDialog.$refs.dialog.style.height = '560px'
			this.showEditDialog = true
		},
		handleEdit(index, row) {},
		handleDelete(index, row) {

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
					resolve(subscribers)
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
<style>
.subscriber_btns_group {
	margin-top: -10%;
	padding-left: 16%;
}
</style>
