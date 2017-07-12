<template>
<div v-loading="loading"	element-loading-text="加载中..." id="subscriber">
	<el-row>
		<el-col :span="5">
		<side-bar @selectRegion="handleChangeRegion"></side-bar>
		</el-col>
		<el-col :span="19">			
			<el-row>
				<el-col :span="8" :offset="15">
					<el-input placeholder="请输入人员姓名" 
						v-model="queryBean.name" size="mini">		
			    	<el-button slot="append" icon="search" size="mini" @click.native="handleSearch">
			    		搜索
			    	</el-button>
			    </el-input>
		    </el-col>
		    <el-col :span="1">
			    <el-tooltip  content="新增人员">
						<el-button size="mini" @click.native="openAddDialog">
							<i class="fa fa-plus-circle" aria-hidden="true"></i>增加
						</el-button>
					</el-tooltip>
					<el-dialog title="增加人员" :visible="showAddDialog"
					  size="tiny" :before-close="beforeCloseAdd">
					  <el-form :model="form" ref="addSubscriberForm" :rules="rules">
					    <el-form-item label="姓名：" prop="name">
					      <el-input v-model="form.name" auto-complete="off"></el-input>
					    </el-form-item>
					    <el-form-item label="手机：" prop="phone">
					  		<el-input v-model="form.phone" auto-complete="off"></el-input>
					    </el-form-item>
					  </el-form>
					  <div slot="footer">
					    <el-button @click="beforeCloseAdd">取 消</el-button>
					    <el-button type="primary" @click="doAddSubscriber">确 定</el-button>
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
	<el-dialog title="编辑人员" :visible="showEditDialog"
	   :before-close="beforeCloseEdit" :top="editType?'15%':'5%'" 
	   :class="{editDialogStyle: !editType}" ref="editDialog">
	  <transfer v-if="editType===0" v-model="partSites" 
	  	:data="allSites" :customQuery="true" 
	  	v-loading="transferLoading"
	  	:search-function="searchFunction"
	  	:titles="editSubscriberTitles" filterable filterPlaceholder="请输入站点名称"
	  	@change="handleSitesChange" style="margin: 0 auto;width:80%">
	  	<el-pagination
	  		:page-size="transferPageSize"
	  		:current-page.sync="transferCurrentPage"
	  		style="text-align:center"
	    	slot="left-footer"
			  small
			  layout="prev, pager, next"
			  @current-change="handleTransferCurrentChange"
			  :total="subscriberTotal">
			</el-pagination>
			<!-- <el-button-group slot="left-footer" class="subscriber_btns_group">
			  <el-button icon="arrow-left" size="mini">上一页</el-button>
			  <el-button size="mini">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
			</el-button-group> -->
	  </transfer>
	  <el-form :model="form" ref="addSubscriberForm" :rules="rules" v-if="editType===1">
	    <el-form-item label="姓名：" prop="name">
	      <el-input v-model="form.name" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="手机：" prop="phone">
	  		<el-input v-model="form.phone" auto-complete="off"></el-input>
	    </el-form-item>
	  </el-form>
	  <div v-if="editType===2" style="">确认删除此项数据？</div>
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
		// 	{"name": "phone", "content": "站点编号"},
		// 	{"name": "name", "content": "站点名称"},
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
			// currentPage: 0,
			loading: true,
			currentPage: 1,
			pageSize: 10,
			total: 100,
			subscriberTotal: 160,
			currentRegion: "",
			queryBean: {
				name: ""
			},
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
				// phone: [{required: true, message: "此项不可为空", trigger: 'blur'}],
				phone: [{validator: validatePhone, trigger: 'blur,change'}]
			},
			changedSites: {
				added: [],		// 新增的sites
				removed: []		// 移除掉的sites
			},
			editSubscriberTitles: ["全部站点", "已订阅站点"],
			transferPageSize: 30,
			editType: 0,
			transferLoading: false,
			currentSubscriber: "",
			transferSearch: "",
			transferCurrentPage: 1
			
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
		handleTransferCurrentChange(val) {
			this.transferLoading = true
			this.transferCurrentPage = val
			// pageSize固定为30
			/*
			let cursor = (val - 1) * this.transferPageSize
			let params = {
				limit: this.transferPageSize,
				cursor: cursor,
				access_token: sessionStorage.getItem("accessToken")
			}
			if(this.currentRegion) {
				// 非全部
				let regionId = this.currentRegion._id
				params.regionId = regionId
			}
			if(this.transferSearch !== ""){
				params.name = this.transferSearch
			}
			// 全部区域
			let p1 = this.$http.get("/api/overfall-subscriber", params)
			let p2 = this.$http.get("/api/overfall-siteSubscriberMap", {
				subscriberId: this.currentSubscriber._id,
				access_token: sessionStorage.getItem("accessToken")
			})
			Promise.all([p1, p2]).then(responseList => {
				if(is.existy(responseList[0].data.result) && is.existy(responseList[0].data.result)){
					let allSites = response[0].data.result
					allSites.forEach(s => {
						s.key = s._id;
						s.label = s.name
					})
					let partSites = response[1].data.result
					partSites.forEach(s => {
						this.partSites.push(s._id)
					}) 
					this.allSites = allSites
				}else{
					this.$message({
						type: "error",
						message: "请求站点列表出错！"
					})
				}
				this.transferLoading = false
			})
			*/	

			allSites.forEach(site => {
				site.key = site._id;
				site.label = site.siteName
			})
			this.allSites = allSites
			this.partSites = ["13", "1"]

			let self = this
			setTimeout(() => {
				self.transferLoading = false
			},1000)
		},
		searchFunction(content) {
			// 搜索  名字匹配content， 带上regionId的参数
			this.transferSearch = content
			this.transferCurrentPage = 1
			this.handleTransferCurrentChange(1)
		},
		handleSitesChange(value, direction, movedKeys) {
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
		openEditDialog() {
			this.showEditDialog = true
		},
		openAddDialog() {
			this.showAddDialog = true
		},
		doAddSubscriber() {
			this.$refs.addSubscriberForm.validate(valid => {
				if(valid) {
					// 提交信息						
					// 提交成功后回调函数中执行beforclose()
					/**
					const {name, phone} = this.form
					this.$http.post("/api/overfall-subscriber", {name, phone}, {
						params: {
							access_token: sessionStorage.getItem("accessToken")
						}
					}).then(response => {
						if(is.existy(response.data)){
							this.loading = true
							this.getData(this.currentRegion).then(data => {
								this.renderTable(data)
							})
						}else{
							this.$message({
								type: "error",
								message: "增加人员失败！"
							})
						}
						this.beforeCloseAdd()
					})
					*/

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
			// 清空缓存
			this.showEditDialog = false
			if(this.editType === 0) {
				this.allSites = []
				this.partSites = []
				this.changedSites = {
					added: [],	
					removed: []	
				}
				this.transferSearch = ""
			}else if(this.editType === 1) {
				console.log(this.form)
				this.$refs.addSubscriberForm.resetFields();
				this.form = {name: "", "phone": ""}
			}else if(this.editType === 2) {

			}
			this.currentSubscriber = ""
		},
		doSubmitEdit() {
			// 先提交数据。回调函数中执行关闭
			if(this.editType === 2){
				/*
				this.$http.delete(`/api/overfall-subscriber/${this.currentSubscriber._id}`, {}, {
					params: {
						access_token: sessionStorage.getItem("accessToken")
					}
				}).then(response => {
					if(is.not.existy(response.data.error)){
						this.$message({
							type: "success",
							message: "删除人员成功"
						})
						this.beforeCloseEdit()
						this.loading = true
						this.getData(this.currentRegion).then(data => {
							this.renderTable(data)
						})
					}
				})
				*/
				let self = this
				setTimeout(() => {
					self.beforeCloseEdit()
				}, 1000)
			}else if(this.editType === 1){
				this.$refs.addSubscriberForm.validate(valid => {
					if(valid) {
						// 提交信息						
						// 提交成功后回调函数中执行beforclose()
						/*						
						this.$http.put(`/api/overfall-subscriber/${this.currentSubscriber._id}`, {
							name: this.form.name,
							phone: this.form.phone
						}, {
							params: {
								access_token: sessionStorage.getItem("accessToken")
							}
						}).then(rsp => {
							if(is.not.existy(rsp.data.error)){
								this.$message({
									type: "success",
									message: "更新站点成功"
								})
								this.beforeCloseEdit()
								// 重新刷新
								this.loading = true
								this.getData(this.currentRegion).then(data => {
									this.renderTable(data)
								})
							}
						})
						*/
						let self = this
						setTimeout(() => {
							self.$message({
								type: "warning",
								message: `name: ${self.form.name} code: ${self.form.phone}`
							})
							self.beforeCloseEdit()
						}, 1000)
					}else {
						return false
					}
				})
			}else if(this.editType == 0){
				/*
				let {added, removed} = this.changedSites
				let allPromise = []
				is.not.empty(added) && added.forEach(siteId => {
					let site = this.allSites.find(s => s._id === siteId)
					let datas = {
						siteId: siteId,
						siteName: site?site.siteName:"",
						subscriberId: this.currentSubscriber._id,
						subscriberName: this.currentSubscriber.name
					}
					allPromise.push(this.$http.post("/api/overfall-siteSubscriberMap", datas, {
						params: {
							access_token: sessionStorage.getItem("accessToken")
						}
					}))
				})
				is.not.empty(removed) && removed.forEach(siteId => {
					let datas = {
						subscriberId: this.currentSubscriber._id,
						siteId: siteId
					}
					allPromise.push(this.$http.delete("/api/overfall-siteSubscriberMap", datas, {
						params: {
							access_token: sessionStorage.getItem("accessToken")
						}
					}))
				})
				let success = true
				is.not.empty(allPromise) && Promise.all(allPromise).then(responses => {
					for(let i = 0; i < responses.length; i++){
						if(is.existy(responses[i].data.error)){
							success = false
							this.$message({
								type: "error",
								message: "修改订阅站点有失败项"
							})
							break;
						}
					}
					if(success) {
						this.$message({
							type: "success",
							message: "更新订阅站点成功"
						})
					}
				})
				this.beforeCloseEdit()
				*/
				let self = this
				setTimeout(() => {
					self.$message({
						type: "warning",
						message: `name: ${self.form.name} code: ${self.form.phone}`
					})
					self.beforeCloseEdit()
				}, 1000)
			}
		},
		beforeCloseAdd() {
			console.log("要关闭subscribers了", this.form)
			this.$refs.addSubscriberForm.resetFields();
			this.showAddDialog = false
		},
		handleViewSite(index, row) {
			this.editType = 0
			this.currentSubscriber = row
			this.$refs.editDialog.$refs.dialog.style.height = '555px'
			this.$refs.editDialog.$refs.dialog.style.width = '750px'
			this.handleTransferCurrentChange(1)
			this.openEditDialog()			
		},
		handleEdit(index, row) {
			this.editType = 1
			this.currentSubscriber = row
			this.form = Object.assign({}, {name: row.name, phone: row.phone, "_id": row._id})
			this.$refs.editDialog.$refs.dialog.style.height = '400px'
			this.$refs.editDialog.$refs.dialog.style.width = '300px'
			this.openEditDialog()
		},
		handleDelete(index, row) {
			this.editType = 2
			this.$refs.editDialog.$refs.dialog.style.height = '180px'
			this.$refs.editDialog.$refs.dialog.style.width = '300px'
			this.openEditDialog()
		},
		handleSizeChange(val) {
			this.loading = true
			this.currentSubscriber = row
			// cursor = Math.floor(this.total/val)	* val		
			this.currentPage = 1
			this.pageSize = val
			this.getData(this.currentRegion).then(data => {
				this.renderTable(data)
			})
		},
		handleCurrentChange(val) {
			this.loading = true
			// cursor 改变成 val* this.pageSize, 重新获取数据
			this.currentPage = val
			this.getData(this.currentRegion).then(data => {
				this.renderTable(data)
			})
		},
		getData(region) {
			this.currentRegion = region
			let params = {
				access_token: 1,
				limit: this.pageSize,
				cursor: this.pageSize * (this.currentPage - 1)
			}
			let datas = Object.assign({
				access_token: sessionStorage.getItem("accessToken")
			}, this.queryBean, params)
			if(is.existy(region.regionCode)){
				datas.regionCode = region.regionCode
			}
			// let promise = this.$http.get("/api/overfall-subscriber", datas).then(response => {
			// 	if(is.existy(response.data)){
			// 		retrun Promise.resolve(response.data)
			// 	}else {
			// 		retrun Promise.reject({error: "请求人员列表出错"})
			// 	}
			// })
			let promise = new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve({result: subscribers, total: 31})
				}, 1000)
			})
			return promise
		},
		renderTable(data) {
			this.tableData = data.result
			this.total = data.total
			this.$nextTick(() => {
				this.loading = false
			})
		},
		handleChangeRegion(region) {
			this.loading = true
			this.currentPage = 1
			this.clearFilter()
			if(region === "-1"){
				console.log("导航到全部")
				this.getData("").then(data => {
					this.renderTable(data)
				})
			}else{
				console.log("导航到部分", region)
				this.getData(region).then(data => {
					this.renderTable(data)
				})
			}
		},
		handleSearch() {
			this.loading = true
			this.currentPage = 1
			this.getData(this.currentRegion).then(data => {
				this.renderTable(data)
			})
		},
		clearFilter() {
			this.queryBean = {name: ""}
		}
	},
	created() {
		this.loading = true
		this.getData("").then(data => {
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
.editDialogStyle: {
	height:900px
}
</style>
