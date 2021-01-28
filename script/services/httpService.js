class HttpService{
    apiUrl = "https://backendapiilbah.azurewebsites.net/api/";
    authUrl = "https://backendapiilbah.azurewebsites.net/";
    commonService = new CommonService();

    register(user){
        $.ajax({
            url: this.authUrl + "register", //https://backendapiilbah.azurewebsites.net/api/register
            type:'POST',
            data: JSON.stringify(user),
            dataType: 'text',
            contentType: "application/json; charset=utf-8",
            success:function(response){
                commonService.showMessage("Registered");
                commonService.setToStorage("token", response);
                commonService.redirect("login.html");
            },
            error:function(response){
               commonService.showError(response.statusText);
            }
        });
    }

    login(user){
        $.ajax({
            url: this.authUrl + "login", //https://backendapiilbah.azurewebsites.net/api/login
            type:'POST',
            data: JSON.stringify(user),
            dataType: 'text',
            contentType: "application/json; charset=utf-8",
            success:function(response){
                commonService.showMessage("Logged in");
                commonService.setToStorage("token", response);
                commonService.redirect("products.html");
            },
            error:function(response){
               commonService.showError(response.statusText);
            }
        });
    }
    getProducts(){
        var token = this.tryGetToken();
        if(token){
            var res;
            $.ajax({
                url: this.apiUrl + "/Product",
                type:'GET',
                dataType: 'json',
                async: false,  
                headers: {
                    'token':token,
                },
                contentType: "application/json; charset=utf-8",
                success:function(response){
                    if(response){
                        res = response;
                    }else{
                       commonService.showError("no product exists");
                    }
                },
                error:function(res){
                   commonService.showError(res.statusText);
                }
            });
            return res;
        }
    }

    addProduct(product){
        var token = this.tryGetToken();
            if(token){
                $.ajax({
                    url: this.apiUrl + "Product",
                    type:'POST',
                    data: JSON.stringify(product),
                    dataType: 'text',
                    headers: {
                        'token':token,
                    },
                    contentType: "application/json; charset=utf-8",
                    success:function(response){
                       commonService.showMessage(response);
                    },
                    error:function(response){
                       commonService.showError(response.statusText);
                    }
                });
            }
    }

    removeProduct(id){
        var token = this.tryGetToken();
            if(token){
                $.ajax({
                    url: this.apiUrl + "Product/"+ id,
                    type:'POST',
                    dataType: 'text',
                    contentType: "application/json; charset=utf-8",
                    success:function(res){
                       commonService.showMessage(res);
                    },
                    error:function(res){
                       commonService.showError(res.statusText);
                    }
                });
            }
    }

    tryGetToken(){
        var token = this.commonService.getFromStorage('token');
        if(token){
            return token;
        } else{
            commonService.redirect("login.html");
        }
    }

    changePassword(newPass){
        //when I wrote this only me and god knew, now only god knows

        // var token = this.tryGetToken();
        // if(token){
        //     $.ajax({
        //         url: this.apiUrl + "changepassword",
        //         type:'POST',
        //         data: JSON.stringify(newPass),
        //         dataType: 'text',
        //         headers: {
        //             'token':token,
        //         },
        //         contentType: "application/json; charset=utf-8",
        //         success:function(response){
        //            commonService.showMessage(response);
        //         },
        //         error:function(response){
        //            commonService.showError(response.statusText);
        //         }
        //     });
        // }
        console.log("password changed");
        commonService.redirect("login.html");
    }
    changeName(newName){
        console.log("name changed");
        commonService.redirect("home.html");

    }
    removeAccount(){
        console.log("account removed");
        setTimeout(function(){
            commonService.redirect("register.html");
        }, 2000);//3sec
    }
    getProductById(id){
        return new Product("new Product", "new description", 2, "https://static8.depositphotos.com/1291798/797/i/600/depositphotos_7971908-stock-photo-curious-striped-scottish-fold-kitten.jpg", 3);
        // var token = this.tryGetToken();
        //     if(token){
        //         $.ajax({
        //             url: this.apiUrl + "Product/"+ id,
        //             type:'GET',
        //             dataType: 'text',
        //             contentType: "application/json; charset=utf-8",
        //             success:function(res){
        //                commonService.showMessage(res);
        //             },
        //             error:function(res){
        //                commonService.showError(res.statusText);
        //             }
        //         });
        //     }
    }
    addReview(review){
        console.log("review was added");
    }
    sendMessage(message){
        console.log(message);
    }
    addRating(product, rating){
        console.log(`Rating ${rating} was added for ${product.name}`);
    }
}