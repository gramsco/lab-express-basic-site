const axios = require("axios");
const url = 'http://poetrydb.org/author/keats';

let bigdata = []

axios.get(url).then(res => {

    getData(res.data);
}).catch(err => {
    console.log(err)
})

function getData(data) {
    data.forEach(element => {
        bigdata.push(element)
    });
}

setTimeout(() => {
    console.log(bigdata)
}, 5000);
