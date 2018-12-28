<template>
    <div class="realname-contain">
        <form action="" class="realname-form">
            <div class="realname-item">
                <div class="realname-title">
                    身份信息
                </div>
                <div class="realname-content">
                    <div class="realname-input">
                        <span class="input-title">姓名</span>
                        <input type="text" placeholder="请输入姓名" v-model="userName">
                    </div>
                    <div class="realname-input">
                        <span class="input-title">身份证号</span>
                        <input type="text" placeholder="请输入身份证号" v-model="userId">
                    </div>
                    <div class="realname-input">
                        <span class="input-title">手机号码</span>
                        <input type="text" placeholder="请输入手机号" v-model="userTel">
                    </div>
                    <div class="realname-yzminput">
                        <span class="input-title" >验证码</span>
                        <input type="text" class="yzminput" placeholder="请输入验证码" v-model="inputYzm">
                        <span class="yzmbtn" @click="getYzm" :style="yzmCount==60?'color:#21825E':'color:#DDDDDD'">{{yzmbtn}}</span>
                    </div>
                </div>
            </div>
            <div class="realname-item">
                <div class="realname-title">
                    地址信息
                </div>
                <div class="realname-content">
                    <div class="address-content" v-show="!isvir">
                        <div class="address left">
                            {{districtName.name+streetName.name+committeeName.name+communityName.name+BuildingNumber.name+'-'+doorNum.name}}
                        </div>
                        <div class="address right"  @click="isvirHandle">
                            <img src="@/assets/images/edit.png" alt="">
                        </div>
                    </div>
                    <div class="address-edit" v-show="isvir">
                        <div class="address-item">
                            <span class="address-title select">行政区</span>
                            <select name="" id=""  v-model="districtName" disabled>
                                <option value="">请选择所在行政区</option>
                                <option :value="{code:item.brID,name:item.brName}" v-for="(item,index) in districtlist" :key="index">{{item.brName}}</option>
                            </select>
                        </div>
                        <div class="address-item select">
                            <span class="address-title">街道/镇</span>
                            <select name="" id="" v-model="streetName" @change="getnextaddress(streetName.code,'committeeName',1)">
                                <option value="">请选择所在街道</option>
                                <option :value="{code:item.brID,name:item.brName}" v-for="(item,index) in streetNamelist" :key="index">{{item.brName}}</option>
                            </select>
                        </div>
                        <div class="address-item select">
                            <span class="address-title">居委会</span>
                            <select name="" id="" v-model="committeeName" @change="getnextaddress(committeeName.code,'communityName',1)">
                                 <option value="">请选择所在居委会</option>
                                 <option :value="{code:item.brID,name:item.brName}" v-for="(item,index) in committeeNamelist" :key="index">{{item.brName}}</option>
                            </select>
                        </div>
                        <div class="address-item select">
                            <span class="address-title">小区</span>
                            <select name="" id="" v-model="communityName">
                                 <option value="">请选择所在小区</option>
                                <option :value="{code:item.brID,name:item.brName}" v-for="(item,index) in communityNamelist" :key="index">{{item.brName}}</option>
                            </select>
                        </div>
                        <div class="address-item">
                             <span class="address-title">楼号</span>
                             <input type="text" placeholder="请输入楼号" v-model="BuildingNumber.name">
                        </div>
                        <div class="address-item">
                             <span class="address-title" >门牌号</span>
                             <input type="text" placeholder="请输入门牌号" v-model="doorNum.name">
                        </div>
                    </div>
                </div>
            </div>
            <div class="realname-btn">
                <button @touchend.prevent="rzHandle">提交</button>
            </div>
        </form>
        

    </div>
</template>
<script>
import '@/assets/css/realname.css'
import api from "@/api/api.js"
import {mapGetters} from 'vuex';
export default {
    name:'realname',
    data(){
        return {
            clickCount:0,
            yzmbtn:'获取验证码',
            address:'',
            isvir:false,
            yzmCount:60,
            userName:'',
            userId:'',
            userTel:'',
            inputYzm:'',
            phoneYzm:'',
            districtlist:'',
            streetNamelist:'',
            committeeNamelist:'',
            communityNamelist:'',
            committeeName:{
                code:'',
                name:''
            },
            communityName:{
                code:'',
                name:''
            },
            districtName:{
                code:'',
                name:''
            },
            streetName:{
                code:'',
                name:''
            },
            communityAddress:{
                name:''
            },
            BuildingNumber:{
                name:''
            },
            doorNum:{
                name:''
            }
        }
    },
    computed: mapGetters({
        islogin:"islogin",
        userinfo:'userinfo',
        usercode:'usercode'
    }),
    mounted(){
        this.getuserInfo();
        this.getaddress();
        this.getdistrictName()
    },
    methods:{
        getYzm(){
            if(this.yzmCount==60){    
                 if(this.userTel==''){
                alert('请填写手机号');
                return;
            }
            api.sendCodeToPhone({
                "telephone":this.userTel
            }).then(res =>{
               if(res.message=='操作成功'){
                   if(res.content.status=='一分钟不能发送两次'){
                       alert(res.content.status)
                   }else this.phoneYzm=res.content.code;
               }
            })
            var timer = setInterval(()=> {
                this.yzmCount--
                this.yzmbtn = this.yzmCount + '秒后重新获取'
                if (this.yzmCount === 0) {
                this.yzmbtn = '获取验证码'
                this.yzmCount=60
                clearInterval(timer)
                }
            }, 1000)
        }
        },
        getaddress(){
            api.getaddress({
                "userCode":this.usercode
            }).then(res =>{
                this.committeeName={
                    code:res.content.committeeCode,
                    name:res.content.committeeName
                }
                this.communityAddress={
                    name:res.content.committeeName
                }
                this.communityName={
                    code:res.content.communityCode,
                    name:res.content.communityName
                }
                this.districtName={
                    code:res.content.districtCode,
                    name:res.content.districtName
                }
                this.streetName={
                    code:res.content.streetCode,
                    name:res.content.streetName
                }
                this.BuildingNumber={
                    name:res.content.BuildingNumber
                }
                this.doorNum={
                    name:res.content.doorNum
                }
                this.getnextaddress(this.districtName.code,'streetName',0);
                this.getnextaddress(this.streetName.code,'committeeName',0);
                this.getnextaddress(this.committeeName.code,'communityName',0);
            })
        },
        getdistrictName(){
            api.getarea().then(res =>{
                this.districtlist=res.branchList
            })
        },
        getnextaddress(id,name,type){
            api.getnextaddress({
                "supId":id
            }).then(res =>{
                if(name=='streetName'){
                    this.streetNamelist=res.branchList
                }
                if(name=='committeeName'){
                    this.committeeNamelist=res.branchList;
                        if(type==1){
                            this.committeeName.code='',
                            this.committeeName.name=''
                    }
                }
                if(name=='communityName'){
                    this.communityNamelist=res.branchList;
                        if(type==1){
                            this.communityName.code='',
                            this.communityName.name=''
                        }
                }
                
            })
        },
        getuserInfo(){
            api.getuserinfo({
                "userCode":this.usercode
            }).then(res =>{
                this.isvir=res.content.isVirtualCard=='01'?true:false
                this.userName=res.content.userName
                this.userId=res.content.idCardNumber
                this.userTel=res.content.telephone
            })
        },
        rzHandle(){ 
            if(this.userName==''){
                alert('请填写姓名');
                return
            }
            if(this.userId==''){
                alert('请填写身份证');
                return
            }
            if(this.userTel==''){
                alert('请填写手机号');
                return
            }
            if(this.inputYzm==''){
                alert('请填写验证码');
                return
            }
            if(this.streetName.code==''||this.streetName.code==undefined){
                alert('街道不能为空');
                return
            }
            if(this.committeeName.code==''||this.committeeName.code==undefined){
                alert('居委不能为空');
                return
            }
            if(this.communityName.code==''||this.communityName.code==undefined){
                alert('小区不能为空');
                return
            }
            if(this.doorNum.name==''||this.doorNum.name==undefined){
                alert('门号不能为空');
                return
            }
            if(this.BuildingNumber.name==''||this.BuildingNumber.name==undefined){
                alert('楼号不能为空');
                return
            }
            // if(this.inputYzm!=this.phoneYzm){
            //     alert('验证码错误');
            //     return 
            // }
            if(this.clickCount==1){
                return;
            }else {
                this.clickCount++
            }
            api.userApprove({
                "smsCode":this.inputYzm,
                "idCardNumber":this.userId,
                "telephone":this.userTel,
                "userName":this.userName,
                "approveChannel":"dazhuanpan",
                "doorNum":this.doorNum.name,
                "districtCode":this.districtName.code,
                "buildingNum":this.BuildingNumber.name,
                "streetCode":this.streetName.code,
                "committeeCode":this.committeeName.code,
                "communityCode":this.communityName.code,
                "userCode":this.usercode
            }).then(res =>{
                if(res.code=='500'){
                    this.clickCount=0;
                    alert(res.message)
                }
                if(res.message=='操作成功'){
                     this.$store.dispatch('userlogin', {usercode:this.usercode,login:true,userinfo:{approveStatus:'01',isVirtualCard:'02'}});
                     alert('认证成功');
                     this.clickCount=0;
                     this.$router.push({
                        path: '/'
                    })
                }
            })
            // api.addressEdit({
            //     "communityAddress":"11",
            //     "doorNum":this.doorNum.name,
            //     "districtCode":this.districtName.code,
            //     "buildingNum":this.BuildingNumber.name,
            //     "streetCode":this.streetName.code,
            //     "committeeCode":this.committeeName.code,
            //     "communityCode":this.communityName.code,
            // }).then(res =>{
            //     console.log(res)
            // })
        },
        isvirHandle(){
            this.isvir=true;
        }
    }
}
</script>

