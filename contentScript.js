
//imageBlock_feature_div
// window.open("http://baidu.com",'_self') 
// alert(localStorage['name']); 


var mydiv = document.getElementById('imageBlock_feature_div');
var imgs = [];
if (mydiv != undefined) {
	// 处理剥离数据
	var scr = mydiv.getElementsByTagName('script') 
	if (scr.length > 0) {
		// 创建FileSystemObject对象实例 
        // window.open("https://images-na.ssl-images-amazon.com/images/I/613-CQeqZML._UL1500_.jpg");
		// var fso = new ActiveXObject("Scripting.FileSystemObject");
		// fso.CreateFolder("Desktop:\\Bogus");
		var data = scr[1];
		console.log(data);
		var dataStr = data.innerHTML;
		var re = /\'colorImages\':(.+?)}]}/;
		var datajsonStr = dataStr.match(re)[0];
		datajsonStr = datajsonStr.replace(/\'/g, "\"");
		var datajson = JSON.parse('{'+datajsonStr+'}');
		var allImgs = datajson['colorImages']['initial'];
		for (var i=0;i<allImgs.length;i++) {
			var getImg = allImgs[i]['hiRes'];
			if (getImg == undefined) {
				var maindic = allImgs[i]['main'];
				var maxN = 0;
				var maximg = '';
				for (let key in maindic) {
					var num = maindic[key][0];
					if (maxN < num) {
						maxN = num;
						maximg = key;
					}
				}
				imgs[i] = maximg;
			} else {
				imgs[i] = getImg;
			}
		}
		console.log(imgs);
	}
}

var vcurrent = document.getElementById("a-page");
var newDiv=document.createElement("div");
newDiv.id = 'amzDiv';
newDiv.style.width=document.body.clientWidth;
newDiv.style.height="20px";
newDiv.style.background = '#FFB6C1';
newDiv.innerHTML = "点击当前区域展示大图";
newDiv.style.cssText += 'text-align:center; font-size:18px; color:white';
if (mydiv != undefined) {
	vcurrent.parentNode.insertBefore(newDiv, vcurrent);
	document.getElementById(newDiv.id).onclick=function(){openAllImg();};
}
function openAllImg(argument) {
	// body...
	for (var i = 0; i < imgs.length; i++) {
		let img = imgs[i];
		// console.log(img);
		window.open(img);
	}
	document.body.removeChild(document.getElementById("amzDiv"));
}

//处理找出自己的 在哪一页？RASTPOAL
var store_name = localStorage['name'];
var number = -1;

// 监听消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	// store_name = request;
	localStorage.name = request;
	if (request.length) {
		alert('准备寻找'+request+'这个店铺');
	} else {
		alert('清除寻找店铺');
	}
 // sendResponse('我已收到你的消息：' +JSON.stringify(request));//做出回应
});

if (store_name.length>0) {
	var page_all_ul = document.getElementById('s-results-list-atf').childNodes;
	var isfind = false;
	for (var i = 0; i < page_all_ul.length; i++) {
		var page_a = page_all_ul[i];
		var store_span = page_a.getElementsByClassName('a-size-small a-color-secondary')[1];
		var store_span_name = store_span.innerText;
		console.log(store_span_name);
		if (store_name == store_span_name) {
			isfind = true;
			number = i;
			break;
		}
	}

	if (isfind) {
		alert(number+1);
	} else {
	//如果没有找到继续找
		window.next_page();
	}
}



function next_page(argument) {
	//下一步
	var next_a = document.getElementById('pagnNextLink');
	if (next_a != undefined) {
		next_a.click();
	}
// console.log(next_a)
	// body...
}



