
var btn = document.getElementById('btn');
var input = document.getElementById('find_store_name');
var name = localStorage['name'];
if (name == undefined) {
	input.value = "";
} else {
	input.value = name;
}
btn.onclick = savedBtn;

// 获取当前选项卡ID
function getCurrentTabId(callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        if(callback) callback(tabs.length ? tabs[0].id: null);
    });
}

function sendMessageToContentScript(message, callback)
{
    getCurrentTabId((tabId) =>
    {
        chrome.tabs.sendMessage(tabId, message, function(response)
        {
            if(callback) callback(response);
        });
    });
}




function savedBtn() {
	var input = document.getElementById('find_store_name');
 	localStorage.name = input.value;
 	sendMessageToContentScript(input.value, (response) => {
        if(response) alert('收到来自content-script的回复：'+response);
    });
	// alert(input.value);
	// body...
}