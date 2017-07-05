<template>
<div>
	<el-row>
		<el-col>
			<tool-bar></tool-bar>
		</el-col>
	</el-row>
	<el-row>
		<el-col>
			<el-table :data="tableData" style="width: 100%" :height="height">
	 			<el-table-column v-for="col in columns" 
	 			:prop="col.name" :label="col.content"> 			
	 			</el-table-column>
    </el-table>
		</el-col>
	</el-row>
	<el-row style="position:fixed">
		<el-col>
			<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      :total="100"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
		</el-col>
	</el-row>
</div>
</template>
<script type="text/javascript">
let mydata = [
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
			tableData: mydata,
			currentPage: 0
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

		}
	}
}
</script>