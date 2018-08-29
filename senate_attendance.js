var mySenateData = JSON.stringify(senateData);

//document.getElementById("house_data").innerHTML = JSON.stringify(houseData, null, 2);

var tbodySenate = document.getElementById('senate_body');

var dataSenateMembers;

var dataSenateMembers = senateData.results[0].members;

var statisticsAttendanceSenate = {
    "nbDemocratsSenate": 0,
    "nbRepublicansSenate": 0,
    "nbIndependentsSenate": 0,
    "totalmembersSenate": 0,

    "AvgRepublicansSenate": 0,
    "AvgDemocratsSenate": 0,
    "AvgIndependentsSenate": 0,
    "AvgtotalSenate": 0
};

function FillAtGlanceAttendanceSenateTable() {

    var democratsAttendanceSenate = [];
    var republicansAttendanceSenate = [];
    var independentAttendanceSenate = [];

    var votesDemocratsSenate = 0;
    var votesRepublicansSenate = 0;
    var votesIndependentSenate = 0;

    for (var i = 0; i < dataSenateMembers.length; i++) {

        if (dataSenateMembers[i].party == "D") {
            democratsAttendanceSenate.push(dataSenateMembers[i]);
            votesDemocratsSenate = votesDemocratsSenate + dataSenateMembers[i].votes_with_party_pct;
        }
        if (dataSenateMembers[i].party == "R") {
            republicansAttendanceSenate.push(dataSenateMembers[i]);
            votesRepublicansSenate = votesRepublicansSenate + dataSenateMembers[i].votes_with_party_pct;
        }
        if (dataSenateMembers[i].party == "I") {
            independentAttendanceSenate.push(dataSenateMembers[i]);
            votesIndependentSenate = votesIndependentSenate + dataSenateMembers[i].votes_with_party_pct;
        }

        statisticsAttendanceSenate["nbDemocratsSenate"] = democratsAttendanceSenate.length;
        statisticsAttendanceSenate["AvgDemocratsSenate"] = Number((votesDemocratsSenate / democratsAttendanceSenate.length).toFixed(2));
        statisticsAttendanceSenate["nbRepublicansSenate"] = republicansAttendanceSenate.length;
        statisticsAttendanceSenate["AvgRepublicansSenate"] = Number((votesRepublicansSenate / republicansAttendanceSenate.length).toFixed(2));
        statisticsAttendanceSenate["nbIndependentsSenate"] = independentAttendanceSenate.length;
        if (independentAttendanceSenate.length != 0) {
            statisticsAttendanceSenate["AvgIndependentsSenate"] = Number((votesIndependentSenate / independentAttendanceSenate.length).toFixed(2));
        } else {
            statisticsAttendanceSenate["AvgIndependentsSenate"] = 0;
        }
    }
    document.getElementById("rep_number_senate").textContent = statisticsAttendanceSenate["nbRepublicansSenate"];

    document.getElementById("demo_number_senate").textContent = statisticsAttendanceSenate["nbDemocratsSenate"];

    document.getElementById("inde_number_senate").textContent = statisticsAttendanceSenate["nbIndependentsSenate"];

    document.getElementById("rep_votes_senate").textContent = statisticsAttendanceSenate["AvgRepublicansSenate"];
    document.getElementById("demo_votes_senate").textContent = statisticsAttendanceSenate["AvgDemocratsSenate"];
    document.getElementById("inde_votes_senate").textContent = statisticsAttendanceSenate["AvgIndependentsSenate"];

    statisticsAttendanceSenate["total_members_senate"] = dataSenateMembers.length;

    document.getElementById("total_members_senate").textContent = statisticsAttendanceSenate["total_members_senate"];

    var divider = 0;

    if (independentAttendanceSenate.length != 0) {
        divider = 3;
    } else {
        divider = 2;
    }

    statisticsAttendanceSenate["AvgtotalSenate"] = ((statisticsAttendanceSenate["AvgRepublicansSenate"] + statisticsAttendanceSenate["AvgDemocratsSenate"] + statisticsAttendanceSenate["AvgIndependentsSenate"]) / 3).toFixed(2);

    document.getElementById("total_votes_senate").textContent = statisticsAttendanceSenate["AvgtotalSenate"];
}

function LeastEngagedSenateAttendance() {

    var leastEngagedMembersSenate = dataSenateMembers.sort(function (a, b) {
        return b.missed_votes_pct - a.missed_votes_pct
    });

    var leastTenPctEngagedSenate = Math.round((leastEngagedMembersSenate.length * 10) / 100);

    var leastEngagedMembersSenateAttendance = [];

    for (var i = 0; i < leastTenPctEngagedSenate; i++) {
        leastEngagedMembersSenateAttendance.push(leastEngagedMembersSenate[i]);
    }

    for (var i = leastTenPctEngagedSenate; i < leastEngagedMembersSenate.length; i++) {
        if (leastEngagedMembersSenateAttendance[leastEngagedMembersSenateAttendance.length - 1].missed_votes_pct == leastEngagedMembersSenate[i].missed_votes_pct) {
            leastEngagedMembersSenateAttendance.push(leastEngagedMembersSenate[i]);
        }
    }
    return leastEngagedMembersSenateAttendance;
}

function MostEngagedSenateAttendance() {

    var mostEngagedMembersSenate = dataSenateMembers.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct
    });

    var mostTenPctEngagedSenate = Math.round((mostEngagedMembersSenate.length * 10) / 100);

    var mostEngagedMembersSenateAttendance = [];

    for (var i = 0; i < mostTenPctEngagedSenate; i++) {
        mostEngagedMembersSenateAttendance.push(mostEngagedMembersSenate[i]);
    }

    for (var i = mostTenPctEngagedSenate; i < mostEngagedMembersSenate.length; i++) {
        if (mostEngagedMembersSenateAttendance[mostEngagedMembersSenateAttendance.length - 1].missed_votes_pct == mostEngagedMembersSenate[i].missed_votes_pct) {
            mostEngagedMembersSenateAttendance.push(mostEngagedMembersSenate[i]);
        }
    }
    return mostEngagedMembersSenateAttendance;
}

function CreateBodySenate(array, tbbodyID) {

    var tbodysenate = document.getElementById(tbbodyID);

    tbodysenate.innerHTML = '';

    for (var i = 0; i < array.length; i = i + 1) {

        var trSenateAtt = document.createElement("tr");
        var tdname = document.createElement("td");
        var tdpartyvotes = document.createElement("td");
        var tdmissedvotes = document.createElement("td");

        tdname.innerHTML = "<a href='" + array[i].url + "'>" + array[i].first_name + ' ' + array[i].last_name + " </a>";
        tdpartyvotes.textContent = array[i].missed_votes;
        tdmissedvotes.textContent = array[i].missed_votes_pct + "%";

        trSenateAtt.appendChild(tdname);
        trSenateAtt.appendChild(tdpartyvotes);
        trSenateAtt.appendChild(tdmissedvotes);

        tbodysenate.appendChild(trSenateAtt);
    }
}

FillAtGlanceAttendanceSenateTable();

CreateBodySenate(LeastEngagedSenateAttendance(), "bodyLeastAttendanceSenate");
CreateBodySenate(MostEngagedSenateAttendance(), "bodyMostAttendanceSenate");

