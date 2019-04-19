chrome.tabs.query({"active":true}, (tabs)=>{
    const url = tabs[0].url
    document.getElementById('link').innerHTML = url
    new QRCode(document.getElementById("qrcode"), {
        text: url,
        width: 150,
        height: 150,
        colorDark : "#1d58ac",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    })
})