document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.btn');
    const cartItemCount = document.querySelector('.nav-cart span');
    const cartItemList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.nav-cart');
    const sidebar = document.getElementById('sidebar');
    const closeButton = document.querySelector('.sidebar-close');

    let cartItems = [];

    sidebar.style.display = 'none';

    cartIcon.addEventListener('click', () => {
        sidebar.style.display = 'block'; // Show the cart sidebar
    });

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const name = document.querySelectorAll('.products .title')[index].textContent;
            const price = parseFloat(document.querySelectorAll('.price')[index].textContent.slice(1));

            const existingItem = cartItems.find((item) => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({ name, price, quantity: 1 });
            }

            updateCartUI();
        });
    });

    function updateCartUI() {
        updateCartItemCount(cartItems.length);
        updateCartItemList();
        updateCartTotal();
    }

    function updateCartItemCount(count) {
        cartItemCount.textContent = count;
    }

    function updateCartItemList() {
        cartItemList.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'individual-cart-item');
            cartItem.innerHTML = `
                <span>(${item.quantity}x) ${item.name}</span>
                <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-btn" data-index="${index}">
                    <i class="fa-solid fa-times"></i>
                </button>
            `;

            cartItemList.appendChild(cartItem);
        });

        document.querySelectorAll('.remove-btn').forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = event.currentTarget.dataset.index;
                removeItemFromCart(index);
            });
        });
    }

    function removeItemFromCart(index) {
        cartItems.splice(index, 1);
        updateCartUI();
    }

    function updateCartTotal() {
        const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
    }

    closeButton.addEventListener('click', () => {
        sidebar.style.display = 'none'; // Hide the cart sidebar

    });
});
