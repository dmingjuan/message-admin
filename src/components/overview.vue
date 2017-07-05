<template>
<div>
	<el-menu theme="dark" default-active="0" mode="horizontal" @select="handleSelect">
  <el-menu-item v-for="(val, i) in navList" :index="i+''"><i :class="val.cls"></i>{{val.content}}</el-menu-item>
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
			{content: "站点管理", route: "users", cls: "el-icon-menu"},
			{content: "运维设置", route: "log", cls: "el-icon-setting"},
		]
		return {
			navList: navList
		}
	},
	methods: {
		handleSelect(index, keyPath) {
			let route = this.navList[index].route
			console.log(this.$router)
			this.$router.push({path: `/overview/${route}`})
		}
	}
}
</script>