const API_URL = "https://a831-34-106-180-35.ngrok-free.app/report";

document.getElementById("reportForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const image = document.getElementById("image").files[0];
    const text = document.getElementById("text").value;
    const area = document.getElementById("area").value;
    const people = document.getElementById("people").value;

    if (!image) {
        alert("Please upload an image");
        return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("text", text);
    formData.append("area", area);
    formData.append("people", people);

    document.getElementById("result").innerHTML = "⏳ Processing...";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Server error: " + response.status);
        }

        const data = await response.json();

        document.getElementById("result").innerHTML = `
            <h3>Result</h3>
            <p><b>Severity:</b> ${data.flood_severity}</p>
            <p><b>Flood Ratio:</b> ${data.flooded_area_ratio}</p>
            <p><b>Resources:</b> ${data.recommended_resources.join(", ")}</p>
        `;

    } catch (error) {
        document.getElementById("result").innerHTML =
            "❌ Error connecting to backend<br>" + error.message;
    }
});
