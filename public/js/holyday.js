var request = require('request');
var exports = module.exports = {};

exports.specDayRequest = (year, month=0) => {
    var specDayTypes = ['getRestDeInfo', 'getHoliDeInfo', 'getAnniversaryInfo', 'get24DivisionsInfo', 'getSundryDayInfo'];
    var days = [,,,,];
    var result = [];
    for (let i = 1; i < 2; i++) {
        var url = 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/' + specDayTypes[i];
        var queryParams = '?' + encodeURIComponent('ServiceKey') + '=hQHtzArZhOZxfKBWc3wZDNkuMZ4BLdC7No%2FkCXkERhhvQjZUg7JjJ6cDJIScNxIQUVCJa4TJCrl9fOeXGVgufA%3D%3D';
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('50');
        queryParams += '&' + encodeURIComponent('solYear') + '=' + encodeURIComponent(year);
        queryParams += '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('json');
        if (month != 0) {
            queryParams += '&' + encodeURIComponent('solMonth') + '=' + encodeURIComponent((month < 10)?('0' + month):(month));
        }
        request({
            url: url + queryParams,
            method: 'GET'
        }, (error, response, body) => {
            console.log('Status', response.statusCode);
            console.log('Headers', JSON.stringify(response.headers));
            days = JSON.parse(body).response.body.items.item;
            if (days.length > 1) {
                days.forEach(element => {
                    console.log({locdate:element.locdate,dateName:element.dateName,isHoliday:element.isHoliday});
                    result.push({locdate:element.locdate,dateName:element.dateName,isHoliday:element.isHoliday});
                });
            }
            else {
                console.log({locdate:days.locdate,dateName:days.dateName,isHoliday:days.isHoliday});
                result.push({locdate:days.locdate,dateName:days.dateName,isHoliday:days.isHoliday});
            }
            console.log('func:'+result);
        });
        return result;
    }
}

(async() => {
    var result = await exports.specDayRequest(2020, 5);
    console.log('export:'+result);
})();


