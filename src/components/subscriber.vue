<template>
<div>
	<el-row>
		<el-col>
			<tool-bar></tool-bar>
		</el-col>
	</el-row>
	<el-row v-loading="loading"
		element-loading-text="加载中...">
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
	 			<el-table-column sortable	prop="retransmission" label="是否已转发" :formatter="transFormatter">
	 			</el-table-column>
    	</el-table>
		</el-col>
	</el-row>
	<div style="position:fixed;bottom:0;width:100%;text-align:center">
		<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>

	</div>
</div>
</template>
<script type="text/javascript">
import {mydata, mydata2, mydata3} from "./data.js"
import toolBar from "./toolBar"
import {dateFormat} from "@/util/date_format.js"
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
			total: 100
		}
	},
	components: {
		toolBar
	},
	computed: {
		height() {
			// mini toolbar 24,default32
			return document.documentElement.clientHeight - 60 - 36 - 24 
		}
	},
	methods: {
		transFormatter(row, column) {
			let transList = ["未转发", "已转发"]
			return transList[row.retransmission]
		},
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
			let cursor = this.currentPage * val
			if(cursor > this.total){
				cursor = Math.floor(this.total / val) * val
			}
			this.getData().then(data => {
				this.renderTable(data)
				this.pageSize = val
			})
		},
		handleCurrentChange(val) {
			this.loading = true
			// cursor 改变成 val* this.pageSize, 重新获取数据
			this.getData().then(data => {
				this.renderTable(data)
				this.currentPage = val
			})
		},
		getData() {
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