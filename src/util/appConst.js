// let BACKEND_DOMAIN = 'http://192.168.0.241/larSys/public/index.php/api/';
let BACKEND_DOMAIN = 'https://e.yhtjc.com/v2/public/index.php/api/';
// let BACKEND_DOMAIN = 'http://test.miaoyi09.com/public/index.php/api/';
if (process.env.NODE_ENV === 'production') {
  //BACKEND_DOMAIN = 'http://h5.limesoftware.cn'
} else if (process.env.NODE_ENV === 'development') {
  	// BACKEND_DOMAIN = 'http://192.168.1.241/larSys/public/index.php/api/';

   	BACKEND_DOMAIN = 'http://421037.f3322.net:8090/index.php/api/';
}

let UE_SERVER = BACKEND_DOMAIN + 'ueditor/';

export default {
  BACKEND_DOMAIN,
  UE_SERVER
}