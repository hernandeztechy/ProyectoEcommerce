//arreglo para registrar las compras al carrito
const ShoppingCart = []
const Usuarios = []

//----------------------------------------------
//this is to avoid the dropdown when clicking inside of it
document.addEventListener('click', e=> {
    const isDropdownButton = e.target.matches("[data-dropdown-button]")
    if(!isDropdownButton && e.target.closest('[data-dropdown]') != null) return

    //get variable user is clicking
    let currentDropdown
    if(isDropdownButton)
    {
        currentDropdown = e.target.closest('[data-dropdown]')
        currentDropdown.classList.toggle('active')
    }

    //close all other dropdowns
    document.querySelectorAll('[data-dropdown].active').forEach(dropdown => 
        {
            if(dropdown===currentDropdown) return

            dropdown.classList.remove('active')
        })
})

//----------------------------------------------

//crea un arreglo con las posiciones sin repetir
//los agrega al dropdown de posiciones
const Positions = new Set()
for (const iterator of NBA_AllStars) 
{
    Positions.add(iterator.pos)
}

Positions.forEach(element => 
{
    let PosList = document.createElement("linkTeam")
    PosList.innerHTML = `<a id="${element}" class="linkPos">${element}</a>`;
    let Pos = document.getElementById("Pos")
    Pos.appendChild(PosList);

    //when clicking on specific position
    const PosClick = document.getElementById(`${element}`)
    PosClick.onclick = () => PositionClicked(element);
});



//----------------------------------------------


//crea un arreglo con los equipos sin repetir
//los agrega al dropdown de equipos
const equiposWest = new Set()
const equiposEast = new Set()
for (const iterator of NBA_AllStars) 
    iterator.selection==="Western" ? equiposWest.add(iterator.team) : equiposEast.add(iterator.team)
    
equiposWest.forEach(element => 
{
    let WestDropdown = document.createElement("linkTeam")
    WestDropdown.innerHTML = `<a id="${element}" class="link">${element}</a>`;
    let West = document.getElementById("West")
    West.appendChild(WestDropdown);

    //when clicking on specific team
    const TeamClick = document.getElementById(`${element}`)
    TeamClick.onclick = () => TeamClicked(element);
});

equiposEast.forEach(element => 
{
    let EastDropdown = document.createElement("linkTeam")
    EastDropdown.innerHTML = `<a id="${element}" class="link">${element}</a>`;
    let East = document.getElementById("East")
    East.appendChild(EastDropdown);

    //when clicking on specific team
    const TeamClick = document.getElementById(`${element}`)
    TeamClick.onclick = () => TeamClicked(element);
});



//----------------------------------------------
//creates the entire table with the cards as contents
//loads the code to the HTML
const cuerpo = document.getElementById("cuerpo");

LoadCards();

function LoadCards()
{
    //remove existant table cards
    while (cuerpo.firstChild) {
        cuerpo.firstChild.remove()
    }

    NBA_AllStars.forEach((element) => 
    {
        const {url, price, selection, pos, year, id} = element

        const NBACard = document.createElement("div")
        
        NBACard.innerHTML = 
        `<div class="card">
            <div class="top-section">
                <img id="image-container" src=${url} alt="">
                <div class="price">$${price}</div>
            </div>
            <div class="product-info">
                <div class="selection">${selection}</div>
                <div class="position">${pos}</div>
                <div class="year">${year}</div>
                <button id="${id}" class="btn_Buy">Agregar al carrito</button>
            </div>
        </div>`     

        cuerpo.appendChild(NBACard);

        //when clicking on buy button
        const BuyClick = document.getElementById(`${id}`)
        BuyClick.onclick = () => AddToCart(id);
    })
    
        Toastify({
            text: 'Cargado correctamente',
            duration: 3000,
            newWindow: true,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true,
            // close: true,
            style:{
                background: "linear-gradient(to right, #f08573, #e32505)",
            }
        }).showToast();
}
//----------------------------------------------

const AddToCart = (idCard) => 
{
    alert(`ID seleccionado: ${idCard}`)
}

//registra nombre de usuario en el arreglo
function RegUsuario()
{
    let user = prompt("Antes de iniciar, indique su nombre: ")
    Usuarios.push(user);
    console.log(Usuarios)
}

//jugadores y su equipo solamente
function MapPlayerXTeam()
{
    console.clear()
    const ByTeam = NBA_AllStars.map((dato) => 
    {
        return{
            nombre:dato.nombre,
            team:dato.team
        }
    });
    console.log(ByTeam)
}

//buscar jugador por nombre
function FindPlayerByName()
{
    console.clear()
    let selecPlayer = prompt("Escriba el nombre del jugador que desea buscar: ")
    const resultado= NBA_AllStars.find(dato => dato.nombre.includes(selecPlayer))
    if(resultado!=undefined)
        console.log(resultado)
    else
        console.log("No se encontró al jugador")
}

//creates the entire table with the cards as contents
//receives a object with the NBA data already filtered by the user selection
//loads the code to the HTML
function UpdateTableWithFilter(objetoFiltered)
{   
    //remove existant table cards
    while (cuerpo.firstChild) {
        cuerpo.firstChild.remove()
    }

    //place new set of cards
    objetoFiltered.forEach((element) => 
    {
        const {url, price, selection, pos, year, id} = element

        const NBACard = document.createElement("div")
        
        NBACard.innerHTML = 
        `<div class="card">
            <div class="top-section">
                <img id="image-container" src=${url} alt="">
                <div class="price">$${price}</div>
            </div>
            <div class="product-info">
                <div class="selection">${selection}</div>
                <div class="position">${pos}</div>
                <div class="year">${year}</div>
                <button id="${id}" class="btn_Buy">Agregar al carrito</button>
            </div>
        </div>`     

        cuerpo.appendChild(NBACard);

        //when clicking on buy button
        const BuyClick = document.getElementById(`${id}`)
        BuyClick.onclick = () => AddToCart(id);
    })

        Toastify({
            text: 'Filtro aplicado',
            duration: 3000,
            newWindow: true,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true,
            // close: true,
            style:{
                background: "linear-gradient(to right, #f08573, #e32505)",
            }
        }).showToast();
}

function PositionClicked(idPos)
{
    const posicion = NBA_AllStars.filter(dato => dato.pos == (idPos))
    UpdateTableWithFilter(posicion);
}

function TeamClicked(idTeam)
{
    const SelectedTeam = NBA_AllStars.filter(dato => dato.team == (idTeam))
    UpdateTableWithFilter(SelectedTeam);
}