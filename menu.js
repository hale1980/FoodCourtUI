const products = {
    'banhmy': [
        {
            'id': 1,
            'name': 'Banh my 1',
            'img': 'https://images.foody.vn/res/g74/732906/prof/s640x400/foody-upload-api-foody-mobile-feature-restaurant-b-180418101839.jpg',
            'price': 10
        },
        {
            'id': 2,
            'name': 'Banh my 2',
            'img': 'https://images.foody.vn/res/g2/13831/prof/s640x400/foody-upload-api-foody-mobile-bmi-huynh-hoa-190924151516.jpg',
            'price': 11
        },
        {
            'id': 3,
            'name': 'Banh my 3',
            'img': 'https://images.foody.vn/res/g20/190702/prof/s640x400/foody-mobile-banh-mi-ltt-jpg-693-636422152022031221.jpg',
            'price': 12
        },
        {
            'id': 4,
            'name': 'Banh my 4',
            'img': 'https://images.foody.vn/res/g2/12839/prof/s640x400/foody-mobile-8y1dwo0t-jpg-133-636003682444293190.jpg',
            'price': 13
        },
        {
            'id': 5,
            'name': 'Banh my 5',
            'img':  'https://images.foody.vn/res/g80/794391/prof/s640x400/foody-upload-api-foody-mobile-10-190314082605.jpg',
            'price': 14
        }
    ],
    'trasua': [
        {
            'id': 6,
            'name': 'Tra sua 1',
            'img': 'https://images.foody.vn/res/g11/100592/prof/s640x400/foody-upload-api-foody-mobile-9-200116144432.jpg',
            'price': 20
        },
        {
            'id': 7,
            'name': 'Tra sua 2',
            'img': 'https://images.foody.vn/res/g10/93932/prof/s640x400/foody-mobile-bon-bon-mb-jpg-144-636017608661919382.jpg',
            'price': 21
        },
        {
            'id': 8,
            'name': 'Tra sua 3',
            'img': 'https://images.foody.vn/res/g12/117490/prof/s640x400/foody-upload-api-foody-mobile-ba01-200330135041.jpg',
            'price': 23
        },
        {
            'id': 9,
            'name': 'Tra sua 4',
            'img': 'https://images.foody.vn/res/g5/49982/prof/s640x400/foody-upload-api-foody-mobile-32-jpg-181101143502.jpg',
            'price': 23
        },
        {
            'id': 10,
            'name': 'Tra sua 5',
            'img': 'https://images.foody.vn/res/g71/706477/prof/s640x400/foody-upload-api-foody-mobile-hmb-200406102427.jpg',
            'price': 24
        }
    ],
    'pizza': [
        {
            'id': 11,
            'name': 'Pizza 1',
            'img': 'https://images.foody.vn/res/g25/248045/prof/s640x400/foody-upload-api-foody-mobile-15-200720102522.jpg',
            'price': 24
        },
        {
            'id': 12,
            'name': 'Pizza 2',
            'img': 'https://images.foody.vn/res/g10/90677/prof/s640x400/foody-upload-api-foody-mobile-dsc08933-200417111250.jpg',
            'price': 24
        }
    ],
    'khac': [
        {
            'id': 13,
            'name': 'Banh xeo',
            'img': 'https://images.foody.vn/res/g91/904784/prof/s640x400/foody-upload-api-foody-mobile-quang-ngai-190927140352.jpg',
            'price': 15
        },
        {
            'id': 14,
            'name': 'Com tam',
            'img': 'https://images.foody.vn/res/g12/112845/prof/s640x400/foody-mobile-foody-quan-an-30-com-485-635971740085707322.jpg',
            'price': 30
        },
        {
            'id': 15,
            'name': 'Com trung',
            'img': 'https://images.foody.vn/res/g72/716587/prof/s640x400/foody-mobile-t8-jpg.jpg',
            'price': 20
        }
    ]
};

const cart = [];
const category = ['banhmy', 'trasua', 'pizza', 'khac']

// render products
function renderProducts() {
    let content = '';

    for (let type in products) {
        content += `<div class='food-list'>`
        for (let product of products[type]) {
            
                content += `<div class="food-item">
             <img src="${product.img}"
                 alt="banh my" />
             <h3>${product.name}</h3>
             <h6>Giá: ${product.price}K</h6>
             <button type="button" class="btn btn-warning" onclick='addToCart((${product.id}))'>Thêm vào giỏ hàng</button>
         </div>`
        }
        content += `</div>`;
    }

    document.getElementById('foodlist').innerHTML = content;
}

// add product to cart 
function addToCart(id) {
    let product ;
    for(let type of category) {
         product = products[type].find(item => item.id == id);
         if(product) break;
    }
    
    let productInCart = Object.assign({}, product);
    productInCart.orderId = Math.round(Math.random() * 100000000);

    if (!cart.find(item => item.id == id)) {
        productInCart.quantity = 1;
        cart.push(productInCart);
    } else {
        cart.find(item => {
            if (item.id == id) item.quantity += 1;
        });
    }
    let itemNumber = document.getElementById('item-number');
    if (cart.length == 0) itemNumber.style.display = 'none';
    else {
        itemNumber.style.display = '';
        itemNumber.innerHTML = cart.length;
    }
}

// show items in cart
function showCart() {

    let cartContent = '';
    if (cart.length == 0) cartContent = `<p>You have no products in cart!</p>`;
    else {
        cartContent += `<table class="table table-striped"><thead class=' table-header'>
            <tr>
                <th scope="col">Order</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col"></th>
            </tr></thead>
                <tbody>`
        let totalPrice = 0;
        let index = 1;
        for (let product of cart) {
            let plusBtn = ` <button type="button" class="btn btn-success modify-btn" onclick='handlePlus(${product.id})'>
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4a.5.5 0 0 0-1 0v3.5H4a.5.5 0 0 0 0 1h3.5V12a.5.5 0 0 0 1 0V8.5H12a.5.5 0 0 0 0-1H8.5V4z"/>
                </svg></button>
            `
            let minusBtn = `<button type="button" class="btn btn-success minus-btn" onclick='handleMinus(${product.id})'>
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-dash-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4 7.5a.5.5 0 0 0 0 1h8a.5.5 0 0 0 0-1H4z"/>
            </svg></button>
                `
            cartContent += `<tr>
                        <td scope="row">#${product.orderId}</td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td>${plusBtn}
                        <span>${product.quantity}</span>
                        ${minusBtn}</td>
                        <td><button type="button" class="btn btn-danger" onclick='handleRemove(${product.id})'>Remove from cart</button></td>
                    </tr>`
            totalPrice += product.price * product.quantity;
            index += 1;
        }
        cartContent += `<tr>
                    <td></td>
                    <td>Total:</td>
                    <td>${totalPrice}</td>
                    <td>VND</td>
                </tr></tbody> 
                    </table>`
    }
    document.getElementById('cart-body').innerHTML = cartContent;
}

// decrease number of items in cart
function handleMinus(id) {
    let product = cart.find(item => item.id == id);
    product.quantity--;
    if (product.quantity == 0) {
        let index = cart.findIndex(item => item.id == id);
        cart.splice(index, 1);
    }

    let itemNumber = document.getElementById('item-number');
    if (cart.length == 0) itemNumber.style.display = 'none';
    else {
        itemNumber.style.display = '';
        itemNumber.innerHTML = cart.length;
    }
    showCart();
}

// increase number of items in cart
function handlePlus(id) {
    let product = cart.find(item => item.id == id);
    if (product) {
        product.quantity++;
    }

    let itemNumber = document.getElementById('item-number');
    if (cart.length == 0) itemNumber.style.display = 'none';
    else {
        itemNumber.style.display = '';
        itemNumber.innerHTML = cart.length;
    }
    showCart();
}

// remove item from cart
function handleRemove(id) {
    let index = cart.findIndex(item => item.id == id);
    cart.splice(index,1);
    let itemNumber = document.getElementById('item-number');
    if (cart.length == 0) itemNumber.style.display = 'none';
    else {
        itemNumber.style.display = '';
        itemNumber.innerHTML = cart.length;
    }
    showCart();
}


// render products 
renderProducts();
