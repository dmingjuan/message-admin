<template>
<div>
	<el-menu theme="dark" :defaultActive="defaultActive" mode="horizontal" 
		@select="handleSelect" style="padding: 0 5%">
		<img src="../assets/logo.png" style="height:45px;float:left;padding-right:1%;padding-top:9px">
		<li style="float:left;color:#bfcbd9;height:60px;line-height: 58px;margin-right:5%;font-size:88%">
		溢水报警管理系统</li>
	  <el-menu-item style="font-weight:bold;font-size:95%" 
	  	v-for="(val, i) in navList" :index="val.route" :key="val.route">
	  	<i :class="val.cls"></i>{{val.content}}
	  </el-menu-item>
	  <li style="float:right;hight:60px;padding-top:25px;margin-right:-35px;">
	  	<el-button size="mini" type="text"><i class="el-icon-warning"></i> 注销</el-button>
	  </li>	  
  </el-menu>
  <router-view></router-view>
</div>
</template>
<script type="text/javascript">
export default {
	data() {
		let navList = [
			{content: "告警历史", route: "alarm", cls: 'el-icon-warning'},
			{content: "发送详情", route: "send", cls: "el-icon-message"},
			{content: "站点管理", route: "site", cls: "el-icon-menu"},
			{content: "人员信息", route: "subscriber", cls: "el-icon-information"},
		]
		return {
			navList: navList
		}
	},
	computed: {
		defaultActive() {
			let active = this.$router.currentRoute.name
			if(active) {
				return active
			}
			return "alarm"
		}
	},
	methods: {
		handleSelect(name, keyPath) {
			this.$router.push({path: `/overview/${name}`})
		}
	}
}
</script>