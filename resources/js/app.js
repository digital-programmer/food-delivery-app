import axios from 'axios';
import Noty from 'noty';

let add_to_cart = document.querySelectorAll('.add-to-cart');
let cart_counter = document.querySelector("#cart-counter");

function updateCart(pizza) {
    axios.post('/update-cart', pizza).then(res => {
        new Noty({
            type: 'alert',
            theme: 'sunset',
            layout: 'topRight',
            text: 'Item added to cart',
            timeout: '1000',
            progressBar: false,
        }).show();
        cart_counter.textContent = res.data.totalQty;
    }).catch(err => {
        new Noty({
            type: 'error',
            theme: 'sunset',
            layout: 'topRight',
            text: 'Something went wrong',
            timeout: '1000',
            progressBar: false,
        }).show();
    })
}

add_to_cart.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        let pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza);
    })
})
