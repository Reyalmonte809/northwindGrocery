document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId) {
        window.location.href = 'index.html';
        return;
    }

    const productDetails = document.getElementById('productDetails');
    const product = await fetchProductDetails(productId);
    displayProductDetails(product);

    async function fetchProductDetails(id) {
        const response = await fetch(`http://localhost:8081/api/products/${id}`);
        return response.json();
    }

    function displayProductDetails(product) {
        productDetails.innerHTML = `
            <div>
                <h2>${product.productName}</h2>
                <p>ID: ${product.productId}</p>
                <p>Price: $${Number(product.unitPrice).toFixed(2)}</p>
                <p>Units in Stock: ${product.unitsInStock}</p>
                <p>Supplier: ${product.supplier}</p>
            </div>
        `;
    }
});