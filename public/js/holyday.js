var specDayTypes = ['getRestDeInfo', 'getHoliDeInfo', 'getAnniversaryInfo', 'get24DivisionsInfo', 'getSundryDayInfo'];

// var specDayRequest = (year, month=0) => {
//     var days;
//     for (let i = 1; i < 5; i++) {
//         var url = 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/' + specDayTypes[specDayTypeNum];
//         var queryParams = '?' + encodeURIComponent('ServiceKey') + '=hQHtzArZhOZxfKBWc3wZDNkuMZ4BLdC7No%2FkCXkERhhvQjZUg7JjJ6cDJIScNxIQUVCJa4TJCrl9fOeXGVgufA%3D%3D';
//         queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
//         queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('50');
//         queryParams += '&' + encodeURIComponent('solYear') + '=' + encodeURIComponent(year);
//         queryParams += '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('json');
//         if (month) queryParams += '&' + encodeURIComponent('solMonth') + '=' + encodeURIComponent(month);

//         request({
//             url: url + queryParams,
//             method: 'GET'
//         }, (error, response, body) => {
//             console.log('Status', response.statusCode);
//             console.log('Headers', JSON.stringify(response.headers));
//             days[i] = JSON.parse(body).response.body.items.item;
//         });
//     }
//     return days;
// };