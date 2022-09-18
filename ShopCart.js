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
            `<div id="item" class="item">
                <div class="gridDiv">
                    <div class="columnShopC">
                        <a class="PlayerName">${player}</a>
                        <a class="CardYear"> - ${year}</a>
                        <div id="btnDelete">
                            <a class="CardYear">Cantidad: </a>
                            <input id="CantShpCrt" type="number" value="${cant}">
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
                    <a class="Prices">$${subtotal}</a>
                </div>
            </div>`     

            ItemsDIV.appendChild(ItemSC);

            //when clicking on buy button
            const TrashClick = document.getElementById(`TrashIco${id}`)
            TrashClick.onclick = () => RemoveItem(id);
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
    alert(`remove item ${id}`)
}

function UpdateShoppingCart()
{

}