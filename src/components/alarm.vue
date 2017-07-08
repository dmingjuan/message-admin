<template>
<div v-loading="loading"	element-loading-text="加载中...">
	<el-row>
		<el-col :span="5">
		<side-bar @selectRegion="handleChangeRegion"></side-bar>
		</el-col>
		<el-col :span="19">			
			<tool-bar :retransmission-group="false" :action-group="true" @query="handleSearch">
			</tool-bar>
			<el-row>
				<el-col>
					<el-table :data="tableData" style="width: 100%" :height="height">
			 			<el-table-column sortable	prop="region" label="区域" >
			 			</el-table-column>
			 			<el-table-column sortable	prop="siteNumber" label="站点编号" >
			 			</el-table-column>
			 			<el-table-column sortable	prop="siteName" label="站点名称" >
			 			</el-table-column>
			 			<el-table-column sortable	prop="action" label="报警动作" :formatter="actionFormatter">
			 			</el-table-column>
			 			<el-table-column sortable	prop="timestamp" label="日期" :formatter="dateTimeFormatter">
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
	
</div>
</template>
<script type="text/javascript">
import {mydata, mydata2, mydata3} from "./data.js"
import toolBar from "./toolBar"
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
			currentRegion: ""
		}
	},
	components: {
		toolBar,
		sideBar
	},
	computed: {
		height() {
			// mini toolbar 24,default32
			return document.documentElement.clientHeight - 60 - 36 - 24 
		}
	},
	methods: {
		actionFormatter(row, column) {
			let actionList = ["复归", "动作"]
			return actionList[row.action]
		},
		dateTimeFormatter(row, column) {
			return dateFormat(new Date(row.timestamp), "yyyy-MM-dd hh:mm:ss")
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
		getData(regionCode) {
			// let datas = {}
			// if(regionCode || this.currentRegion){
			// 	this.currentRegion = regionCode
			// 	datas.regionCode = regionCode
			// }
			// return this.$http.post("/api/sits", datas, {
			// 	params: {
			// 		access_token: 1,
			// 		limit: this.pageSize,
			// 		cursor: this.pageSize * (this.currentPage - 1)
			// 	}
			// })
			let promise = new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(mydata)
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
				this.getData(region.regionCode).then(data => {
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