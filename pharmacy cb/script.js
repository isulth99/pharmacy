// Object to store cart items
let cart = {};

// Prices for each medicine
const prices = {
    Paracetamol: 12.74,
    Ibuprofen: 4.48,
    Aspirin: 6.30,
    Codeine: 10.00,
    Diclofenac: 8.20,
    Ketorolac: 7.50,
    Amoxicillin: 15.00,
    Ciprofloxacin: 18.00,
    Doxycycline: 22.50,
    Azithromycin: 25.00,
    Metronidazole: 10.00,
    Clarithromycin: 20.00,
    Fluoxetine: 12.00,
    Sertraline: 14.00,
    Citalopram: 10.00,
    Escitalopram: 13.00,
    Duloxetine: 15.00,
    Amitriptyline: 8.00,
    Loratadine: 5.00,
    Cetirizine: 6.00,
    Fexofenadine: 7.00,
    Diphenhydramine: 4.00,
    Amlodipine: 10.00,
    Enalapril: 12.00,
    Losartan: 8.00,
    Valsartan: 15.00,
    Metoprolol: 9.00,
    Atenolol: 7.00,
};

// Function to add an item to the cart
function addToCart(itemName, itemPrice, element) {
    const quantityInput = element.parentElement.querySelector('.quantity-input');
    const quantity = parseInt(quantityInput.value, 10);

    if (!quantity || quantity <= 0) {
        alert('Please enter a valid quantity.');
        return;
    }

    // Update cart object
    if (cart[itemName]) {
        cart[itemName].quantity += quantity;
    } else {
        cart[itemName] = {
            price: itemPrice,
            quantity: quantity,
        };
    }

    // Update the cart display
    updateCartDisplay();
    alert(`${quantity} x ${itemName} added to the cart.`);
}
function toggleProducts(button) {
    const hiddenProducts = button.previousElementSibling;
    if (hiddenProducts.classList.contains('hidden-products')) {
        hiddenProducts.style.display = 'flex';
        hiddenProducts.classList.remove('hidden-products');
        button.textContent = 'View Less';
    } else {
        hiddenProducts.style.display = 'none';
        hiddenProducts.classList.add('hidden-products');
        button.textContent = 'View More';
    }
}


// Function to update the cart display
function updateCartDisplay() {
    const cartTableBody = document.querySelector('#cartTable tbody');
    const grandTotalElement = document.getElementById('grandTotal');
    cartTableBody.innerHTML = ''; // Clear previous cart items

    let grandTotal = 0;

    // Add each item in the cart to the table
    Object.entries(cart).forEach(([itemName, itemData]) => {
        const { price, quantity } = itemData;
        const total = price * quantity;
        grandTotal += total;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${itemName}</td>
            <td>${quantity}</td>
            <td>LKR ${price.toFixed(2)}</td>
            <td>LKR ${total.toFixed(2)}</td>
        `;
        cartTableBody.appendChild(row);
    });

    // Update grand total
    grandTotalElement.textContent = `LKR ${grandTotal.toFixed(2)}`;

    // If cart is empty, display a placeholder
    if (Object.keys(cart).length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `<td colspan="4">No items in the cart.</td>`;
        cartTableBody.appendChild(emptyRow);
    }
}

// Save Favorites
document.getElementById('saveFavorite').addEventListener('click', () => {
    if (Object.keys(cart).length === 0) {
        alert('Your cart is empty! Add some items before saving favorites.');
        return;
    }
    localStorage.setItem('cartFavorites', JSON.stringify(cart));
    alert('Favorites saved successfully!');
});

// Apply Favorites
document.getElementById('applyFavorite').addEventListener('click', () => {
    const favorites = JSON.parse(localStorage.getItem('cartFavorites') || '{}');
    if (Object.keys(favorites).length === 0) {
        alert('No saved favorites found!');
        return;
    }
    cart = favorites; // Replace cart with favorites
    updateCartDisplay();
    alert('Favorites applied successfully!');
});

// Redirect to Checkout Page
document.getElementById('buyNow').addEventListener('click', () => {
    if (Object.keys(cart).length === 0) {
        alert('Your cart is empty! Add some items before proceeding.');
        return;
    }

    // Save cart data to localStorage for the checkout page
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'checkout.html'; // Redirect to the checkout page
});