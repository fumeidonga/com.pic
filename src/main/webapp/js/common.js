//获取地址栏url中的参数值
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null)
		return decodeURIComponent(r[2]);
	return null; // 返回参数值
}

// 截取url参数（未编码情况）
function getUrl(name) {
	var url = location.search;
	var n = url.indexOf(name);

	var quoteUrl = url.substr(n + 4);
	return quoteUrl;
}

if (typeof String.prototype.endsWith != 'function') {
	String.prototype.endsWith=function(str){     
	  var reg=new RegExp(str+"$");     
	  return reg.test(this);        
	}
}

if (typeof String.prototype.startWith != 'function') {

	String.prototype.startWith=function(str){     
	  var reg=new RegExp("^"+str);     
	  return reg.test(this);        
	}
}

// 跳转本地网页的方法
function toNextJsp(url){
	if(isEmpty(url)){
		return;
	}
	var number = (1 + Math.random() * (1000 - 1)).toFixed(0);
	if(url.endsWith(".jsp")){
		url += "?number="+number;
	}else if(url.endsWith(".jsp?")){
		url += "number="+number;
	}else{
		url += "&number="+number;
	}
	window.location.href = url;
}
// 浏览器检测
function browserDetect() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger"
			|| ua.match(/QQ/i) == "qq") {
		if (ua.match(/Android/i) == "android") {
			return '0';
		} else if (ua.match(/iOS/i) == "ios") {
			return '1';
		}
	}
}

// 是否微信客户端
function isWeixin() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger"
			|| ua.match(/Weibo/i) == "weibo" || ua.match(/QQ/i) == "qq") {
		if(!isFromApp()){
			return true;
		}else{
			return false;
		}
	} else {
		return false;
	}
}

// 是否微博客户端
function isWeibo() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/WeiBo/i) == "weibo") {
		return true;
	}
	return false;
}

// 判断是否为空
function isEmpty(val) {
	if (val && val != null && val != '' && val != 'undefined') {
		return false;
	}
	return true;
}

function getVal(val) {
	if(isEmpty(val)) {
		return '';
	}
	return val;
}

// 在android代码中调用此方法
function setUserTokentCookie(obj, object) {
 console.log(object);
 var Days = 365;
 var exp = new Date(); 
 exp.setTime(exp.getTime() + Days*24*60*60*1000);
 var sss = obj +　'=' + object + ';expires=' + exp.toGMTString();
 document.cookie = obj + '=' + object + ';expires=' + exp.toGMTString();
}

// 回调APP设置cooki
function callCookie() {
 if (typeof JsObject == "object" &&  JsObject.setUserInfo) {
     JsObject.setUserInfo();
 }
}

//set app 导航栏
function setAppNavigation(rightButtonType, rightButtonShow, rightButtonAction, webFunctionName, title) {
 if (typeof JsObject == "object" && JsObject.setAppNavigation) {
     var jsonString = JSON.stringify({
         rightButtonType : rightButtonType,
         rightButtonShow : rightButtonShow,
         rightButtonAction : rightButtonAction,
         webFunctionName : webFunctionName,
         title : title
     });
	 
     JsObject.setAppNavigation(jsonString);
 }
}

//调转到群详情
function jumpAppContactGroup(contactId) {
	//printLog("000000000调转到群详情0000000000");
	 if (typeof JsObject == "object" && JsObject.jumpAppContactGroup) {
			//printLog("111111111调转到群详情111111111");
	     
	     JsObject.jumpAppContactGroup(contactId);
	 }
}

//注入到APP跳转带聊天界面
function jumpAppChatActivity(contactType,contactId){
	if (typeof JsObject == "object" && JsObject.jumpAppChatActivity){
		JsObject.jumpAppChatActivity(contactType,contactId);
	}
	return false;
	
}


// 回调APP打印log
function printLog(msg) {
 if (typeof JsObject == "object" &&  JsObject.printLog) {
     JsObject.printLog(msg);
 }
}

// 回调APP分享
function doShareCallback(image, title, desc, url) {
	if (typeof JsObject == "object" && JsObject.doShareCallback) {
		JsObject.doShareCallback(image, title, desc, url);
	}
}

//判断游客模式
function jumpAppTourist(){
	if (typeof JsObject == "object" && JsObject.jumpAppTourist){
		return JsObject.jumpAppTourist();
	}
	return false;
}

// 去掉字符串前后空格
function trim(obj){
	var reg = /(^\s*)|(\s*$)/g;
	var str = obj;
	if(str == null){
		return null;
	}
	return str.replace(reg, "");
}

function formateDate(str) {
	if (str == null || str.length == 0) {
		return "";
	}
	str = str.replace(/-/g, '/');
	// 创建日期对象
	var date = new Date(str);
	var year = date.getFullYear();
	var month = (parseInt(date.getMonth()) + 1);
	month = month > 9 ? month : ("0" + month);
	var day = date.getDate();
	day = day > 9 ? day : ("0" + day);
	var hour = date.getHours();
	hour = hour > 9 ? hour : ("0" + hour);
	var minute = date.getMinutes();
	minute = minute > 9 ? minute : ("0" + minute);
	var datestr = year + '-' + month + '-' + day + " " + hour + ":" + minute;
	return datestr;
}

// 如果图片不存在
function nofind(obj) {
	$(obj).attr("src", "../images/default_headpic.png");
}

// 马上打开跳转应用宝
function openRuyi(host, param) {
	var t1 = Date.now();
	location.href = 'ruyi://' + host + '?' + para;
	setTimeout(
			function() {
				var t2 = Date.now();
				if (!t1 || t2 - t1 < 400 + 50) {
					window.location = '/download.html?appType=2&channel=donateShare&host='
							+ host + '&para=' + encodeURIComponent(para);
				}
			}, 400);
}

function getCookie(name)// 取cookies函数
{
	var cookieStr = document.cookie;
	if (cookieStr.length > 0) {
		var cookieArr = cookieStr.split(";"); // 将cookie信息转换成数组
		for (var i = 0; i < cookieArr.length; i++) {
			var cookieVal = cookieArr[i].split("="); // 将每一组cookie(cookie名和值)也转换成数组
			if (trim(cookieVal[0]) == name) {
				return unescape(cookieVal[1]); // 返回需要提取的cookie值
			}
		}
	}
}


/* 接口访问相关 */
/** ********************正式服*************************** */
// 接口
var APP_IP = "http://192.168.100.130:8080";
// 商城
var SHOP_IP = "http://wapmall.c-doctor.com/";
// 挂号
var DOCTOR_APPOINT_IP = "https://open.quyiyuan.com:8443/v1.0/";
var DOCTOR_APPOINT_ACTION = "patientSubscribeReg_port.action?url=";
/** ***************************************************** */

if(location.href.startWith("http://")) {
	APP_IP = APP_IP.replace("https://", "http://");
}

/**
 * 后台文件服务根路径
 */
var APP_FILE = APP_IP + "RuyiFile/";

var APP_SERVER = APP_IP;

/**
 * 判断是否调试模式
 */
function isDebugMode() {
	return "https://webapp.c-doctor.com/" != APP_IP;
}

/**
 * 返回一个1-1000的随机数
 * */
function createRandom(){
	return (1 + Math.random() * (1000 - 1)).toFixed(0);
}

function hasLogin(){
	var loginUser = getCookie("loginUser");
	var doc_app_logUser = getCookie("doc_app_logUser")
	if (!loginUser && !doc_app_logUser) {
		return false;
	}
	return true;
}

/**
 * 取得登录用户信息
 */
function getLoginUser() {
	var loginUser = getCookie("loginUser");
	var doc_app_logUser = getCookie("doc_app_logUser")
	if (!loginUser && !doc_app_logUser) {
		return null;
	}
	if(loginUser) {
		json = JSON.parse(loginUser);
	}else{
		json = JSON.parse(doc_app_logUser);
	}
	if(json.loginname) json.loginName = json.loginname;
	if(json.phonenumber) json.phoneNumber = json.phonenumber;
	if(json.iconurl) json.iconUrl = json.iconurl;
	if(json.registertime) json.registerTime = json.registertime;
	if(json.lastlogintime) json.lastLoginTime = json.lastlogintime;

	if(json.username) json.userName = json.username;
	if(json.userName) {
		json.type = '1'; //医生
		json.loginName = json.userName;
	} else {
		json.type = '2'; //患者
	}
	if(json.ruyinum) json.ruyiNum = json.ruyinum;
	if(json.subsection) json.subSection = json.subsection;
	if(json.sectionphone) json.sectionPhone = json.sectionphone;
	if(json.doctoraddress) json.doctorAddress = json.doctoraddress;
	if(json.buynum) json.buyNum = json.buynum;
	if(json.recommendexponent) json.recommendExponent = json.recommendexponent;
	if(json.servicewill) json.serviceWill = json.servicewill;
	if(json.servicelevel) json.serviceLevel = json.servicelevel;
	if(json.imagetextprice) json.imageTextPrice = json.imagetextprice;
	if(json.imagetextbuynum) json.imageTextBuyNum = json.imagetextbuynum;
	if(json.imagetextserviceopen) json.imageTextServiceOpen = json.imagetextserviceopen;
	if(json.imagetextpraise) json.imageTextPraise = json.imagetextpraise;
	if(json.phoneconsultprice) json.phoneConsultPrice = json.phoneconsultprice;
	if(json.phoneconsultbuynum) json.phoneConsultBuyNum = json.phoneconsultbuynum;
	if(json.phoneconsultserviceopen) json.phoneConsultServiceOpen = json.phoneconsultserviceopen;
	if(json.phoneconsultpraise) json.phoneConsultPraise = json.phoneconsultpraise;
	if(json.phonetimeopen) json.phoneTimeOpen = json.phonetimeopen;
	if(json.selfdoctorprice) json.selfDoctorPrice = json.selfdoctorprice;
	if(json.selfdoctorbuynum) json.selfDoctorBuyNum = json.selfdoctorbuynum;
	if(json.selfdoctorserviceopen) json.selfDoctorServiceOpen = json.selfdoctorserviceopen;
	if(json.selfdoctorpraise) json.selfDoctorPraise = json.selfdoctorpraise;
	if(json.outpatientprice) json.outpatientPrice = json.outpatientprice;
	if(json.outpatientbuynum) json.outpatientBuyNum = json.outpatientbuynum;
	if(json.outpatientserviceopen) json.outpatientServiceOpen = json.outpatientserviceopen;
	if(json.goodandclinics) json.goodAndClinics = json.goodandclinics;
	if(json.medicaleducation) json.medicalEducation = json.medicaleducation;
	if(json.academicresearch) json.academicResearch = json.academicresearch;
	if(json.registertime) json.registerTime = json.registertime;
	if(json.lastlogintime) json.lastLoginTime = json.lastlogintime;
    if(json.authstatus) json.authStatus = json.authstatus;
    return json;
}

/**
 * 登入用户是医生
 */
function isDoctorUser() {
	var json = getLoginUser();
	if (json&&json.type == "1") {
		return true;
	}
	return false;
}

/**
 * 接口参数补全
 */
function autoComplete(param) {
	if (!param)
		param = {};
	if (param.append) {
		param.append('os', 'Web');
		param.append('nonce', createRandom());
	} else {
		param.os = "Web";
		param.nonce = createRandom();
	}
	var user = getLoginUser();
	if (!user) {
		return autoComplete;
	}

	if (param.append) {
		param.append('loginName', getVal(user.loginName));
		param.append('description', getVal(user.description));
		param.append('password', getVal(user.password));
	} else {
		param.loginName = getVal(user.loginName);
		param.description = getVal(user.description);
		param.password = getVal(user.password);
	}
	
	return param;
}

/**
 * 一般接口访问
 */
function ajaxJsonp(url, param, successFunction, failFunction) {
	var mycallback = 'c'+Math.floor((Math.random()*100000000)+1);
	autoComplete(param);
	jQuery.ajax({
		type : 'POST',
		async : false,
		dataType : 'jsonp',// 数据类型为jsonp
		jsonp : "jsonp_callback",
		jsonpCallback : mycallback,
		url : APP_SERVER + url,
		data : param
	}).then(successFunction, failFunction);
}

/**
 * 传送文件接口
 */
function ajaxPostFormWithFile(url, param, successFunction, failFunction) {
	var mycallback = 'c'+Math.floor((Math.random()*100000000)+1);
	autoComplete(param);
	jQuery.ajax({
		type : 'POST',
		async : true,
		dataType : 'jsonp',// 数据类型为jsonp
		jsonp : "jsonp_callback",
		jsonpCallback : mycallback,
		url : APP_SERVER + url,
		data : param,
		cache : false,
		processData : false,
		contentType : false
	}).then(successFunction, failFunction);
}

/**
 * 访问挂号接口
 */
function ajaxJsonpDoctorAppoint(url, param, successFunction, failFunction) {
	var mycallback = 'c'+Math.floor((Math.random()*100000000)+1);
	autoComplete(param);
	jQuery.ajax({
		type : 'POST',
		async : false,
		dataType : 'jsonp',// 数据类型为jsonp
		jsonp : "jsonp_callback",
		jsonpCallback : mycallback,
		url : APP_SERVER + DOCTOR_APPOINT_ACTION + DOCTOR_APPOINT_IP + url,
		data : param
	}).then(successFunction, failFunction);
}
var browser = {
	versions: function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		return;
	}()
}
function isFromApp() {
	var isFromApp = false;
	var userAgent = navigator.userAgent;
	if(userAgent!=null && userAgent!=undefined && userAgent!=''){
		if(userAgent.indexOf("ruyiPatient")!=-1 || userAgent.indexOf("ruyiDoctor")!=-1){
			isFromApp = true;
		}
	}
	return isFromApp;
}