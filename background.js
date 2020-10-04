var mymap = L.map('map', {
    zoomControl:false,
	minZoom: 2,
	maxZoom: 5,
	useCache: true,
	crossOrigin: true,
	attributionControl: false,
    maxBoundsViscosity: 1.0,
    worldCopyJump: true
}).setView([0, 0], 3.5)
var attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
var tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
var tiles = L.tileLayer(tileURL, { attribution })
tiles.addTo(mymap)
var i = 1
var scndCount = 0
var checker
let getData
var marker = new Array()
while(i < 3983) {
    checker = "id" + i
    getData = dbaccess(checker)
    var lat = getData[1], lon = getData[2], m = getData[3], c = getData[4], n = getData[5], ia = getData[6], ic = getData[7], r = getData[8]
    if(m >= 85) {
        marker[scndCount] = new L.Marker([lat, lon])
        mymap.addLayer(marker[scndCount])
        marker[scndCount].bindPopup(`<b>${n}, ${c}</b><br>Market%: ${m}<br>Runway: ${r}ft<br>${ia}/${ic}`)
        scndCount++
    }
    i++
}
$("#map-apply").click(function(){
    var rwy = document.getElementById("map-maxrwy").value
    if(rwy != "") {
        let ii = 0;
        console.log(mymap)
        while(ii < marker.length) {
            mymap.removeLayer(marker[ii])
            ii++
        }
        marker = new Array();
        let ml = 0
        let ch
        let j = 1
        let mapData
        let lat, lon, m, c, n, ia, ic, r
        while(j < 4000) {
            ch = "id" + j
            mapData = dbaccess(ch)
            lat = mapData[1]; lon = mapData[2]; m = mapData[3]; c = mapData[4]; n = mapData[5]; ia = mapData[6]; ic = mapData[7]; r = mapData[8]
            if(r >= rwy && m >= 85) {
                marker[ml] = new L.Marker([lat, lon])
                mymap.addLayer(marker[ml])
                marker[ml].bindPopup(`<b>${n}, ${c}</b><br>Market%: ${m}<br>Runway: ${r}ft<br>${ia}/${ic}`)
                ml++
            }
            j++
        }
    }
})