import axios from 'axios';
let base ='https://www.greenfortune.sh.cn'
// let base = 'http://180.153.19.162:8082';
// let base = 'http://192.168.1.133:8080';
// let base = '/lotto';

const configprizeList = {

}

export default{
    // base:'http:\/\/180.153.19.162:8082',
    base:'https:\/\/www.greenfortune.sh.cn',
    // base:`http:\/\/192.168.1.133:8080`,
    Uuid() {
        return new Date().valueOf() + Math.random()
      },
      timestamp() {
        return new Date().valueOf();
      },
      getPrizeList(params){
          return axios.get(`${base}/openapi/v2/app/hm/prilist`,{timeout: 5000}).then(res => res.data);
      },
      // login(params) {  
      //   return axios.post(`${base}/openapi/v2/app/hm/userLogin`,params).then(res => res.data);
      // },
      login(params) {  
        return axios.post(`${base}/openapi/v2/app/hm/denglu`,params).then(res => res.data);
      },
      myprize() {  
        return axios.get(`${base}/openapi/v2/app/hm/userrecord`).then(res => res.data);
      },
      getarea() {
        return axios.post(`${base}/openapi/v2/app/hm/districts`).then(res => res.data);
      },
      getuserinfo(params){
        return axios.post(`${base}/openapi/v2/app/hm/getUserApproveInfo`, params).then(res => res.data);
      },
      getuserint(params){
        return axios.post(`${base}/openapi/v2/app/hm/getUserInformation`, params).then(res => res.data);
      },
      getwinnerlist(params){
        return axios.post(`${base}/openapi/v2/app/hm/recordlist`,params).then(res => res.data);
      },
      getaddress(params){
        return axios.post(`${base}/openapi/v2/app/hm/getUserAddress`,params).then(res => res.data);
      },
      updateaddress(params){
        return axios.post(`${base}/openapi/v2/app/hm/updateRecAdd`,params).then(res => res.data);
      },
      getnextaddress(params){
        return axios.post(`${base}/openapi/v2/app/hm/getChildBranchBySupId`,params).then(res => res.data);
      },
      sendCodeToPhone(params){
        return axios.post(`${base}/openapi/v2/app/hm/sendCodeToPhone`,params).then(res => res.data);
      },
      userApprove(params){
        return axios.post(`${base}/openapi/v2/app/hm/userApproveAndEditAddress`,params).then(res => res.data);
      },
      addressEdit(params){
        return axios.post(`${base}/openapi/v2/app/hm/addressEdit`,params).then(res => res.data);
      }
     
}

