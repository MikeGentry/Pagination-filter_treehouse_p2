const pageList = document.querySelector('ul');
const eachStudent = pageList.children;
const buttonDiv = document.querySelector('.pagination');
const buttonUl = buttonDiv.querySelector('ul');
const studentsPerPage = 10;
const searchDiv = document.querySelector('.student-search');
const noResultDiv = document.querySelector('.no-result');

// Function to determine number of pages based on number of students
function numberOfPages() {
    let pages = Math.ceil(eachStudent.length / studentsPerPage);
    return pages;
}

// Loop to create page buttons based on number of required pages
for (let i = 1; i <= numberOfPages(); i++) {
    let pageli = document.createElement('li');
    let pageLink = document.createElement('a');
    pageLink.className = 'active';
    pageLink.href = '#';
    pageLink.textContent = i;
    buttonUl.appendChild(pageli);
    pageli.appendChild(pageLink);
}

// Function to automatically show first ten students when page loads
function showFirstTen() {
    for (let i = 0; i < eachStudent.length; i++) {
        if (i < studentsPerPage) {
            eachStudent[i].style.display = '';
        } else {
            eachStudent[i].style.display = 'none';
        }
    }
}

// Function to display search box dynamically
let searchInput = document.createElement('input');
let searchButton = document.createElement('button');
function showSearch() {
    searchInput.placeholder = 'Search for students...';
    searchButton.textContent = 'Search';
    searchDiv.appendChild(searchInput);
    searchDiv.appendChild(searchButton);
}

// Event listener for search box functionality
// Array to hold number of hidden students
const searchResults = [];
searchButton.addEventListener('click', () => {
    let filter = searchInput.value.toLowerCase();
    searchResults.length = 0;
    for (let i = 0; i < eachStudent.length; i++) {
        if (eachStudent[i].innerHTML.indexOf(filter) > -1) {
            eachStudent[i].style.display = '';
            
        } else {
            eachStudent[i].style.display = 'none';
            searchResults.push(i);
        }   
    }
    // If all students are hidden, a 'no results' message is displayed
    if (searchResults.length === eachStudent.length) {
        noResultDiv.innerHTML = '<h1>No Results</h1>';
    } else {
        noResultDiv.innerHTML = ''; 
    }
});

// Event listener to divide students between pages
buttonDiv.addEventListener('click', (event) => {
    noResultDiv.innerHTML = ''; 
    let buttonNumber = parseInt(event.target.textContent);
    let max = buttonNumber * 10; 
    let min = max - 10;
    for (let i = 0; i < eachStudent.length; i++) {
        if (i >= min && i < max) {
            eachStudent[i].style.display = '';
        }  else {
            eachStudent[i].style.display = 'none';
        }
    }    
});

// Function call to display first ten students on load
showFirstTen();

// Function call to show search box if JavaScript is enabled
showSearch();
