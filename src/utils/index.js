//把所有的相同的参数合并起来
function getCarList(list) {
    let keys = [],
        arr = {};
    list.forEach(item => {
        let key = item.exhaust_str + '/' + item.max_power_str + item.add_press_type;
        if (keys.indexOf(key) !== -1) {
            arr[key].push(item);
        } else {
            keys.push(key);
            arr[key] = [item];
        }
    })
    return arr;
}
//排序
function sortCarList(list) {
    list.sort((a, b) => {
        if (a.exhaust != b.exhaust) {
            return a.exhaust - b.exhaust;
        } else {
            if (a.max_power_str != b.max_power_str) {
                return a.max_power_str - b.max_power_str;
            } else {
                if (a.add_press_type != b.add_press_typ) {
                    return a.add_press_typ - b.add_press_typ;
                } else {
                    return b.market_attribute.year - a.market_attribute.year;
                }
            }
        }
    })
    return list;
}
//过滤出来与点击元素相等的年份
function filterCarList(year, list) {
    if (year === '全部') {
        return list.filter(item => item);
    } else {
        return list.filter(item => item.market_attribute.year === year);
    }
}

export default {
    getCarList,
    sortCarList,
    filterCarList
}