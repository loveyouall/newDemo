<template>
  <div class="shop" v-if="status != 'loading'">
    <div class='no-vip'>
      <div class="no-vip-context f14">
        <div class='no-vip-tips'>
          <img class='no-vip-icon' src="../assets/img_vip.png" alt="">
          <div>开通会员免广告，抢鞋快人一步</div>
        </div>
        <div>去开通></div>
      </div>
      <div></div>
    </div>
    <div class='search-wrapper fc'>
      <div class="product-link-wrapper">
        <div class="product-title frb">
          <div class='product-title-info frb c'>
            <!-- <div> -->
              <img class='nor-icon' src="../assets/nor.png" alt="">
            <!-- </div> -->
            <div class='product-tip f15 ml5'>生成商品链接：</div>
            <!-- <div> -->
              <img class='tips-icon' src="../assets/icon_tips.png" alt="">
            <!-- </div> -->
          </div>
          <div class='reset f14'>重置</div>
        </div>
        <div class="input-area">
          <textarea class='input f14' type="text" v-model="link"/>
        </div>
        <button class="link-search f16" @click="getInfo()">商品查询</button>
      </div>
    </div>
    <div class="product-info-wrapper fc" v-if="isProductShow">
      <div class="product-info frb">
        <img :src="shoes.showShoesImage" class="product-img">
        <div class="product-info-detail fc">
          <div class="product-name f f14 s">{{shoes.showShoesName}}</div>
          <div class="product-description f12 fc">
            <div class="product-subject f s">颜色分类：{{shoes.showShoesColor}}</div>
            <div class="product-size f s">鞋码：{{shoes.showShoesSize}}</div>
            <div class="product-time f s">开始时间：{{dateFormat("YYYY-mm-dd HH:MM", shoes.showShoesSellTime)}}</div>
          </div>
        </div>
      </div>
      <div class="product-info-option">
        <div class="info-option-first frb">
          <div class="first-option fc">
            <div class="static-info f15">颜色分类：</div>
            <select class="static-info-context">
              <option v-for="item in shoesColor" :value="item.name" :key="item.vid">{{item.name}}</option>
            </select>  
          </div>
          <div class="first-option fc">
            <div class="static-info f15">鞋码：</div> 
            <select class="static-info-context">
              <option v-for="item in shoesSize" :value="item.name" :key="item.vid">{{item.name}}</option>
            </select>           
          </div>
        </div>
        <!--  -->
        <div class="info-option-second frb mt20">
          <div class="second-option fc">
            <div class="static-info f15">数量：</div>
            <input class="static-info-context no-border" :value="shoesNumber">
          </div>
          <div class="block">
            <span class="static-info f15">时间偏移</span>
            <div>
              <div class="time-info f12">{{showTime}}ms</div>
              <el-slider class="slider" v-model="time" @input='getTime()' :show-tooltip="false"></el-slider>
            </div>
          </div>
        </div>
        <div class="info-option-third frb mt20">
          <button class="open-time" @click="open()">{{deadline}}</button>
          <button class="test-jump">测试跳转</button>
        </div>
      </div>
    </div>
  </div>
  <div class='loading' v-else></div>
</template>

<script>
import {getContext} from '../api/base'
export default {
  name: 'HelloWorld',
  data () {
    return {
      value: false,
      showTime: 0,
      time: 50,
      status: '',
      link: '',
      items: [1, 2, 3],
      isProductShow: false,
      isListShow: false,
      shoesSize: [],
      shoesColor: [],
      shoesNumber: 1,
      shoes: {
        showShoesName: '',
        showShoesImage: '',
        showShoesColor: '',
        showShoesSize: '',
        showShoesNumber: '',
        showShoesSellTime: ''
      },
      deadline: '开启定时跳转'
    }
  },
  computed: {
    
  },
  methods: {
    openInterval () {
      let time = this.shoes.showShoesSellTime - new Date()
      console.log(time, 999)
      this.deadline = time
      let count = parseInt(this.showTime)
      let timer = setInterval( () => {
        let deadtime = this.deadline
        console.log(deadtime, 999)
         if (deadtime < 0) {
          clearInterval(timer)
          this.deadline = '开启定时跳转'
        }
        this.deadline = deadtime + count
      }, 1000)
    },
    open() {
      let str = `1、本功能仅供研究学习使用，由于网络情况与设备问题各有不同，Ai潮流不保证100%成功率`+ 
                `2、请尽可能校准你的设备时间与北京时间相同，否则可能会因时差因素错失机会`+ 
                `3、使用过程中由于淘宝、天猫APP限制或账号盾等导致失败的问题与Ai潮流无关，请尝试寻找淘宝、天猫客服解决<br>`+
                `4、点击“开启定时跳转”即代表您已知悉并同意以上说明`
      this.$alert(str,{
        cancelButtonText: '暂时不要',
        confirmButtonText: '确开启定时跳转',
        cancelButtonClass: 'cancel-button',
        confirmButtonClass: 'confirm-button',
        showCancelButton: 'true',          
        callback: () => {
          this.$message({
            type: 'info',
            message: `action: 111`
          });
          this.openInterval()
        }
      });
    },
    dateFormat(fmt, data) {
      let date = new Date(data)
      let ret;
      const opt = {
          "Y+": date.getFullYear().toString(),        // 年
          "m+": (date.getMonth() + 1).toString(),     // 月
          "d+": date.getDate().toString(),            // 日
          "H+": date.getHours().toString(),           // 时
          "M+": date.getMinutes().toString(),         // 分
          "S+": date.getSeconds().toString()          // 秒
          // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
          ret = new RegExp("(" + k + ")").exec(fmt);
          if (ret) {
              fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
          };
      };
      return fmt;
    },
    async getInfo () {
      let str = '緮置这行话₤f74Q1PJtuZE₤转移至τаo宝аρρ【贵州茅台酒飞天53%vol500ml（带杯）酱香型白酒酒水单瓶装】；或https://m.tb.cn/h.V71i9xB?sm=28e911 点几鏈→接，再选择瀏..覽●噐○大开'
      // let str = 'fu植这行话$lnOv18mNjji$转移至淘宀┡ē【Nike耐克官方NIKE COURT ROYALE AC女子运动鞋休闲鞋板鞋AO2810】；或https://m.tb.cn/h.VgHu43f?sm=61d22c 掂击鏈→接，再选择瀏..覽●噐○dakai'
      // let str = this.link
      this.status = 'loading'
      console.log(status, 'status')
      if (str) {
        let response = await getContext(str)
        console.log(response)
        console.log(response.shoesSize[0])
        console.log(response.shoesSize[0].values)
        this.shoesSize = response.shoesSize[0]
        this.shoesColor = response.shoesSize[0].values
        if (this.shoesSize && this.shoesColor) {
          this.shoes.showShoesName = response.title
          this.shoes.showShoesSellTime = response.startSellTime
          // this.shoes.showShoesSize = this.shoesSize[0]?this.shoesSize[0].values|| 
          this.shoes.showShoesImage = this.shoesColor[0].image
          this.shoes.showShoesColor = this.shoesColor[0].name
          this.isProductShow = true
          this.status = ''
          this.shoes.shoesNumber = response.skuCore[0].quantity
          this.shoesNumber = this.shoes.shoesNumber
          console.log(response.skuCore[0].quantity, 999)
        }
      }
    },
    getTime () {
      let time = this.time - 50
      this.showTime = time * 20
    },
    openSizeSelect () {
      this.isListShow = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("//unpkg.com/element-ui@2.13.1/lib/theme-chalk/index.css");
.block{
  width: 100%;
}
.cancel-button {
  padding: 0 !important;
  border: 1px solid #3376F6;
  border-radius: 22px;
  font-size: 16px;
  color: #3376F6;
  text-align: center;
  width: 138px;
}
.confirm-button {
  padding: 0 !important;
  background: #3376F6;
  border-radius: 22px;
  color: #FFFFFF;
  text-align: center;
  width: 138px;
}
.loading{
  position: fixed;
  height: 100vh;
  widows: 100vw;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.mt20{
  margin-top: 20px;
}
.f12{
  font-size: 12px;
}
.f14{
  font-size: 14px;
}
.f15{
  font-size: 15px;
}
.f16{
  font-size: 16px;
}
.f{
  display: flex;
}
.s{
  align-self: start;
}
.fr{
  display: flex;
  flex-direction: row;
}
.frb{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.fc{
  display: flex;
  flex-direction: column;
}
/* align-items: center; */
.c{
  align-items: center;
}
.ml5{
  margin-left: 5px;
}
.shop{
  width: 100vw;
}
.no-vip {
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  background-image: linear-gradient(270deg, #F4D975 3%, #F1BC6A 98%);
}
.no-vip-context{
  display: flex;
  margin: 0 16px;
  width: 100%;
  color: #705223;
  /* font-size: 14px; */
  justify-content: space-between;
}
.no-vip-tips{
  display: flex;
  line-height: 20px;
  height: 20px;
  flex-direction: row;
}

.search-wrapper{
  margin: 26px 16px;
}
/* .product-title-info{
  display: flex;
  flex-direction: row;
} */
.nor-icon{
  width: 23px;
  height: 23px;
}
.product-tip{
  /* font-size: 15px; */
  font-weight: bold;
}
.tips-icon{
  width: 16px;
  height: 16px;
}
.reset{
  /* font-size: 14px; */
  color: #999;
}
.input-area{
  margin-top: 10px;
}
.input{
  width: 100%;
  border-radius: 6px;
  height: 116px;
  background: #F2F2F2;
  color: #222222;
  letter-spacing: -1.02px;
}
.link-search{
  margin-top: 18px;
  height: 44px;
  width: 100%;
  background: #3376F6;
  border-radius: 22px;
  color: #FFFFFF;
  letter-spacing: 0.15px;
}
.product-info{
  margin: 6px 16px;
  float: left;
}
.product-img{
  width: 79px;
  height: 79px;
  border-radius: 4px;
  background: black;
}
.product-info-detail{
  align-self: flex-start;
  width: 68%;
}
.product-name{
  color: #222222;
  letter-spacing: -1.02px;
}
.product-description{
  color: #666666;
  letter-spacing: -0.87px;
}
.product-info-option{
  margin: 6px 16px;
}
.static-info{
  color: #000000;
  letter-spacing: -1.09px;
  font-weight: bold;
}
.second-option{
  width: 100%;
}
.first-option{
  width: 100%;
}
.static-info-context{
  appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;
  margin: 5px 5px 0 0;  
  /* width: 167px; */
  /* width: 100%; */
  height: 40px;
  background: #F2F2F2;
  border: 1px solid #EEEEEE;
  border-radius: 6px;
  font-size: 14px;
  color: #222222;
  letter-spacing: -1.02px;
  line-height: 40px;
  padding-left: 16px;
  overflow: hidden;
}
.open-time{
  height: 44px;
  background: #3376F6;
  border-radius: 22px;
  width: 225px;
  color: #FFFFFF;
  letter-spacing: 0.15px;
  text-align: center;
  border: none;
}
.test-jump{
  border: 1px solid #3376F6;
  border-radius: 22px;
  background-color: #fff;
  color: #3376F6;
  height: 44px;
  width: 100px;
}
.no-border{
  border: none;
  width: 167px;
}
.time-info{
  color: #222222;
  text-align: center;
  /* height: 200px; */
}
/* .bottom-select{
  position: fixed;
  bottom: 200px;
  width: 100vw;
} */
</style>
