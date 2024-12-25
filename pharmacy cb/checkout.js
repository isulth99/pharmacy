// Function to display cart items on the checkout page
function displayCartOnCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}'); // Retrieve cart data from localStorage
    const cartTableBody = document.querySelector("#summaryTable tbody");
    const grandTotalElement = document.getElementById("summaryGrandTotal");

    cartTableBody.innerHTML = ""; // Clear previous table rows
    let grandTotal = 0;

    // Loop through cart items and populate the table
    Object.entries(cart).forEach(([itemName, itemData]) => {
        const { price, quantity } = itemData;
        const total = price * quantity;
        grandTotal += total;

        const row = document.createElement("tr");
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
        const emptyRow = document.createElement("tr");
        emptyRow.innerHTML = `<td colspan="4">No items in the cart.</td>`;
        cartTableBody.appendChild(emptyRow);
    }
}

// Function to handle payment submission
function processPayment(event) {
    event.preventDefault();

    // Get form inputs
    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const card = document.getElementById("cardNumber").value.replace(/\s+/g, ""); // Remove spaces
    const expiry = document.getElementById("expiry").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    // Validate required fields
    if (!name || !address || !card || !expiry || !cvv) {
        alert("Please fill in all required fields.");
        return;
    }

    // Validate card number (16 digits)
    if (!/^\d{16}$/.test(card)) {
        alert("Please enter a valid 16-digit card number.");
        return;
    }

    // Payment successful
    alert("Thank you for your purchase! Your order will be delivered within 2-5 days.");

    // Clear cart after payment
    localStorage.removeItem("cart");

    // Redirect to confirmation page
    window.location.href = "confirmation.html";
}

// Attach event listener to the form
const checkoutForm = document.getElementById("paymentForm");
if (checkoutForm) {
    checkoutForm.addEventListener("submit", processPayment);
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", displayCartOnCheckout);
