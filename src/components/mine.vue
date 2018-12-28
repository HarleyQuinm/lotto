<template>
    <div class="mine-contain">
        <div class="mine-title">
            我的奖品
        </div>
        <div class="mine-content isprize" v-show="isvir=='01'">
            <div class="ent-prize isprize">
                <div class="prize-title">{{minelist.priName}}</div>
                <div class="prize-content">
                    <p>
                        <span>中奖时间：</span>
                        <span>{{minelist.createDate | moment}}</span>
                    </p>
                    <p>
                        <span>兑奖方式：</span>
                        <span>{{minelist.excType}}</span>
                    </p>
                </div>
                <div class="prize-address">
                    <div class="prize-address-title">
                        <span>收货信息</span>
                        <img src="@/assets/images/red-edit.png" alt="" class="edit-btn" v-show="!editaddress&&!isend" @click="editaddress=true;">
                    </div>
                    <div class="prize-address-tool">
                        <span>提示：</span>
                        <p class="tool-content">中奖后会有工作人员与您取得联系，请保持手机畅通</p>
                    </div>
                    <div class="prize-address-main" v-show="!editaddress">
                        <div class="base-address">
                            <span>{{minelist.receiveName}}</span>
                            <span>{{minelist.receiveTel}}</span>
                        </div>
                        <div class="address-detail">
                           {{minelist.districtName}}{{minelist.receiveAddress}}
                        </div>
                    </div>
                    <div class="prize-address-edit" v-show="editaddress">
                        <form action="" class="prize-address-form">
                            <div class="prize-address-item">
                                收货人
                                <input type="text" placeholder="请输入收货人" v-model="addressinfo.receiveName">
                            </div>
                            <div class="prize-address-item">
                                手机号码
                                <input type="text" placeholder="请输入手机号" v-model="addressinfo.receiveTel">
                            </div>
                            <div class="prize-address-item"> 
                                行政区
                                <select name="" id="" v-model="addressinfo.area">
                                    <option value="">请选择行政区</option>
                                    <option :value="{name:item.brName}" v-for="(item,index) in district" :key="index">{{item.brName}}</option>
                                   
                                </select>
                            </div>
                            <div class="prize-address-item">
                                详细地址
                                <input type="text" placeholder="请输入楼号" v-model="addressinfo.receiveAddress">
                            </div>
                            <div class="prize-address-btn-contain">
                               <button class="prize-address-btn" @click.prevent="addressSub">确认提交</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
         <div class="mine-content" v-show="isvir=='02'">
            <div class="vir-prize">
                <div class="prize-title">{{minelist.priName}}</div>
                <div class="prize-content">
                    <p>
                        <span>中奖时间：</span>
                        <span>{{minelist.createDate | moment}}</span>
                    </p>
                    <p>
                        <span>兑奖方式：</span>
                        <span>{{minelist.excType}}</span>
                    </p>
                </div>
                <div class="prize-exchange">
                    <div class="code-contain">
                        <span class="changecode">{{minelist.excCode}}</span>
                        <!-- <span >复制</span> -->
                        <button type="button" 
                        v-clipboard:copy="minelist.excCode"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError" class="copy">复制</button>
                    </div>
                </div>
                <div class="change-explain">
                    <div class="explain-title">
                        兑换说明
                    </div>
                    <div class="explain-detail">
                        <p>1. 如何领取：登录【家乐福网上商城】APP - 【个人中心】-【我的优惠券】- 输入优惠券兑换码进行兑换</p>
                        <p>2. 优惠券使用有效期：至2019年1月10日，请在有效期内尽快使用，过期不退不补。</p>
                        <p>3. 使用渠道：优惠券仅限在【家乐福商城】APP购买商品支付时使用。</p>
                        <p>4. 同一用户仅限领取一张优惠券、仅限参与一次本优惠活动。同一账户、同一终端设备号、同一收货信息均视为同一用户。注：优惠券仅限领取的终端设备号使用（若由于刷机等原因导致券不可用，可能产生的后果及损失将由用户自行承担）。</p>
                        <p>5. 此优惠券需在绑定手机账号内一次性使用，不可转赠，不可解绑，不可与其它优惠券叠加使用，每张订单最多可以使用1张优惠券。</p>
                        <p>6. 用户参与本活动，即表示认可本活动细则。对于本次活动有任何疑问，可咨询家乐福网上商城客服：400-980-8800（周一至周日8:00至20:00）</p>
                    </div>
                </div>
            </div>
        </div>
         <div class="mine-content" v-show="isvir=='00'">
            <div class="ent-prize" >
                <img src="@/assets/images/empty.png" alt="" class="empty-img">
                <p class="empty-des">空空如也~</p>
            </div>
        </div>
    </div>
</template>
<script>
import '@/assets/css/mine.css'
import api from "@/api/api.js"
import {mapGetters} from 'vuex';
import axios from 'axios';
import $ from 'jquery'
export default {
    name:'mine',
    data(){
        return {
            editaddress:false,
            isvir:'00',
            isend:0,
            minelist:'',
            district:'',
            actid:'',
            addressinfo:{
                receiveName:'',
                receiveTel:'',
                receiveAddress:'',
                area:''
            }
        }
    },
    mounted(){
        // $('body').height($('body')[0].clientHeight);
        this.getmyprize();
        this.getarea()
    },
    computed: mapGetters({
        islogin:"islogin",
        userinfo:'userinfo',
        usercode:'usercode',
        actId:'actId'
    }),
    methods:{
        getmyprize(){
            axios.get(`${api.base}/openapi/v2/app/hm/userrecord?userCode=${this.usercode}`).then(res => {
                this.isend=res.isEnd
                this.minelist=res.data.priList[0];
                this.isvir=this.minelist.priType
                this.actid=this.minelist.id
                this.addressinfo.receiveName=this.minelist.receiveName;
                this.addressinfo.receiveTel=this.minelist.receiveTel;
                this.addressinfo.receiveAddress=this.minelist.receiveAddress;
                this.addressinfo.area={
                    name:this.minelist.districtName
                };     
            });
        },
        getarea(){
            api.getarea().then(res =>{
                this.district=res.branchList
            })
        },
        onCopy(e){
            alert('复制成功')
        },
        onError(e) {
            alert('复制失败')
        },
        addressSub(){
            this.addressinfo.receiveName.trim();
            this.addressinfo.receiveTel.trim();
            this.addressinfo.receiveAddress.trim();
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
                    alert('修改成功');
                    this.getmyprize();
                    this.editaddress=false;
                } 
            })
        },
        userApprove(){
            
        }
    }
}
</script>

