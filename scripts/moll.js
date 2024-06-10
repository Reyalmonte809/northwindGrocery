document.addEventListener('DOMContentLoaded', () => {
    const searchType = document.getElementById('searchType');
    const categorySection = document.getElementById('categorySection');
    const categorySelect = document.getElementById('category');
    const productsSection = document.getElementById('products');

    searchType.addEventListener('change', async () => {
        const value = searchType.value;
        productsSection.innerHTML = '';

        if (value === 'all') {
            const products = await fetchProducts();
            displayProducts(products);
        }
        else if (value === 'category') {
            categorySection.style.display = 'block';
            const categories = await fetchCategories();
            populateCategories(categories);
        }
        else {
            categorySection.style.display = 'none';
        }
    });

    categorySelect.addEventListener('change', async () => {
        const category = categorySelect.value;
        const products = await fetchProductsByCategory(category);
        displayProducts(products);
    });

    async function fetchProducts() {
        const response = await fetch('http://localhost:8081/api/products');
        return response.json();
    }

    async function fetchCategories() {
        const response = await fetch('http://localhost:8081/api/categories');
        return response.json();
    }

    async function fetchProductsByCategory(categoryId) {
        const response = await fetch('http://localhost:8081/api/products');
        const products = await response.json();
        return products.filter(product => product.categoryId === categoryId);
    }

    function displayProducts(products) {
        productsSection.innerHTML = products.map(product => `
            <div>
                <h2>${product.productName}</h2>
                <p>ID: ${product.productId}</p>
                <p>Price: $${Number(product.unitPrice).toFixed(2)}</p>
                <a href="details.html?id=${product.productId}">See details</a>
            </div>
        `).join('');
    }

    function populateCategories(categories) {
        categorySelect.innerHTML = categories.map(category => `
            <option value="${category.categoryId}">${category.name}</option>
        `).join('');
    }
});