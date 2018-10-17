<template>
  <div class="car-img">
    <div class="tit">
      <p data-hover="hover" @click='goColor'>
        <span>{{value}}</span>
      </p>
      <p data-hover="hover" @click='goCar'>
        <span>{{item}}</span>
      </p>
    </div>
    <div class="IMG">
      <div v-for='item,index in imgList' :key='index'>
        <div v-for='value,key in item.List' class='Div'>
          <img :src="value.Url" :key='key' @click='Swiper' />
          <div class="Hui" v-if='key==0' @click='Img(item.Id)'>
            <p>{{item.Name}}</p>
            <span>{{item.Count}}张></span>
          </div>
        </div>
      </div>
    </div>
    <div class="Img" v-if='isShow'>
      <img v-for='item,index in imgData' :key='index' :src="item.Url" />
    </div>
    <div class="Swiper" v-if='isShowSwiper'>
      <swiper :options="swiperOption">
        <swiper-slide v-for='value,key in Url' :key='key' v-if='key'>
          <img :src="value.Url" />
        </swiper-slide>
      </swiper>
      <p>{{`${current}/${Url.length}`}}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { swiper, swiperSlide } from "vue-awesome-swiper"
import 'swiper/dist/css/swiper.css'
export default {
  data() {
    return {
      page: 0,
      isShow: false,
      isShowSwiper: false,
      Url: [],
      current: 0,
      swiperOption: {

      }
    }
  },
  computed: {
    ...mapState({
      imgList: state => state.index.imgList,
      imgData: state => state.index.imgData,
      List: state => state.index.List,
      value: state => state.index.value,
      item: state => state.index.item
    })
  },
  methods: {
    ...mapActions({
      getimgList: 'index/getimgList',
      getImgdata: 'index/getImgdata'
    }),
    Img(id) {
      this.isShow = true;
      let ID = this.$route.query.id;
      this.getImgdata({ SerialID: ID, ImgID: id, page: this.page })
    },
    Swiper(e) {
      this.isShowSwiper = true;
      this.imgList.forEach((item, index) => {
        this.Url = this.Url.concat(item.List);
      });
      let id = e.toElement.dataset.id;
    },
    goColor() {
      let ID = this.$route.query.id;
      this.$router.push({ name: 'color', query: { ID } })
    },
    goCar() {
      let ID = this.$route.query.id;
      this.$router.push({ name: 'car', query: { ID } })
    }
  },
  mounted() {
    let ID = this.$route.query.id;
    this.getimgList(ID);
    eventBus.$on('Item', (val) => {
      this.value = val;
    })
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style>
.Swiper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 1);
}

.Swiper img {
  width: 100%;
  height: 240px;
  margin-top: 50%;
}

.Swiper p {
  color: #fff;
  position: absolute;
  bottom: 20px;
  text-align: center;
  line-height: 40px;
}

.Img {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  z-index: 100;
  overflow-y: scroll;
}

.Img img {
  width: 123px;
  height: 123px;
  margin-left: 2px;
}

.car-img {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

.car-img .tit {
  position: fixed;
  background: #fff;
  top: 0;
  width: 100%;
  height: 45px;
  -webkit-box-align: center;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  border-bottom: 7px solid #eee;
  padding-bottom: 5px;
  z-index: 99;
}

.car-img div.tit p {
  -webkit-box-flex: 1;
  flex: 1;
  text-align: center;
  box-sizing: border-box;
  color: #454545;
  display: inline-block;
  line-height: 45px;
}

.car-img div.tit p span {
  max-width: 2.6rem;
  display: inline-block;
  vertical-align: middle;
  line-height: 1.25;
  font-size: .28rem;
}

.car-img div.tit p:after {
  content: "";
  display: inline-block;
  padding-top: .16rem;
  padding-right: .16rem;
  border-top: 2px solid #ccc;
  border-right: 2px solid #ccc;
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
  margin-left: .2rem;
  vertical-align: 5%;
}

.IMG {
  margin-top: 40px;
}

.IMG>div {
  display: flex;
  flex-wrap: wrap;
}

.Div {
  width: 123px;
  height: 123px;
  position: relative;
}

.IMG div img {
  width: 123px;
  height: 123px;
  margin-left: 2px;
}

.Div .Hui {
  position: absolute;
  left: 0;
  top: 0;
  width: 123px;
  height: 123px;
  text-align: center;
  background: rgba(56, 90, 130, .5);
}

.Hui p {
  color: #fff;
  position: absolute;
  top: 50px;
  left: 50px;
}

.Hui span {
  font-size: .28rem;
  color: #fff;
  position: absolute;
  top: 70px;
  left: 50px;
}
</style>
