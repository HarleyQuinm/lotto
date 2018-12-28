<template>
    <div class="address-contain">
        <form action="" class="address-from">
            <div class="address-item">
                <span class="address-title">收货人</span>
                <input type="text" placeholder="请输入收货人" v-model="addressinfo.receiveName">
            </div>
            <div class="address-item">
                <span class="address-title">手机号码</span>
                <input type="text" placeholder="请输入手机号" v-model="addressinfo.receiveTel">
            </div>
             <div class="address-item select"> 
                <span class="address-title">行政区</span>
                <select name="" id="" v-model="addressinfo.area">
                    <option value="" >请选择行政区</option>
                    <option class="option" :value="{name:item.brName}" v-for="(item,index) in district" :key="index">{{item.brName}}</option>
                </select>
            </div>
            <div class="address-item">
                <span class="address-title">详细地址</span>
                <input type="text" placeholder="请输入楼号" v-model="addressinfo.receiveAddress">
            </div>
        </form>
        <div class="takeHandle">
            <button @click.prevent="addressSub">确认提交</button>
        </div>
    </div>
</template>
<script>
import '@/assets/css/address.css'
import api from "@/api/api.js"
import {mapGetters} from 'vuex';
import axios from 'axios';
export default {
    name:'address',
    data(){
        return {
            actid:'',
            district:'',
            addressinfo:{
                receiveName:'',
                receiveTel:'',
                receiveAddress:'',
                area:''
            }
        }
    },
    mounted(){
        this.getmyprize();
        this.getarea();
    },
    computed: mapGetters({
        islogin:"islogin",
        userinfo:'userinfo',
        usercode:'usercode',
        actId:'actId'
    }),
    methods:{
        getarea(){
            api.getarea().then(res =>{
                this.district=res.branchList
            })
        },
        getmyprize(){
            axios.get(`${api.base}/openapi/v2/app/hm/userrecord?userCode=${this.usercode}`).then(res => {
                // this.isend=res.isEnd
                this.minelist=res.data.priList[0];
                // this.isvir=this.minelist.priType
                this.actid=this.minelist.id
                this.addressinfo.receiveName=this.minelist.receiveName;
                this.addressinfo.receiveTel=this.minelist.receiveTel;
                this.addressinfo.receiveAddress=this.minelist.receiveAddress;
                this.addressinfo.area={
                    name:this.minelist.districtName
                };     
            });
        },
        addressSub(){
            if(this.addressinfo.receiveName==''||this.addressinfo.receiveName==undefined){
                alert('收货人不能为空');
                return
            }
            if(this.addressinfo.receiveTel==''||this.addressinfo.receiveTel==undefined){
                alert('手机号不能为空');
                return
            }
            if(this.addressinfo.area.name==''||this.addressinfo.area.name==undefined){
                alert('行政区不能为空');
                return
            }
            if(this.addressinfo.receiveAddress==''||this.addressinfo.receiveAddress==undefined){
                alert('详细地址不能为空不能为空');
                return
            }
            api.updateaddress({
                "actId":this.actId,
                "receiveName":this.addressinfo.receiveName,
                "receiveTel":this.addressinfo.receiveTel,
                "districtName":this.addressinfo.area.name,
                "receiveAddress":this.addressinfo.receiveAddress,
                "recordId":this.actid
            }).then(res =>{
                if(!res.content){
                    alert(res.message)
                }
                else if(res.content.msg=="保存成功"){
                    alert('修改成功')
                    this.$router.push({
                        path: '/mine'
                    })
                }
            })
            // axios.post(`${api.base}/openapi/v2/app/hm/updateRecAdd?receiveAddress=${this.addressinfo.receiveAddress}&recordId=${this.actid}`).then(res =>{
            //     if(res.data.content.msg=="保存成功"){
            //         alert('修改成功')
            //         this.$router.push({
            //         path: '/mine'
            //     })
            //     }else {
            //         alert('修改失败，请重试')
            //     }
                
            // })
        }
    }
}
</script>

