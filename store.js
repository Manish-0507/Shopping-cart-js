//4 byhyi nyu h ki js pehli load hojya or body load nhi ho to yo nyu kr diya ki yo jo ready function h jisma buttons ka acess rkhya h aapin wo jb e load how jb domload ho le.nhi to nhi.
showItems();
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    //selecting remove buttons to make them functional
    //1
    var removecartitems = document.getElementsByClassName('btn-danger');

    //2

    //6
    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    //8
    var addCartBtns = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addCartBtns.length; i++) {
        var button = addCartBtns[i];
        button.addEventListener('click', addcartClicked);
    }
    //11
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
}
function cartObject(title, price, image, quantity) {
    this.title = title;
    this.price = price;
    this.image = image;
    this.quantity = quantity;
}

//12
function purchaseClicked(e) {
    alert('thanks for giving us chance!!');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();

}

//7
function quantityChanged(e) {
    var input = e.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }

    updateCartTotal();
}

//9
function addcartClicked(e) {
    var button = e.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var image = shopItem.getElementsByClassName('shop-item-image')[0].src;
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    var numberofItem = 0;
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            numberofItem = cartItems.getElementsByClassName('cart-quantity-input')[i].value++;
            return
        }
    }
    var cartModel = new cartObject(title, price, image, numberofItem);
    var cartItems = localStorage.getItem("Items");
    if (cartItems == null) {
        cartItemObject = [];
    }
    else {
        cartItemObject = JSON.parse(cartItems);

    }
    cartItemObject.push(cartModel);
    console.log(cartItemObject);
    localStorage.setItem("Items", JSON.stringify(cartItemObject));
    showItems();
}




//3
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];//it returns all but we need one
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total += (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = "$" + total;
}

function showItems() {
    var cartItems = localStorage.getItem("Items");
    if (cartItems == null) {
        cartItemObject = [];
    }
    else {
        cartItemObject = JSON.parse(cartItems);
    }

    let cartRowContents = "";
    cartItemObject.forEach((element, index) => {
        var cartItems = document.getElementsByClassName('cart-items')[0];


        cartRowContents += `<div class="cart-row">
                    <div class="cart-item cart-column">
                        <img class="cart-item-image" src="${element.image}" width="100" height="100">
                        <span class="cart-item-title">${element.title}</span>
                    </div>
                    <span class="cart-price cart-column">${element.price}</span>
                    <div class="cart-quantity cart-column">
                        <input class="cart-quantity-input" type="number" value="${element.quantity}">
                        <button class="btn btn-danger" type="button" id=${index} onclick=removeLocal(this.id,event)>REMOVE</button>
                    </div>
                </div>`

        if (cartItemObject.length != 0) {
            cartItems.innerHTML = cartRowContents;
        } else {
            document.write('Sorry!You have not added any item in cart');
        }

    })




    updateCartTotal();

}


function removeLocal(index, event) {
    var button = event.target;
    var btnparent = button.parentElement.parentElement;
    btnparent.remove();
    var cartItems = localStorage.getItem("Items");
    if (cartItems == null) {
        cartItemObject = [];
    }
    else {
        cartItemObject = JSON.parse(cartItems);
    }
    cartItemObject.splice(index, 1);
    localStorage.setItem("Items", JSON.stringify(cartItemObject));
    showItems();
    updateCartTotal();
}

