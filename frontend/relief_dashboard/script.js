const API_URL = "https://a831-34-106-180-35.ngrok-free.app";

const NGROK_HEADERS = {
    "ngrok-skip-browser-warning": "true"
};

async function fetchAssignedReports() {
    try {
        const res = await fetch(`${API_URL}/reports/assigned`, {
            headers: NGROK_HEADERS
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        populateTable(data);

    } catch (err) {
        console.error(err);
        alert("Backend not reachable");
    }
}

function populateTable(reports) {
    const tbody = document.querySelector("#reportsTable tbody");
    tbody.innerHTML = "";

    if (reports.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9">No assigned reports</td></tr>`;
        return;
    }

    reports.forEach(r => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${r.id}</td>
            <td>${r.area}</td>
            <td>${r.people_affected}</td>
            <td>${r.citizen_message}</td>
            <td>${r.flood_severity}</td>
            <td>${Number(r.flooded_area_ratio).toFixed(2)}</td>
            <td>${r.recommended_resources}</td>
            <td>${r.report_status}</td>
            <td>
                <button onclick="completeReport(${r.id})">
                    Complete
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function completeReport(id) {
    if (!confirm("Mark this report as Completed?")) return;

    try {
        await fetch(`${API_URL}/reports/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...NGROK_HEADERS
            },
            body: JSON.stringify({ id, status: "Completed" })
        });

        fetchAssignedReports();

    } catch (err) {
        console.error(err);
        alert("Update failed");
    }
}

document.getElementById("refreshBtn").onclick = fetchAssignedReports;
fetchAssignedReports();
