const host = !/localhost/.test(window.location.host) ? 'http://baojia-test.chelun.com' : 'https://baojia.chelun.com';
//动态判断域名
function sendRequest(url, method = 'get', data = {}) {
    let params = {
        method
    };
    //判断如果是一个Post请求，带上请求体信息
    if (method == 'post') {
        params.body = JSON.stringify(data);
    }
    //判断请求查询url是否携带query
    if (url.indexOf('?') == -1) {
        url += `?_=${+new Date()}`
    } else {
        url += `&_=${+new Date()}`
    }
    return fetch(host + url, params).then(res => res.json()).then(body => body);
}

/*
* 获取车辆品牌数据
* @return promise
*/
export let getCarsData = () => {
    return sendRequest('/v2-car-getMasterBrandList.html');
}

/*
* 获取车系数据
* @params MasterID 车辆品牌id
* @return promise
*/
export let getMakeList = (id) => {
    return sendRequest(`/v2-car-getMakeListByMasterBrandId.html?MasterID=${id}`);
}
/*
* 获取车辆详情数据
* @params SerialID 车系相对应的详情
* @return promise
*/
export let getCarDetail = (id) => {
    return sendRequest(`/v2-car-getInfoAndListById.html?SerialID=${id}`)
}

/*
* 获取车辆详情数据
* @params SerialID 车系相对应的详情
* @return promise
*/
export let getCarData = (id) => {
    return sendRequest(`/v2-car-getInfoAndListById.html?SerialID=${id}`)
}
/*
* 获取车辆询价
* @params carId 车系车辆询价的id
* @return promise
*/
export let getQuotationData = (payload) => {
    return sendRequest(`/v2-dealer-alllist.html?carId=${payload}&cityId=201`)
}

/*
* 获取城市数据
* @params provinceid 城市的ID
* @return promise
*/
export let getCityList = (id) => {
    if (id) {
        return sendRequest(`/v1-city-alllist.html?provinceid=${id}`)
    } else {
        return sendRequest('/v1-city-alllist.html')
    }
}

/*
* 获取图片列表的接口
* @params  SerialID  车系 ID 
* @params  imgID   图片分类Id
* @params  [page=1]  分页页码数
* @params  [pageSize=30] 分页每页数量
* @params carId 车型的id
* @params colorId 颜色的id
* @return promise
*/
export let getImgData = (payload) => {
    return sendRequest(`/v2-car-getCategoryImageList.html?SerialID=${payload.SerialID}&ImageID=${payload.ImgID}&Page=${payload.page}&PageSize=30`)
}


/*
* 获取图片Color列表的接口
* @params  Color
*/
export let getImgList = (payload) => {
    console.log(payload)
    if (payload.ColorId) {
        return sendRequest(`/v2-car-getImageList.html?SerialID=${payload.SerialID}&ColorID=${payload.ColorId}`);
    } else if (payload.carId) {
        return sendRequest(`/v2-car-getImageList.html?SerialID=${payload.SerialID}&CarID=${payload.carId}`);
    }
    else {
        return sendRequest(`/v2-car-getImageList.html?SerialID=${payload}`);
    }
}


export let getColorList = (id) => {
    return sendRequest(`/v2-car-getModelImageYearColor.html?SerialID=${id}`);
}
