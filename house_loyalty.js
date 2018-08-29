var myHouseData = JSON.stringify(houseData);

//document.getElementById("house_data").innerHTML = JSON.stringify(houseData, null, 2);

var tbodyHouse = document.getElementById('house_body');

var dataHouseMembers;

var dataHouseMembers = houseData.results[0].members;

var statisticsLoyaltyHouse = {
    "nbDemocratsHouseLoyalty": 0,
    "nbRepublicansHouseLoyalty": 0,
    "nbIndependentsHouseLoyalty": 0,
    "totalmembersHouseLoyalty": 0,

    "AvgRepublicansHouseLoyalty": 0,
    "AvgDemocratsHouseLoyalty": 0,
    "AvgIndependentsHouseLoyalty": 0,
    "AvgtotalHouseLoyalty": 0
};

function FillAtGlanceLoyaltyHouseTable() {

    var democratsLoyalty = [];
    var republicansLoyalty = [];
    var independentLoyalty = [];

    var votesDemocratsLoyalty = 0;
    var votesRepublicansLoyalty = 0;
    var votesIndependentLoyalty = 0;

    for (var i = 0; i < dataHouseMembers.length; i++) {

        if (dataHouseMembers[i].party == "D") {
            democratsLoyalty.push(dataHouseMembers[i]);
            votesDemocratsLoyalty = votesDemocratsLoyalty + dataHouseMembers[i].votes_with_party_pct;
        }
        if (dataHouseMembers[i].party == "R") {
            republicansLoyalty.push(dataHouseMembers[i]);
            votesRepublicansLoyalty = votesRepublicansLoyalty + dataHouseMembers[i].votes_with_party_pct;
        }
        if (dataHouseMembers[i].party == "I") {
            independentLoyalty.push(dataHouseMembers[i]);
            votesIndependentLoyalty = votesIndependentLoyalty + dataHouseMembers[i].votes_with_party_pct;
        }

        statisticsLoyaltyHouse["nbDemocratsHouseLoyalty"] = democratsLoyalty.length;
        statisticsLoyaltyHouse["AvgRepublicansHouseLoyalty"] = Number((votesDemocratsLoyalty / democratsLoyalty.length).toFixed(2));
        statisticsLoyaltyHouse["nbRepublicansHouseLoyalty"] = republicansLoyalty.length;
        statisticsLoyaltyHouse["AvgDemocratsHouseLoyalty"] = Number((votesRepublicansLoyalty / republicansLoyalty.length).toFixed(2));
        statisticsLoyaltyHouse["nbIndependentsHouseLoyalty"] = independentLoyalty.length;
        if (independentLoyalty.length != 0) {
            statisticsLoyaltyHouse["AvgIndependentsHouseLoyalty"] = Number((votesIndependentLoyalty / independentLoyalty.length).toFixed(2));
        } else {
            statisticsLoyaltyHouse["AvgIndependentsHouseLoyalty"] = 0;
        }
    }
 document.getElementById("rep_number_house_loyalty").textContent = statisticsLoyaltyHouse["nbRepublicansHouseLoyalty"];
    document.getElementById("demo_number_house_loyalty").textContent = statisticsLoyaltyHouse["nbDemocratsHouseLoyalty"];
    document.getElementById("inde_number_house_loyalty").textContent = statisticsLoyaltyHouse["nbIndependentsHouseLoyalty"];

    document.getElementById("rep_votes_house_loyalty").textContent = statisticsLoyaltyHouse["AvgRepublicansHouseLoyalty"];
    document.getElementById("demo_votes_house_loyalty").textContent = statisticsLoyaltyHouse["AvgDemocratsHouseLoyalty"];
    document.getElementById("inde_votes_house_loyalty").textContent = statisticsLoyaltyHouse["AvgIndependentsHouseLoyalty"];

    statisticsLoyaltyHouse["total_members_house_loyalty"] = dataHouseMembers.length;
    document.getElementById("total_members_house_loyalty").textContent = statisticsLoyaltyHouse["total_members_house_loyalty"];
    
    var divider = 0;
    
    if (independentLoyalty.length != 0) {
        divider = 3;
    } else {
        divider = 2;
    }
    
    statisticsLoyaltyHouse["AvgtotalHouseLoyalty"] = ((statisticsLoyaltyHouse["AvgRepublicansHouseLoyalty"] + statisticsLoyaltyHouse["AvgDemocratsHouseLoyalty"] + statisticsLoyaltyHouse["AvgIndependentsHouseLoyalty"]) / divider).toFixed(2);
    document.getElementById("total_votes_house_loyalty").textContent = statisticsLoyaltyHouse["AvgtotalHouseLoyalty"];
}

function LeastLoyalHouse() {

    var leastLoyalMembers = dataHouseMembers.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct
    });

    var leastTenPctLoyal = Math.round((leastLoyalMembers.length * 10) / 100);

    var leastLoyalMembersHouse = [];

    for (var i = 0; i < leastTenPctLoyal; i++) {
        leastLoyalMembersHouse.push(leastLoyalMembers[i]);
    }

    for (var i = leastTenPctLoyal; i < leastLoyalMembers.length; i++) {
        if (leastLoyalMembersHouse[leastLoyalMembersHouse.length - 1].votes_with_party_pct == leastLoyalMembers[i].votes_with_party_pct) {
            leastLoyalMembersHouse.push(leastLoyalMembers[i]);
        }
    }
    return leastLoyalMembersHouse;
}

function MostLoyalHouse() {

    var mostLoyalMembers = dataHouseMembers.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct
    });

    var mostTenPctLoyal = Math.round((mostLoyalMembers.length * 10) / 100);

    var mostLoyalMembersHouse = [];

    for (var i = 0; i < mostTenPctLoyal; i++) {
        mostLoyalMembersHouse.push(mostLoyalMembers[i]);
    }

    for (var i = mostTenPctLoyal; i < mostLoyalMembers.length; i++) {
        if (mostLoyalMembersHouse[mostLoyalMembersHouse.length - 1].missed_votes_pct == mostLoyalMembers[i].missed_votes_pct) {
            mostLoyalMembersHouse.push(mostLoyalMembers[i]);
        }
    }
    return mostLoyalMembersHouse;
}

function CreateBodyHouseLoyalty(dataHouseMembers, tbbodyID) {

    var tbodyhouse = document.getElementById(tbbodyID);

    tbodyhouse.innerHTML = '';

    for (var i = 0; i < dataHouseMembers.length; i = i + 1) {

        var trHouseLoyalty = document.createElement("tr");
        var tdname = document.createElement("td");
        var tdtotalvotes = document.createElement("td");
        var tdvoteswithparty = document.createElement("td");

        tdname.innerHTML = "<a href='" + dataHouseMembers[i].url + "'>" + dataHouseMembers[i].first_name + ' ' + dataHouseMembers[i].last_name + " </a>";
        tdtotalvotes.textContent = dataHouseMembers[i].total_votes;
        tdvoteswithparty.textContent = dataHouseMembers[i].votes_with_party_pct + "%";

        trHouseLoyalty.appendChild(tdname);
        trHouseLoyalty.appendChild(tdtotalvotes);
        trHouseLoyalty.appendChild(tdvoteswithparty);

        tbodyhouse.appendChild(trHouseLoyalty);
    }
}



FillAtGlanceLoyaltyHouseTable();

CreateBodyHouseLoyalty(LeastLoyalHouse(), "bodyLeastLoyalHouse");
CreateBodyHouseLoyalty(MostLoyalHouse(), "bodyMostLoyalHouse");
