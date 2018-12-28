<template>
    <div class="login-contain">
        <div class="login-icon">
            <img src="@/assets/images/login-icon.png" alt="" class="login-img">
        </div>
        <div class="login-form">
            <form action="">
                <div class="input-contain">
                    <span class="input-name">账号</span>
                    <input type="text" placeholder="请输入卡号/手机号" class="form-input" @input="loginInput" v-model="number" >
                </div>
                <div class="input-contain">
                    <span class="input-name">密码</span>
                    <input type="password" placeholder="请输入密码" class="form-input" @input="loginInput" v-model="pwd" >
                </div>
                <div class="tool-contain">
                    <span @click="forgetPwd=true">忘记密码？</span>
                </div>
                <div class="login-btn-contain">
                    <button class="login-btn" :class="couldLogin?'active':''" @click.prevent="loginHandle">登录</button>
                </div>
                <div class="register-contain">
                    <router-link to="/register" tag="span">
                         注册账号
                    </router-link>
                   
                </div>
            </form>
        </div>
        <div class="forgetPwd-mask" v-show="forgetPwd">
            <div class="forgetPwd-contain">
                <div class="forget-title"><span>温馨提示</span></div>
                <div class="forget-content">
                    <p>初始密码：套卡与支付宝虚拟卡密码为身份证后6位，单独卡与微信虚拟卡密码为"111111"；</p>
                    <p>重置密码：虚拟卡用户请在微信或支付宝端重置密码，实体卡用户请与当地居委管理员联系重置密码；</p>
                </div>
                <div class="forget-btn" @click="forgetPwd=false">
                    <span>我知道了</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '@/assets/css/login.css'
import api from "@/api/api.js";
export default {
    name:'login',
    data(){
        return {
            couldLogin:false,
            number:'',
            pwd:'',
            forgetPwd:false,
        }
    },
    methods:{
        loginInput(){
            if(this.number&&this.pwd){
                this.couldLogin=true
            }else {
                this.couldLogin=false
            }
        },
        loginHandle(){
            if(this.number&&this.pwd){
                api.login({
                    "userCode": this.number,
                    "password": this.pwd
                }).then(res =>{
                    if(res.message=='账号或密码不正确'){
                        alert(res.message)
                    }
                    if(res.message=='操作成功'){
                        this.$store.dispatch('userlogin', {usercode:res.content.userCode,login:true,userinfo:res.content});
                        this.$router.push({
                            path: '/'
                        })
                    }
                })
            }else {
                alert('用户名或密码不能为空')
            }
            
        }   
    }
}
</script>

