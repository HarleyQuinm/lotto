<template>
    <div class="register-main">
        <div class="register-item">
            <div class="register-title vir">注册虚拟卡</div>
            <div>
                <div class="item-title">支付宝端</div>
                <div>
                    <p class="item-content">
                        打开支付宝，搜索城市服务，进入城市服务模块，选择城市为上海，在政务的其他里找到绿色账户，在登录界面中点击立即注册，完善个人信息，注册成功
                    </p>
                    <img src="@/assets/images/zhifubao.png" alt="" class="item-img">
                </div>
            </div>
            <div>
                <div class="item-title">微信端</div>
                <div>
                    <p class="item-content">
                    在微信里搜索上海绿色账户，关注微信公众号，在绿账宝菜单栏里选择自助办卡，选择“无绿账卡，我去注册”选项，完善个人信息，注册成功
                </p>
                <img src="@/assets/images/weixin.png" alt="" class="item-img">
                </div>
            </div>
        </div>
        <div class="register-item">
            <div class="register-title ent">注册实体卡</div>
            <div>
                <p class="item-content">
                    目前绿色账户实体卡由居委统一发放，您可以咨询当地居委小区是否加入绿色账户，感谢您对绿色账户的支持！目前绿色账户实体卡由居委统一发放，您可以咨询当地居委小区是否加入绿色账户，感谢您对绿色账户的支持！
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import '@/assets/css/register.css'
export default {
    name:'register',
    data(){
        return {

        }
    }
}
</script>

