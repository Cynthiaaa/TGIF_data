var myHouseData = JSON.stringify(houseData);

//document.getElementById("house_data").innerHTML = JSON.stringify(houseData, null, 2);

var tbodyHouse = document.getElementById('house_body');

var dataHouseMembers;

var dataHouseMembers = houseData.results[0].members;

var statisticsAttendanceHouse = {
    "nbDemocratsHouse": 0,
    "nbRepublicansHouse": 0,
    "nbIndependentsHouse": 0,
    "totalmembersHouse": 0,

    "AvgRepublicansHouse": 0,
    "AvgDemocratsHouse": 0,
    "AvgIndependentsHouse": 0,
    "AvgtotalHouse": 0
};

function FillAtGlanceAttendanceHouseTable() {

    var democratsAttendance = [];
    var republicansAttendance = [];
    var independentAttendance = [];

    var votesDemocratsHouse = 0;
    var votesRepublicansHouse = 0;
    var votesIndependentHouse = 0;

    for (var i = 0; i < dataHouseMembers.length; i++) {

        if (dataHouseMembers[i].party == "D") {
            democratsAttendance.push(dataHouseMembers[i]);
            votesDemocratsHouse = votesDemocratsHouse + dataHouseMembers[i].votes_with_party_pct;
        }
        if (dataHouseMembers[i].party == "R") {
            republicansAttendance.push(dataHouseMembers[i]);
            votesRepublicansHouse = votesRepublicansHouse + dataHouseMembers[i].votes_with_party_pct;
        }
        if (dataHouseMembers[i].party == "I") {
            independentAttendance.push(dataHouseMembers[i]);
            votesIndependentHouse = votesIndependentHouse + dataHouseMembers[i].votes_with_party_pct;
        }

        statisticsAttendanceHouse["nbDemocratsHouse"] = democratsAttendance.length;
        statisticsAttendanceHouse["AvgDemocratsHouse"] = Number((votesDemocratsHouse / democratsAttendance.length).toFixed(2));
        statisticsAttendanceHouse["nbRepublicansHouse"] = republicansAttendance.length;
        statisticsAttendanceHouse["AvgRepublicansHouse"] = Number((votesRepublicansHouse / republicansAttendance.length).toFixed(2));
        statisticsAttendanceHouse["nbIndependentsHouse"] = independentAttendance.length;
        if (independentAttendance.length != 0) {
            statisticsAttendanceHouse["AvgIndependentsHouse"] = Number((votesIndependentsHouse / independentAttendance.length).toFixed(2));
        } else {
            statisticsAttendanceHouse["AvgIndependentsHouse"] = 0;
        }
    }
    document.getElementById("rep_number_house").textContent = statisticsAttendanceHouse["nbRepublicansHouse"];
    
    document.getElementById("demo_number_house").textContent = statisticsAttendanceHouse["nbDemocratsHouse"];
    
    document.getElementById("inde_number_house").textContent = statisticsAttendanceHouse["nbIndependentsHouse"];

    document.getElementById("rep_votes_house").textContent = statisticsAttendanceHouse["AvgRepublicansHouse"];
    document.getElementById("demo_votes_house").textContent = statisticsAttendanceHouse["AvgDemocratsHouse"];
    document.getElementById("inde_votes_house").textContent = statisticsAttendanceHouse["AvgIndependentsHouse"];

    statisticsAttendanceHouse["total_members_house"] = dataHouseMembers.length;

    document.getElementById("total_members_house").textContent = statisticsAttendanceHouse["total_members_house"];

     var divider = 0;
    
    if (independentAttendance.length != 0) {
        divider = 3;
    } else {
        divider = 2;
    }
    
    statisticsAttendanceHouse["AvgtotalHouse"] = ((statisticsAttendanceHouse["AvgRepublicansHouse"] + statisticsAttendanceHouse["AvgDemocratsHouse"] + statisticsAttendanceHouse["AvgIndependentsHouse"]) / divider).toFixed(2);
    
    document.getElementById("total_votes_house").textContent = statisticsAttendanceHouse["AvgtotalHouse"];
}


function LeastEngagedHouseAttendance() {

    var leastEngagedMembers = dataHouseMembers.sort(function (a, b) {
        return b.missed_votes_pct - a.missed_votes_pct
    });

    var leastTenPctEngaged = Math.round((leastEngagedMembers.length * 10) / 100);

    var leastEngagedMembersHouseAttendance = [];

    for (var i = 0; i < leastTenPctEngaged; i++) {
        leastEngagedMembersHouseAttendance.push(leastEngagedMembers[i]);
    }

    for (var i = leastTenPctEngaged; i < leastEngagedMembers.length; i++) {
        if (leastEngagedMembersHouseAttendance[leastEngagedMembersHouseAttendance.length - 1].missed_votes_pct == leastEngagedMembers[i].missed_votes_pct) {
            leastEngagedMembersHouseAttendance.push(leastEngagedMembers[i]);
        }
    }
    return leastEngagedMembersHouseAttendance;
}

function MostEngagedHouseAttendance() {

    var mostEngagedMembers = dataHouseMembers.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct
    });

    var mostTenPctEngaged = Math.round((mostEngagedMembers.length * 10) / 100);

    var mostEngagedMembersHouseAttendance = [];

    for (var i = 0; i < mostTenPctEngaged; i++) {
        mostEngagedMembersHouseAttendance.push(mostEngagedMembers[i]);
    }

    for (var i = mostTenPctEngaged; i < mostEngagedMembers.length; i++) {
        if (mostEngagedMembersHouseAttendance[mostEngagedMembersHouseAttendance.length - 1].missed_votes_pct == mostEngagedMembers[i].missed_votes_pct) {
            mostEngagedMembersHouseAttendance.push(mostEngagedMembers[i]);
        }
    }
    return mostEngagedMembersHouseAttendance;
}

function CreateBodyHouse(dataHouseMembers, tbbodyID) {

    var tbodyhouse = document.getElementById(tbbodyID);

    tbodyhouse.innerHTML = '';

    for (var i = 0; i < dataHouseMembers.length; i = i + 1) {

        var trHouseAtt = document.createElement("tr");
        var tdname = document.createElement("td");
        var tdmissedvotes = document.createElement("td");
        var tdpartyvotes = document.createElement("td");

        tdname.innerHTML = "<a href='" + dataHouseMembers[i].url + "'>" + dataHouseMembers[i].first_name + ' ' + dataHouseMembers[i].last_name + " </a>";
        tdpartyvotes.textContent = dataHouseMembers[i].missed_votes;
        tdmissedvotes.textContent = dataHouseMembers[i].missed_votes_pct + "%";

        trHouseAtt.appendChild(tdname);
        trHouseAtt.appendChild(tdpartyvotes);
        trHouseAtt.appendChild(tdmissedvotes);

        tbodyhouse.appendChild(trHouseAtt);
    }
}

FillAtGlanceAttendanceHouseTable();

CreateBodyHouse(LeastEngagedHouseAttendance(), "bodyLeastAttendanceHouse");
CreateBodyHouse(MostEngagedHouseAttendance(), "bodyMostAttendanceHouse");


