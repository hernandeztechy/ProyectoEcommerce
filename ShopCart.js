const logo = document.getElementById("logo");
const ItemsDIV = document.getElementById("itemsdiv")
const GrandTotalDOM = document.getElementById("GrandTotal")
logo.onclick = () => {window.location.pathname = ('/index.html')}
let ShoppingCartObj=[]
const btnCleanSC = document.getElementById("btnCleanSC")
btnCleanSC.onclick = () => VaciarCarrito();

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

function FillItemsInCart()
{
    //remove existant elements
    while (ItemsDIV.firstChild) {
        ItemsDIV.firstChild.remove()
    }

    let GrandTotal=0;
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
                            <ion-icon id="TrashIco${id}" name="trash-outline"></ion-icon>
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
    const value = (GrandTotalDOM.innerHTML).split('$') //se convierte en array por el split
    let Grandtotal = value[1] //tomamos solo el numero
    Grandtotal = Grandtotal - totalRemove
    GrandTotalDOM.innerHTML = `$${Grandtotal}`;

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
    //get index on the id to be changed
    var index = ShoppingCartObj.findIndex(SC => SC.id == id);

    //get cantidad and price of the card that will be removed
    (Object.values(ShoppingCartObj)[index]).cant = parseInt(qty)

    //update Storage
    UpdateShoppingCartStorage()

    //recalcular el total y subtotales
    let total=0
    for (const iterator of ShoppingCartObj) 
    {
        //subtotal
        let subtotal=iterator.precio*iterator.cant //precio por cantidad
        const ItemSubtotal = document.getElementById(`itemSub${iterator.id}`)
        ItemSubtotal.innerHTML = `$${subtotal}`

        //total
        total=total+subtotal
    }
    GrandTotalDOM.innerHTML = `$${total}`;
}

function UpdateShoppingCartStorage()
{
    //actualizar en LocalStorage
    //1.convertir objeto a string
    const ShoppingCartString = JSON.stringify(ShoppingCartObj)
    //2. Store it
    localStorage.setItem("ShoppingCart", ShoppingCartString)
}