const gratitudeInput = document.getElementById("gratitudeInput");
const plantButton = document.getElementById("plantButton");
const garden = document.getElementById("garden");
const streakCount = document.getElementById("streakCount");
const totalPlants = document.getElementById("totalPlants");

let entries = JSON.parse(localStorage.getItem("gratitudeEntries")) || [];

displayGarden();

plantButton.addEventListener("click", function () {
    const text = gratitudeInput.value.trim();

    if(text === ""){
        alert("Please write something you are grateful for.");
        return;
    };

    const today = new Date().toLocaleDateString();

    const alreadyPostedToday = entries.some(function (entry) {

        return entry.date === today;
    });

    if (alreadyPostedToday) {
        alert("You already planted today. Come back tomorrow!");
        return;
    }

    const entry = {
        text: text,
        date: today,
        stage: entries.length
    };

    entries.push(entry);
    saveEntries();
    gratitudeInput.value= "";

    displayGarden ();


});
function saveEntries() {
    localStorage.setItem("gratitudeEntries", JSON.stringify(entries));
}

function displayGarden() {
    garden.innerHTML = "";

    entries.forEach(function (entry, index) {
        const plant = document.createElement("div");
        plant.classList.add("plant");
        const emoji = getPlantEmoji(entry.stage);
        

        plant.innerHTML = `
            <div class="plant-emoji">${emoji}</div> 
            <p>${entry.text}</p>
            <small>${entry.date}</small>
            <button class ="delete-btn" onclick="deleteEntry(${index})">Delete</button>
        `;
        garden.appendChild(plant);
    });
    updateStats;
}

function getPlantEmoji(stage) {
    const plants = ["🌱", "🌿", "🌷", "🌻", "🌸", "🌼"];
    return plants[stage % plants.length];
}

function updateStats() {
    totalPlants.textContent = entries.length;
    streakCount,textContent = calculateStreak();
}

function calculateStreak() {
    if (entries.length === 0) {
        return 0;
    }

    return entries.length;
}

function deleteEntry(index) {
    entries.splice(index, 1);
    saveEntries();
    displayGarden();
}

