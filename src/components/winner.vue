<template>
    <div class="winner-contain">
        <router-link to="/mine">
            <div class="tomine">
                我的奖品
            </div>
        </router-link>
        
        <div class="maintitle">
            活动已经结束
        </div>
        <div class="winner-content">
            <div class="winner-title">
                幸运用户
            </div>
            <div class="winner-list">
                <div class="winner-item" v-for="(item,index) in winnerlist" :key="index">
                    <div class="item-title">
                        {{index==0?'iphone X':index==1?'苏泊尔空气净化器':'价值299元JBL音响'}}
                    </div>
                    <div class="item-content" v-if="index==0">
                        <div class="item-detail" v-for="(items,index) in item.iphoneX" :key="index">
                            <p class="winnerinfo">
                                <span>{{items.accountName}}</span>
                                <span>{{items.districtName}}</span>
                                <span>{{items.receiveTel}}</span>
                            </p>
                            <p class="greencode">
                                绿账卡号：{{items.greenCode}}
                            </p>
                        </div>
                        
                    </div>
                    <div class="item-content" v-if="index==1">
                         <div class="item-detail" v-for="(items,index) in item.苏泊尔空气净化器" :key="index">
                            <p>
                                <span>{{items.accountName}}</span>
                                <span>{{items.districtName}}</span>
                                <span>{{items.receiveTel}}</span>
                            </p>
                            <p>
                                绿账卡号：{{items.greenCode}}
                            </p>
                        </div>
                    </div>
                    <div class="item-content" v-if="index==2">
                         <div class="item-detail" v-for="(items,index) in item.价值299元JBL音响" :key="index">
                            <p>
                                <span>{{items.accountName}}</span>
                                <span>{{items.districtName}}</span>
                                <span>{{items.receiveTel}}</span>
                            </p>
                            <p>
                                绿账卡号：{{items.greenCode}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '@/assets/css/winner.css'
import api from "@/api/api.js"
import {mapGetters} from 'vuex';
export default {
    name:'winner',
    data(){
        return {
            winnerlist:''
        }
    },
    mounted(){
        this.getwinnerlist();
    },
    computed: mapGetters({
        islogin:"islogin",
        userinfo:'userinfo',
        usercode:'usercode',
        actId:'actId'
    }),
    methods:{
        getwinnerlist(){
            api.getwinnerlist({
                "actId":this.actId
            }).then(res =>{
                if(res.message=='活动进行中'){
                    alert('活动进行中')
                }
               this.winnerlist=res.content.list
            })
        }
    }
}
</script>

