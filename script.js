chrome.tabs.query({"active":true}, (tabs)=>{
    const url = tabs[0].url
    document.getElementById('link').innerHTML = url
    new QRCode(document.getElementById("qrcode"), {
        text: url,
        width: 250,
        height: 250,
        colorDark : "#1d4999",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    })
})