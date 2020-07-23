// products data
const products = [
    { id: 1, name: "Banh Mi 1", price: 10, img: "https://images.foody.vn/res/g13/129725/prof/s640x400/foody-mobile-foody-quan-co-3-hau--960-635652896252263911.jpg" },
    { id: 2, name: "Banh Mi 2", price: 12, img: "https://images.foody.vn/res/g2/13831/prof/s640x400/foody-upload-api-foody-mobile-bmi-huynh-hoa-190924151516.jpg" },
    { id: 3, name: "Banh Mi 3", price: 15, img: "https://images.foody.vn/res/g13/129725/prof/s640x400/foody-mobile-foody-quan-co-3-hau--960-635652896252263911.jpg" },
    { id: 4, name: "Banh Mi 4", price: 17, img: "https://images.foody.vn/res/g2/13831/prof/s640x400/foody-upload-api-foody-mobile-bmi-huynh-hoa-190924151516.jpg" },
    { id: 5, name: "Banh Mi 5", price: 17, img: "https://images.foody.vn/res/g13/129725/prof/s640x400/foody-mobile-foody-quan-co-3-hau--960-635652896252263911.jpg" },
    { id: 6, name: "Banh Mi 6", price: 11, img: "https://images.foody.vn/res/g2/13831/prof/s640x400/foody-upload-api-foody-mobile-bmi-huynh-hoa-190924151516.jpg" },
]

// render the product to the console
function renderProducts() {
    let content = "";
    for (let product of products) {
        content += `<div class="food-item">
<img src="${product.img}"
    alt="banh my" />
<h3>${product.name}</h3>
<h6>Giá: ${product.price}K</h6>
<button onclick="handleClickEdit(${product.id});" type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal">Chỉnh sửa thông tin</button>
<span><button type="button" class="btn btn-secondary" onclick='handleRemove(${product.id})'>Xóa món</button></span>
</div>`
    }
    document.querySelector('.food-list').innerHTML = content;
}

// get the value of the product and show in the form
function handleClickEdit(id) {
    resetForm('EDIT');
    let product = products.find(item => item.id == id);
    if (product) {
        document.getElementById('id').value = product.id;
        document.getElementById('name').value = product.name;
        document.getElementById('price').value = product.price;
    }
}

function handleRemove(id) {
    let index = products.findIndex(item => item.id == id);
    products.splice(index, 1);
    renderProducts();
}
// save the updated infomation of product
function saveItem() {
    let id = document.getElementById('id').value;
    let product = products.find(item => item.id == id);
    if (product) {
        product.name = document.getElementById('name').value;
        product.price = document.getElementById('price').value;
    }
    showProgress(true)
    setTimeout(()=>{
        showProgress(false,"Saved successfully")
    },3000)
    renderProducts();
}

// hide save button when click add button
function handleClickAdd() {
    resetForm('ADD');
}
// add product 
function addItem() {
    let name = document.getElementById('name').value;
    let price = document.getElementById('price').value;
    if(!name) 
        showErrors()
    let id_max = 0;
    products.forEach(item => {
        if (item.id >= id_max) id_max = item.id;
    });
    let product = {};
    product.id = id_max + 1;
    product.name = name;
    product.price = price;
    product.img = document.getElementById('image').value;
    products.push(product);
    renderProducts();
}
function resetForm(actionType) {
    document.getElementById('message').innerHTML=''
    document.getElementById('save-item').style.display = actionType === 'ADD' ? 'none' : 'block';
    document.getElementById('add-item').style.display = actionType !== 'ADD' ? 'none' : 'block';
    document.getElementById('exampleModalLabel').innerHTML = actionType === 'ADD' ? 'Add new item' : 'Edit item';


    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('description').value = '';
    document.getElementById('image').value = '';

}
function showProgress(inProgress,message) {
    const el = document.getElementById('message');
    const spinner = `<div class="spinner-border" role="status">
          </div>
          <span class="">Saving...</span>`
    el.innerHTML = inProgress? spinner : message
}
function showErrors(){
    document.getElementById('name').classList.add('is-invalid');
    document.getElementById('nameHelp').style.display = 'block';
}
// function call
renderProducts();
