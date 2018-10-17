<template>
    <div class="color">
        <p  @click="goImgList('','全部颜色')">全部颜色</p>
        <div class="colorList">
            <div>
                <p v-for='item,index in keys' @click='clickFn(item,index)' :key='index' :class="{ Act:act == index}">{{item}}</p>
            </div>
        </div>
        <ul class="colorBack">
            <li v-for='value,key in ColorList[el]' :key='key' @click='goImgList(value.ColorId,value.Name)'>
                <i :style="`background-color:${value.Value};`"></i>
                <span>{{value.Name}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    data() {
        return {
            el: '',
            act: ''
        }
    },
    computed: {
        ...mapState({
            ColorList: state => state.index.ColorList,
            keys: state => state.index.keys
        })
    },
    methods: {
        ...mapActions({
            getColorData: 'index/getColorData',
            getimgList: 'index/getimgList',
            getValue:'index/getValue'
        }),
        clickFn(item, index) {
            this.el = item;
            this.act = index;
        },
        goImgList(index, item) {
            let id = this.$route.query.ID;
            this.$router.push({ name: 'Img', query: { id }, colorId: index });
            this.getimgList({ SerialID: id, ColorId: index });
            this.getValue(item);
        }
    },
    mounted() {
        let id = this.$route.query.ID;
        this.getColorData(id);
    },
}
</script>

<style>
.color {
    width: 100%;
    height: 100%;
}

.color>p {
    font-size: .34rem;
    color: #00afff;
    background: #fff;
    text-align: center;
    line-height: .8rem;
    height: .8rem;
    border-top: 5px solid #eee;
}

.colorList {
    width: 100%;
    overflow: scroll;
}

.colorList div {
    display: flex;
}

.colorList div {
    padding-top: 5px;
    border-top: 6px solid #eee;
    border-bottom: 6px solid #eee;
}

.colorList div p {
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
}

.colorBack li {
    display: flex;
    flex-wrap: wrap;
}

.colorBack li {
    float: left;
    width: 3.45rem;
    font-size: .32rem;
    line-height: .68rem;
    border: 1px solid #3aacff;
    box-sizing: border-box;
    margin-left: 10px;
    border-radius: .05rem;
    text-indent: 10px;
    margin-top: 15px;
}

.colorBack li span {
    font-size: 16px;
}

.colorBack li i {
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-left: 7px;
    margin-top: 6px;
}

.Act {
    color: #3aacff;
}
</style>
