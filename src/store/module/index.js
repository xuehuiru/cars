import { getCarsData, getMakeList, getCarDetail, getQuotationData, getImgData, getCityList, getImgList, getColorList, getCarData } from '../../Api/index';

import utils from '../../utils/index';

const state = {
    datas: [],
    eng: [],
    Filter: [],
    mackList: [],
    detailData: [],
    yearData: [],
    allDatas: [],
    sortData: [],
    typeData: [],
    quotationData: [],
    quotationDataList: [],
    cityData: [],
    cityList: [],
    imgList: [],
    imgData: [],
    List: [],
    ColorList: [],
    yearList: [],
    keys: [],
    value: '颜色',
    carData: [],
    years: [],
    item: '车款'
}

const mutations = {
    addData(state, payload) {
        state.datas = payload;
        let arr = [];
        payload.map((item, index) => {
            return arr.push(item.Spelling.slice(0, 1))
        })
        state.eng = arr.filter((v, i) => {
            return arr.indexOf(v) == i;
        })
        state.datas = state.eng;
    },
    addFilter(state, payload) {
        state.Filter = payload;
    },
    getText(state, payload) {
        state.text = payload;
    },
    getDetailData(state, payload) {
        state.detailData = payload;
        var years = ['全部'];
        payload.list.forEach(item => {
            if (years.indexOf(item['market_attribute'].year) == -1) {
                years.push(item['market_attribute'].year)
            }
        })
        state.yearData = years;
        //获取所有的排序之后的数据
        state.sortData = utils.sortCarList(payload.list);
        //获取全部数据
        state.typeData = utils.filterCarList('全部', state.sortData);
        state.allDatas = utils.getCarList(state.typeData);
    },
    updateData(state, payload) {
        //获取
        state.typeData = utils.filterCarList(payload, state.sortData);
        state.allDatas = utils.getCarList(state.typeData);
    },
    quotationData(state, payload) {
        state.quotationData = payload;
        payload.list.forEach((item, index) => {
            if (index < 3) {
                item.flag = true;
            }
            return item;
        })
        state.quotationDataList = payload.list;
    },
    ImgList(state, payload) {
        var arr = payload;
        arr.forEach(item => {
            item.List.forEach((value, index) => {
                let Url = value.Url.split('{0}');
                value['Url'] = Url[0] + `${index + 1}` + Url[1];
            })
        })
        state.imgList = arr;
    },
    ImgData(state, payload) {
        var arr = payload.List;
        var newArr = [];
        arr.forEach((item, index) => {
            let Url = item.Url.split('{0}');
            item['Url'] = Url[0] + '3' + Url[1];
            newArr.push(item);
        })
        state.imgData = newArr;
    },
    CityData(state, payload) {
        state.cityList = payload;
    },
    CityList(state, payload) {
        state.cityData = payload;
    },
    ColorList(state, payload) {
        state.keys = Object.keys(payload).sort((a, b) => {
            return b - a;
        })
        state.ColorList = payload;
    },
    Value(state, payload) {
        state.value = payload;
    },
    carData(state, payload) {
        var years = [];
        payload.list.forEach(item => {
            if (years.indexOf(item['market_attribute'].year) == -1) {
                years.push(item['market_attribute'].year)
            }
        })
        state.years = years;
        state.sortData = utils.sortCarList(payload.list);
        state.typeData = utils.filterCarList('全部', state.sortData);
        state.carData = utils.getCarList(state.typeData);
    },
    updataCarData(state, payload) {
        //获取
        state.typeData = utils.filterCarList(payload, state.sortData);
        state.carData = utils.getCarList(state.typeData);
    },
    Item(state, payload) {
        state.item = payload.market_attribute.year + '款' + payload.car_name;
    }
}

const actions = {
    getData({ commit }) {
        getCarsData().then(res => {
            commit('addData', res.data);
        })
    },
    getFilter({ commit }) {
        getCarsData().then(res => {
            commit('addFilter', res.data);
        })
    },
    getDetail({ commit }, payload) {
        getCarDetail(payload).then(res => {
            commit('getDetailData', res.data);
        })
    },
    getQuotation({ commit }, payload) {
        getQuotationData(payload).then(res => {
            commit('quotationData', res.data);
        })
    },
    //图片数据
    getimgList({ commit }, payload) {
        getImgList(payload).then(res => {
            commit('ImgList', res.data)
        })
    },
    //询价数据
    quotationDataList({ state }, payload) {
        var arrList = state.quotationDataList;
        arrList.forEach((item, index) => {
            if (payload == index) {
                item.flag = !item.flag;
            }
        })
        state.quotationDataList = arrList;
    },
    //城市mark的数据
    getGoCityData({ commit }, payload) {
        getCityList(payload).then(res => {
            commit('CityData', res.data)
        })
    },
    //城市左边的数据
    getGoCityList({ commit }, payload) {
        getCityList(payload).then(res => {
            commit('CityList', res.data)
        })
    },
    //更多图片数据
    getImgdata({ commit }, payload) {
        getImgData(payload).then(res => {
            commit('ImgData', res.data)
        })
    },
    getColorData({ commit }, payload) {
        getColorList(payload).then(res => {
            commit('ColorList', res.data)
        })
    },
    getValue({ commit }, payload) {
        commit('Value', payload);
    },
    getCarDate({ commit }, payload) {
        getCarData(payload).then(res => {
            commit('carData', res.data);
        })
    },
    getItem({ commit }, payload) {
        commit('Item', payload);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}