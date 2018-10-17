<template>
  <div class="wrap">
    <div class='Box' ref='carList'>
      <div v-for='item,index in datas' :key='index' class='list'>
        <h4 ref='item' :ref='item'>{{item}}</h4>
        <div v-for='v,i in Filter' :key='i' v-if='item==v.Spelling.slice(0, 1)' @click='chnageData(v.MasterID)'>
          <img :src="v.CoverPhoto" />
          <span>{{v.Name}}</span>
        </div>
      </div>
    </div>
    <div @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd' ref='letter' class="right">
      <p>#</p>
      <p v-for='item,index in datas' :key='index' @click='changeClick(index)'>{{item}}</p>
    </div>
    <div :class="active?'box':'active'" @touchstart='touchstart' @touchmove='touchmove' @touchend='touchend' ref='mackList'>
      <div v-for='key,id in data' :key='id'>
        <h4 @click='changeShow'>{{key.GroupName}}</h4>
        <div v-for='v,i in key.GroupList' :key='i' class="key" @click='goDetail(v.SerialID)'>
          <img :src="v.Picture" />
          <div>
            <u>{{v.AliasName}}</u>
            <br/>
            <span>{{v.DealerPrice}}</span>
          </div>
        </div>
      </div>
    </div>
    <Letter v-if='isShow' :letters='letters' />
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import { getCarsData, getMakeList } from '../Api/index';
import Letter from './letter';
import Better from 'better-scroll'
export default {
  name: 'index',
  data() {
    return {
      isShow: false,
      data: [],
      active: true,
      Scroll: 0,
      letters: 0
    }
  },
  computed: {
    ...mapState({
      datas: state => {
        return state.index.datas
      },
      Filter: state => {
        return state.index.Filter
      }
    })
  },
  methods: {
    ...mapActions({
      getData: 'index/getData',
      getFilter: 'index/getFilter'
    }),
    changeClick(index) {
      this.Scroll.scrollTo(0, -(this.$refs.item[index].offsetTop));
    },
    chnageData(index) {
      getMakeList(index).then(res => {
        this.data = res.data;
      })
      this.active = false;
    },
    changeShow() {
      this.active = true;
    },
    ChangeClick() {
      this.active = false;
    },
    goDetail(index) {
      this.$router.push({ name: 'detail', query: { index } });
    },
    touchStart() { },
    touchMove(e) {
      let index = Math.floor((e.touches[0].pageY - this.offsetTop) / this.letterHeight);
      if (index < 0) {
        index = 1
      } else if (index > this.datas.length - 1) {
        index = this.datas.length - 1;
      }
      let letter = this.datas[index];
      this.letters = letter;
      let offsetTop = this.$refs[letter][0].offsetTop;
      this.Scroll.scrollTo(0, -offsetTop);
      this.isShow = true;
    },
    touchEnd() {
      this.isShow = false;
    },
    touchstart(e) {
      //记录手指滑动的位置
      this.start = e.touches[0];
    },
    touchmove(e) {
      //让页面跟随手指滑动
      let touch = e.touches[0];
      let offset = touch.pageX - this.start.pageX;
      if (offset) {
        offset = 0;
      }
      this.$refs.mackList.style.transform = `translate3d(${offset}px,0,0)`;
      this.$refs.mackList.style.transition = `width`;
    },
    touchend() {
      this.$refs.mackList.style.transform = ``;
    }
  },
  mounted() {
    this.getData()
    this.getFilter()
    this.Scroll = new Better('.wrap', {
      click: true
    });
    new Better('className', {
      scrollY: true
    });
  },
  updated() {
    this.offsetTop = this.$refs.letter.getBoundingClientRect().top;
    this.letterHeight = this.$refs.letter.children[0].getBoundingClientRect().height;
  },
  components: {
    Letter
  }
}
</script>

<style>
.wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.box {
  overflow-y: scroll;
}

.list div img {
  width: 40px;
  height: 40px;
}

.list h4 {
  width: 100%;
  height: 15px;
  background: #eee;
  color: #999;
  text-indent: 15px;
  font-weight: normal;
}

.list div {
  display: flex;
  width: 95%;
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #ccc;
  margin-left: 7px;
}

.list div img {
  margin-left: 10px;
  margin-top: 3px;
}

.list div span {
  text-indent: 15px;
  font-size: 16px;
}

.right {
  height: 100%;
  position: fixed;
  right: 3px;
  top: 0;
  color: #999;
  margin-top: 25%;
}

.right p {
  font-size: 12px;
  line-height: 18px;
}

.box {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: -100%;
  background: #fff;
  z-index: 99;
  overflow-y: scroll;
  transform: translateX(100%);
  transition: transform 3s;
}

.active {
  width: 100%;
  position: absolute;
  height: 100%;
  top: 0;
  right: -100%;
  background: #fff;
  z-index: 99;
  overflow-y: scroll;
  transform: translateX(-80%);
  transition: transform 1s;
}

.active div h4 {
  line-height: 20px;
  text-indent: 10px;
  background: #eee;
  color: #999;
}

.key img {
  width: 100px;
  height: 65px;
}

.key div {
  margin-top: 10px;
  line-height: 25px;
}

.key {
  display: flex;
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #ccc;
}

.key div u {
  color: #999;
}

.key div span {
  color: red;
}
</style>
