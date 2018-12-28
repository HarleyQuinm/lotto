<template>
    <div class="lotto-contain">
        <div class="lotto-dial">
            <div class="lotto-background">
                <img src="@/assets/images/background-one.png" alt="">
            </div>
            <router-link to='/mine'>
                 <div class="lotto-mine">
                    <span>我的奖品</span>
                </div>
            </router-link>
           
            <div class="dial-bg">
                <div class="dial-main"  :style="{transform:Rotate_angle,transition:rotate_transition}">
                    <div class="prize-list">
                        <div class="prize-item" v-for="(item,index) in prize_list" :key="index">
                            <div class="prize-pic">
                               {{item.priName}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dial-btn" @click="goLotto">
                    <img src="@/assets/images/dial-btn.png" alt="">
                    <span>20积分/次</span>
                </div>
            </div>
            <div class="dial-rabit">
                <img src="@/assets/images/rabit.png" alt="">
            </div>
        </div>
        <div class="lotto-hint">
            <div class="lotto-hint-contain">
                <div class="point-contain">
                    <span class="point-title">可用积分: </span>
                    <span class="point" v-if="islogin">&nbsp;{{validPoints}}</span>
                    <span class="point" v-if="!islogin">---</span>
                </div>
                <div class="lotto-hint-main">
                    <p class="hint-title">活动规则</p>
                    <p class="hint-item">1.活动期间,绿账用户每人仅有一次抽奖机会</p>
                    <p class="hint-item">2.每次抽奖花费20积分</p>
                    <p class="hint-item">3.本次活动仅限绿账实名用户参加</p>
                    <p class="hint-item">4.获得实物奖品后，将有工作人员与您联系,请保持电话畅通</p>
                    <p class="hint-item">5.本次活动解释权归上海惠众绿色公益发展促进中心所有</p>
                </div>
            </div>
        </div>

        <div class="auth-mask" v-show="authmask">
            <div class="auth-contain">
                <div class="auth-title"><span>您还不是实名用户</span></div>
                <div class="auth-content">
                    <p>填写实名信息，就能参加绿账大转盘活动，更有iphone X大奖等你来拿哦!</p>
                </div>
                <router-link to="/realname">
                    <div class="auth-btn" >
                        <span>去实名</span>
                    </div>
                </router-link>
                
            </div>
        </div>
        <div class="prize-mask" v-show="prizemask">
            <div class="prize-contain prize" v-show="prize">
                <div class="prize-title">恭喜你中奖了</div>
                <div class="prize-detail" v-show="prizeInfo.type=='01'">抽中{{prizeInfo.prizeName}}，确认收货信息快递到家</div>
                <div class="prize-detail" v-show="prizeInfo.type=='02'">抽中{{prizeInfo.prizeName}}，奖品详情及兑换方式可在我的奖品中查看哦！</div>
                <router-link to="/address">
                     <div class="prize-btn" v-show="prizeInfo.type=='01'">去确认</div>
                </router-link>
                <router-link to="/mine">
                    <div class="prize-btn" v-show="prizeInfo.type=='02'">我的奖品</div>
                </router-link>
            </div>

            <div class="prize-contain noprize" v-show="noint||(!prize&&hasLotto)">
                <div class="prize-title" v-show="noint">您的积分不足</div>
                <div class="prize-title" v-show="!prize&&hasLotto">很遗憾，您未中奖</div>
                <div class="prize-detail" v-show="noint">暂时不能参与抽奖，分类投放湿垃圾，即可至保洁员处领取积分，参与抽奖哦！</div>
                <div class="prize-detail noprize" v-show="!prize&&hasLotto">敬请期待下次活动</div>
            </div>
            <div class="prize-contain cannotlotto" v-show="!canlotto">
                <div class="prize-title">您已经抽过奖了</div>
                <div class="prize-detail">点击我的奖品，查看奖品信息</div>
                 <router-link to="/mine">
                    <div class="prize-btn">我的奖品</div>
                </router-link>
            </div>
            <div class="close-btn">
                <img src="@/assets/images/close.png" alt="" @click="prizemask=false;hasLotto=false;prize=false">
            </div>
        </div>


    </div>
</template>
<script>
import '@/assets/css/lottopage.css'
import api from "@/api/api.js";
import axios from 'axios';
import {mapGetters} from 'vuex';
export default {
    name:'lottopage',
    data(){
        return {
            notimeout:true,
            clicknumber:0,
            indexId:'',
            prize_list: [], //奖品列表
            // islogin:false,
            auth:false,
            canlotto:true,
            authmask:false,
            start_rotating_degree: 0,
            Rotate_angle: 0, //将要旋转的角度
            rotate_transition: "transform 5s ease-in-out", //初始化选中的过度属性控制
            hasLotto:false,
            prize:false,
            validPoints:'',
            prizeInfo:{
                type:'',
                id:'',
                prizeName:''
            },
            noint:false,
            prizemask:false,
        }
    },
    mounted(){
        this.getPrizeList();
        if(this.islogin){
            this.getuserint();
        }
        if(this.islogin&&(this.userinfo.approveStatus=='02'||this.userinfo.isVirtualCard=='01')){
            this.authmask=true
        }
    },
     computed: mapGetters({
        islogin:"islogin",
        userinfo:'userinfo',
        usercode:'usercode',
        actId:'actId'
    }),
    methods:{
        getPrizeList(){
            api.getPrizeList().then(res =>{
                this.notimeout=false
                this.$store.dispatch('getactId',res.priList[0].actId);
                if(res.isEnd==1){
                    this.$router.push({
                    path: '/winner'
                })
                }else {
                    this.prize_list=res.priList
                    this.indexId=res.priList[0].id
                }
                
            }).catch(()=>{
                alert('活动太火爆了，请您稍后再试');
                
            })
        },
        goLotto(){
            if(this.notimeout){
                return;
            }
            if(!this.islogin){
                this.$router.push({
                    path: '/login'
                })
            }else{
                if(this.clicknumber==0){
                    this.clicknumber++;
                }else {
                    return
                };
                axios.get(`${api.base}/openapi/v2/app/hm/startdraw?userCode=`+this.usercode+'&actId='+this.actId).then(res => {
                    if(res.data.message=='您已经抽过奖了'){    
                        this.canlotto=false;
                        this.prizemask=true;
                        this.clicknumber=0
                    }
                    else if(res.data.message=='当前积分不足！'){
                        this.noint=true;
                        this.prizemask=true;
                        this.clicknumber=0
                    }
                    else if(res.data.message=='操作成功'){
                        this.prize=true;
                    }else {
                        alert('活动已结束');
                        this.clicknumber=0
                    }
                    if(this.canlotto&&this.prize){
                        
                        this.hasLotto=true;
                        this.maskHandle(res.data.content.prizes.priType,res.data.content.prizes.priId);
                        let type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
                        let during_time = 5; // 默认为1s
                        let random = Math.floor(Math.random() * 7);
                        let result_index = res.data.content.prizes.priId*1-this.indexId*1; // 最终要旋转到哪一块，对应prize_list的下标
                        let result_angle = [0,60, 120, 180, 240, 300]; //最终会旋转到下标的位置所需要的度数
                        let rand_circle =6; // 附加多转几圈，2-3
                        this.canlotto = false; // 旋转结束前，不允许再次触发
                            // 转动盘子
                        let rotate_angle =
                        this.start_rotating_degree +
                        rand_circle * 360 +
                        result_angle[result_index] -
                        this.start_rotating_degree % 360;
                        this.start_rotating_degree = rotate_angle;
                        this.Rotate_angle = "rotate(-" + rotate_angle + "deg)";
                        setTimeout(()=>{
                        this.getuserint();
                        this.canlotto = true;
                        this.prizemask=true;
                        this.clicknumber=0;
                        }, 5500)
                    }
                })
               
                // // //转动指针
                // this.rotate_angle_pointer = "rotate("+this.start_rotating_degree_pointer + 360*rand_circle+"deg)";
                // this.start_rotating_degree_pointer =360*rand_circle;
            }
        },
        getuserint(){
            api.getuserint({
                "userCode":this.usercode
            }).then(res =>{
                this.validPoints=res.content.validPoints
            })
        },
        maskHandle(type,id){
            if(type=='00'){
                this.prize=false;
            }else{
                this.prize=true;
                this.prizeInfo.id=id;
                this.prizeInfo.type=type;
                this.prize_list.forEach((item,)=>{
                    if(item.id==id){
                        this.prizeInfo.prizeName=item.priName
                    }
                })
            }
        }
    }
}
</script>
