var svC = new Chart(document.getElementById("p-svchart"), { type: ' line' })
var fC1 = new Chart(document.getElementById("p-fleet1"), { type: 'line' })
var fC2 = new Chart(document.getElementById("p-fleet2"), { type: 'line' })
var fC3 = new Chart(document.getElementById("p-fleet3"), { type: 'line' })
var m1 = new Chart(document.getElementById("a-m1"), { type: 'line' })
var m2 = new Chart(document.getElementById("a-m2"), { type: 'line' })
var m3 = new Chart(document.getElementById("a-m3"), { type: 'line' })
var m4 = new Chart(document.getElementById("a-m4"), { type: 'line' })
$("#filter-icon").click(function() {
   $("#filter-res").animate({
      top: '40px'
   }, 555)
})
$("#filter-removeres").click(function() {
   $("#filter-res").animate({
      top: '-130px'
   }, 555)
})
function filterInput(obj) {
   let v = obj.value
   let i = 0
   let z = ""
   let k
   while(i < 10) {
       k = v.charAt(i)
       if(parseInt(k) == 1 || parseInt(k) == 2 || parseInt(k) == 3 || parseInt(k) == 4 || parseInt(k) == 5 || parseInt(k) == 6 || parseInt(k) == 7 || parseInt(k) == 8 || parseInt(k) == 9 || parseInt(k) == 0) {
          z = z + k
       }
       i++
   }
   obj.value = z
}
function paxcargo(pn) {
   let z = acdb(pn)
   let a = z[1]
   if(a < 1000) {
      return 1
   } else {
      return 2
   }
}
$(".closebtn").click(function() {
   $(".whole-scr-modal").hide()
   $(".modal-content").hide()
})
$("#btn1").click(function() {
   $(".modal-content").hide()
   $(".whole-scr-modal").show()
   $("#paxmenu").show()
   $("#btn-pax1").click()
})
$("#btn2").click(function() {
   $(".modal-content").hide()
   $(".whole-scr-modal").show()
   $("#cargomenu").show()
   $("#btn-car1").click()
})
$("#btn3").click(function() {
   $(".modal-content").hide()
   $(".whole-scr-modal").show()
   $("#routemenu").show()
   $("#btn-rts1").click()
})
$("#btn4").click(function() {
   $(".modal-content").hide()
   $(".whole-scr-modal").show()
   $("#othermenu").show()
   $("#btn-oth1").click()
})
$("#btn5").click(function() {
   $(".modal-content").hide()
   $(".whole-scr-modal").show()
   $("#chartmenu").show()
   $("#btn-cha1").click()
})
$("#closebtn").click(function() {
   $("#alertbox").fadeOut()
   reversered()
})
function alertBox(msg, col) {
   $("#alerttext").text(msg)
   $("#alertbox").css({ color: col }).show()
}
function reversered() {
   $(".form-control").css({
      border: '1px solid #ced4da',
      boxShadow: 'initial'
   })
}
function refreshChartSize() {
   let tableElement = document.getElementsByClassName("charttable")[0]
   let tableElementComputedV = window.getComputedStyle(tableElement)
   let chartWidthProperty = tableElementComputedV.getPropertyValue("width")
   $(".chart").css({
      maxWidth: chartWidthProperty
  })
}
//CARGO rework!
function easyLarge(distance) {
   return Math.floor((((((0.000948283724581252 * distance) + 0.862045432642377000) - 0.01) * 1.10)) * 100) / 100;
}
function easyHeavy(distance) {
   return (Math.floor((((((0.000689663577640275 * distance) + 0.292981124272893000) - 0.01) * 1.08)) * 100) / 100);
}
function realLarge(distance) {
   return (Math.floor((((((0.000776321822039374 * distance) + 0.860567600367807000) - 0.01) * 1.10)) * 100) / 100);
}
function realHeavy(distance) {
   return (Math.floor((((((0.000517742799409248 * distance) + 0.256369915396414000) - 0.01) * 1.08)) * 100) / 100);
}
//PAX
function easyY(distance) {
   return Math.floor((0.4 * (distance - 1) + 170) * 1.1)
}
function easyJ(distance) {
   return Math.floor((0.8 * (distance - 1) + 560) * 1.08)
}
function easyF(distance) {
   return Math.floor((1.2 * (distance - 1) + 1200) * 1.06)
}
function realY(distance) {
   return Math.floor((0.3 * (distance - 1) + 150) * 1.1)
}
function realJ(distance) {
   return Math.floor((0.6 * (distance - 1) + 500) * 1.08)
}
function realF(distance) {
   return Math.floor((0.9 * (distance - 1) + 1000) * 1.06)
}
var largeT = document.getElementById("largeTraining")
largeT.oninput = function() {
   document.getElementById("tr1").innerHTML = "Large Load Training --" + this.value + "/6"
}
var heavyT = document.getElementById("heavyTraining")
heavyT.oninput = function() {
   document.getElementById("tr2").innerHTML = "Heavy Load Training --" + this.value + "/6"
}
var marketMin = document.getElementById("marketMin")
marketMin.oninput = function() {
   document.getElementById("tr3").innerHTML = "Min. Market% --" + this.value + "%"
}
//PAX MENU CONTROL
$("#btn-pax1").click(function() {
   $(".tools").hide()
   $(".tool-answer").hide()
   $("#tool-pax1").show()
   $("#btn-pax1").addClass("men-sel")
   $("#btn-pax2").removeClass("men-sel")
   $("#btn-pax3").removeClass("men-sel")
})
$("#btn-pax2").click(function() {
   $(".tools").hide()
   $(".tool-answer").hide()
   $("#tool-pax2").show()
   $("#btn-pax2").addClass("men-sel")
   $("#btn-pax1").removeClass("men-sel")
   $("#btn-pax3").removeClass("men-sel")
})
$("#btn-pax3").click(function() {
   $(".tools").hide()
   $(".tool-answer").hide()
   $("#tool-pax3").show()
   $("#btn-pax3").addClass("men-sel")
   $("#btn-pax2").removeClass("men-sel")
   $("#btn-pax1").removeClass("men-sel")
})
//PAXTICKET
function redCol1() {
   $(".cat1").css({
      border: '#a1000b',
      boxShadow: '0 0 0 .2rem rgba(225,83,97,.5)'
   })
}
$("#exec1").click(function() {
   paxticket("r")
   $("#cat1-s1").css({
      backgroundColor: '#103de0',
      borderColor: '#103de0',
      boxShadow: '0 0 0 .2rem rgba(0,123,255,.25)',
      zIndex: 2020
   })
   $("#cat1-s2").css({
      backgroundColor: '#107fe0',
      borderColor: '#107fe0',
      boxShadow: 'none',
      zIndex: 'initial'
   })
})
$("#cat1-s1").click(function() {
   paxticket("r")
   $("#cat1-s1").css({
      backgroundColor: '#103de0',
      borderColor: '#103de0',
      boxShadow: '0 0 0 .2rem rgba(0,123,255,.25)',
      zIndex: 2020
   })
   $("#cat1-s2").css({
      backgroundColor: '#107fe0',
      borderColor: '#107fe0',
      boxShadow: 'none',
      zIndex: 'initial'
   })
})
$("#cat1-s2").click(function() {
   paxticket("e")
   $("#cat1-s2").css({
      backgroundColor: '#103de0',
      borderColor: '#103de0',
      boxShadow: '0 0 0 .2rem rgba(0,123,255,.25)',
      zIndex: 2020
   })
   $("#cat1-s1").css({
      backgroundColor: '#107fe0',
      borderColor: '#107fe0',
      boxShadow: 'none',
      zIndex: 'initial'
   })
})
$("#pax-ret1").click(function() {
   $("#ans-pax1").hide()
   $("#tool-pax1").show()
})
//PAXCONFIG
function redCol2() {
   $(".cat2").css({
      border: '#a1000b',
      boxShadow: '0 0 0 .2rem rgba(225,83,97,.5)'
   })
}
$("#exec2").click(function() {
   paxseats("r","n")
   $("#cat2-s1").css({
      backgroundColor: '#103de0',
      borderColor: '#103de0',
      boxShadow: '0 0 0 .2rem rgba(0,123,255,.25)',
      zIndex: 2020
   })
   $("#cat2-s2").css({
      backgroundColor: '#107fe0',
      borderColor: '#107fe0',
      boxShadow: 'none',
      zIndex: 'initial'
   })
   $("#cat2-s3").css({
      backgroundColor: '#103de0',
      borderColor: '#103de0',
      boxShadow: '0 0 0 .2rem rgba(0,123,255,.25)',
      zIndex: 2020
   })
   $("#cat2-s4").css({
      backgroundColor: '#107fe0',
      borderColor: '#107fe0',
      boxShadow: 'none',
      zIndex: 'initial'
   })
})
function detRealEasy() {
   if($('#cat2-s1')[0].style.boxShadow != 'none') {
       return 'r'
   } else {
       return 'e'
   }
}
function detNormAlt() {
   if($('#cat2-s3')[0].style.boxShadow != 'none') {
       return 'n'
   } else {
       return 'm'
   }
}
$("#cat2-s1").click(function() {
   paxseats("r",detNormAlt())
   $("#cat2-s1").css({
      backgroundColor: '#103de0',
      borderColor: '#103de0',
      boxShadow: '0 0 0 .2rem rgba(0,123,255,.25)',
      zIndex: 2020
   })
   $("#cat2-s2").css({
      backgroundColor: '#107fe0',
      borderColor: '#107fe0',
      boxShadow: 'none',
      zIndex: 'initial'
   })
})
$("#cat2-s2").click(function() {
   paxseats("e",detNormAlt())
   $("#cat2-s2").css({
      backgroundColor: '#103de0',
      borderColor: '#103de0',
      boxShadow: '0 0 0 .2rem rgba(0,123,255,.25)',
      zIndex: 2020
   })
   $("#cat2-s1").css({
      backgroundColor: '#107fe0',
      borderColor: '#107fe0',
      boxShadow: 'none',
      zIndex: 'initial'
   })
})
$("#cat2-s3").click(function() {
   paxseats(detRealEasy(),"n")
   $("#cat2-s3").css({
      backgroundColor: '#103de0',
      borderColor: '#103de0',
      boxShadow: '0 0 0 .2rem rgba(0,123,255,.25)',
      zIndex: 2020
   })
   $("#cat2-s4").css({
      backgroundColor: '#107fe0',
      borderColor: '#107fe0',
      boxShadow: 'none',
      zIndex: 'initial'
   })
})
$("#cat2-s4").click(function() {
   paxseats(detRealEasy(),"m")
   $("#cat2-s4").css({
      backgroundColor: '#103de0',
      borderColor: '#103de0',
      boxShadow: '0 0 0 .2rem rgba(0,123,255,.25)',
      zIndex: 2020
   })
   $("#cat2-s3").css({
      backgroundColor: '#107fe0',
      borderColor: '#107fe0',
      boxShadow: 'none',
      zIndex: 'initial'
   })
})
$("#pax-ret2").click(function() {
   $("#ans-pax2").hide()
   $("#tool-pax2").show()
})
//PAXPROFIT
function redCol3() {
   $(".cat3").css({
      border: '#a1000b',
      boxShadow: '0 0 0 .2rem rgba(225,83,97,.5)'
   })
}
$("#exec3").click(function() {
   paxprofit("r")
   $("#cat3-s1").css({
      backgroundColor: '#103de0',
      borderColor: '#103de0',
      boxShadow: '0 0 0 .2rem rgba(0,123,255,.25)',
      zIndex: 2020
   })
   $("#cat3-s2").css({
      backgroundColor: '#107fe0',
      borderColor: '#107fe0',
      boxShadow: 'none',
      zIndex: 'initial'
   })
})
$("#cat3-s1").click(function() {
   paxprofit("r")
   $("#cat3-s1").css({
      backgroundColor: '#103de0',
      borderColor: '#103de0',
      boxShadow: '0 0 0 .2rem rgba(0,123,255,.25)',
      zIndex: 2020
   })
   $("#cat3-s2").css({
      backgroundColor: '#107fe0',
      borderColor: '#107fe0',
      boxShadow: 'none',
      zIndex: 'initial'
   })
})
$("#cat3-s2").click(function() {
   paxprofit("e")
   $("#cat3-s2").css({
      backgroundColor: '#103de0',
      borderColor: '#103de0',
      boxShadow: '0 0 0 .2rem rgba(0,123,255,.25)',
      zIndex: 2020
   })
   $("#cat3-s1").css({
      backgroundColor: '#107fe0',
      borderColor: '#107fe0',
      boxShadow: 'none',
      zIndex: 'initial'
   })
})
$("#pax-ret3").click(function() {
   $("#ans-pax3").hide()
   $("#tool-pax3").show()
})
//CARGO MENU CONTROL
$("#btn-car1").click(function() {
   $(".tools").hide()
   $(".tool-answer").hide()
   $("#tool-car1").show()
   $("#btn-car1").addClass("men-sel")
   $("#btn-car2").removeClass("men-sel")
   $("#btn-car3").removeClass("men-sel")
})
$("#btn-car2").click(function() {
   $(".tools").hide()
   $(".tool-answer").hide()
   $("#tool-car2").show()
   $("#btn-car2").addClass("men-sel")
   $("#btn-car1").removeClass("men-sel")
   $("#btn-car3").removeClass("men-sel")
})
$("#btn-car3").click(function() {
   $(".tools").hide()
   $(".tool-answer").hide()
   $("#tool-car3").show()
   $("#btn-car3").addClass("men-sel")
   $("#btn-car1").removeClass("men-sel")
   $("#btn-car2").removeClass("men-sel")
})
//CARGOTICKET
function redCol4() {
   $(".cat4").css({
      border: '#a1000b',
      boxShadow: '0 0 0 .2rem rgba(225,83,97,.5)'
   })
}
$("#exec4").click(function() {
   cticket("r")
   $("#cat4-s1").css({
      backgroundColor: '#103de0',
      borderColor: '#103de0',
      boxShadow: '0 0 0 .2rem rgba(0,123,255,.25)',
      zIndex: 2020
   })
   $("#cat4-s2").css({
      backgroundColor: '#107fe0',
      borderColor: '#107fe0',
      boxShadow: 'none',
      zIndex: 'initial'
   })
})
$("#cat4-s1").click(function() {
   cticket("r")
   $("#cat4-s1").css({
      backgroundColor: '#103de0',
      borderColor: '#103de0',
      boxShadow: '0 0 0 .2rem rgba(0,123,255,.25)',
      zIndex: 2020
   })
   $("#cat4-s2").css({
      backgroundColor: '#107fe0',
      borderColor: '#107fe0',
      boxShadow: 'none',
      zIndex: 'initial'
   })
})
$("#cat4-s2").click(function() {
   cticket("e")
   $("#cat4-s2").css({
      backgroundColor: '#103de0',
      borderColor: '#103de0',
      boxShadow: '0 0 0 .2rem rgba(0,123,255,.25)',
      zIndex: 2020
   })
   $("#cat4-s1").css({
      backgroundColor: '#107fe0',
      borderColor: '#107fe0',
      boxShadow: 'none',
      zIndex: 'initial'
   })
})
$("#car-ret1").click(function() {
   $("#ans-car1").hide()
   $("#tool-car1").show()
})
//CARGOCONFIG
function redCol5() {
   $(".cat5").css({
      border: '#a1000b',
      boxShadow: '0 0 0 .2rem rgba(225,83,97,.5)'
   })
}
$("#exec5").click(function() {
   cseats("n")
   $("#cat5-s1").css({
      backgroundColor: '#103de0',
      borderColor: '#103de0',
      boxShadow: '0 0 0 .2rem rgba(0,123,255,.25)',
      zIndex: 2020
   })
   $("#cat5-s2").css({
      backgroundColor: '#107fe0',
      borderColor: '#107fe0',
      boxShadow: 'none',
      zIndex: 'initial'
   })
})
$("#cat5-s1").click(function() {
   cseats("n")
   $("#cat5-s1").css({
      backgroundColor: '#103de0',
      borderColor: '#103de0',
      boxShadow: '0 0 0 .2rem rgba(0,123,255,.25)',
      zIndex: 2020
   })
   $("#cat5-s2").css({
      backgroundColor: '#107fe0',
      borderColor: '#107fe0',
      boxShadow: 'none',
      zIndex: 'initial'
   })
})
$("#cat5-s2").click(function() {
   cseats("m")
   $("#cat5-s2").css({
      backgroundColor: '#103de0',
      borderColor: '#103de0',
      boxShadow: '0 0 0 .2rem rgba(0,123,255,.25)',
      zIndex: 2020
   })
   $("#cat5-s1").css({
      backgroundColor: '#107fe0',
      borderColor: '#107fe0',
      boxShadow: 'none',
      zIndex: 'initial'
   })
})
$("#car-ret2").click(function() {
   $("#ans-car2").hide()
   $("#tool-car2").show()
})
//CARGOPROFIT
function redCol6() {
   $(".cat6").css({
      border: '#a1000b',
      boxShadow: '0 0 0 .2rem rgba(225,83,97,.5)'
   })
}
$("#exec6").click(function() {
   cprofit("r")
   $("#cat6-s1").css({
      backgroundColor: '#103de0',
      borderColor: '#103de0',
      boxShadow: '0 0 0 .2rem rgba(0,123,255,.25)',
      zIndex: 2020
   })
   $("#cat6-s2").css({
      backgroundColor: '#107fe0',
      borderColor: '#107fe0',
      boxShadow: 'none',
      zIndex: 'initial'
   })
})
$("#cat6-s1").click(function() {
   cprofit("r")
   $("#cat6-s1").css({
      backgroundColor: '#103de0',
      borderColor: '#103de0',
      boxShadow: '0 0 0 .2rem rgba(0,123,255,.25)',
      zIndex: 2020
   })
   $("#cat6-s2").css({
      backgroundColor: '#107fe0',
      borderColor: '#107fe0',
      boxShadow: 'none',
      zIndex: 'initial'
   })
})
$("#cat6-s2").click(function() {
   cprofit("e")
   $("#cat6-s2").css({
      backgroundColor: '#103de0',
      borderColor: '#103de0',
      boxShadow: '0 0 0 .2rem rgba(0,123,255,.25)',
      zIndex: 2020
   })
   $("#cat6-s1").css({
      backgroundColor: '#107fe0',
      borderColor: '#107fe0',
      boxShadow: 'none',
      zIndex: 'initial'
   })
})
$("#car-ret3").click(function() {
   $("#ans-car3").hide()
   $("#tool-car3").show()
})
//ROUTE MENU CONTROL
$("#btn-rts1").click(function() {
   $(".tools").hide()
   $(".tool-answer").hide()
   $("#tool-rts1").show()
   $("#btn-rts1").addClass("men-sel")
   $("#btn-rts2").removeClass("men-sel")
})
$("#btn-rts2").click(function() {
   $(".tools").hide()
   $(".tool-answer").hide()
   $("#tool-rts2").show()
   $("#btn-rts2").addClass("men-sel")
   $("#btn-rts1").removeClass("men-sel")
})
//STOPOVER
function redCol7() {
   $(".cat7").css({
      border: '#a1000b',
      boxShadow: '0 0 0 .2rem rgba(225,83,97,.5)'
   })
}
$("#exec7").click(function() {
   searchstopover()
   stmap.invalidateSize()
})
$("#rts-ret1").click(function() {
   $("#ans-rts1").hide()
   $("#tool-rts1").show()
})
//MARKETFIND
function redCol8() {
   $(".cat8").css({
      border: '#a1000b',
      boxShadow: '0 0 0 .2rem rgba(225,83,97,.5)'
   })
}
$("#exec8").click(function() {
   mfind()
})
$("#rts-ret2").click(function() {
   $("#ans-rts2").hide()
   $("#tool-rts2").show()
})
//OTHER MENU CONTROL
$("#btn-oth1").click(function() {
   $(".tools").hide()
   $(".tool-answer").hide()
   $("#tool-oth1").show()
   $("#btn-oth1").addClass("men-sel")
   $("#btn-oth2").removeClass("men-sel")
})
$("#btn-oth2").click(function() {
   $(".tools").hide()
   $(".tool-answer").hide()
   $("#tool-oth2").show()
   $("#btn-oth2").addClass("men-sel")
   $("#btn-oth1").removeClass("men-sel")
})
//AC SEARCH
function redCol9() {
   $(".cat9").css({
      border: '#a1000b',
      boxShadow: '0 0 0 .2rem rgba(225,83,97,.5)'
   })
}
$("#exec9").click(function() {
   $(".plane-content").addClass("plane-hide")
   acsearch()
})
$("#oth-ret1").click(function() {
   $("#ans-oth1").hide()
   $("#tool-oth1").show()
})
//RESELL
function redCol10() {
   $(".cat10").css({
      border: '#a1000b',
      boxShadow: '0 0 0 .2rem rgba(225,83,97,.5)'
   })
}
$("#exec10").click(function() {
   resell()
})
$("#oth-ret2").click(function() {
   $("#ans-oth2").hide()
   $("#tool-oth2").show()
})
//CHART MENU CONTROL
$("#btn-cha1").click(function() {
   $(".tools").hide()
   $(".tool-answer").hide()
   $("#tool-cha1").show()
   $("#btn-cha1").addClass("men-sel")
   $("#btn-cha2").removeClass("men-sel")
})
$("#btn-cha2").click(function() {
   $(".tools").hide()
   $(".tool-answer").hide()
   $("#tool-cha2").show()
   $("#btn-cha2").addClass("men-sel")
   $("#btn-cha1").removeClass("men-sel")
})
//PLAYERCHART
function redCol11() {
   $(".cat11").css({
      border: '#a1000b',
      boxShadow: '0 0 0 .2rem rgba(225,83,97,.5)'
   })
}
$("#exec11").click(function() {
   playerchart()
})
$("#cha-ret1").click(function() {
   $("#ans-cha1").hide()
   $("#tool-cha1").show()
})
//ALLYCHART
function redCol12() {
   $(".cat12").css({
      border: '#a1000b',
      boxShadow: '0 0 0 .2rem rgba(225,83,97,.5)'
   })
}
$("#exec12").click(function() {
   allychart()
})
$("#cha-ret2").click(function() {
   $("#ans-cha2").hide()
   $("#tool-cha2").show()
})