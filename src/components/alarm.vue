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
	 			<el-table-column v-for="col in columns" sortable
	 			:prop="col.name" :label="col.content"> 			
	 			</el-table-column>
    	</el-table>
		</el-col>
	</el-row>
	<div style="position:fixed;width:100%;text-align:center">
		<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      :total="100"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>

	</div>
</div>
</template>
<script type="text/javascript">
let mydata = [
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, data: "1234567889", retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, data: "1234567889", retransmission: 0},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, data: "1234567889", retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, data: "1234567889", retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, data: "1234567889", retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, data: "1234567889", retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, data: "1234567889", retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, data: "1234567889", retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, data: "1234567889", retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, data: "1234567889", retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, data: "1234567889", retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, data: "1234567889", retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, data: "1234567889", retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, data: "1234567889", retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, data: "1234567889", retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, data: "1234567889", retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, data: "1234567889", retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, data: "1234567889", retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, data: "1234567889", retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, data: "1234567889", retransmission: 1},
	{region: "东城区", "siteNumber": "321", "siteName": "配电室1", action: 1, data: "1234567889", retransmission: 1},
]
import toolBar from "./toolBar"
export default {
	data() {
		let columns = [
			{"name": "region", "content": "区域"},
			{"name": "siteNumber", "content": "站点编号"},
			{"name": "siteName", "content": "站点名称"},
			{"name": "action", "content": "报警动作"},
			{"name": "date", "content": "日期"},
			{"name": "retransmission", "content": "已转发"}
		]
		return {
			columns: columns,
			tableData: [],
			currentPage: 0,
			loading: true
		}
	},
	components: {
		toolBar
	},
	computed: {
		height() {
			return document.documentElement.clientHeight - 60 - 36 - 32
		}
	},
	methods: {
		handleSizeChange() {

		},
		handleCurrentChange() {

		},
		getData() {
			let promise = new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(mydata)
				}, 1000)
			})
			return promise
		}
	},
	created() {
		this.loading = true
		this.getData().then(data => {
			this.tableData = data
			this.$nextTick(() => {
				this.loading = false
			})
		})
	}
}
</script>