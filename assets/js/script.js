// Wait for DOM to be fully loaded
// biome-ignore lint/complexity/useArrowFunction: <explanation>
document.addEventListener('DOMContentLoaded', function () {
        // Initialize variables
        const cartItems = [];
        let totalAmount = 0;

        // Cart functionality
        function addToCart(productId, price, name) {
            cartItems.push({ id: productId, price: price, name: name });
            totalAmount += price;
            updateCartDisplay();
        }

        function updateCartDisplay() {
            const cartCount = document.querySelector('.cart-count');
            const cartTotal = document.querySelector('.cart-total');

            if (cartCount) cartCount.textContent = cartItems.length;
            if (cartTotal) cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
        }

        // Product filters
        function filterProducts(category) {
            const products = document.querySelectorAll('.product');
            for (const product of products) {
                if (category === 'all' || product.dataset.category === category) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            }
        }

        // Search functionality
        function searchProducts(query) {
            const products = document.querySelectorAll('.product');
            for (const product of products) {
                const productName = product.querySelector('.product-name').textContent.toLowerCase();
                if (productName.includes(query.toLowerCase())) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            }
        }

        // Event listeners
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => searchProducts(e.target.value));
        }

        // Add to cart buttons
        for (const button of document.querySelectorAll('.add-to-cart')) {
            button.addEventListener('click', function () {
                const product = this.closest('.product');
                const productId = product.dataset.id;
                const price = Number.parseFloat(product.dataset.price);
                const name = product.querySelector('.product-name').textContent;
                addToCart(productId, price, name);
            });
        }
    });