function playerchart() {
    let nm = document.getElementById("playerName-p").value
    if(nm == "") {
        redCol()
        alertBox("Please provide a player name!","#fa3737")
        return
    }
    let url = "https://www.airline4.net/api/?access_token=g53urfGFDtreHnXdfWjYTrcGR:465JHTYRdGJSAHjfgcxE21312H&user=" + nm
    let a = new XMLHttpRequest()
    a.onreadystatechange = function() {
        if(a.readyState == 4 && a.status == 200) {
            if(JSON.parse(a.responseText).status.request != "success") {
                alertBox("Please provide a valid player name!","#fa3737")
                redCol()
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
                return 15
            } else if(am >= 15 && am < 50) {
                return 25
            } else {
                return 40
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
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            { 
                                scaleLabel: {
                                    display: true,
                                    labelString: "Share Value"
                                },
                                ticks: {
                                    callback: function(label, index, labels) {
                                        if(label.toString().length <= 5) {
                                            return "$" + label
                                        } else {
                                            if(label < 0) {
                                                if(label.toString().length <= 7 && label.toString().length >= 6) {
                                                    label = label / 1000
                                                    return "$" + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "k"
                                                } else if(label.toString().length > 7) {
                                                    label = label / 1000000
                                                    return "$" + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "M"
                                                }
                                            } else {
                                                if(label.toString().length <= 6 && label.toString().length >= 5) {
                                                    label = label / 1000
                                                    return "$" + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "k"
                                                } else if(label.toString().length > 6) {
                                                    label = label / 1000000
                                                    return "$" + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "M"
                                                }
                                            }
                                        }
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
                                return "$" + tooltipItem.yLabel;
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
            if(sd[19].share <= sd[0].share) {
                if(sd[19].share >= 0 && sd[0].share >= 0) {
                    $("#sv-g").html("<i class='fa fa-long-arrow-alt-up'></i> " + Math.round((sd[0].share - sd[19].share) / sd[19].share * 10000 * 100) / 10000 + "%").css({ color: '#28a745' }).show()
                } else {
                    $("#sv-g").hide()
                }
            } else {
                if(sd[19].share >= 0 && sd[0].share >= 0) {
                    $("#sv-g").html("<i class='fa fa-long-arrow-alt-down'></i> " + Math.round((sd[19].share - sd[0].share) / sd[19].share * 10000 * 100) / 10000 + "%").css({ color: '#dc3545' }).show()
                } else {
                    $("#sv-g").hide()
                }
            }
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
                responsive: true,
                maintainAspectRatio: false,
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
                datasets: [
                    {
                        label: "Amount",
                        backgroundColor: ['#28a745','#dc3545'],
                        data: fC2arr,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
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
                responsive: true,
                maintainAspectRatio: false,
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
                                } else {
                                    return "$" + label
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
                            return `${priceFuel(tooltipItems.yLabel, tooltipItems.xLabel)}: $${commaNumber(tooltipItems.yLabel)} / ${tooltipItems.xLabel} lbs/km`
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
        redCol()
        alertBox("Please provide an alliance name!","#fa3737")
        return
    }
    let url = "https://www.airline4.net/api/?access_token=g53urfGFDtreHnXdfWjYTrcGR:465JHTYRdGJSAHjfgcxE21312H&search=" + nm
    let a = new XMLHttpRequest()
    a.onreadystatechange = function() {
        if(a.readyState == 4 && a.status == 200) {
            if(JSON.parse(a.responseText).status.request != "success") {
                alertBox("Please provide a valid alliance name!","#fa3737")
                redCol()
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
                return "IPO NOT REQUIRED"
            }
            $("#a-req").css({ color: '#fa3737' })
            return "$" + s + " REQUIRED"
        }
        function radiusM5(c) {
            if(c < 10000) {
                return 10
            } else if(c >= 10000 && c < 100000) {
                return 15
            } else if(c >= 100000 && c < 500000) {
                return 20
            } else if(c >= 500000 && c < 1000000) {
                return 25
            } else if(c >= 1000000 && c < 2000000) {
                return 30
            } else if(c >= 2000000 && c < 4000000) {
                return 35
            } else if(c >= 4000000) {
                return 40
            }
        }
        rrrr = r
        $("#memberSearch").val("")
        $("#memberOne").val("")
        $("#memberTwo").val("")
        $(".stats-info").hide()
        $(".compare-info").hide()
        $("#memberList").empty()
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
        let sData = []
        let u1, u2, u3, u4, u5
        let ua1, ua2, ua3, ua4, ua5
        let ub1, ub2, ub3, ub4, ub5
        let uc1, uc2, uc3, uc4, uc5
        let ud1, ud2, ud3, ud4, ud5
        let ue1, ue2, ue3, ue4, ue5
        let counter = 0
        for(let d of r.members) {
            contLabel[counter] = d.company
            contData[counter] = d.contributed
            fData[counter] = [d.flights,d.company]
            dcData[counter] = [d.dailyContribution,d.company]
            sData[counter] = [d.shareValue,d.company]
            if(d.contributed == 0) {
                cfData[counter] = [0,d.company]
            } else {
                cfData[counter] = [d.contributed/d.flights,d.company]
            }
            if(counter == 0) {
                u1 = d.company
                ua1 = d.contributed
                ua2 = d.dailyContribution
                ua3 = d.flights
                if(d.contributed != 0) {
                    ua4 = d.contributed / d.flights
                } else {
                    ua4 = 0
                }
                ua5 = d.shareValue
            } else if(counter == 1) {
                u2 = d.company
                ub1 = d.contributed
                ub2 = d.dailyContribution
                ub3 = d.flights
                if(d.contributed != 0) {
                    ub4 = d.contributed / d.flights
                } else {
                    ub4 = 0
                }
                ub5 = d.shareValue
            } else if(counter == 2) {
                u3 = d.company
                uc1 = d.contributed
                uc2 = d.dailyContribution
                uc3 = d.flights
                if(d.contributed != 0) {
                    uc4 = d.contributed / d.flights
                } else {
                    uc4 = 0
                }
                uc5 = d.shareValue
            } else if(counter == 3) {
                u4 = d.company
                ud1 = d.contributed
                ud2 = d.dailyContribution
                ud3 = d.flights
                if(d.contributed != 0) {
                    ud4 = d.contributed / d.flights
                } else {
                    ud4 = 0
                }
                ud5 = d.shareValue
            } else if(counter == 4) {
                u5 = d.company
                ue1 = d.contributed
                ue2 = d.dailyContribution
                ue3 = d.flights
                if(d.contributed != 0) {
                    ue4 = d.contributed / d.flights
                } else {
                    ue4 = 0
                }
                ue5 = d.shareValue
            }
            $("#memberList").append(`<option class="mOptions" value="${d.company}"></option>`)
            counter++
        }
        //BASIC CHARTS
        //C1
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
                responsive: true,
                maintainAspectRatio: false,
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
        //C2
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
                responsive: true,
                maintainAspectRatio: false,
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
        //C3
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
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                    callbacks: {
                        label: function(tooltipItems, data) {
                            return `${commaNumber(tooltipItems.yLabel)} Flights`
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
        //C4
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
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                    callbacks: {
                        label: function(tooltipItems, data) {
                            return `C/D: $${commaNumber(tooltipItems.yLabel)}`
                        }
                    }
                },
                scales: {
                    yAxes: [
                        { 
                            scaleLabel: {
                                display: true,
                                labelString: "Contribution/Day"
                            }
                        }
                    ]
                },
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Daily Contribution'
                },
                scales: {
                    yAxes: [
                        { 
                            scaleLabel: {
                                display: true,
                                labelString: "C/D"
                            },
                            ticks: {
                                callback: function(label, index, labels) {
                                    if(label >= 1000 && label <= 999999) {
                                        label = label / 1000
                                        return "$" + label + "k"
                                    } else if(label >= 1000000) {
                                        label = label / 1000000
                                        return "$" + label + "M"
                                    }
                                    return "$" + label
                                }
                            }
                        }
                    ]
                }
            }
        })
        //C5
        let c5label = []
        let c5data = []
        for(let w of r.members) {
            c5label[c5label.length] = `${w.company}: $${commaNumber(w.contributed)} / $${commaNumber(w.dailyContribution)}`
            c5data[c5data.length] = { x: w.contributed, y: w.dailyContribution }
        }
        let aBData = []
        
        for(let i = 0; i < c5label.length; i++) {
            aBData.push({
                label: c5label[i],
                data: [c5data[i]],
                backgroundColor: 'rgba(0,146,186,.2)',
                borderColor: 'rgba(0,146,186,1)',
                pointRadius: 7.5,
                pointHoverRadius: 10
            })
        }
        try {
            m5.destroy()
        } catch (err) {
            console.log(err)
        }
        m5 = new Chart(document.getElementById("a-m5"), {
            type: 'scatter',
            data: {
                label: "gggg",
                datasets: aBData
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: "Contribution (total & per day)"
                }, scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "C/D"
                        },
                        ticks: {
                            callback: function(label, index, labels) {
                                if(label >= 1000 && label <= 999999) {
                                    label = label / 1000
                                    return "$" + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "k"
                                } else if(label >= 1000000) {
                                    label = label / 1000000
                                    return "$" + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "M"
                                } else {
                                    return "$" + label
                                }
                            }
                        }
                    }],
                    xAxes: [{ 
                        scaleLabel: {
                            display: true,
                            labelString: "Total Contribution"
                        },
                        ticks: {
                            callback: function(label, index, labels) {
                                if(label >= 1000 && label <= 999999) {
                                    label = label / 1000
                                    return "$" + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "k"
                                } else if(label >= 1000000) {
                                    label = label / 1000000
                                    return "$" + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "M"
                                } else {
                                    return "$" + label
                                }
                            }
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItems, data) {
                            let datasetLabel = data.datasets[tooltipItems.datasetIndex].label || ''
                            return datasetLabel
                        }
                    }
                },
                legend: {
                    display: false
                }
            }
        })
        //C6
        let c6label = []
        let c6data = []
        for(let w of r.members) {
            c6label[c6label.length] = `${w.company}: $${commaNumber(w.contributed)} / $${commaNumber(w.flights)}`
            c6data[c6data.length] = { x: w.contributed, y: w.flights }
        }
        let m6res = []        
        for(let i = 0; i < c6label.length; i++) {
            m6res.push({
                label: c6label[i],
                data: [c6data[i]],
                backgroundColor: 'rgba(0,146,186,.2)',
                borderColor: 'rgba(0,146,186,1)',
                pointRadius: 7.5,
                pointHoverRadius: 10
            })
        }
        try {
            m6.destroy()
        } catch (err) {
            console.log(err)
        }
        m6 = new Chart(document.getElementById("a-m6"), {
            type: 'scatter',
            data: {
                label: "gggg",
                datasets: m6res
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: "Contribution & Flights"
                }, scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Flights"
                        },
                        ticks: {
                            callback: function(label, index, labels) {
                                if(label >= 1000 && label <= 999999) {
                                    label = label / 1000
                                    return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "k"
                                } else if(label >= 1000000) {
                                    label = label / 1000000
                                    return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "M"
                                } else {
                                    return "$" + label
                                }
                            }
                        }
                    }],
                    xAxes: [{ 
                        scaleLabel: {
                            display: true,
                            labelString: "Total Contribution"
                        },
                        ticks: {
                            callback: function(label, index, labels) {
                                if(label >= 1000 && label <= 999999) {
                                    label = label / 1000
                                    return "$" + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "k"
                                } else if(label >= 1000000) {
                                    label = label / 1000000
                                    return "$" + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "M"
                                } else {
                                    return "$" + label
                                }
                            }
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItems, data) {
                            let datasetLabel = data.datasets[tooltipItems.datasetIndex].label || ''
                            return datasetLabel
                        }
                    }
                },
                legend: {
                    display: false
                }
            }
        })
        //C7
        let c7label = []
        let c7data = []
        for(let w of r.members) {
            c7label[c7label.length] = `${w.company}: $${commaNumber(w.shareValue)} / $${commaNumber(w.dailyContribution)}`
            c7data[c7data.length] = { x: w.shareValue, y: w.dailyContribution }
        }
        let m7res = []        
        for(let i = 0; i < c7label.length; i++) {
            m7res.push({
                label: c7label[i],
                data: [c7data[i]],
                backgroundColor: 'rgba(0,146,186,.2)',
                borderColor: 'rgba(0,146,186,1)',
                pointRadius: 7.5,
                pointHoverRadius: 10
            })
        }
        try {
            m7.destroy()
        } catch (err) {
            console.log(err)
        }
        m7 = new Chart(document.getElementById("a-m7"), {
            type: 'scatter',
            data: {
                label: "gggg",
                datasets: m7res
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: "Share Value & Daily Contribution"
                }, scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Daily Contribution"
                        },
                        ticks: {
                            callback: function(label, index, labels) {
                                if(label >= 1000 && label <= 999999) {
                                    label = label / 1000
                                    return "$" + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "k"
                                } else if(label >= 1000000) {
                                    label = label / 1000000
                                    return "$" + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "M"
                                } else {
                                    return "$" + label
                                }
                            }
                        }
                    }],
                    xAxes: [{ 
                        scaleLabel: {
                            display: true,
                            labelString: "Share Value"
                        },
                        ticks: {
                            callback: function(label, index, labels) {
                                return "$" + label
                            }
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItems, data) {
                            let datasetLabel = data.datasets[tooltipItems.datasetIndex].label || ''
                            return datasetLabel
                        }
                    }
                },
                legend: {
                    display: false
                }
            }
        })
        //TOP 5 CONTRIBUTORS
        if(r.members.length >= 5) {
            $(".top-info").show()
            //charts: p(cont);p(cd);p(cf);p(sv);
            //C1
            try {
                t1.destroy()
            } catch (err) {
                console.log(err)
            }
            t1 = new Chart(document.getElementById("a-t1"), {
                type: 'polarArea',
                data: {
                    labels: [u1, u2, u3, u4, u5],
                    datasets: [
                        {
                            label: "Contribution",
                            backgroundColor: ['#103de0','#00ff3c','#fff200','#ff121e','#12ffdb'],
                            data: [ua1, ub1, uc1, ud1, ue1]
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: 'Comparison: Total Contribution'
                    },
                    scale: {
                        ticks: {
                            userCallback: function(label, index, labels) {
                                return "$" + commaNumber(label)
                            }
                        }
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItems, data) {
                                return `Contributed: $${commaNumber(tooltipItems.yLabel)}`
                            }
                        }
                    }
                }
            })
            //C2
            try {
                t2.destroy()
            } catch (err) {
                console.log(err)
            }
            t2 = new Chart(document.getElementById("a-t2"), {
                type: 'polarArea',
                data: {
                    labels: [u1, u2, u3, u4, u5],
                    datasets: [
                        {
                            label: "C/D",
                            backgroundColor: ['#103de0','#00ff3c','#fff200','#ff121e','#12ffdb'],
                            data: [ua2, ub2, uc2, ud2, ue2]
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: 'Comparison: Daily Contribution'
                    },
                    scale: {
                        ticks: {
                            userCallback: function(label, index, labels) {
                                return "$" + commaNumber(label)
                            }
                        }
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItems, data) {
                                return `C/D: $${commaNumber(tooltipItems.yLabel)}`
                            }
                        }
                    },
                    legend: {
                        display: false
                    }
                }
            })
            //C3
            try {
                t3.destroy()
            } catch (err) {
                console.log(err)
            }
            t3 = new Chart(document.getElementById("a-t3"), {
                type: 'polarArea',
                data: {
                    labels: [u1, u2, u3, u4, u5],
                    datasets: [
                        {
                            label: "Flights",
                            backgroundColor: ['#103de0','#00ff3c','#fff200','#ff121e','#12ffdb'],
                            data: [ua3, ub3, uc3, ud3, ue3]
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: 'Comparison: Flights'
                    },
                    scale: {
                        ticks: {
                            userCallback: function(label, index, labels) {
                                return commaNumber(label)
                            }
                        }
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItems, data) {
                                return `Flights: ${commaNumber(tooltipItems.yLabel)}`
                            }
                        }
                    },
                    legend: {
                        display: false
                    }
                }
            })
            //C4
            try {
                t4.destroy()
            } catch (err) {
                console.log(err)
            }
            t4 = new Chart(document.getElementById("a-t4"), {
                type: 'polarArea',
                data: {
                    labels: [u1, u2, u3, u4, u5],
                    datasets: [
                        {
                            label: "C/F",
                            backgroundColor: ['#103de0','#00ff3c','#fff200','#ff121e','#12ffdb'],
                            data: [ua4, ub4, uc4, ud4, ue4]
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: 'Comparison: Contribution per Flight'
                    },
                    scale: {
                        ticks: {
                            userCallback: function(label, index, labels) {
                                return "$" + Math.floor(label * 1000000) / 1000000
                            }
                        }
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItems, data) {
                                return `C/F: $${tooltipItems.yLabel}`
                            }
                        }
                    },
                    legend: {
                        display: false
                    }
                }
            })
            //C5
            try {
                t5.destroy()
            } catch (err) {
                console.log(err)
            }
            t5 = new Chart(document.getElementById("a-t5"), {
                type: 'polarArea',
                data: {
                    labels: [u1, u2, u3, u4, u5],
                    datasets: [
                        {
                            label: "SV",
                            backgroundColor: ['#103de0','#00ff3c','#fff200','#ff121e','#12ffdb'],
                            data: [ua5, ub5, uc5, ud5, ue5]
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: 'Comparison: Share Value'
                    },
                    scale: {
                        ticks: {
                            userCallback: function(label, index, labels) {
                                return "$" + label
                            }
                        }
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItems, data) {
                                return `Share Value: $${tooltipItems.yLabel}`
                            }
                        }
                    },
                    legend: {
                        display: false
                    }
                }
            })
        } else {
            $(".top-info").hide()
        }
        //AVERAGES
        let totalContri = 0
        let av1C = 0
        while(av1C < contData.length) {
            totalContri += contData[av1C]
            av1C++
        }
        $("#avC").text("$" + commaNumber(Math.floor(totalContri / contData.length)))
        let totalCD = 0
        let av2C = 0
        while(av2C < dcData.length) {
            totalCD += dcData[av2C][0]
            av2C++
        }
        $("#avCD").text("$" + commaNumber(Math.floor(totalCD / dcData.length)))
        let totalCF = 0
        let av3C = 0
        while(av3C < cfData.length) {
            totalCF += cfData[av3C][0]
            av3C++
        }
        $("#avCF").text("$" + Math.floor((totalCF / cfData.length) * 1000000) / 1000000)
        let totalF = 0
        let av4C = 0
        while(av4C < fData.length) {
            totalF += fData[av4C][0]
            av4C++
        }
        $("#avF").text(commaNumber(Math.floor(totalF / fData.length)))
        let totalSV = 0
        let av5C = 0
        while(av5C < sData.length) {
            totalSV += sData[av5C][0]
            av5C++
        }
        $("#avSV").text("$" + Math.floor((totalSV / sData.length) * 100) / 100)
    }
}
function displayMemberStats(mo) {
    let memberName = document.getElementById("memberSearch").value.toLowerCase()
    doesME = false
    for(let p of mo.members) {
        if(p.company.toLowerCase() == memberName) {
            $(".stats-info").show()
            $("#mmC").text("$" + commaNumber(p.contributed))
            $("#mmCD").text("$" + commaNumber(p.dailyContribution))
            $("#mmCF").text("$" + Math.floor((p.contributed / p.flights) * 1000000) / 1000000)
            $("#mmF").text(commaNumber(p.flights))
            $("#mmSV").text("$" + p.shareValue)
            $("#mmJ").text(getJTime(p.joined))
            $("#mmO").text(getOTime(p.online))
            doesME = true
        }
    }
    if(!doesME) {
        alertBox("This airline is not member of the alliance.","#fa3737")
    }
}
function checkEx(a, b) {
    let c = false
    for(let d of b.members) {
        if(d.company.toLowerCase() == a.toLowerCase()) {
            c = true
        }
    }
    return c
}
function getJTime(t) {
    let a = new Date(t * 1000)
    let b = new Date()
    let c = Math.abs(b - a)
    let d = Math.ceil(c / (1000 * 60 * 60 * 24))
    return `${d} days ago`
}
function getOTime(t) {
    let a = new Date(t * 1000)
    let b = new Date()
    let c = Math.abs(b - a)
    let d = Math.floor(c / (1000 * 60 * 60))
    if(d == 0) {
        d = Math.ceil(c / (1000 * 60))
        if(d == 1) {
            return `Now`
        }
        return `${d} minutes ago`
    } else if(d > 24) {
        d = Math.ceil(c / (1000 * 60 * 60 * 24))
        return `${d} days ago`
    } else {
        return `${d} hours ago`
    }
}
function compareMembers(oj) {
    function getTime(c) {
        let d = new Date(c)
        let rd = addZero(d.getUTCHours()) + ":" + addZero(d.getUTCMinutes()) + "\n" + (d.getUTCMonth() + 1) + "/" + d.getUTCDate() + "/" + d.getUTCFullYear()
        return rd
    }
    function addZero(z) {
        if(z.toString().length == 1) {
            z = "0" + z
            return z
        } else {
            return z
        }
    }
    let a = document.getElementById("memberOne").value
    let b = document.getElementById("memberTwo").value
    let at = checkEx(a, oj)
    let bt = checkEx(a, oj)
    if(!at || !bt) {
        alertBox("One of the members you mentioned wasn't found.","#fa3737")
        return
    }
    if(a.toLowerCase() == b.toLowerCase()) {
        alertBox("You have to compare 2 different members!","#fa3737")
        return
    }
    //GET DATA PART
    let a1
    let a2
    let a3
    let a4
    let a5
    let a6
    let aname
    let b1
    let b2
    let b3
    let b4
    let b5
    let b6
    let bname
    for(let z of oj.members) {
        if(z.company.toLowerCase() == a.toLowerCase()) {
            a1 = z.contributed
            a2 = z.dailyContribution
            a3 = z.flights
            a4 = z.contributed / z.flights
            a5 = z.joined
            a6 = z.online
            aname = z.company
        } else if(z.company.toLowerCase() == b.toLowerCase()) {
            b1 = z.contributed
            b2 = z.dailyContribution
            b3 = z.flights
            b4 = z.contributed / z.flights
            b5 = z.joined
            b6 = z.online
            bname = z.company
        }
    }
    //SET STATS PART
    $(".compare-info").show()
    $("#compM1").text(aname).css({ color: '#28a745' })
    $("#compM2").text(bname).css({ color: '#28a745' })
    $("#va1").text(commaNumber(a1))
    $("#va2").text(commaNumber(b1))
    $("#vb1").text(commaNumber(a2))
    $("#vb2").text(commaNumber(b2))
    $("#vc1").text(commaNumber(a3))
    $("#vc2").text(commaNumber(b3))
    $("#vd1").text(Math.floor(a4 * 1000000) / 1000000)
    $("#vd2").text(Math.floor(b4 * 1000000) / 1000000)
    $("#ve1").text(getTime(a5 * 1000))
    $("#ve2").text(getTime(b5 * 1000))
    $("#vf1").text(getOTime(a6))
    $("#vf2").text(getOTime(b6))
    if(a1 <= b1) {
        $("#va1").css({ color: '#dc3545' })
        $("#va2").css({ color: '#28a745' })
    } else {
        $("#va1").css({ color: '#28a745' })
        $("#va2").css({ color: '#dc3545' })
    }
    if(a2 <= b2) {
        $("#vb1").css({ color: '#dc3545' })
        $("#vb2").css({ color: '#28a745' })
    } else {
        $("#vb1").css({ color: '#28a745' })
        $("#vb2").css({ color: '#dc3545' })
    }
    if(a3 <= b3) {
        $("#vc1").css({ color: '#dc3545' })
        $("#vc2").css({ color: '#28a745' })
    } else {
        $("#vc1").css({ color: '#28a745' })
        $("#vc2").css({ color: '#dc3545' })
    }
    if(a4 <= b4) {
        $("#vd1").css({ color: '#dc3545' })
        $("#vd2").css({ color: '#28a745' })
    } else {
        $("#vd1").css({ color: '#28a745' })
        $("#vd2").css({ color: '#dc3545' })
    }
    if(a5 >= b5) {
        $("#ve1").css({ color: '#dc3545' })
        $("#ve2").css({ color: '#28a745' })
    } else {
        $("#ve1").css({ color: '#28a745' })
        $("#ve2").css({ color: '#dc3545' })
    }
    if(a6 <= b6) {
        $("#vf1").css({ color: '#dc3545' })
        $("#vf2").css({ color: '#28a745' })
    } else {
        $("#vf1").css({ color: '#28a745' })
        $("#vf2").css({ color: '#dc3545' })
    }
    //C1
    try {
        v1.destroy()
    } catch (err) {
        console.log(err)
    }
    v1 = new Chart(document.getElementById("v-1"), {
        type: 'polarArea',
        data: {
            labels: [a, b],
            datasets: [
                {
                    label: "Contribution",
                    backgroundColor: ['#103de0','#00ff3c'],
                    data: [a1, b1]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Comparison: Total Contribution'
            },
            scale: {
                ticks: {
                    userCallback: function(label, index, labels) {
                        return "$" + commaNumber(label)
                    }
                }
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItems, data) {
                        return `Contributed: $${commaNumber(tooltipItems.yLabel)}`
                    }
                }
            }
        }
    })
    //C2
    try {
        v2.destroy()
    } catch (err) {
        console.log(err)
    }
    v2 = new Chart(document.getElementById("v-2"), {
        type: 'polarArea',
        data: {
            labels: [a, b],
            datasets: [
                {
                    label: "C/D",
                    backgroundColor: ['#103de0','#00ff3c'],
                    data: [a2, b2]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Comparison: Daily Contribution'
            },
            scale: {
                ticks: {
                    userCallback: function(label, index, labels) {
                        return "$" + commaNumber(label)
                    }
                }
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItems, data) {
                        return `C/D: $${commaNumber(tooltipItems.yLabel)}`
                    }
                }
            }
        }
    })
    //C3
    try {
        v3.destroy()
    } catch (err) {
        console.log(err)
    }
    v3 = new Chart(document.getElementById("v-3"), {
        type: 'polarArea',
        data: {
            labels: [a, b],
            datasets: [
                {
                    label: "Flights",
                    backgroundColor: ['#103de0','#00ff3c'],
                    data: [a3, b3]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Comparison: Flights'
            },
            scale: {
                ticks: {
                    userCallback: function(label, index, labels) {
                        return commaNumber(label)
                    }
                }
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItems, data) {
                        return `Flights: ${commaNumber(tooltipItems.yLabel)}`
                    }
                }
            }
        }
    })
    //C4
    try {
        v4.destroy()
    } catch (err) {
        console.log(err)
    }
    v4 = new Chart(document.getElementById("v-4"), {
        type: 'polarArea',
        data: {
            labels: [a, b],
            datasets: [
                {
                    label: "C/F",
                    backgroundColor: ['#103de0','#00ff3c'],
                    data: [a4, b4]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Comparison: Cont./Flight'
            },
            scale: {
                ticks: {
                    userCallback: function(label, index, labels) {
                        return Math.round(label)
                    }
                }
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItems, data) {
                        return `C/F: $${Math.floor(tooltipItems.yLabel * 1000000) / 1000000}`
                    }
                }
            }
        }
    })
}