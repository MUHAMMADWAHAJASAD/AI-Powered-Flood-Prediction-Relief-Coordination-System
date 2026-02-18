const API_URL = "https://a831-34-106-180-35.ngrok-free.app"; 
const NGROK_HEADERS = { "ngrok-skip-browser-warning": "true" };

// Feature names from your CSV
const featureNames = [
    "MonsoonIntensity", "TopographyDrainage", "RiverManagement", "Deforestation", 
    "Urbanization", "ClimateChange", "DamsQuality", "Siltation", "AgriculturalPractices", 
    "Encroachments", "IneffectiveDisasterPreparedness", "DrainageSystems", 
    "CoastalVulnerability", "Landslides", "Watersheds", "DeterioratingInfrastructure", 
    "PopulationScore", "WetlandLoss", "InadequatePlanning", "PoliticalFactors"
];

// Generate input fields dynamically
const featuresDiv = document.getElementById("featuresInputs");
featureNames.forEach((fname, i) => {
    const group = document.createElement("div");
    group.className = "feature-group";

    const label = document.createElement("label");
    label.innerText = fname;
    label.htmlFor = `feature${i}`;

    const input = document.createElement("input");
    input.type = "number";
    input.id = `feature${i}`;
    input.placeholder = `Enter ${fname}`;
    input.required = true;

    group.appendChild(label);
    group.appendChild(input);
    featuresDiv.appendChild(group);
});

// Handle prediction form submit
document.getElementById("predictForm").onsubmit = async function(e) {
    e.preventDefault();

    const features = featureNames.map((_, i) => parseFloat(document.getElementById(`feature${i}`).value));

    if (features.some(isNaN)) {
        alert("Please enter all valid feature values.");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/predict-flood`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...NGROK_HEADERS
            },
            body: JSON.stringify({ features })
        });

        if (!res.ok) throw new Error(`Prediction failed: ${res.status}`);
        const result = await res.json();

        document.getElementById("result").innerText = 
            `Flood Probability: ${result.flood_probability} | Risk Level: ${result.risk_level}`;

    } catch (err) {
        console.error(err);
        alert("Prediction failed (check backend / ngrok)");
    }
};
