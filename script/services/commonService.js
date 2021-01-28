class CommonService {
    getFormmatedProducts(products){
        var concatenatedProducts ='';
        for (let index = 0; index < products.length; index++) {
            const product = products[index];
            concatenatedProducts += 
            `<div>
                <h2 onclick="showProduct(${product.id})">${product.name}</h2>
                <p>${product.description}</p>
                <p>${product.price}</h4>
                <img src="${product.imgUrl}">
                <input type="button" onclick="removeProduct(${product.id})" value="remove"/>
                <input type="button" onclick="AddProductToFavorites(${product.id})" value="Add Favorites"/>
                <input type="button" onclick="AddProductToCart(${product.id})" value="Add Cart"/>
                <input type="button" onclick="AddRating(${product.id}, 1)" value="Rating 1"/>
                <input type="button" onclick="AddRating(${product.id}, 2)" value="Rating 2"/>
                <input type="button" onclick="AddRating(${product.id}, 3)" value="Rating 3"/>
                <input type="button" onclick="AddRating(${product.id}, 4)" value="Rating 4"/>
                <input type="button" onclick="AddRating(${product.id}, 5)" value="Rating 5"/>

             </div>
            `
        }
        return concatenatedProducts;
    }

    getFormmatedProduct(product){
        return `<div>
            <h1>${product.name}</h2>
            <p>${product.description}</p>
            <p>${product.price}</p>
            <img src="${product.imgUrl}">
            ${this.getReviewHtml(product.id)}
        </div>`;
    }

    getReviewHtml(productId){
        return `
         <label for="reviewTitleId">Title</label>
         <input type="text" id="reviewTitleId">
         <label for="reviewDescriptionId">Description</label>
         <input type="text" id="reviewDescriptionId">
         <input type="button" onclick="addReview(5)" value="Add Review">
        `
    }

    showMessage(message){
        $("#messagePanel").addClass("successMessage");
        $("#messagePanel").removeClass("errorMessage");
        $("#messagePanel").html(message);
    }
    showError(error){
        $("#messagePanel").addClass("errorMessage");
        $("#messagePanel").removeClass("successMessage");
        $("#messagePanel").html(error);
    }
    setToStorage(key, value){
        window.localStorage.setItem(key, value);
    }
    getFromStorage(key){
        return window.localStorage.getItem(key);
    }
    redirect(path){
        window.location.href = path;
    }
    logOut(){
        window.localStorage.removeItem("token");
        this.redirect("login.html");
    }
    Serialize(object){
        return JSON.stringify(object);
    }
    Deserialize(json){
        return JSON.parse(json);
    }
}