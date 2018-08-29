var mySenateData = JSON.stringify(senateData);

//document.getElementById("senate_data").innerHTML = JSON.stringify(senateData,null,2);

var tbodySenate = document.getElementById('senate_body');

var dataSenateMembers;

var dataSenateMembers = senateData.results[0].members;

var statesSenate = [];

document.getElementById("checkBoxesSenate").addEventListener("click", function () {
    filterSenateMembers(dataSenateMembers)
});

document.getElementById("states").addEventListener("change", function () {
    filterSenateMembers(dataSenateMembers)
});

createTableSenate(dataSenateMembers);

FillDropdownStatesSenate(dataSenateMembers);

OrderStatesMenuSenate(dataSenateMembers);

function createTableSenate(dataSenateMembers) {
  
    tbodySenate.innerHTML = '';

    for (var i = 0; i < dataSenateMembers.length; i++) {

        var trSenate = document.createElement("tr");
        var tdname = document.createElement("td");
        var tdparty = document.createElement("td");
        var tdstate = document.createElement("td");
        var tdseniority = document.createElement("td");
        var tdvote = document.createElement("td");

        tdname.innerHTML = "<a href='" + dataSenateMembers[i].url + "'>" + dataSenateMembers[i].first_name + ' ' + dataSenateMembers[i].last_name + " </a>";
        tdparty.innerHTML = dataSenateMembers[i].party;
        tdstate.innerHTML = dataSenateMembers[i].state;
        tdseniority.innerHTML = dataSenateMembers[i].seniority;
        tdvote.innerHTML = dataSenateMembers[i].missed_votes_pct + "%";

        trSenate.appendChild(tdname);
        trSenate.appendChild(tdparty);
        trSenate.appendChild(tdstate);
        trSenate.appendChild(tdseniority);
        trSenate.appendChild(tdvote);

        tbodySenate.appendChild(trSenate);
    }
}

function filterSenateMembers(dataSenateMembers) {

    var republicansSenateCheckbox = document.getElementById("republicanSenate");
    var democratsSenateCheckbox = document.getElementById("democratSenate");
    var independentSenateCheckbox = document.getElementById("independentSenate");

    var states = document.getElementById("states");

    var filteredSenateMembers = [];

    for (var i = 0; i < dataSenateMembers.length; i++) {

        if ((republicansSenateCheckbox.checked == true && dataSenateMembers[i].party == "R") && (dataSenateMembers[i].state == states.value || states.value == "All")) {
            filteredSenateMembers.push(dataSenateMembers[i]);
        }
        
        if ((democratsSenateCheckbox.checked == true && dataSenateMembers[i].party == "D") && (dataSenateMembers[i].state == states.value || states.value == "All")) {
            filteredSenateMembers.push(dataSenateMembers[i]);
        }
        
        if ((independentSenateCheckbox.checked == true && dataSenateMembers[i].party == "I") && (dataSenateMembers[i].state == states.value || states.value == "All")) {
            filteredSenateMembers.push(dataSenateMembers[i]);
        }
        
        if ((republicansSenateCheckbox.checked != true && democratsSenateCheckbox.checked != true && independentSenateCheckbox.checked != true) && (dataSenateMembers[i].state == states.value || states.value == "All")) {
            filteredSenateMembers.push(dataSenateMembers[i]);
        }
    }
 createTableSenate(filteredSenateMembers);
}

function FillDropdownStatesSenate(dataSenateMembers) {
    for (var i = 0; i < dataSenateMembers.length; i++) {
        if (!statesSenate.includes(dataSenateMembers[i].state)) {
            statesSenate.push(dataSenateMembers[i].state);
        }
    }
}

function OrderStatesMenuSenate() {
    var senateStates = document.getElementById('states');
    var statesByOrder = statesSenate.sort();
    for (var i = 0; i < statesByOrder.length; i++) {
        var statesOption = document.createElement('option');
        statesOption.textContent = statesByOrder[i];
        statesOption.setAttribute("value", statesByOrder[i]);
        states.appendChild(statesOption);
    }
}
