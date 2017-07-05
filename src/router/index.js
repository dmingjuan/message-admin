import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: Hello
    // }
    {	
			name: 'login',
			path: '/login',
			component: resolve => require(["../components/login.vue"], resolve)
		},
		{
			name: "overview",
			path: "/overview",
			component: resolve => require(["../components/overview.vue"], resolve),
			children: [
				{
					path: 'alarm',
					name: "alarm",
					component: resolve => require(["../components/alarm.vue"], resolve),
					
				},
				{
					path: 'send',
					name: "send",
					component: resolve => require(["../components/send.vue"], resolve),
					
				},
				{
					path: 'site',
					name: "site",
					component: resolve => require(['../components/site.vue'], resolve),
				},
				{
					path: 'subscriber',
					name: "subscriber",
					component: resolve => require(["../components/subscriber.vue"], resolve),
					
				},
				{
					path: "",
					component: resolve => require(["../components/alarm.vue"], resolve)
				},
				{
					path: "*",
					component: resolve => require(["../components/alarm.vue"], resolve),
					beforeEnter: (to, from, next) => {
				    if(sessionStorage.getItem("accessToken")){
				    	next("/overview/alarm")
				    }else{
				    	next("/login")
				    }
				  }
				}
			],
			beforeEnter: (to, from, next) => {
		    if(sessionStorage.getItem("accessToken")){
		    	next()
		    }else{
		    	next("/login")
		    }
		  }		
		},
		//最后一项确保为默认内容，确保任何视图都能以默认效果显示出来
		{
			path: '*',
			component: resolve => require(["../components/login.vue"], resolve)
		}
  ]
})
