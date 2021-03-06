bitsocket = new EventSource('https://slpstream.fountainhead.cash/s/ewogICJ2IjogMywKICAicSI6IHsKICAgICJmaW5kIjoge30KICB9Cn0=');
bitsocket.onopen = function(e) {
    document.querySelector("#loading i.spinner").classList.add("fa-spin")
    document.querySelector("#loading .msg").innerHTML = "Listening for SLP transactions"
}
bitsocket.onmessage = function(e) {
    var event = JSON.parse(e.data)
    if(event.type == 'mempool') {
        // Since SLP has very few tx's per minute, we'll send one firework per transaction output (3 max).
        // The transaction itself is stored in event.data[0]

        for (var i = 0; i < event.data[0].slp.detail.outputs.length; i++) {
            var wmax = (screen.width * 0.8);
            var wmin = (screen.width * 0.2);
            if(event.data[0].slp.detail.outputs[i] && event.data[0].slp.detail.outputs[i].address && event.data[0].slp.detail.outputs[i].amount) {
                if(i < 3) newFireworkSeed(Math.floor(Math.random() * (wmax - wmin + 1) + wmin), (screen.height - (document.getElementById('stream').offsetHeight * 1.37)));
                var el = document.getElementById('list'), ch = document.createElement('div');
                ch.setAttribute('class', 'new_tx');
                ch.setAttribute('data-timestamp', Date.now());
                if(event.data[0].slp.detail.symbol && event.data[0].slp.detail.decimals) {
                    ch.innerHTML = '<b><a href="https://simpleledger.info/tx/' + event.data[0].tx.h + '" target="_blank">*</a> ' + event.data[0].slp.detail.outputs[i].address.substring(13, 17) + '...'  + event.data[0].slp.detail.outputs[i].address.substring(35) + '</b> received <b>' + (event.data[0].slp.detail.outputs[i].amount / event.data[0].slp.detail.decimals).toFixed(event.data[0].slp.detail.decimals) + ' ' +event.data[0].slp.detail.symbol + '</b>';
                } else if(event.data[0].slp.detail.symbol) {
                    ch.innerHTML = '<b><a href="https://simpleledger.info/tx/' + event.data[0].tx.h + '" target="_blank">*</a> ' + event.data[0].slp.detail.outputs[i].address.substring(13, 17) + '...'  + event.data[0].slp.detail.outputs[i].address.substring(35) + '</b> received <b>' + event.data[0].slp.detail.outputs[i].amount + ' ' + event.data[0].slp.detail.symbol + '</b>';
                } else {
                    ch.innerHTML = '<b><a href="https://simpleledger.info/tx/' + event.data[0].tx.h + '" target="_blank">*</a> ' + event.data[0].slp.detail.outputs[i].address.substring(13, 17) + '...'  + event.data[0].slp.detail.outputs[i].address.substring(35) + '</b> received <b>' + event.data[0].slp.detail.outputs[i].amount + ' unknown tokens</b>';
                }
                el.insertBefore(ch, el.firstChild);
            }
        }
    }
}
