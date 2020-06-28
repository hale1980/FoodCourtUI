const products = [];
const cart = [];

const images = [
    'https://images.foody.vn/res/g74/732906/prof/s640x400/foody-upload-api-foody-mobile-feature-restaurant-b-180418101839.jpg',
    'https://images.foody.vn/res/g2/13831/prof/s640x400/foody-upload-api-foody-mobile-bmi-huynh-hoa-190924151516.jpg',
    'https://images.foody.vn/res/g20/190702/prof/s640x400/foody-mobile-banh-mi-ltt-jpg-693-636422152022031221.jpg',
    'https://images.foody.vn/res/g2/12839/prof/s640x400/foody-mobile-8y1dwo0t-jpg-133-636003682444293190.jpg',
    'https://images.foody.vn/res/g4/38552/prof/s640x400/foody-mobile-banh-mi1_kajm-jpg-954-636243938301160277.jpg',
    'https://images.foody.vn/res/g80/794391/prof/s640x400/foody-upload-api-foody-mobile-10-190314082605.jpg',
    'https://images.foody.vn/res/g74/736328/prof/s640x400/foody-upload-api-foody-mobile-1a-200612210616.jpg',
    'https://images.foody.vn/res/g4/32218/prof/s640x400/foody-mobile-banh-mi-tuan-map-tp-hcm.jpg',
    'https://images.foody.vn/res/g90/899822/prof/s640x400/foody-upload-api-foody-mobile-4-190627140327.jpg',
    'https://images.foody.vn/res/g4/36872/prof/s640x400/foody-mobile-banh-mi-nuong-xoay-tp-hcm.jpg',
    'https://images.foody.vn/res/g5/41612/prof/s640x400/foody-mobile-banh-mi-110-jpg-122-636355375338052015.jpg',
    'https://images.foody.vn/res/g13/129725/prof/s640x400/foody-mobile-foody-quan-co-3-hau--960-635652896252263911.jpg'
 ];

// map product with image
function getProducts() {
    let id = 1;
     let price = 8;
     for(let img of images) {
         let product = {};
         product.id = id;
         product.name = "Banh my " + id.toString();
         product.img = img;
         product.price = price;

         products.push(product);
         price += 1;
         id += 1;
     }
}
getProducts();


// render products
 function renderProducts() {
     
     let content = '';
     for(let product of products) {
         content += `<div class="food-item">
         <img src="${product.img}"
             alt="banh my" />
         <h3>${product.name}</h3>
         <h6>Giá: ${product.price}K</h6>
         <button type="button" class="btn btn-warning" onclick='addToCart((${product.id}))'>Thêm vào giỏ hàng</button>
     </div>`
     }
     document.getElementById('foodlist').innerHTML = content;
 }

 // add product to cart 
 function addToCart(id) {
    let product = products.find(item => item.id == id);
    cart.push(product);
    document.getElementById('item-number').innerHTML = cart.length;
 }

 // show items in cart
 function showCart() {
     let cartContent = '';
     if(cart.length == 0) cartContent = `<p>You have no products in cart!</p>`;
     else {
         cartContent += `<table class="table table-striped"><thead>
            <tr>
                <th scope="col">Order</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
            </tr></thead>
                <tbody>`
            let totalPrice = 0;
            let index = 1;
            for(let product of cart) {
                cartContent += `<tr>
                        <td scope="row">${index}</td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                    </tr>`
                totalPrice += product.price;
                index += 1;
            }
            cartContent += `<tr>
                    <td></td>
                    <td>Total:</td>
                    <td>${totalPrice}</td>
                </tr></tbody> 
                    </table>`
     }
     document.getElementById('cart-body').innerHTML = cartContent;
 }
 // function call
 renderProducts();
