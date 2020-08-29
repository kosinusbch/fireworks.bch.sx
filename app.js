bitsocket = new EventSource('https://bitsocket.bch.sx/s/ewogICJ2IjogMywKICAicSI6IHsKICAgICJmaW5kIjoge30KICB9Cn0=');
bitsocket.onopen = function(e) {
    document.querySelector("#loading i.spinner").classList.add("fa-spin")
    document.querySelector("#loading .msg").innerHTML = "Listening for transactions"
}
bitsocket.onmessage = function(e) {
    var event = JSON.parse(e.data)
    if(event.type == 'mempool') {
        // Since bch has very few tx's per minute, we'll send a firework for every output
        // The transaction itself is stored in event.data[0]

        event.data[0].out.forEach(async function (out) {
            var list = document.getElementById('list');
            var wmax = (screen.width * 0.8);
            var wmin = (screen.width * 0.2);
            if(out && out.e && out.e.a) {
                console.log(out.e.a, 'received', out.e.v)
                newFireworkSeed(Math.floor(Math.random() * (wmax - wmin + 1) + wmin), (screen.height - (document.getElementById('stream').offsetHeight * 1.37)));
                list.innerHTML = '<b>' + out.e.a.substring(0, 4) + '...'  + out.e.a.substring(35) + '</b> received <b>' + (out.e.v * 0.00000001).toFixed(8) + ' BCH</b><br/>' + list.innerHTML;
            }
        })
    } else if(event.type == 'open') {
        newFireworkSeed(Math.floor(Math.random() * (wmax - wmin + 1) + wmin), (screen.height - (document.getElementById('stream').offsetHeight * 1.37)));
    }
}
