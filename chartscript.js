function playerchart() {
    let nm = document.getElementById("playerName-p").value
    if(nm == "") {
        redCol11()
        alertBox("Please provide a player name!","#fa3737")
        return
    }
    let url = "https://www.airline4.net/api/?access_token=g53urfGFDtreHnXdfWjYTrcGR:465JHTYRdGJSAHjfgcxE21312H&user=" + nm
    let a = new XMLHttpRequest()
    a.onreadystatechange = function() {
        if(a.readyState == 4 && a.status == 200) {
            if(JSON.parse(a.responseText).status.request != "success") {
                alertBox("Please provide a valid player name!","#fa3737")
                redCol11()
            } else {
                playerchartfunc(JSON.parse(a.responseText))
            }
        }
    }
    a.open("GET", url)
    a.send()
    function playerchartfunc(r) {
        function allycheck(a) {
            if(a == false) {
                return "NO ALLIANCE"
            } else {
                return a
            }
        }
        function sharecheck(sv) {
            if(sv == 0) {
                $("#p-sv").css({ color: '#ccc' })
                showSharePart = false
                return "N/A"
            } else {
                $("#p-sv").css({ color: '#28a745' })
                showSharePart = true
                return "$" + sv
            }
        }
        function onlinecheck(o) {
            if(o == 0) {
                $("#p-online").css({ color: '#dc3545' })
                return "NOT ONLINE"
            } else {
                $("#p-online").css({ color: '#28a745' })
                return "ONLINE"
            }
        }
        function modecolor(m) {
            if(m == "Easy") {
                $("#p-mode").css({ color: '#28a745' })
                return "EASY"
            } else {
                $("#p-mode").css({ color: '#007bff' })
                return "REALISM"
            }
        }
        function logocheck(l) {
            if(!l) {
                return 'https://www.airline4.net/assets/img/logos/am_logo.png'
            } else {
                return l
            }
        }
        function addZero(z) {
            if(z.toString().length == 1) {
                z = "0" + z
                return z
            } else {
                return z
            }
        }
        function rd(c) {
            let d = new Date(c)
            let rd = addZero(d.getUTCHours()) + ":" + addZero(d.getUTCMinutes()) + " " + (d.getUTCMonth() + 1) + "/" + d.getUTCDate() + "/" + d.getUTCFullYear()
            return rd
        }
        function commaNumber(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        function fuelGet(ac) {
            let u = acdb(ac.toLowerCase())
            return u[5]
        }
        function priceGet(acc) {
            let t = acdb(acc.toLowerCase())
            return t[8]
        }
        function radiusCalc(am) {
            if(am < 15) {
                return 10
            } else if(am >= 15 && am < 50) {
                return 20
            } else {
                return 35
            }
        }
        function priceFuel(p, f) {
            let i = 1
            let ck
            let a
            let k
            while(i < 350) {
                ck = "id" + i
                a = acdbCargoId(ck)
                if(a[8] == p && a[5] == f) {
                    k = a[9]
                }
                i++
            }
            return k
        }
        var showSharePart = false
        //STATS
        $("#p-rank").text("#" + r.user.rank)
        $("#p-name").text(r.user.company)
        $("#p-ally").text(allycheck(r.user.alliance))
        $("#p-sv").text(sharecheck(r.user.share))
        $("#p-online").text(onlinecheck(r.user.online))
        $("#p-mode").text(modecolor(r.user.game_mode))
        $("#p-fleet").text(r.user.fleet)
        $("#p-routes").text(r.user.routes)
        $("#p-achi").text(r.user.achievements + "/72")
        let d = new Date(r.user.founded  * 1000)
        let rdf = addZero(d.getUTCHours()) + ":" + d.getUTCMinutes() + ", " + (d.getUTCMonth() + 1) + "/" + d.getUTCDate() + "/" + d.getUTCFullYear()
        $("#p-foun").text(rdf)
        $("#p-logo")[0].src = logocheck(r.user.logo)
        $(".tool-answer").hide()
        $("#tool-cha1").hide()
        $("#ans-cha1").show()
        let misElement = document.getElementsByClassName("main-info-stats")[0]
        let logoComputedV = window.getComputedStyle(misElement)
        let logoHeightProperty = logoComputedV.getPropertyValue("height")
        $("#p-logo").css({
            height: logoHeightProperty,
            width: 'auto'
        })
        //SV
        if(sharecheck(r.user.share) != "N/A") {
            $(".share-info").show()
            let tableElement = document.getElementsByClassName("charttable")[0]
            let tableElementComputedV = window.getComputedStyle(tableElement)
            let chartWidthProperty = tableElementComputedV.getPropertyValue("width")
            $("#p-savai").text(commaNumber(r.user.shares_available))
            $("#p-ssold").text(commaNumber(r.user.shares_sold))
            $(".chart").css({
                maxWidth: chartWidthProperty
            })
            let sd = r.share_development
            try {
                svC.destroy()
            } catch (err) {
                console.log(err)
            }
            svC = new Chart(document.getElementById("p-svchart"), {
                type: 'line',
                data: {
                    labels: [rd(sd[19].date * 1000),rd(sd[18].date * 1000),rd(sd[17].date * 1000),rd(sd[16].date * 1000),rd(sd[15].date * 1000),rd(sd[14].date * 1000),rd(sd[13].date * 1000),rd(sd[12].date * 1000),rd(sd[11].date * 1000),rd(sd[10].date * 1000),rd(sd[9].date * 1000),rd(sd[8].date * 1000),rd(sd[7].date * 1000),rd(sd[6].date * 1000),rd(sd[5].date * 1000),rd(sd[4].date * 1000),rd(sd[3].date * 1000),rd(sd[2].date * 1000), rd(sd[1].date * 1000),rd(sd[0].date * 1000)],
                    datasets: [{ 
                        data: [sd[19].share,sd[18].share,sd[17].share,sd[16].share,sd[15].share,sd[14].share,sd[13].share,sd[12].share,sd[11].share,sd[10].share,sd[9].share,sd[8].share,sd[7].share,sd[6].share,sd[5].share,sd[4].share,sd[3].share,sd[2].share,sd[1].share,sd[0].share],
                        borderColor: "#3e95cd",
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        yAxes: [
                            { 
                                scaleLabel: {
                                    display: true,
                                    labelString: "Share Value"
                                },
                                ticks: {
                                    callback: function(label, index, labels) {
                                        return "$" + label
                                    }
                                }
                            }
                        ]
                    },
                    title: {
                        display: true,
                        text: `${r.user.company}'s Share Value`
                    },
                    legend: {
                        display: false
                    },
                    tooltips: {
                        callbacks: {
                           label: function(tooltipItem) {
                                return tooltipItem.yLabel;
                           }
                        }
                    },
                    elements: {
                        line: {
                            tension: 0
                        }
                    }
                }
            })
        } else {
            $(".share-info").hide()
        }
        //FLEET
        let plNa = []
        let plAm = []
        let template
        let acdbaccess
        let jl = 0
        let profitSaver = 0
        $(".fleet-plane-container").addClass("hdn")
        for(const element of r.fleet) {
            plNa[jl] = element.aircraft
            plAm[jl] = element.amount
            acdbaccess = acdb(plNa[jl].toLowerCase())
            template = `
            <div class="fleet-plane-container baloo-f">
               ${plAm[jl]}x <b>${plNa[jl]}</b>
               <br>
               <img src="AC images/${acdbaccess[11]}.png" class="fleet-plane-image">
            </div>
            `
            $("#p-fleetinfo").append(template)
            if(r.user.game_mode == "Easy") {
                profitSaver = profitSaver + (easyProfit(plNa[jl].toLowerCase()) * plAm[jl])
            } else {
                profitSaver = profitSaver + (realismProfit(plNa[jl].toLowerCase()) * plAm[jl])
            }
            jl++
        }
        $("#p-prof").text("$" + commaNumber(profitSaver))
        try {
            fC1.destroy()
        } catch (err) {
            console.log(err)
        }
        let planes1 = []
        let amount1 = []
        let fC1count = 0
        let fC1arr = []
        for(let u of r.fleet) {
            fC1arr[fC1count] = [u.amount,u.aircraft]
            fC1count++
        }
        fC1arr.sort(function(a,b) {
            return a[0]-b[0]
        })
        let fC1iii = fC1arr.length - 1
        while(fC1iii >= 0) {
            planes1[planes1.length] = fC1arr[fC1iii][1]
            amount1[amount1.length] = fC1arr[fC1iii][0]
            fC1iii--
        }
        fC1 = new Chart(document.getElementById("p-fleet1"), {
            type: 'bar',
            data: {
              labels: planes1,
              datasets: [
                {
                  label: "Amount",
                  backgroundColor: ['#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000',
                  '#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444',
                  '#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000',
                  '#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000',
                  '#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000',
                  '#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000',
                  '#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000',
                  '#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000',
                  '#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000',
                  '#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000',
                  '#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000',
                  '#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000',
                  '#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000',
                  '#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000',
                  '#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000',
                  '#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000',
                  '#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000','#de4444','#8d0000',
                  '#de4444','#8d0000','#de4444','#8d0000','#de4444'],
                  data: amount1
                }
              ]
            },
            options: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: `${r.user.company}'s Fleet`
                }
            }
        })
        let paxamount = 0
        let cargoamount = 0
        let fC2arr
        let fC2name
        let checkpc
        for(let p of r.fleet) {
            checkpc = paxcargo(p.aircraft.toLowerCase())
            if(checkpc == 1) {
                paxamount = paxamount + p.amount
            } else {
                cargoamount = cargoamount + p.amount
            }
        }
        if(cargoamount == 0) {
            fC2arr = [paxamount]
            fC2name = ["PAX"]
        } else {
            fC2arr = [paxamount, cargoamount]
            fC2name = ["PAX","Cargo"]
        }
        try {
            fC2.destroy()
        } catch (err) {
            console.log(err)
        }
        fC2 = new Chart(document.getElementById("p-fleet2"), {
            type: 'pie',
            data: {
              labels: fC2name,
              datasets: [{
                label: "Amount",
                backgroundColor: ['#28a745','#dc3545'],
                data: fC2arr,
              }]
            },
            options: {
              title: {
                display: true,
                text: 'PAX/Cargo Planes'
              }
            }
        })
        let fC3labelp = []
        let fC3labelc = []
        let fC3datap = []
        let fC3datac = []
        let pricemax = []
        let fuelmax = []
        let pccheck
        for(let w of r.fleet) {
            pccheck = paxcargo(w.aircraft.toLowerCase())
            if(pccheck == 1) {
                fC3labelp[fC3labelp.length] = `${w.aircraft}: $${priceGet(w.aircraft)}/${fuelGet(w.aircraft)} lbs/km`
                fC3datap[fC3datap.length] = { x: fuelGet(w.aircraft), y: priceGet(w.aircraft), r: radiusCalc(w.amount) }
            } else {
                fC3labelc[fC3labelc.length] = `${w.aircraft}: $${priceGet(w.aircraft)}/${fuelGet(w.aircraft)} lbs/km`
                fC3datac[fC3datac.length] = { x: fuelGet(w.aircraft), y: priceGet(w.aircraft), r: radiusCalc(w.amount) }
            }
            pricemax[pricemax.length] = priceGet(w.aircraft)
            fuelmax[fuelmax.length] = fuelGet(w.aircraft)
        }
        let parsedData = []
        
        for(let i = 0; i < fC3datap.length; i++) {
            parsedData.push({
                label: fC3labelp[i],
                data: [fC3datap[i]],
                backgroundColor: 'rgba(0,146,186,.2)',
                borderColor: 'rgba(0,146,186,1)'
            })
        }

        for(let j = 0; j < fC3datac.length; j++) {
            parsedData.push({
                label:  fC3labelc[j],
                data: [fC3datac[j]],
                backgroundColor: 'rgba(255,179,3,.2)',
                borderColor: 'rgba(255,179,3,1)'
            })
        }
        try {
            fC3.destroy()
        } catch (err) {
            console.log(err)
        }
        fC3 = new Chart(document.getElementById("p-fleet3"), {
            type: 'bubble',
            data: {
                label: "gggg",
                datasets: parsedData
            },
            options: {
                title: {
                    display: true,
                    text: 'Amount, Price and Fuel Efficiency'
                }, scales: {
                    yAxes: [{ 
                        scaleLabel: {
                            display: true,
                            labelString: "Aircraft Price"
                        },
                        ticks: {
                            callback: function(label, index, labels) {
                                if(label >= 1000 && label <= 999999) {
                                    label = label / 1000
                                    return "$" + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "k"
                                } else if(label >= 1000000) {
                                    label = label / 1000000
                                    return "$" + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "M"
                                }
                            }
                        }
                    }],
                    xAxes: [{ 
                        scaleLabel: {
                            display: true,
                            labelString: "Fuel Efficiency"
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItems, data) {
                            return `${priceFuel(tooltipItems.yLabel, tooltipItems.xLabel)}: $${commaNumber(tooltipItems.yLabel)}/${tooltipItems.xLabel} lbs/km`
                        }
                    }
                },
                legend: {
                    display: false
                }
            }
        })
        //AWARDS
        if(r.awards.length == 0) {
            $(".award-info").hide()
            $("#aw1").hide()
            $("#aw2").hide()
            $("#aw3").hide()
            $("#aw4").hide()
            $("#aw5").hide()
            $("#aw6").hide()
        } else {
            $(".award-info").show()
            $("#aw1").hide()
            $("#aw2").hide()
            $("#aw3").hide()
            $("#aw4").hide()
            $("#aw5").hide()
            $("#aw6").hide()
            for(let aw of r.awards) {
                if(aw.award == "Pax Airline") {
                    $("#aw1").show()
                    $("#awt1").text(rd(aw.awarded * 1000))
                }
                if(aw.award == "Cargo Airline") {
                    $("#aw2").show()
                    $("#awt2").text(rd(aw.awarded * 1000))
                }
                if(aw.award == "Alliance Contributor") {
                    $("#aw3").show()
                    $("#awt3").text(rd(aw.awarded * 1000))
                }
                if(aw.award == "Best CEO") {
                    $("#aw4").show()
                    $("#awt4").text(rd(aw.awarded * 1000))
                }
                if(aw.award == "Best A\/C service") {
                    $("#aw5").show()
                    $("#awt5").text(rd(aw.awarded * 1000))
                }
                if(aw.award == "Most Profitable") {
                    $("#aw6").show()
                    $("#awt6").text(rd(aw.awarded * 1000))
                }
            }
        }
    }
}
function allychart() {
    let nm = document.getElementById("allyName-a").value
    if(nm == "") {
        redCol12()
        alertBox("Please provide an alliance name!","#fa3737")
        return
    }
    let url = "https://www.airline4.net/api/?access_token=g53urfGFDtreHnXdfWjYTrcGR:465JHTYRdGJSAHjfgcxE21312H&search=" + nm
    let a = new XMLHttpRequest()
    a.onreadystatechange = function() {
        if(a.readyState == 4 && a.status == 200) {
            if(JSON.parse(a.responseText).status.request != "success") {
                alertBox("Please provide a valid alliance name!","#fa3737")
                redCol12()
            } else {
                allychartfunc(JSON.parse(a.responseText))
            }
        }
    }
    a.open("GET", url)
    a.send()
    function allychartfunc(r) {
        function checkreq(s) {
            if(s == 0) {
                $("#a-req").css({ color: '#28a745' })
                return "OPEN FOR EVERYONE"
            }
            $("#a-req").css({ color: '#fa3737' })
            return "$" + s + " REQUIRED"
        }
        function commaNumber(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        $(".tool-answer").hide()
        $("#tool-cha2").hide()
        $("#ans-cha2").show()
        //STATS
        $("#a-rank").text("#" + r.alliance[0].rank)
        $("#a-name").text(r.alliance[0].name)
        $("#a-sv").text("$" + r.alliance[0].value)
        $("#a-member").text(r.alliance[0].members + "/" + r.alliance[0].maxMembers + " MEMBERS")
        $("#a-req").text(checkreq(r.alliance[0].minSV))
        //GET DATA PART
        let contLabel = []
        let contData = []
        let fData = []
        let dcData = []
        let cfData = []
        /*let jData = []
        let oData = []
        let svData = []*/
        let counter = 0
        for(let d of r.members) {
            contLabel[counter] = d.company
            contData[counter] = d.contributed
            fData[counter] = [d.flights,d.company]
            dcData[counter] = [d.dailyContribution,d.company]
            if(d.contributed == 0) {
                cfData[counter] = [0,d.company]
            } else {
                cfData[counter] = [d.contributed/d.flights,d.company]
            }
            counter++
        }
        //CHARTS
        let m1BGC = ['rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)',
        'rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)',
        'rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)',
        'rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)',
        'rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)',
        'rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)',
        'rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)',
        'rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)',
        'rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)',
        'rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)','rgba(0, 0, 255, .2)','rgba(0, 0, 255, 1)']
        try {
            m1.destroy()
        } catch (err) {
            console.log(err)
        }
        m1 = new Chart(document.getElementById("a-m1"), {
            type: 'bar',
            data: {
                labels: contLabel,
                datasets: [
                    {
                        label: "Contributed",
                        backgroundColor: m1BGC,
                        data: contData
                    }
                ]
            },
            options: {
                tooltips: {
                    callbacks: {
                        label: function(tooltipItems, data) {
                            return `Contributed: $${commaNumber(tooltipItems.yLabel)}`
                        }
                    }
                },
                scales: {
                    yAxes: [
                        { 
                            scaleLabel: {
                                display: true,
                                labelString: "Contribution"
                            },
                            ticks: {
                                callback: function(label, index, labels) {
                                    if(label >= 1000 && label <= 999999) {
                                        label = label / 1000
                                        return "$" + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "k"
                                    } else if(label >= 1000000) {
                                        label = label / 1000000
                                        return "$" + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "M"
                                    }
                                    return "$" + label
                                }
                            }
                        }
                    ]
                },
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Contribution'
                }
            }
        })
        let m2BGC = ['rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)',
        'rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)',
        'rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)',
        'rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)',
        'rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)','rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, .2)','rgba(255, 0, 0, 1)']
        try {
            m2.destroy()
        } catch (err) {
            console.log(err)
        }
        let rr = cfData.length - 1
        let cf1 = []
        let cf2 = []
        cfData.sort(function(a,b) {
            return a[0]-b[0]
        })
        while(rr >= 0) {
            cf1[cf1.length] = cfData[rr][1]
            cf2[cf2.length] = cfData[rr][0]
            rr--
        }
        m2 = new Chart(document.getElementById("a-m2"), {
            type: 'bar',
            data: {
                labels: cf1,
                datasets: [
                    {
                        label: "C/F",
                        backgroundColor: m2BGC,
                        data: cf2
                    }
                ]
            },
            options: {
                tooltips: {
                    callbacks: {
                        label: function(tooltipItems, data) {
                            return `C/F: $${Math.round(tooltipItems.yLabel * 1000000) / 1000000}`
                        }
                    }
                },
                scales: {
                    yAxes: [
                        { 
                            scaleLabel: {
                                display: true,
                                labelString: "Contribution/Flight"
                            }
                        }
                    ]
                },
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Contribution/Flight'
                }
            }
        })
        let m3BGC = ['rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)',
        'rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)',
        'rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)',
        'rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)',
        'rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)',
        'rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)',
        'rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)',
        'rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)',
        'rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)',
        'rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)','rgba(255, 255, 0, .2)','rgba(255, 255, 0, 1)',]
        try {
            m3.destroy()
        } catch (err) {
            console.log(err)
        }
        let ss = fData.length - 1
        let f1 = []
        let f2 = []
        fData.sort(function(a,b) {
            return a[0]-b[0]
        })
        while(ss >= 0) {
            f1[f1.length] = fData[ss][1]
            f2[f2.length] = fData[ss][0]
            ss--
        }
        m3 = new Chart(document.getElementById("a-m3"), {
            type: 'bar',
            data: {
                labels: f1,
                datasets: [
                    {
                        label: "Flights",
                        backgroundColor: m3BGC,
                        data: f2
                    }
                ]
            },
            options: {
                tooltips: {
                    callbacks: {
                        label: function(tooltipItems, data) {
                            return `${tooltipItems.yLabel} Flights`
                        }
                    }
                },
                scales: {
                    yAxes: [
                        { 
                            scaleLabel: {
                                display: true,
                                labelString: "Flights"
                            },
                            ticks: {
                                callback: function(label, index, labels) {
                                    if(label >= 1000 && label <= 999999) {
                                        label = label / 1000
                                        return label + "k"
                                    } else if(label >= 1000000) {
                                        label = label / 1000000
                                        return label + "M"
                                    }
                                    return label
                                }
                            }
                        }
                    ]
                },
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Flights'
                }
            }
        })
        let m4BGC = ['rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)',
        'rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)',
        'rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)',
        'rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)',
        'rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)',
        'rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)',
        'rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)',
        'rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)',
        'rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)',
        'rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)','rgba(0, 255, 0, .2)','rgba(0, 255, 0, 1)',]
        try {
            m4.destroy()
        } catch (err) {
            console.log(err)
        }
        let qq = dcData.length - 1
        let dc1 = []
        let dc2 = []
        dcData.sort(function(a,b) {
            return a[0]-b[0]
        })
        while(qq >= 0) {
            dc1[dc1.length] = dcData[qq][1]
            dc2[dc2.length] = dcData[qq][0]
            qq--
        }
        m4 = new Chart(document.getElementById("a-m4"), {
            type: 'bar',
            data: {
                labels: dc1,
                datasets: [
                    {
                        label: "Contribution/Day",
                        backgroundColor: m4BGC,
                        data: dc2
                    }
                ]
            },
            options: {
                tooltips: {
                    callbacks: {
                        label: function(tooltipItems, data) {
                            return `C/D: ${tooltipItems.yLabel}`
                        }
                    }
                },
                scales: {
                    yAxes: [
                        { 
                            scaleLabel: {
                                display: true,
                                labelString: "Contribution/Flight"
                            }
                        }
                    ]
                },
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Contribution/Flight'
                }
            }
        })
    }
}