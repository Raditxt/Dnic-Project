document.addEventListener("DOMContentLoaded", () => {
    const userId = 1; // Ganti dengan ID user yang sesuai (misalnya dari session)
    const cartTableBody = document.querySelector(".table tbody");
    const cartSubtotal = document.querySelector(".cart-page-total ul li:nth-child(1) span");
    const cartTotal = document.querySelector(".cart-page-total ul li:nth-child(2) span");
    const clearCartButton = document.querySelector(".tp-btn[name='update_cart']");
  
    // Fetch data keranjang dari API
    const fetchCart = async () => {
      try {
        const response = await fetch(`/cart/${userId}`);
        const cartItems = await response.json();
  
        if (response.ok) {
          renderCart(cartItems);
          calculateTotals(cartItems);
        } else {
          console.error(cartItems.message);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
  
    // Render data keranjang ke tabel
    const renderCart = (cartItems) => {
      cartTableBody.innerHTML = ""; // Kosongkan tabel
      cartItems.forEach((item) => {
        const row = document.createElement("tr");
  
        row.innerHTML = `
          <td class="product-thumbnail">
            <a href="product-details.html"><img src="${item.product.image_url}" alt="${item.product.name}" /></a>
          </td>
          <td class="product-name">
            <a href="product-details.html">${item.product.name}</a>
          </td>
          <td class="product-price">
            <span class="amount">$${item.product.price.toFixed(2)}</span>
          </td>
          <td class="product-quantity text-center">
            <div class="tp-shop-quantity">
              <div class="tp-quantity">
                <div class="qty_button cart-minus" data-id="${item.id}">
                  <i class="fal fa-minus"></i>
                </div>
                <input type="text" value="${item.quantity}" readonly />
                <div class="qty_button cart-plus" data-id="${item.id}">
                  <i class="fal fa-plus"></i>
                </div>
              </div>
            </div>
          </td>
          <td class="product-subtotal">
            <span class="amount">$${item.subtotal.toFixed(2)}</span>
          </td>
          <td class="product-remove">
            <a href="#" data-id="${item.id}" class="remove-item"><i class="fa fa-times"></i></a>
          </td>
        `;
  
        cartTableBody.appendChild(row);
      });
      addEventListeners();
    };
  
    // Hitung subtotal dan total
    const calculateTotals = (cartItems) => {
      const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
      cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
      cartTotal.textContent = `$${subtotal.toFixed(2)}`;
    };
  
    // Tambahkan event listener untuk tombol di keranjang
    const addEventListeners = () => {
      document.querySelectorAll(".cart-minus").forEach((btn) => {
        btn.addEventListener("click", () => updateQuantity(btn.dataset.id, -1));
      });
  
      document.querySelectorAll(".cart-plus").forEach((btn) => {
        btn.addEventListener("click", () => updateQuantity(btn.dataset.id, 1));
      });
  
      document.querySelectorAll(".remove-item").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          removeFromCart(btn.dataset.id);
        });
      });
    };
  
    // Update kuantitas item di keranjang
    const updateQuantity = async (cartId, change) => {
      try {
        const quantityInput = document.querySelector(`.cart-plus[data-id="${cartId}"]`).previousElementSibling;
        let newQuantity = parseInt(quantityInput.value) + change;
  
        if (newQuantity < 1) newQuantity = 1;
  
        const response = await fetch(`/cart/${cartId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: newQuantity }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          fetchCart();
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    };
  
    // Hapus item dari keranjang
    const removeFromCart = async (cartId) => {
      try {
        const response = await fetch(`/cart/${cartId}`, { method: "DELETE" });
        const result = await response.json();
  
        if (response.ok) {
          fetchCart();
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    };
  
    // Hapus semua item di keranjang
    const clearCart = async () => {
      try {
        const response = await fetch(`/cart/clear/${userId}`, { method: "DELETE" });
        const result = await response.json();
  
        if (response.ok) {
          fetchCart();
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    };
  
    // Event listener untuk tombol clear cart
    clearCartButton.addEventListener("click", (e) => {
      e.preventDefault();
      clearCart();
    });
  
    // Panggil fungsi untuk pertama kali
    fetchCart();
  });
  