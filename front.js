document.addEventListener('DOMContentLoaded', () =>{
    const addToCartButtons = document.querySelectorAll('.btn');
    const cartItemCount = document.querySelector('.nav-cart span');
    const cartItemList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.nav-cart');
    const sidebar = document.getElementById('sidebar');
    const closeButtton = document.querySelector('.sidebar-close');

    let cartItems = [];
    let itemCount = 0;
    let totalAmount = 0;

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const item = {
                name: document.querySelectorAll('.products .title')[index].textContent,
                price: parseFloat(
                    document.querySelectorAll('.price')[index].textContent.slice(1),
                ),
                quantity: 1,
            };

            const existingItem = cartItems.find(
                (cartItem) => cartItem.name === item.name,
            );
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push(item);
            }

            totalAmount += item.price;

            updateCartUI();
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
                <span>(${item.quantity}x)${item.name}</span>
                <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                 <button class="remove-btn" data-index="${index}">
                    <i class="fa-solid fa-times"></i>
                 </button>
                `;

                cartItemList.appendChild(cartItem);
            });

            const removeButtons = document.querySelectorAll('.remove-btn');
            removeButtons.forEach((button) => {
                button.addEventListener('click', (event) => {
                    const index = event.target.closest('.remove-btn').dataset.index;
                    removeItemFromCart(index);
                    
                });
            });
        }

        function removeItemFromCart(index) {
            const removeItem = cartItems.splice(index, 1)[0];
            totalAmount -= removeItem.price * removeItem.quantity;
            updateCartUI()
            
        }
        
        function updateCartTotal() {
            cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
        }

        cartIcon.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        closeButton.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    });
});