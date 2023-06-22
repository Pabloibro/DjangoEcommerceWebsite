var updateBtns = document.getElementsByClassName('update-cart')

for (i =0; i < updateBtns.length; i++){
    updateBtns[i].addEventListener('click', function(){
        var productId = this.dataset.product
        var action = this.dataset.action
        console.log('productId:', productId, 'Action:', action)

        console.log('USER:', user)
        if (user == 'AnonymousUser'){
           addCookieItem(productId, action)
        }else{
            updatedUserOrder(productId, action)
        }
    })
}


function addCookieItem(productId, action){

    console.log('Not Logged In..')
    if(action == 'add'){
        if(cart[productId] == undefined){
            cart[productId] = {'quantity': 1}
        }else{
            cart[productId]['quantity'] += 1
        }
    }
    if(action == 'remove'){
        cart[productId]['quantity'] -= 1
        if(cart[productId] < 0){
            console.log('Remove Item')
            delete cart[productId]
        }    
    }
    console.log(cart)
    document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
    location.reload()
}

function updatedUserOrder(productId, action){
    console.log('user is authenticated, sending data')

    var url ='/update_item/'
    console.log('URL:', url)
    fetch(url, {
        method:"POST",
        headers: {
            'Content-Type': "application/json", 
            'X-CSRFToken': csrftoken,
        }, 
        body:JSON.stringify({'productId': productId, 'action': action})
    })
    .then((response) => {
        return response.json();
    })
    .then((data) =>{
        console.log('Data:', data )
        location.reload()
    });
}