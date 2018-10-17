<template>
    <div class="car">
        <p @click="imgFn('','全部车款')">全部车款</p>
        <ul>
            <li v-for='item,index in years' @click='Itemfn(item,index)'>{{item}}</li>
        </ul>
        <div v-for="item,key,index in carData" :key='index'>
            <h4>{{key}}</h4>
            <div v-for='value,key in item' :key='key' @click='imgFn(value.car_id,value)'>
                <div class="Index">
                    <div class="top">
                        <p>{{value.market_attribute.year}}款{{value.car_name}}</p>
                        <u>{{value.market_attribute&&value.market_attribute.dealer_price_min}}</u>
                    </div>
                    <div class="left">
                        <span>指导价{{value.market_attribute&&value.market_attribute.official_refer_price}}</span>
                        <span>{{value.horse_power}}马力{{value.gear_num}}档{{value.trans_type}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
export default {
    computed: {
        ...mapState({
            carData: state => state.index.carData,
            years: state => state.index.years
        })
    },
    methods: {
        ...mapActions({
            getCarDate: 'index/getCarDate',
            getItem: 'index/getItem',
            getimgList: 'index/getimgList'
        }),
        ...mapMutations({
            updataCarData: 'index/updataCarData'
        }),
        Itemfn(item, index) {
            this.updataCarData(item);
        },
        imgFn(index, item) {
            let id = this.$route.query.ID;
            this.$router.push({ name: 'Img', query: { id }, carId: index });
            this.getimgList({ SerialID: id, carId: index });
            this.getItem(item)
        }
    },
    mounted() {
        let id = this.$route.query.ID;
        this.getCarDate(id)
        this.getItem()
    }
}
</script>

<style>
ul {
    margin-top: 50px;
    display: flex;
}

ul li {
    width: 50px;
    text-align: center;
    line-height: 40px;
}

.car {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
}

.car>p {
    font-size: .34rem;
    color: #00afff;
    background: #fff;
    text-align: center;
    line-height: .8rem;
    height: .8rem;
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    border-top: 5px solid #eee;
}

.Index {
    width: 100%;
    height: 60px;
}

h4 {
    height: 20px;
    line-height: 20px;
    font-size: .26rem;
    font-weight: normal;
    color: #999;
    background: #f4f4f4;
    text-indent: 10px;
}

.top {
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
    padding-left: 10px;
    padding-top: 5px;
}

.top p {
    line-height: 30px;
    color: #3d3d3d;
}

.top u {
    display: block;
    line-height: 20px;
    font-size: 12px;
    color: red;
}

.left {
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
    padding-left: 10px;
}

.left span {
    color: #999;
    font-size: 12px;
}
</style>
