const gratitudeInput = document.getElementById("gratitudeInput");
const plantButton = document.getElementById("plantButton");
const garden = document.getElementById("garden");

let entries = JSON.parse(localStorage.getItem("gratitudeEntries")) || [];

displayGarden();

plantButton.addEventListener("click", function () {
    const text = gratitudeInput.value.trim();

    if(text === ""){
        alert("Please write something you are grateful for.");
        return;
    };

    const entry = {
        text: text,
        date: new Date().toLocaleDateString()
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

    entries.forEach(function (entry) {
        const plant = document.createElement("div");
        plant.classList.add("plant");
        plant.innerHTML = `
            <div class="plant-emoji">🌱</div> 
            <p>${entry.text}</p>
            <small>${entry.date}</small>
        
        `;
        garden.appendChild(plant);
    });
}



