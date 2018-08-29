var myHouseData = JSON.stringify(houseData);

//document.getElementById("house_data").innerHTML = JSON.stringify(houseData, null, 2);

var tbodyHouse = document.getElementById('house_body');

var dataHouseMembers;

var dataHouseMembers = houseData.results[0].members;

var statesHouse = [];

document.getElementById("checkBoxes").addEventListener("click", function () {
    filterHouseMembers(dataHouseMembers)
});

document.getElementById("states").addEventListener("change", function () {
    filterHouseMembers(dataHouseMembers)
});

createTableHouse(dataHouseMembers);

FillDropdownStates(dataHouseMembers);

OrderStatesMenu(dataHouseMembers);

function createTableHouse(dataHouseMembers) {

    tbodyHouse.innerHTML = '';

    for (var i = 0; i < dataHouseMembers.length; i++) {

        var trHouse = document.createElement("tr");
        var tdname = document.createElement("td");
        var tdparty = document.createElement("td");
        var tdstate = document.createElement("td");
        var tdseniority = document.createElement("td");
        var tdvote = document.createElement("td");

        tdname.innerHTML = "<a href='" + dataHouseMembers[i].url + "'>" + dataHouseMembers[i].first_name + ' ' + dataHouseMembers[i].last_name + " </a>";
        tdparty.innerHTML = dataHouseMembers[i].party;
        tdstate.innerHTML = dataHouseMembers[i].state;
        tdseniority.innerHTML = dataHouseMembers[i].seniority;
        tdvote.innerHTML = dataHouseMembers[i].missed_votes_pct + "%";

        trHouse.appendChild(tdname);
        trHouse.appendChild(tdparty);
        trHouse.appendChild(tdstate);
        trHouse.appendChild(tdseniority);
        trHouse.appendChild(tdvote);

        tbodyHouse.appendChild(trHouse);
    }
}

function filterHouseMembers(dataHouseMembers) {

    var republicansCheckbox = document.getElementById("republican");
    var democratsCheckbox = document.getElementById("democrat");
    var independentCheckbox = document.getElementById("independent");

    var states = document.getElementById("states");
    
    var filteredMembers = [];

    for (var i = 0; i < dataHouseMembers.length; i++) {

        if ((republicansCheckbox.checked == true && dataHouseMembers[i].party == "R") && (dataHouseMembers[i].state == states.value || states.value == "All")) {
            filteredMembers.push(dataHouseMembers[i]);
        }

        if ((democratsCheckbox.checked == true && dataHouseMembers[i].party == "D") && (dataHouseMembers[i].state == states.value || states.value == "All")) {
            filteredMembers.push(dataHouseMembers[i]);
        }

        if ((independentCheckbox.checked == true && dataHouseMembers[i].party == "I") && (dataHouseMembers[i].state == states.value || states.value == "All")) {
            filteredMembers.push(dataHouseMembers[i]);
        }

        if ((republicansCheckbox.checked != true && democratsCheckbox.checked != true && independentCheckbox.checked != true) && (dataHouseMembers[i].state == states.value || states.value == "All")) {

            filteredMembers.push(dataHouseMembers[i]);
        }
    }
    createTableHouse(filteredMembers);
}

function FillDropdownStates(dataHouseMembers) {
    for (var i = 0; i < dataHouseMembers.length; i++) {
        if (!statesHouse.includes(dataHouseMembers[i].state)) {
            statesHouse.push(dataHouseMembers[i].state);
        }
    }
}

function OrderStatesMenu() {
    var houseStates = document.getElementById('states');
    var statesByOrder = statesHouse.sort();
    for (var i = 0; i < statesByOrder.length; i++) {
        var statesOption = document.createElement('option');
        statesOption.textContent = statesByOrder[i];
        statesOption.setAttribute("value", statesByOrder[i]);
        states.appendChild(statesOption);
    }
}
