let allProducts = []; // To store all fetched products
let displayedProducts = 3; // Initial number of products to display
const productTableBody = document.getElementById('product-body');
const loadMoreButton = document.getElementById('load-more-btn');

// Function to fetch products
function fetchProducts() {
    fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => {
        allProducts = data;
        displayProducts(displayedProducts);
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });
}

// Function to display products in table format
function displayProducts(num) {
    productTableBody.innerHTML = '';

    const productsToShow = allProducts.slice(0, num);

    productsToShow.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>$${product.price}</td>
            <td><img src="${product.image}" alt="${product.title}" style="width: 100px; height: auto;"></td>
        `;
        productTableBody.appendChild(row);
    });

    // Show or hide the "Load More" button based on remaining products
    if (displayedProducts < allProducts.length) {
        loadMoreButton.style.display = 'block';
    } else {
        loadMoreButton.style.display = 'none';
    }
}

// Function to load more products
function loadMoreProducts() {
    displayedProducts += 3; 
    displayProducts(displayedProducts);
}

fetchProducts();
