// function injectCustomJs(jsPath)
// {

// 	alert("hello");
// 	console.log("hello");
// }


// {
//     // 需要直接注入页面的JS
//     "content_scripts": 
//     [
//         {
//             //"matches": ["http://*/*", "https://*/*"],
//             // "<all_urls>" 表示匹配所有地址
//             "matches": ["<all_urls>"],
//             // 多个JS按顺序注入
//             "js": ["js/jquery-1.8.3.js", "js/content-script.js"],
//             // JS的注入可以随便一点，但是CSS的注意就要千万小心了，因为一不小心就可能影响全局样式
//             "css": ["css/custom.css"],
//             // 代码注入的时间，可选值： "document_start", "document_end", or "document_idle"，最后一个表示页面空闲时，默认document_idle
//             "run_at": "document_start"
//         }
//     ],
// }