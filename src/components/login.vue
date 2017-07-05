<template>
<div id="_login">
	<el-row>
		<el-col :span="8" :offset="6">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
			  <el-form-item label="用户" prop="username">
			    <el-input v-model="ruleForm.username"></el-input>
			  </el-form-item>
			  <el-form-item label="密码" prop="password">
			    <el-input type="password" v-model="ruleForm.password"></el-input>
			  </el-form-item>
			  <el-form-item label="验证码" prop="varificationCode">
			    <el-input v-model="ruleForm.varificationCode"></el-input>
			  </el-form-item>
			  <el-form-item label="" prop="">
			    <img ref="img" @click="refreshcaptcha"	src=""/>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
			    <el-button @click="resetForm('ruleForm')">取消</el-button>
			  </el-form-item>
			</el-form>
		</el-col>
	</el-row>
</div>
</template>
<script type="text/javascript">
// export default {
// 	data() {
// 		return {
// 			"msg": "this is login view"
// 		}
// 	}
// }
import md5 from "@/util/md5"
export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
        varificationCode: ""
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        varificationCode: [
        	{required: true, message: "验证码错误", min: 5, max: 5, trigger: 'blur,change'}
        ]
      },
      picId: ""
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    login() {	        	
      let params = {
      	client_id: "000017953450251798098136",
				client_secret: "08E9EC6793345759456CB8BAE52615F3",
				grant_type: "password",
				username: this.ruleForm.username,
				password: md5(md5(this.ruleForm.password) + this.picId),
				varificationCode: this.ruleForm.varificationCode,
				picId: this.picId,
				language: 2
      };
      let head = {
      	contentType: "application/x-www-form-urlencoded; charset=UTF-8"
      }
      this.$http.post("/oauth2/access_token", {},{head, params,emulateJSON:true}).then(response => {
        let captchaErrors = [21306, 20002, 20013, 21302]
        if(response && response.data.access_token){
      		sessionStorage.setItem("accessToken", response.data.access_token)
      		sessionStorage.setItem("refreshToken", response.data.refresh_token)
      		setTimeout(this.refreshToken, response.data.expires_in*1000*0.9) //定时刷新token
      		console.log(this)
      		this.$router.push({ path: '/overview' })
      	}else if(response && captchaErrors.indexOf(response.data.error_code) != -1){
          this.$message({
            type: "error",
            message: "验证码错误！"
          })
          this.refreshcaptcha()
        }
      })
    },

    refreshToken() {
      let token = window.sessionStorage.getItem('refreshToken')
      this.$http.post(
        '/oauth2/access_token', {}, {
          params:{
            client_id: '17953450251798098136',
            client_secret: '08E9EC6793345759456CB8BAE52615F3',
            grant_type: "refresh_token",
            refresh_token: token
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      ).then((response) => {
        sessionStorage.setItem('accessToken', response.data.access_token)
        let refresh_token = response.data.refresh_token
        if(token !== refresh_token){
          sessionStorage.setItem('refreshToken', refresh_token)
        }
        return Promise.resolve()
        // if(!isTimer){
        //   this.setTagUsers()
        // }         
      })
    },

  	refreshcaptcha() {
    	this.$http.get('/api/captchas').then(response => {
				//console.log(response.data)
				if (response.data._id) {
					this.$refs.img.src = '/api/captchas/' + response.data._id
					this.picId = response.data.pictureId
				}
			})
    }
  },
  created() {
  	this.refreshcaptcha()
  }
}
</script>
<style type="text/css">
#_login {
	height: 400px;
	margin-top: 100px;
	/*background: url("../assets/index-bg.jpg")*/
}
</style>