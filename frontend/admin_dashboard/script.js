const API_URL = "https://a831-34-106-180-35.ngrok-free.app"; // no slash at end

// Common headers required for ngrok
const NGROK_HEADERS = {
    "ngrok-skip-browser-warning": "true"
};

async function fetchReports() {
    try {
        const res = await fetch(`${API_URL}/reports`, {
            method: "GET",
            headers: {
                ...NGROK_HEADERS
            }
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch reports: ${res.status}`);
        }

        const data = await res.json();
        populateTable(data);

    } catch (err) {
        console.error("Fetch error:", err);
        alert("Backend not reachable or ngrok blocked the request");
    }
}

function populateTable(reports) {
    const tbody = document.querySelector("#reportsTable tbody");
    tbody.innerHTML = "";

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
              <button onclick="assignReport(${r.id})">Assign</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function assignReport(id) {
    const status = prompt("Enter status (Assigned / Completed)");
    if (!status) return;

    try {
        const res = await fetch(`${API_URL}/reports/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...NGROK_HEADERS
            },
            body: JSON.stringify({ id, status })
        });

        if (!res.ok) {
            throw new Error(`Update failed: ${res.status}`);
        }

        const result = await res.json();
        alert(result.message);

        // Refresh table
        fetchReports();

    } catch (err) {
        console.error("Update error:", err);
        alert("Update failed (check backend / ngrok)");
    }
}

// Button hook
document.getElementById("refreshBtn").onclick = fetchReports;

// Initial load
fetchReports();
