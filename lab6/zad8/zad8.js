let extractedData;
const itemsPerPage = 30; // How many items per page
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
        if (index==4) {
            return;
        }
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
    // Calculate start and end for slicing
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = data.slice(startIndex, endIndex);

    // Group data by subregion
    const groupedData = pageData.reduce((groups, item) => {
        const group = (groups[item.Subregion] || []);
        group.push(item);
        groups[item.Subregion] = group;
        return groups;
    }, {});

    // Clear the tableBody
    while (tableBody.rows.length > 1) {
        tableBody.deleteRow(1);
    }

    // For each subregion
    for (const subregion in groupedData) {
        // Create a new row and a cell for the accordion
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 4; // Make the cell as wide as 4 columns
        cell.className = 'remove-side-padding  header-bg pd-0';

        // Create a new accordion item
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';

        // Create a div for the accordion header
        const accordionHeader = document.createElement('div');
        accordionHeader.className = 'accordion-header pl-3 ';
        accordionHeader.style.width = '100%';

        // Initialize totalPopulation and totalArea
        let totalPopulation = 0;
        let totalArea = 0;

        // Calculate totalPopulation and totalArea
        groupedData[subregion].forEach((item) => {
            // convert item.Population to int
            totalPopulation += parseInt(item.Population);
            totalArea += parseInt(item.Area);
        });

        // Create new elements for subregion, totalPopulation and totalArea
        const subregionElement = document.createElement('div');
        const populationElement = document.createElement('div');
        const areaElement = document.createElement('div');

        // Set the text content of these elements
        subregionElement.textContent = `${subregion}`;
        subregionElement.style.float = 'left';
        subregionElement.style.flexBasis = '50%';
        populationElement.textContent = `${totalPopulation}`;
        populationElement.style.float = 'right';
        populationElement.style.flexBasis = '25%';
        areaElement.textContent = `${totalArea}   `;
        areaElement.style.float = 'right';
        areaElement.style.flexBasis = '25%';

        // Append these elements to accordionHeader
        accordionHeader.appendChild(subregionElement);
        accordionHeader.appendChild(populationElement);
        accordionHeader.appendChild(areaElement);

        // Create a table for the countries in this subregion
        const table = document.createElement('table');
        table.className = 'table table-bordered border fixed-layout no-left-border';
        table.style.display = 'none'; // Hide the table initially
        groupedData[subregion].forEach((item, index) => {
            const row = document.createElement('tr');
            row.className = 'accordion-row';
            Object.keys(item).forEach((key, index) => {
                if (index == 4) {
                    return;
                }
                const td = document.createElement('td');
                td.className = 'no-left-border';
                td.textContent = item[key];
                if (index === 0) {
                    row.className = 'no-left-border';
                }

                row.appendChild(td);
            });
            if (index % 2 === 0) {
                row.className += ' bg-white';
            }
            else {
                row.className += ' bg-light';
            }
            table.appendChild(row);
        });

        // Add an onclick event listener to the accordion header
        accordionHeader.onclick = () => {
            // Toggle the visibility of the table
            table.style.display = table.style.display === 'none' ? '' : 'none';
        };

        // Append the accordion header and the table to the accordion item
        accordionItem.appendChild(accordionHeader);
        accordionItem.appendChild(table);

        // Append the accordion item to the cell and the cell to the row
        cell.appendChild(accordionItem);
        row.appendChild(cell);

        // Append the row to the tableBody
        tableBody.appendChild(row);
    }
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
            if (/^\d+$/.test(filter))  {
                return Number(item[Object.keys(item)[index]]) >= Number(filter);
            } else {
                return filter === '' || item[Object.keys(item)[index]].toLowerCase().includes(filter);
            }
        });
    });

    const sortedData = sortData(filteredData);
    populateTable(sortedData);
}