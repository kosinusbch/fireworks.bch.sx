bitsocket = new EventSource('https://bitsocket-sa.bch.sx/stream');
bitsocket.onopen = function(e) {
    document.querySelector("#loading i.spinner").classList.add("fa-spin")
    document.querySelector("#loading .msg").innerHTML = "Listening for transactions"
}
bitsocket.onmessage = function(e) {
    var event = JSON.parse(e.data)
    if(event.type == 'mempool') {
        // Since bch has very few tx's per minute, we'll send one firework per transaction output (3 max).
        // The transaction itself is stored in event.data[0]

        for (var i = 0; i < event.data.out.length; i++) {
            var wmax = (screen.width * 0.8);
            var wmin = (screen.width * 0.2);
            if(event.data.out[i] && event.data.out[i].address) {
                if(i < 1) newFireworkSeed(Math.floor(Math.random() * (wmax - wmin + 1) + wmin), (screen.height - (document.getElementById('stream').offsetHeight * 1.37)));
                var el = document.getElementById('list'), ch = document.createElement('div');
                ch.setAttribute('class', 'new_tx');
                ch.setAttribute('data-timestamp', Date.now());
                ch.innerHTML = '<b><a href="https://explorer.bitcoin.com/bch/tx/' + event.data.tx.hash + '" target="_blank">*</a> ' + event.data.out[i].address.substring(0, 4) + '...'  + event.data.out[i].address.substring(25) + '</b> received <b>' + (event.data.out[i].value * 0.00000001).toFixed(8) + ' BCH</b>';
                el.insertBefore(ch, el.firstChild);
            }
        }
    }
}
