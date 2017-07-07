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
						<el-button size="mini" @click.native="handleAddRegion">
							<i class="fa fa-plus-circle" aria-hidden="true"></i>增加
						</el-button>
					</el-tooltip>
						<el-dialog title="增加区域" :visible.sync="showAddRegion"
						  size="tiny" :before-close="beforeClose">
						  <el-form :model="form" ref="addRegionForm" :rules="rules">
						    <el-form-item label="区域名称：" >
						      <el-input v-model="form.name" auto-complete="off"></el-input>
						    </el-form-item>
						    <el-form-item label="区域编码：">
						  		<el-input v-model="form.regionCode"></el-input>
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
					console.log('确认提交add', this.form)	
					// 提交成功后回调函数中执行beforclose()
					this.beforeClose()
				}else {
					return false
				}
			})
		},
		handleAddRegion() {
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
			return promise
		},
		renderSideBar(regions) {
			this.regions = regions
		},
	},
	created() {
		this.getRegions().then(regions => {
			this.renderSideBar(regions)
		})
	}
}
</script>