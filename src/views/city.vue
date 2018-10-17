<template>
  <div :class="active1?'box1':'active1'">
    <ul class="City">
      <div class="location">
        <p>自动定位</p>
        <p>北京</p>
      </div>
      <p>省市</p>
      <li v-for='item,index in cityList' @click='GoCityList(item.CityID)'>{{item.CityName}}</li>
    </ul>
    <div class="Mark" v-if='isShow'>
      <ul>
        <li v-for='item,index in cityData' @click='addCityName' :data-item='item.CityName'>{{item.CityName}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Better from 'better-scroll'
export default {
  data() {
    return {
      active1: true,
      isShow: false
    }
  },
  computed: {
    ...mapState({
      cityData: state => state.index.cityData,
      cityList: state => state.index.cityList
    })
  },
  methods: {
    ...mapActions({
      getGoCityData: 'index/getGoCityData',
      getGoCityList: 'index/getGoCityList'
    }),
    addCityName(e) {
      let item = e.toElement.dataset.item;
      eventBus.$emit("changeItem", { 'Item': item });
      this.isShow = false;
      this.active1 = false;
    },
    GoCityList(index) {
      this.isShow = true;
      this.getGoCityList(index);
    }
  },
  mounted() {
    this.getGoCityData()
    new Better('.box1', {
      scrollY: true,
      click: true
    });
    new Better('.Mark', {
      scrollY: true,
      click: true
    });
  },
}
</script>

<style>
.box1 {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: -100%;
  background: #fff;
  z-index: 999;
  overflow: hidden;
  transform: translateY(-100%);
  transition: transform 2s;
}

.active1 {
  width: 100%;
  position: absolute;
  height: 100%;
  left: 0;
  bottom: -100%;
  background: #fff;
  z-index: 999;
  overflow: hidden;
  transform: translateY(100%);
  transition: transform 2s;
}

.City .location p:nth-child(2) {
  padding-left: .4rem;
  font-size: .28rem;
  height: .8rem;
  line-height: .8rem;
  background: #fff;
}

.City li {
  padding-left: .3rem;
  font-size: .28rem;
  height: .8rem;
  line-height: .8rem;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  margin-left: .1rem;
  position: relative;
}

.City p {
  height: .4rem;
  line-height: .4rem;
  font-size: .24rem;
  padding-left: .2rem;
  background: #f4f4f4;
}

.City .location p:first-child {
  height: .4rem;
  line-height: .4rem;
  font-size: .24rem;
  padding-left: .2rem;
  background: #f4f4f4;
}

.City li:after {
  content: "";
  display: inline-block;
  padding-top: .16rem;
  padding-right: .16rem;
  border-top: 1px solid #999;
  border-right: 1px solid #999;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  right: .35rem;
  top: .3rem;
}

.Mark {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, .45);
  z-index: 100;
  width: 100%;
  height: 100%;
}

.Mark ul {
  width: 70%;
  height: 100%;
  background: #fff;
  position: absolute;
  right: 0;
  overflow: hidden;
  top: 0;
}

.Mark ul li {
  padding-left: .3rem;
  font-size: .28rem;
  height: .8rem;
  line-height: .8rem;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  margin-left: .1rem;
  position: relative;
}
</style>
