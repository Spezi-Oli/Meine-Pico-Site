document.addEventListener("DOMContentLoaded", () => {
    createTableRows();
});

function createTableRows() {
    const categories = [
        "1er", "2er", "3er", "4er", "5er", "6er", "Glückszahl",
        "Zwi. Summe", "63+35", "Ein Paar", "Zwei Paar", "Drei Gleiche", "Vier Gleiche",
        "Full House", "Gerade", "Ungerade", "Kl. Straße", "Gr. Straße", "Kniffel", "Chance",
        "Ges. Summe"
    ];

    const tbody = document.getElementById("table-body");

    categories.forEach(category => {
        let row = document.createElement("tr");
        let categoryCell = document.createElement("td");
        categoryCell.textContent = category;
        row.appendChild(categoryCell);

        for (let i = 0; i < 4; i++) {
            let cell = document.createElement("td");
            cell.setAttribute("contenteditable", "true");
            cell.oninput = () => calculateSums();
            row.appendChild(cell);
        }

        tbody.appendChild(row);
    });
}

function calculateSums() {
    let table = document.querySelector("table");
    let rows = table.querySelectorAll("tbody tr");
    let numPlayers = table.rows[0].cells.length - 1;

    for (let p = 1; p <= numPlayers; p++) {
        let sum = 0;
        for (let i = 0; i <= 6; i++) {
            sum += parseInt(rows[i].cells[p].textContent) || 0;
        }
        rows[7].cells[p].textContent = sum;  

        let bonus = sum > 62 ? sum + 35 : sum;
        rows[8].cells[p].textContent = bonus;

        let grandSum = bonus;
        for (let i = 9; i < rows.length - 1; i++) {
            grandSum += parseInt(rows[i].cells[p].textContent) || 0;
        }
        rows[rows.length - 1].cells[p].textContent = grandSum;
    }
}

function clearTable() {
    document.querySelectorAll("td[contenteditable=true]").forEach(cell => {
        cell.textContent = "";
    });
}