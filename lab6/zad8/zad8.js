let extractedData;
const itemsPerPage = 10; // How many items per page - 10 looks optimal
document.addEventListener('DOMContentLoaded', () => {
    fetch('files/all.json')
        .then(response => response.json())
        .then(data => {
            extractedData = data.map(item => ({
                // check for undefineds, also convert to strings for comparison
                Name: item.name.common,
                Capital: (Array.isArray(item.capital) ? item.capital[0] : item.capital) ? (Array.isArray(item.capital) ? item.capital[0] : item.capital) : 'No capital',
                Population: item.population ? String(item.population) : '0',
                Area: item.area ? String(item.area) : '0',
                Subregion: item.subregion ? item.subregion : 'Undefined subregion'
            }));
            const sortedData = sortData(extractedData);
            createTableHeader(sortedData);
            populateTable(sortedData);
            generatePagination();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

// INITIALIZATION
const tableBody = document.getElementById('myTableBody');
const pagination = document.getElementById('pagination');
let currentPage = 1;

function createTableHeader(data) {
    const headerRow = document.createElement('tr');
    const keys = Object.keys(data[0]);
    keys.forEach((key, index) => {
        const th = document.createElement('th');

        const input = document.createElement('input');
        
        input.type = 'text';
        input.class= 'form-control';
        input.placeholder = key;
        input.oninput = function() {
            filterTable(index, this.value);
        };
        input.onclick = (event) => event.stopPropagation();
        
        th.textContent = key;
        th.insertBefore(input, th.firstChild);
        
        th.onclick = () => sortTable(index); // Change this line

        const i = document.createElement('i');
        i.classList.add('fas', 'fa-sort-down', 'ml-1');
        th.appendChild(i);

        headerRow.appendChild(th);
    });
    tableBody.appendChild(headerRow);
}

// Fills the table with data
function populateTable(data) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedData = data.slice(startIndex, endIndex);
    // tableBody.innerHTML = '';
    for (let i = tableBody.rows.length - 1; i > 0; i--) {
        tableBody.deleteRow(i);
    }
    const keys = Object.keys(data[0]);

    // Create table body
    slicedData.forEach(item => {
        const row = document.createElement('tr');
        keys.forEach(key => {
            const td = document.createElement('td');
            td.textContent = item[key];
            row.appendChild(td);
        });
        tableBody.appendChild(row);
    });
}

// Generate the pagination
function generatePagination() {
    pagination.innerHTML = '';

    const totalPages = Math.ceil(extractedData.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        li.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
        if (i === currentPage) {
            li.classList.add('active');
        }
        pagination.appendChild(li);
    }
}

// Change the page when clicking on pagination
function changePage(page) {
    currentPage = page;
    const sortedData = sortData(extractedData);
    populateTable(sortedData);
    generatePagination();
}

// Sort the table by column index
function sortTable(columnIndex) {
    sortAscending = (columnIndex === lastSorted) && (sortAscending === true)  ? false : true; 
    const sortedData = extractedData.slice().sort((a, b) => {
        const keyA = Object.values(a)[columnIndex];
        const keyB = Object.values(b)[columnIndex];
        if (!sortAscending) {
            return keyB.localeCompare(keyA, undefined, { numeric: true, sensitivity: 'base' });
        }
        return keyA.localeCompare(keyB, undefined, { numeric: true, sensitivity: 'base' });
    });
    lastSorted = columnIndex;
    populateTable(sortedData);
    generatePagination();
}

let lastSorted = 0;
let sortAscending = true;
// Sorts data, by default it sorts by first column (so after launching the page, everything is sorted by name)
function sortData(data) {
    if (lastSorted !== null) {
        const columnIndex = lastSorted;
        const sortOrder = sortAscending ? 1 : -1;

        return data.slice().sort((a, b) => {
            const keyA = Object.values(a)[columnIndex];
            const keyB = Object.values(b)[columnIndex];
            
            return sortOrder * keyA.localeCompare(keyB, undefined, { numeric: true, sensitivity: 'base' });
        });
    }

    return data;
}

let currentFilters = Array(5).fill('');
// Filters the table by column index and value
function filterTable(columnIndex, value) {
    value = String(value);
    currentFilters[columnIndex] = value.toLowerCase();
    applyFilters();
    generatePagination();
}

// Array of filters
function applyFilters() {
    const filteredData = extractedData.filter(item => {
        return currentFilters.every((filter, index) => {
            return filter === '' || item[Object.keys(item)[index]].toLowerCase().includes(filter);
        });
    });

    const sortedData = sortData(filteredData);
    populateTable(sortedData);
}