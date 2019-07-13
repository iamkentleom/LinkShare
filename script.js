var xhttp = new XMLHttpRequest()
chrome.tabs.query({"active":true}, (tabs)=>{
    const url = tabs[0].url
    document.getElementById('link').innerText = url
    new QRCode(document.getElementById("qrcode"), {
        text: url,
        width: 250,
        height: 250,
        colorDark : "#1d4999",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    })
    document.getElementById('short').addEventListener('click', () => {
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                document.getElementById("qrcode").innerHTML = ''
                let urlObject = JSON.parse(xhttp.responseText)
                urlObject = urlObject["shorturl"]
                document.getElementById('link').innerText = urlObject
                document.getElementById('short').innerText = `Shorten Link`
                new QRCode(document.getElementById("qrcode"), {
                    text: urlObject,
                    width: 250,
                    height: 250,
                    colorDark : "#1d4999",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                })
            }else if(xhttp.readyState < 4){
                document.getElementById('short').innerText = `Loading...`
            }else{
                document.getElementById('short').innerText = `Error. Retry?`
            }
        }
        var tempURL = `https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`
        xhttp.open("GET", tempURL)
        xhttp.send()
    })
})