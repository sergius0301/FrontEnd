var commonService = new CommonService();
var httpService = new HttpService();

function register() {
    var name = $("#registerNameId").val();
    var email = $("#registerEmailId").val();
    var pass = $("#registerPassId").val();

    httpService.register(new User(name, email, pass));
}

function login(){
    var email = $("#loginEmailId").val();
    var pass = $("#loginPassId").val();

    httpService.login(new User("", email, pass));
}

function logOut(){
    commonService.logOut();
}

function getProducts(){
    var products = httpService.getProducts();
    if(products){
        var html = commonService.getFormmatedProducts(products);
        $("#productList").html(html);
    } else {
        commonService.showError("No products exist");
    }
}

function addProduct(){
    var name = $("#productNameId").val();
    var description = $("#productDescriptionId").val();
    var price = $("#productPriceId").val();
    var productImg = $("#productImgId").val();

    httpService.addProduct(new Product(name, description, price, productImg));
}

function removeProduct(id){
    httpService.removeProduct(id);
    getProducts();
}

function changePassword(){
    var newPass = $("#changePasswordId").val();

    httpService.changePassword(newPass);
}

function changeName(){
    var newName = $('#changeNameIds').val();

    httpService.changeName(newName);
}

function removeAccount(){
    var response = confirm("Are you sure ?");
    if(response){
        httpService.removeAccount();
    }
}

function showProduct(productId){
    var product = httpService.getProductById(productId);
    var productDetailHtml = commonService.getFormmatedProduct(product);
    commonService.setToStorage("productId", productDetailHtml);

    commonService.redirect("productDetails.html");
}

function setProductDetails(){
    var productDetailHtml = commonService.getFromStorage("productId");
    $("#productDetailsId").html(productDetailHtml);
}

function addReview(productId){
    var title = $('#reviewTitleId').val();
    var description = $('#reviewDescriptionId').val();

    var review = new Review(title, description, productId, "");
    httpService.addReview(review);
}

function AddProductToFavorites(id){
    var product = httpService.getProductById(id);

    var favoriteProductsJson = commonService.getFromStorage('favorites');
    var favoriteProducts = commonService.Deserialize(favoriteProductsJson);
    if(!favoriteProducts){
        favoriteProducts = [];
    } 
    favoriteProducts.push(product);
    var productListJson  = commonService.Serialize(favoriteProducts);
    commonService.setToStorage('favorites', productListJson);
}

function AddProductToCart(id){
    var product = httpService.getProductById(id);

    var cartProductsJson = commonService.getFromStorage('cart');
    var cartProducts = commonService.Deserialize(cartProductsJson);
    if(!cartProducts){
        cartProducts = [];
    } 
    cartProducts.push(product);
    var productListJson  = commonService.Serialize(cartProducts);
    commonService.setToStorage('cart', productListJson);
}

function showCart(){
    var productsJson = commonService.getFromStorage('cart');
    var productList = commonService.Deserialize(productsJson);
    if(productList){
        var html = commonService.getFormmatedProducts(productList);
        $("#cartProductsId").html(html);
    } else {
        commonService.showError("No products exist");
    }
}

function showFavorites(){
    var productsJson = commonService.getFromStorage('favorites');
    var productList = commonService.Deserialize(productsJson);
    if(productList){
        var html = commonService.getFormmatedProducts(productList);
        $("#favoriteProductsId").html(html);
    } else {
        commonService.showError("No products exist");
    }
}

function sendMessage(){
    var name = $('#contactPageNameId').val();
    var message = $('#contactMessageNameId').val();

    var message = new Message(name, message);
    httpService.sendMessage(message);
}
function AddRating(productId, rating){
    var product = httpService.getProductById(productId);
    httpService.addRating(product, rating);
}