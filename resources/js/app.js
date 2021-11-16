import axios from 'axios';
import Noty from 'noty';
import moment from 'moment';
import { initAdmin } from './admin';

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
});

const alertMsg = document.getElementById('success-alert');
if (alertMsg) {
    setTimeout(() => {
        alertMsg.remove();
    }, 2000);
}



// Render order status
let statuses = document.querySelectorAll('.status-line');
let hiddenInput = document.getElementById('hiddenInput');
let order = hiddenInput ? hiddenInput.value : null;
order = JSON.parse(order);
let time = document.createElement('small');


function updateStatus(order) {
    let stepCompleted = true;

    statuses.forEach((status) => {
        status.classList.remove('step-completed');
        status.classList.remove('current');
    });

    statuses.forEach((status) => {
        let dataProp = status.dataset.status;
        if (stepCompleted) {
            status.classList.add('step-completed');
        }

        if (dataProp == order.status) {
            stepCompleted = false;
            time.innerText = moment(order.updatedAt).format('hh:mm A');
            status.appendChild(time);
            if (status.nextElementSibling) {
                status.nextElementSibling.classList.add('current');
            }
        }
    })
}

updateStatus(order);

// Socket client
let socket = io();
initAdmin(socket);
// Join 
if (order) {
    socket.emit('join', `order_${order._id}`);
}

let adminAreaPath = window.location.pathname;
if (adminAreaPath.includes('admin')) {
    socket.emit('join', `adminRoom`);
}

socket.on('orderUpdated', (data) => {
    const updatedOrder = { ...order };
    updatedOrder.updatedAt = moment().format();
    updatedOrder.status = data.status;
    updateStatus(updatedOrder);
    new Noty({
        type: 'alert',
        theme: 'sunset',
        layout: 'topRight',
        text: 'Order Updated',
        timeout: '1000',
        progressBar: false,
    }).show();
})