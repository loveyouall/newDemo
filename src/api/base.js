import axios from 'axios'
const options = {
    method: 'POST',
    headers: {
    'content-type': 'application/json',
    'token': '18d73b5d74ea4eeeb87bddc162d14f9a'
    },
};
axios(options);
axios.interceptors.request.use(function (config) {
    // Do something before request is sent    
    config.headers['token']='18d73b5d74ea4eeeb87bddc162d14f9a'
    config.url = 'http://test.aiera.tech/aiera/index/bypass/handel'
    console.log(config)
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


export async function getContext(str) {
    let word = await axios({
        method: 'post',
        data: {
            "content": str
        }
    });
    let data = word['data']['d']
    console.log(999)
    // console.log(word)
    return data
}