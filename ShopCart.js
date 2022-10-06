const logo = document.getElementById("logo");
const ItemsDIV = document.getElementById("itemsdiv")

//return to main page
const GrandTotalDOM = document.getElementById("GrandTotal")
logo.onclick = () => {window.location.pathname = ('/index.html')}

let ShoppingCartObj=[]

//when vaciar carrito button clicked
const btnCleanSC = document.getElementById("btnCleanSC")
btnCleanSC.onclick = () => VaciarCarrito();

//when pay button clicked
const btnPayment = document.getElementById("btnPay")
btnPayment.onclick = () => PaymentProcess();

//start with CHeckout div escondido
document.getElementById("Payment").style.visibility = "hidden";

//cuando el radio opcion cambia
const rbDelivery = document.getElementById("rbDelivery")
rbDelivery.onchange = () => DeliveryOptionChanged();
const rbPickUp = document.getElementById("rbPickup")
rbPickUp.onchange = () => DeliveryOptionChanged();

//click en FINALIZAR
const btnCheckout = document.getElementById("btnCheckout")
btnCheckout.onclick = () => FormValidationCheckout();

//DOM elements para el label error y el div Payment
const divPayment = document.getElementById("Payment")
const lbError = document.getElementById("lbError")

//when page loads charges elements
document.addEventListener("DOMContentLoaded", ShoppingCartLoad);

function ShoppingCartLoad()
{
    if (localStorage.getItem('ShoppingCart'))
    {
        ShoppingCartObj = JSON.parse(localStorage.getItem('ShoppingCart'))
    }
    else
    {
        ShoppingCartObj=[]
    } 
    
    FillItemsInCart();
}

//variable para mantener el total a pagar
let GrandTotal=0;

function FillItemsInCart()
{
    //remove existant elements
    while (ItemsDIV.firstChild) {
        ItemsDIV.firstChild.remove()
    }

    GrandTotal=0;
    //si hay al menos un elemento en el carrito
    if(Object.keys(ShoppingCartObj).length>0)
    {
        //place new set of cards
        ShoppingCartObj.forEach((element) => 
        {
            const {id, player, year, precio, cant} = element
            let subtotal=precio*cant;
            GrandTotal+=subtotal;
            const ItemSC = document.createElement("div")
            
            ItemSC.innerHTML = 
            `<div id="item${id}" class="item">
                <div class="gridDiv">
                    <div class="columnShopC">
                        <a class="PlayerName">${player}</a>
                        <a class="CardYear"> - ${year}</a>
                        <div id="btnDelete">
                            <a class="CardYear">Cantidad: </a>
                            <input id="Cant${id}" class=CantShpCrt type="number" value="${cant}" min="1">
                            <ion-icon id="TrashIco${id}" class="TrashIco" name="trash-outline"></ion-icon>
                        </div>
                    </div>
                    <div class="columnShopC">
                        <p id="precioItem" class="Prices">$${precio}</p>
                    </div>
                </div>
                <hr>
                <div class="SubtotalDiv">
                    <a class="CardYear">Subtotal:</a>
                    <a id="itemSub${id}" class="Prices">$${subtotal}</a>
                </div>
            </div>`     

            ItemsDIV.appendChild(ItemSC);

            //when clicking on remove button
            const TrashClick = document.getElementById(`TrashIco${id}`)
            TrashClick.onclick = () => RemoveItem(id);

            //when clicking/changing numeric value of quantity
            const QtyCard = document.getElementById(`Cant${id}`)
            QtyCard.onchange = () => UpdateCantCard(id, QtyCard.value)
        })
    }
    else //si el carrito esta vacio
    {
        const DivVacio = document.createElement("a")
            
        DivVacio.innerHTML = 
        `<a class="PlayerName">No hay productos en el carrito.</a>`     

        ItemsDIV.appendChild(DivVacio);
    }

    //actualizar el precio final
    GrandTotalDOM.innerHTML = `$${GrandTotal}`;
}

function VaciarCarrito()
{
    localStorage.removeItem("ShoppingCart");
    ShoppingCartLoad();
}

function RemoveItem(id)
{
    //hiddes payment div
    document.getElementById("Payment").style.visibility = "hidden";

    //get index on the value to be remove
    var index = ShoppingCartObj.findIndex(SC => SC.id == id);

    //get cantidad and price of the card that will be removed
    const cant = (Object.values(ShoppingCartObj)[index]).cant
    const precio = Object.values(ShoppingCartObj)[index].precio
    const totalRemove= cant*precio;
    
    //remove item from object
    var index = ShoppingCartObj.findIndex(SC => SC.id == id); //get index on the value
    ShoppingCartObj.splice(index,1) //remove index from object

    //recalcular el total
    GrandTotal =GrandTotal-totalRemove
    GrandTotalDOM.innerHTML = `$${GrandTotal}`;

    //remove item from UI
    const itemRemove = document.getElementById(`item${id}`)
    itemRemove.remove()

    //si no quedan elementos entonces se pone el mensaje
    if(Object.keys(ShoppingCartObj).length<1)
    {
        const DivVacio = document.createElement("a")
            
        DivVacio.innerHTML = 
        `<a class="PlayerName">No hay productos en el carrito.</a>`     

        ItemsDIV.appendChild(DivVacio);
    }

    UpdateShoppingCartStorage()
}

function UpdateCantCard(id, qty)
{
    //hiddes payment div
    document.getElementById("Payment").style.visibility = "hidden";

    //get index on the id to be changed
    var index = ShoppingCartObj.findIndex(SC => SC.id == id);

    //get cantidad and price of the card that will be removed
    (Object.values(ShoppingCartObj)[index]).cant = parseInt(qty)

    //update Storage
    UpdateShoppingCartStorage()

    //recalcular el total y subtotales
    GrandTotal=0
    for (const iterator of ShoppingCartObj) 
    {
        //subtotal
        let subtotal=iterator.precio*iterator.cant //precio por cantidad
        const ItemSubtotal = document.getElementById(`itemSub${iterator.id}`)
        ItemSubtotal.innerHTML = `$${subtotal}`

        //total
        GrandTotal=GrandTotal+subtotal
    }
    GrandTotalDOM.innerHTML = `$${GrandTotal}`;
}

function UpdateShoppingCartStorage()
{
    //actualizar en LocalStorage
    //1.convertir objeto a string
    const ShoppingCartString = JSON.stringify(ShoppingCartObj)
    //2. Store it
    localStorage.setItem("ShoppingCart", ShoppingCartString)
}

function PaymentProcess()
{
    //makes Payment div visible
    document.getElementById("Payment").style.visibility = "visible";

    //scroll to focus on div
    document.getElementById("Payment").scrollIntoView()
    
    //sets total value
    document.getElementById("CheckoutTotal").innerHTML = `$${GrandTotal}`
}

function DeliveryOptionChanged()
{
    if(rbDelivery.checked)
    {
        document.getElementById("CheckoutTotal").innerHTML = `$${GrandTotal+10}`
    }
    else
    {
        document.getElementById("CheckoutTotal").innerHTML = `$${GrandTotal}`
    }
}

function FormValidationCheckout()
{
    //take values from the forms inputs
    let nombre = document.forms["payInfo"]["name"].value;
    let email = document.forms["payInfo"]["email"].value;
    let card = document.forms["payInfo"]["card"].value;
    let expDate = document.forms["payInfo"]["expDate"].value;
    let ccv = document.forms["payInfo"]["ccv"].value;

    //if any value is empty cant proceed
    if(nombre == "" || nombre==null || email == "" || email==null || card == "" || card==null ||
    expDate == "" || expDate==null || ccv == "" || ccv==null)
    {
        alert("Campos requeridos sin completar")
    }
    else
    {
        // Toastify({
        //     text: 'Tu pago fue procesado',
        //     duration: 6000,
        //     newWindow: true,
        //     gravity: "center",
        //     position: "center",
        //     stopOnFocus: false,
        //     close: true,
        //     style:{
        //         background: "linear-gradient(to right, #f08573, #e32505)",
        //     }
        // }).showToast();
        alert('Pago Procesado')
        window.location.pathname = ('/index.html')
    }
    
}