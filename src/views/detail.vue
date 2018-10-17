<template>
  <div class="Detail">
    <div class="img">
      <img :src="detailData.Picture" @click='goImg(detailData.SerialID)' />
      <b>{{detailData.pic_group_count}}张照片</b>
    </div>
    <div class="top">
      <div>
        <i>{{detailData.market_attribute&&detailData.market_attribute.dealer_price}}</i>
        <br/>
        <span>指导价{{detailData.market_attribute&&detailData.market_attribute.official_refer_price}}</span>
      </div>
      <button @click='quotation(detailData.list[0].car_id)'>{{detailData.BottomEntranceTitle}}</button>
    </div>
    <ul>
      <li v-for='item,index in yearData' :key='index' @click='click(item,index)' :class="{ actives:act == index}">{{item}}</li>
    </ul>
    <div v-for="item,key,index in allDatas" :key='index'>
      <h4>{{key}}</h4>
      <div v-for='value,key in item' :key='key'>
        <div class="Index">
          <p>{{value.market_attribute.year}}款{{value.car_name}}</p>
          <u>{{value.horse_power}}马力{{value.gear_num}}档{{value.trans_type}}</u>
          <div class="left">
            <span>指导价{{value.market_attribute&&value.market_attribute.official_refer_price}}</span>
            <i>{{value.market_attribute&&value.market_attribute.dealer_price_min}}</i>
          </div>
        </div>
        <div class="button" @click='quotation(value.car_id)'>{{detailData.BottomEntranceTitle}}</div>
      </div>
    </div>
    <button class="btn" @click='quotation(detailData.list[0].car_id)'>{{detailData.BottomEntranceTitle}}
      <span>本地经销商为你报价</span>
    </button>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {
      act: ''
    }
  },
  computed: {
    ...mapState({
      detailData: state => state.index.detailData,
      yearData: state => state.index.yearData,
      allDatas: state => state.index.allDatas
    })
  },
  methods: {
    ...mapActions({
      getDetail: 'index/getDetail'
    }),
    ...mapMutations({
      updateData: 'index/updateData'
    }),
    getId() {
      let id = this.$route.query.index;
      this.getDetail(id);
    },
    goImg(id) {
      this.$router.push({ name: 'Img', query: { id } });
    },
    click(item, index) {
      this.updateData(item);
      this.act = index;
    },
    quotation(id) {
      this.$router.push({ name: 'quotation', query: { id } });
    }
  },
  mounted() {
    this.getId();
  }
}
</script>

<style scoped>
.Detail {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

.img {
  position: relative;
}

.img img {
  width: 100%;
  height: 180px;
}

.img b {
  position: absolute;
  bottom: 30px;
  right: 20px;
  z-index: 999;
  width: 75px;
  height: 15px;
  background: rgba(0, 0, 0, .5);
  color: #fff;
  border-radius: 10px;
  font-size: 12px;
  text-align: center;
}

.btn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: #3aacff;
  color: #fff;
  border: 0;
}

.btn span {
  display: block;
}

.top {
  display: flex;
  border-bottom: 8px solid #eee;
  justify-content: space-between;
  padding-bottom: 13px;
}

.top div {
  margin-left: 15px;
}

.top i {
  color: red;
  font-style: normal;
  text-indent: 10px;
  font-size: 18px;
}

.top span {
  color: #999;
  text-indent: 10px;
}

.top button {
  width: 180px;
  height: 35px;
  background: #3aacff;
  border: 0;
  margin-right: 12px;
  color: #fff;
  border-radius: 5px;
  font-size: 16px;
}

ul {
  display: flex;
  width: 100%;
  height: 35px;
}

ul li {
  text-align: center;
  line-height: 35px;
  width: 15%;
  font-size: 16px;
}

.data {
  width: 100%;
  height: 110px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 40px;
}

.Index {
  padding-left: 15px;
  border-bottom: 1px solid #eee;
}

h4 {
  padding: 0 .2rem;
  height: 30px;
  line-height: 30px;
  font-size: .26rem;
  font-weight: normal;
  color: #999;
  background: #f4f4f4;
}

.Index p {
  padding: .1rem 0 .08rem;
  line-height: 20px;
  color: #3d3d3d;
}

.Index u {
  display: block;
  line-height: 20px;
  font-size: 12px;
  color: #999;
}

.left {
  padding-left: 190px;
  padding-top: 5px;
}

.left i {
  color: red;
  font-style: normal;
}

.left span {
  color: #999;
  font-size: 12px;
}

.button {
  width: 100%;
  line-height: 60px;
  text-align: center;
  font-size: 16px;
  color: #3aacff;
}

.actives {
  color: skyblue;
}
</style>
