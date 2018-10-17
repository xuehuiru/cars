<template>
  <div class="wrap">
    <div @scroll="Onscroll">
      <div class="p" @click="goLogo">可向多个商家咨询最低价，商家及时回复<img src="https://h5.chelun.com/2017/official/img/icon-help.png" alt=""></div>
      <div v-if='isShow' class="dialog" @click="goIshow">
        <div>
          <div class="Top">
            <li><img src="https://h5.chelun.com/2017/official/img/q-l.png" alt="">
              <span>安全高效</span>
            </li>
            <li><img src="https://h5.chelun.com/2017/official/img/q-m.png" alt="">
              <span>省心省力</span>
            </li>
            <li><img src="https://h5.chelun.com/2017/official/img/q-r.png" alt="">
              <span>贴心服务</span>
            </li>
          </div>
          <div class="bottom">
            <li>私人信息严格保密，最新报价立等可取</li>
            <li>足不出户，提交即可获得多家经销商的最低价格</li>
          </div>
        </div>
      </div>
      <div class="conent">
        <dl>
          <dt><img :src="quotationData.details.serial.Picture" alt=""></dt>
          <dd>
            <p>{{quotationData.details.serial.AliasName}}</p>
            <p>{{quotationData.details.market_attribute.year}}款 {{quotationData.details.car_name}}</p>
          </dd>
        </dl>
      </div>
      <p class="tip" ref='tip'>个人信息</p>
      <ul>
        <li>
          <span>姓名</span> <input type="text" placeholder="输入你的真实中文姓名" maxlength="4" ref='name'></li>
        <li>
          <span>手机</span> <input type="tel" placeholder="输入你的真实手机号码" maxlength="11" ref='Iphone'></li>
        <li>
          <span>城市</span>
          <span @click='goCity'>{{value}}</span>
        </li>
      </ul>
      <div class="quotation">
        <button data-hover="hover" @click='Onclick'>询最低价</button>
      </div>
      <p class="tip" ref='tip'>选择报价经销商</p>
      <div class="dealer-info">
        <li v-for='item,index in quotationDataList'>
          <i :class="item.flag ? 'act':''" @click='checkedFn(index)'></i>
          <p>
            <span>{{item.dealerShortName}}</span>
            <span>{{item.promotePrice}}.万</span>
          </p>
          <p>
            <span>{{item.address}}</span>
            <span>售{{item.saleRange}}</span>
          </p>
        </li>
      </div>
      <footer v-if='isShowFooter'>
        <button data-hover="hover" @click='Onclick'>询最低价</button>
      </footer>
    </div>
    <Alert v-if='isNone' :msg='msg' :isNone='isNone' />
    <City v-if='isShowCity' />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import Vue from 'vue'
import Alert from './alert';
import City from './city';
export default {
  data() {
    return {
      isShow: false,
      isShowFooter: false,
      isShowCity: false,
      isNone: false,
      msg: '',
      value: '北京'
    }
  },
  computed: {
    ...mapState({
      quotationData: state => {
        return state.index.quotationData
      },
      quotationDataList: state => {
        return state.index.quotationDataList
      }
    })
  },
  methods: {
    ...mapActions({
      getQuotation: 'index/getQuotation',
      quotationList: 'index/quotationDataList'
    }),
    getId() {
      let id = this.$route.query.id;
      this.getQuotation(id);
    },
    goLogo() {
      this.isShow = !this.isShow;
    },
    goIshow() {
      this.isShow = !this.isShow;
    },
    Onscroll(e) {
      var tip = this.$refs.tip;
      var rect = tip.offsetTop - tip.offsetHeight;
      if (e.target.scrollTop >= rect) {
        this.isShowFooter = true;
      } else {
        this.isShowFooter = false;
      }
    },
    checkedFn(idx) {
      this.quotationList(idx);
      this.quotationDataList.forEach((item, index) => {
        if (idx == index) {
          Vue.set(item, 'item.flag', !item.flag);
        }
      })
    },
    Onclick() {
      this.name = this.$refs.name.value;
      this.Iphone = this.$refs.Iphone.value;
      let userReg = /[^\u4e00-\u9fa5]/g;
      let iphoneReg = /^1(3|4|5|7|8)\d{9}$/;
      if (userReg.test(this.name)) {
        this.isNone = true;
        this.msg = '输入你的真实中文姓名';
      } else if (!iphoneReg.test(this.Iphone)) {
        this.isNone = true;
        this.msg = '输入你的真实手机号码';
      } else {
        this.isNone = true;
        this.msg = '询价成功';
      }
    },
    goCity() {
      this.isShowCity = !this.isShowCity;
    }
  },
  mounted() {
    this.getId();
    eventBus.$on('changeItem', (val) => {
      this.value = val.Item;
    })
  },
  components: {
    Alert,
    City
  }
}
</script>

<style>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  background: #3aacff;
  text-align: center;
  font-size: .34rem;
  color: #fff;
}

footer button {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  background: #3aacff;
  text-align: center;
  font-size: .34rem;
  color: #fff;
}

.conent dl:before {
  content: "";
  display: inline-block;
  text-align: left;
  padding-top: .16rem;
  padding-right: .16rem;
  border-top: 2px solid #ccc;
  border-right: 2px solid #ccc;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  right: .26rem;
  top: 40px;
}

.dialog {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, .1);
  z-index: 101;
}

.dialog div {
  -webkit-animation: f .3s ease;
  animation: f .3s ease;
}

.dialog .Top {
  display: flex;
  justify-content: space-around;
  padding-top: 10px;
  text-align: center;
}

.dialog .Top li img {
  width: 30px;
  height: 30px;
}

.dialog .bottom {
  width: 100%;
  height: 45px;
  background: #eee;
  margin-top: 10px;
}

.dialog .bottom li {
  color: #999;
  line-height: 20px;
  text-indent: 10px;
  font-size: 12px;
  list-style: initial;
}

.dialog .Top li span {
  display: block;
  font-size: 12px;
}

.dialog>div {
  position: relative;
  width: 86%;
  margin-left: 7%;
  background: #fff;
  border-radius: .15rem;
  margin-top: .8rem;
}

.dialog>div:before {
  position: absolute;
  content: "";
  display: inline-block;
  width: 0;
  height: 0;
  border-left: .3rem solid transparent;
  border-right: .3rem solid transparent;
  border-bottom: .3rem solid #fff;
  right: .16rem;
  top: -.15rem;
  z-index: 99;
}

.wrap {
  width: 100%;
  height: 100%;
  position: relative;
}

.wrap>div {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

.conent dl {
  position: relative;
}

.dealer-info li>i:before {
  content: "";
  display: inline-block;
  width: .32rem;
  height: .32rem;
  border-radius: 50%;
  border: 2px solid #ccc;
  box-sizing: border-box;
  position: absolute;
  left: .05rem;
  top: 50%;
  text-align: center;
  line-height: .32rem;
  -webkit-transform: translate3d(0, -50%, 0);
  transform: translate3d(0, -50%, 0);
}

.dealer-info {
  padding-left: 10px;
}

.dealer-info li {
  position: relative;
  padding: .26rem 0 .26rem .54rem;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  height: 1.65rem;
}

.dealer-info li>i.act:before {
  content: '√';
  background: #3aacff;
  border: none;
  color: #fff;
}

.dealer-info li p:nth-child(1),
.dealer-info li p:nth-child(2) {
  display: flex;
  justify-content: space-between;
}

.dealer-info li p:nth-child(1) span:nth-child(2) {
  margin-right: 10px;
  color: red;
}

.dealer-info li p:nth-child(2) span:nth-child(2) {
  margin-right: 10px;
}

.dealer-info li p:nth-child(2) {
  margin-top: .1rem;
  font-size: .24rem;
  color: #a2a2a2;
}

.conent {
  padding-top: 35px;
}

.conent dl {
  display: flex;
}

.conent dl dt img {
  width: 2.3rem;
  height: 1.41rem;
  border: 1px solid #eee;
  box-sizing: border-box;
  border-radius: 5px;
  margin: 10px;
}

.conent dl dd {
  margin-top: 15px;
  padding-right: 30px;
}

.conent dl dd p:nth-child(2) {
  margin-top: .26rem;
  font-size: .32rem;
  line-height: 1.2;
  color: #333;
}

.tip {
  padding: 0 .2rem;
  height: .6rem;
  line-height: .6rem;
  font-size: .24rem;
  color: #666;
  background: #eee;
}

.conent p:first-child {
  font-size: .36rem;
  line-height: 1;
}

.p {
  text-align: center;
  color: #fff;
  height: 30px;
  line-height: 30px;
  width: 100%;
  display: flex;
  background: #79cd92;
  z-index: 99;
  display: block;
  text-align: center;
  font-size: 15px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}

.p img {
  width: 15px;
  height: 15px;
  margin-left: 5px;
  vertical-align: -9%;
}

.span {
  display: flex;
  justify-content: space-between;
}

ul {
  background: #fff;
  padding: 0 .2rem;
}

ul li {
  font-size: .32rem;
  height: .88rem;
  line-height: .88rem;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  color: #000;
  display: flex;
}

ul li span {
  text-align: center;
  font-size: 16px;
}

ul li span:nth-child(2) {
  display: inline-block;
  width: 88%;
  color: #555;
  text-align: right;
  box-sizing: border-box;
}

ul li input {
  font-size: .32rem;
  padding-right: .2rem;
  width: 88%;
  text-align: right;
  box-sizing: border-box;
  color: #555;
  border: 0;
  background-color: white;
  outline: none;
  cursor: text;
}

.quotation {
  background: #fff;
  text-align: center;
  padding-top: .3rem;
  padding-bottom: .28rem;
}

.quotation button {
  font-size: .32rem;
  color: #fff;
  width: 80%;
  background: #3aacff;
  height: .7rem;
  border-radius: .1rem;
}

ul li span:nth-child(2):after {
  content: "";
  display: inline-block;
  padding-top: .16rem;
  padding-right: .16rem;
  border-top: 1px solid silver;
  border-right: 1px solid silver;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
