const userStatsPanel = document.getElementById("userStatsPanel");

// Setup user statistics
var setupStats = function() {
    let i = 0;
    for (let stat in userStats) {
        var statHbox = document.createElement("div");
        var statLabel = document.createElement("p");
        var statValue = document.createElement("p");

        statHbox.classList.add("hbox");
        statLabel.classList.add("body", "size-5", "margin-0");
        statValue.classList.add("body", "size-5", "text-right", "margin-0");

        statLabel.innerHTML = stat + ": ";

        statValue.innerHTML = userStats[stat];
        statValue.setAttribute("id", "userStatValue_" + i);

        statHbox.appendChild(statLabel);
        statHbox.appendChild(statValue);

        userStatsPanel.appendChild(statHbox);
        i++;
    }
}

// Update user statistics
var updateStats = function() {
    let i = 0;
    for (let stat in userStats) {
        let statValue = document.getElementById("userStatValue_" + i);
        statValue.innerHTML = userStats[stat];
        i++;
    }
}