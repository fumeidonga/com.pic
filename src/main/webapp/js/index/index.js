
$(document).ready(
        function(){
        	var url = window.location;
	        console.log(url);	
	        var host = url.host;
	        console.log(host);
	        $("#getCodeBtn").click(getcode);
	        
        }
);


/**
 * 一般接口访问
 */
function ajaxJsonp(url, param, successFunction, failFunction) {
	var mycallback = 'c'+Math.floor((Math.random()*100000000)+1);
	jQuery.ajax({
		type : 'POST',
		async : true,
		dataType : 'jsonp',// 数据类型为jsonp
		jsonp : "jsonp_callback",
		jsonpCallback : mycallback,
		url : "http://192.168.100.130:8080/" + url,
		data : param
	}).then(successFunction, failFunction);
}

var pageNum;
var pageSize;

function getcode(){
	var name = $("#nameinput").val();
	ajaxJsonp("queryName.do",{
		 name : name
		 }, getGroupSuccess, getGroupFail);
}

function getGroupSuccess(data){
	console.log(data);
}

function getGroupFail(data){
	console.log(data);
}



    	