// Fungsi untuk mendapatkan data produk dari API
async function fetchProducts() {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const products = await response.json(); // Mendapatkan data produk dari API
  
      const productArea = document.getElementById('product-area');
      productArea.innerHTML = ''; // Reset konten area produk
  
      // Looping produk dan menambahkannya ke HTML
      products.forEach(product => {
        const productElement = `
          <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 wow tpfadeUp" data-wow-duration=".3s" data-wow-delay=".6s">
            <div class="tpproduct text-center mb-50">
              <div class="tpproduct__img">
                <img class="w-100" src="http://localhost:5000${product.image_url}" alt="${product.name}" />
                <div class="tp-product-icon">
                  <a href="#" class="add-to-cart" data-id="${product.id}">
                    <i class="fal fa-shopping-basket"></i>
                  </a>
                  <a href="shop-details.html"><i class="fal fa-heart"></i></a>
                </div>
              </div>
              <div class="tpproduct__meta">
                <h4 class="tp-product-title"><a href="shop-details.html">${product.name}</a></h4>
                <span>$${product.price}</span>
              </div>
            </div>
          </div>
        `;
        productArea.innerHTML += productElement;
      });
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  }
  
  // Event delegation untuk tombol Add to Cart
  document.getElementById('product-area').addEventListener('click', async event => {
    if (event.target.closest('.add-to-cart')) {
      event.preventDefault(); // Mencegah reload halaman
      const button = event.target.closest('.add-to-cart');
      const productId = button.getAttribute('data-id'); // Ambil ID produk
      const userId = 1; // Contoh ID user, sesuaikan dengan sistem autentikasi Anda
  
      try {
        const response = await fetch('http://localhost:5000/api/cart/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: productId,
            userId: userId,
            quantity: 1, // Default quantity 1
          }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert('Produk berhasil ditambahkan ke keranjang!');
        } else {
          alert(result.message || 'Gagal menambahkan produk ke keranjang.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });
  
  // Panggil fungsi fetchProducts saat halaman dimuat
  window.onload = fetchProducts;
  