var mySenateData = JSON.stringify(senateData);

//document.getElementById("house_data").innerHTML = JSON.stringify(houseData, null, 2);

var tbodySenate = document.getElementById('senate_body');

var dataSenateMembers;

var dataSenateMembers = senateData.results[0].members;

var statisticsLoyaltySenate = {
    "nbDemocratsSenateLoyalty": 0,
    "nbRepublicansSenateLoyalty": 0,
    "nbIndependentsSenateLoyalty": 0,
    "totalmembersSenateLoyalty": 0,

    "AvgRepublicansSenateLoyalty": 0,
    "AvgDemocratsSenateLoyalty": 0,
    "AvgIndependentsSenateLoyalty": 0,
    "AvgtotalSenateLoyalty": 0
};

function FillAtGlanceLoyaltySenateTable() {

    var democratsLoyaltySenate = [];
    var republicansLoyaltySenate = [];
    var independentLoyaltySenate = [];

    var votesDemocratsSenateLoyalty = 0;
    var votesRepublicansSenateLoyalty = 0;
    var votesIndependentSenateLoyalty = 0;

    for (var i = 0; i < dataSenateMembers.length; i++) {

        if (dataSenateMembers[i].party == "D") {
            democratsLoyaltySenate.push(dataSenateMembers[i]);
            votesDemocratsSenateLoyalty = votesDemocratsSenateLoyalty + dataSenateMembers[i].votes_with_party_pct;
        }
        if (dataSenateMembers[i].party == "R") {
            republicansLoyaltySenate.push(dataSenateMembers[i]);
            votesRepublicansSenateLoyalty = votesRepublicansSenateLoyalty + dataSenateMembers[i].votes_with_party_pct;
        }
        if (dataSenateMembers[i].party == "I") {
            independentLoyaltySenate.push(dataSenateMembers[i]);
            votesIndependentSenateLoyalty = votesIndependentSenateLoyalty + dataSenateMembers[i].votes_with_party_pct;
        }

        statisticsLoyaltySenate["nbDemocratsSenateLoyalty"] = democratsLoyaltySenate.length;
        statisticsLoyaltySenate["AvgDemocratsSenateLoyalty"] = Number((votesDemocratsSenateLoyalty / democratsLoyaltySenate.length).toFixed(2));
        statisticsLoyaltySenate["nbRepublicansSenateLoyalty"] = republicansLoyaltySenate.length;
        statisticsLoyaltySenate["AvgRepublicansSenateLoyalty"] = Number((votesRepublicansSenateLoyalty / republicansLoyaltySenate.length).toFixed(2));
        statisticsLoyaltySenate["nbIndependentsSenateLoyalty"] = independentLoyaltySenate.length;
        if (independentLoyaltySenate.length != 0) {
            statisticsLoyaltySenate["AvgIndependentsSenateLoyalty"] = Number((votesIndependentSenateLoyalty / independentLoyaltySenate.length).toFixed(2));
        } else {
            statisticsLoyaltySenate["AvgIndependentsSenateLoyalty"] = 0;
        }
    }
    document.getElementById("rep_number_senate_loyalty").textContent = statisticsLoyaltySenate["nbRepublicansSenateLoyalty"];

    document.getElementById("demo_number_senate_loyalty").textContent = statisticsLoyaltySenate["nbDemocratsSenateLoyalty"];

    document.getElementById("inde_number_senate_loyalty").textContent = statisticsLoyaltySenate["nbIndependentsSenateLoyalty"];

    document.getElementById("rep_votes_senate_loyalty").textContent = statisticsLoyaltySenate["AvgRepublicansSenateLoyalty"];
    document.getElementById("demo_votes_senate_loyalty").textContent = statisticsLoyaltySenate["AvgDemocratsSenateLoyalty"];
    document.getElementById("inde_votes_senate_loyalty").textContent = statisticsLoyaltySenate["AvgIndependentsSenateLoyalty"];

    statisticsLoyaltySenate["total_members_senate_loyalty"] = dataSenateMembers.length;

    document.getElementById("total_members_senate_loyalty").textContent = statisticsLoyaltySenate["total_members_senate_loyalty"];

    var divider = 0;

    if (independentLoyaltySenate.length != 0) {
        divider = 3;
    } else {
        divider = 2;
    }

    statisticsLoyaltySenate["AvgtotalSenateLoyalty"] = ((statisticsLoyaltySenate["AvgRepublicansSenateLoyalty"] + statisticsLoyaltySenate["AvgDemocratsSenateLoyalty"] + statisticsLoyaltySenate["AvgIndependentsSenateLoyalty"]) / 3).toFixed(2);

    document.getElementById("total_votes_senate_loyalty").textContent = statisticsLoyaltySenate["AvgtotalSenateLoyalty"];
}

function LeastLoyalSenate() {

    var leastLoyalMembers = dataSenateMembers.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct
    });

    var leastTenPctLoyalSenate = Math.round((leastLoyalMembers.length * 10) / 100);

    var leastLoyalMembersSenate = [];

    for (var i = 0; i < leastTenPctLoyalSenate; i++) {
        leastLoyalMembersSenate.push(leastLoyalMembers[i]);
    }

    for (var i = leastTenPctLoyalSenate; i < leastLoyalMembers.length; i++) {
        if (leastLoyalMembersSenate[leastLoyalMembersSenate.length - 1].votes_with_party_pct == leastLoyalMembers[i].votes_with_party_pct) {
            leastLoyalMembersSenate.push(leastLoyalMembers[i]);
        }
    }
    return leastLoyalMembersSenate;
}

function MostLoyalSenate() {

    var mostLoyalMembers = dataSenateMembers.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct
    });

    var mostTenPctLoyalSenate = Math.round((mostLoyalMembers.length * 10) / 100);

    var mostLoyalMembersSenate = [];

    for (var i = 0; i < mostTenPctLoyalSenate; i++) {
        mostLoyalMembersSenate.push(mostLoyalMembers[i]);
    }

    for (var i = mostTenPctLoyalSenate; i < mostLoyalMembers.length; i++) {
        if (mostLoyalMembersSenate[mostLoyalMembersSenate.length - 1].missed_votes_pct == mostLoyalMembers[i].missed_votes_pct) {
            mostLoyalMembersSenate.push(mostLoyalMembers[i]);
        }
    }
    return mostLoyalMembersSenate;
}

function CreateBodySenateLoyalty(dataSenateMembers, tbbodyID) {

    var tbodysenate = document.getElementById(tbbodyID);

    tbodysenate.innerHTML = '';

    for (var i = 0; i < dataSenateMembers.length; i = i + 1) {

        var trSenateLoyalty = document.createElement("tr");
        var tdname = document.createElement("td");
        var tdtotalvotes = document.createElement("td");
        var tdvoteswithparty = document.createElement("td");

        tdname.innerHTML = "<a href='" + dataSenateMembers[i].url + "'>" + dataSenateMembers[i].first_name + ' ' + dataSenateMembers[i].last_name + " </a>";
        tdtotalvotes.textContent = dataSenateMembers[i].total_votes;
        tdvoteswithparty.textContent = dataSenateMembers[i].votes_with_party_pct + "%";

        trSenateLoyalty.appendChild(tdname);
        trSenateLoyalty.appendChild(tdtotalvotes);
        trSenateLoyalty.appendChild(tdvoteswithparty);

        tbodysenate.appendChild(trSenateLoyalty);
    }
}

FillAtGlanceLoyaltySenateTable();
CreateBodySenateLoyalty(LeastLoyalSenate(), "bodyLeastLoyalSenate");
CreateBodySenateLoyalty(MostLoyalSenate(), "bodyMostLoyalSenate");