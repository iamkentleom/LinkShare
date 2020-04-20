browser.tabs.query({"active":true}, (tabs) => {
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
        const btn = document.getElementById('short')
        btn.innerText = `Loading...`
        btn.disabled = true
        fetch(`https://tinyurl-rest-wrapper.herokuapp.com/shorten?url=${encodeURIComponent(url)}`)
            .then(res => res.json())
            .then(json => {
                document.getElementById('link').innerText = json.tinyurl
                document.getElementById('qrcode').innerHTML = ''
                new QRCode(document.getElementById("qrcode"), {
                    text: json.tinyurl,
                    width: 250,
                    height: 250,
                    colorDark : "#1d4999",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                })
                btn.innerText = `Shorten Link`
                btn.disabled = false
            })
            .catch(() => {
                btn.innerText = `Error. Retry?`
                btn.disabled = false
            })
    })
    document.getElementById('expand').addEventListener('click', () => {
        const new_url = document.getElementById('link').innerText
        window.linkshare = new_url
        let win = window.open('index.html', '_blank')
        win.focus()
    })
    document.getElementById('link-box').addEventListener('click', () => {
        const url_copy = document.getElementById('link').innerText
        navigator.clipboard.writeText(url_copy)
            .then()
            .catch()
    })
})