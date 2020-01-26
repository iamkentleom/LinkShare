const url = window.opener.linkshare

document.getElementById('link').innerText = url
document.getElementById('qrcode').innerHTML = ''
    new QRCode(document.getElementById('qrcode'), {
        text: url,
        width: 450,
        height: 450,
        colorDark : "#1d4999",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
})