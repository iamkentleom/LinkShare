chrome.tabs.query({"active":true}, (tabs) => {
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
        document.getElementById('short').innerText = `Loading...`
        fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`)
            .then(res => res.json())
            .then(json => {
                document.getElementById('link').innerText = json.shorturl
                document.getElementById('qrcode').innerHTML = ''
                new QRCode(document.getElementById("qrcode"), {
                    text: json.shorturl,
                    width: 250,
                    height: 250,
                    colorDark : "#1d4999",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                })
                document.getElementById('short').innerText = `Shorten Link`
            })
            .catch(() => {
                document.getElementById('short').innerText = `Error. Retry?`
            })
    })
})