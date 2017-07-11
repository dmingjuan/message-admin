<template>
<div>
	<el-row>
		<el-col>
			<el-row >
				<el-col :span="20">
					<el-input placeholder="请输入搜索名称" v-model="searchRegion" size="mini">
		    	</el-input>
				</el-col>
				<el-col :span="4">
					<el-tooltip  content="新增区域">
						<el-button size="mini" @click.native="openAddRegionDialog">
							<i class="fa fa-plus-circle" aria-hidden="true"></i>增加
						</el-button>
					</el-tooltip>
					<el-dialog title="增加区域" :visible="showAddRegion"
					  size="tiny" :before-close="beforeClose">
					  <el-form :model="form" ref="addRegionForm" :rules="rules">
					    <el-form-item label="区域名称：" prop="name">
					      <el-input v-model="form.name" auto-complete="off"></el-input>
					    </el-form-item>
					    <el-form-item label="区域编码：" prop="regionCode">
					  		<el-input v-model="form.regionCode" auto-complete="off"></el-input>
					    </el-form-item>
					  </el-form>
					  <div slot="footer">
					    <el-button @click="beforeClose">取 消</el-button>
					    <el-button type="primary" @click="doAddRegion">确 定</el-button>
					  </div>
					</el-dialog>
				</el-col>
			</el-row>
		</el-col>
	</el-row>
	<el-row>
		<el-col	:style="{height:height+'px',overflow:'auto','background-color': '#eef1f6'}">
			<el-menu default-active="-1" class="el-menu-vertical-demo" 
				@select="handleSelectRegion">
				<el-menu-item :index="'-1'" :style="{'text-align':'center'}">
				<i class="fa fa-tags" aria-hidden="true"></i> 全部区域
				</el-menu-item>
	      <el-menu-item :style="{'text-align':'center'}" 
	      	v-for="(val, i) in filteredRegions" :index="val.regionCode" :key="val.regionCode">
	      	<i class="fa fa-tag" aria-hidden="true"></i> {{val.name}}
	      </el-menu-item>
	    </el-menu>
		</el-col>
	</el-row>
</div>
</template>
<script type="text/javascript">
import {navs} from "./data.js"
import is from "is_js"
export default {
	data() {
		return {
			searchRegion: "",
			regions: [],
			form: {
				name: "",
				regionCode: ""
			},
			rules: {
				name: [{required: true, message: "名称不可为空", trigger: 'blur,change'}],
				regionCode: [{required: true, message: "编码不可为空", trigger: 'blur,change'}]
			},
			showAddRegion: false
		}
	},
	computed: {
		height() {
			return document.documentElement.clientHeight - 60 - 24
		},
		filteredRegions() {
			let searchContent = this.searchRegion
			return this.regions.filter(region => {
				return (region.name.indexOf(searchContent) != -1 )
			})
		}
	},
	methods: {
		beforeClose() {
			console.log("要关闭了", this.form)
			this.$refs.addRegionForm.resetFields();
			this.showAddRegion = false
		},
		doAddRegion() {
			this.$refs.addRegionForm.validate(valid => {
				if(valid) {
					// 提交信息						
					// 提交成功后回调函数中执行beforclose()
					/**
					要求增加时，返回增加的数据
					this.$http.post("/api/region", this.form).then(response => {
						if(is.existy(response.data) && !response.data.error){
							let newRegions = this.regions.unshift(response.data)
							this.renderSideBar(newRegions)							
						}else {
							this.$message({
								type: "error",
								message: "增加区域失败"
							})
						}
						this.beforeClose()
					})
					*/
					let self = this
					setTimeout(() => {
						self.$message({
							type: "warning",
							message: `name: ${self.form.name} code: ${self.form.regionCode}`
						})
						self.beforeClose()
					}, 1000)
				}else {
					return false
				}
			})
		},
		openAddRegionDialog() {
			this.showAddRegion = true
		},
		handleSelectRegion(index, indexPath) {
			if(index === "-1"){
				// 选中全部
				this.$emit("selectRegion", "-1")
			}else {
				// 选择部分
				let region = this.filteredRegions.find(r => {
					return r.regionCode === index
				})
				this.$emit("selectRegion", region)
			}
		},
		getRegions() {
			let promise = new Promise((resolve, reject) => {
				setTimeout(() => {
					return resolve(navs)
				}, 1000)
			})
			// let promise = this.$http.get("/api/regions", {
			// 	limit: -1,
			// 	cursor: 0,
			// 	verbose: 10
			// }).then(response => {
			// 	if(is.existy(response.data)){
			// 		return Promise.resolve(response.data)
			// 	}else{
			// 		return Promise.reject({error: "未请求到区域数据"})
			// 	}
			// })
			return promise

		},
		renderSideBar(regions) {
			this.regions = regions
		},
	},
	created() {
		this.getRegions().then(regions => {
			this.renderSideBar(regions)
		}, error => {
			this.$message({
				type: "error",
				message: error.error
			})
		})
	}
}
</script>