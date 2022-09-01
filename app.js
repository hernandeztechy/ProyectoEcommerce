//objeto de jugadores
const NBA_AllStars = 
[
    {id:1,year:2016, nombre:"Stephen Curry", pos:"G", team:"Golden State Warriors", selection:"Western",price: 150, url: "/Img/StephenCurry.png"},
    {id:2,year:2016, nombre:"James Harden", pos:"SG", team:"Houston Rockets", selection:"Western" ,price: 130, url: "/Img/Harden.png"},
    {id:3,year:2016, nombre:"Kevin Durant", pos:"SF", team:"Golden State Warriors", selection:"Western",price: 135, url: "/Img/Durant.png"},
    {id:4,year:2016, nombre:"Kawhi Leonard", pos:"F", team:"San Antonio Spurs", selection:"Western",price: 110, url: "/Img/Kawhi.png"},
    {id:5,year:2016, nombre:"Anthony Davis", pos:"PF", team:"New Orleans Pelicans", selection:"Western",price: 90, url: "/Img/Davis.png"},
    {id:6,year:2016, nombre:"Russell Westbrook", pos:"G", team:"Oklahoma City Thunder", selection:"Western",price: 90, url: "/Img/Westbrook.png"},
    {id:7,year:2016, nombre:"DeMarcus Cousins", pos:"C", team:"Sacramento Kings", selection:"Western",price: 60, url: "/Img/Cousins.png"},
    {id:8,year:2016, nombre:"Klay Thompson", pos:"G", team:"Golden State Warriors", selection:"Western",price: 130, url: "/Img/Klay.png"},
    {id:9,year:2016, nombre:"Draymond Green", pos:"F", team:"Golden State Warriors", selection:"Western",price: 110, url: "/Img/Draymond.png"},
    {id:10,year:2016, nombre:"Marc Gasol", pos:"C", team:"Memphis Grizzlies", selection:"Western",price: 75, url: "/Img/MarcGasol.png"},
    {id:11,year:2016, nombre:"DeAndre Jordan", pos:"C", team:"Los Angeles Clippers", selection:"Western",price: 75, url: "/Img/Deandre.png"},
    {id:12,year:2016, nombre:"Gordon Hayward", pos:"GF", team:"Utah Jazz", selection:"Western",price: 60, url: "/Img/Hayward.png"},
    {id:13,year:2016, nombre:"Kyrie Irving", pos:"G", team:"Cleveland Cavaliers", selection:"Eastern",price: 140, url: "/Img/Kyrie.png"},
    {id:14,year:2016, nombre:"DeMar DeRozan", pos:"GF", team:"Toronto Raptors", selection:"Eastern",price: 120, url: "/Img/Demar.png"},
    {id:15,year:2016, nombre:"LeBron James", pos:"F", team:"Cleveland Cavaliers", selection:"Eastern",price: 150, url: "/Img/Lebron.png"},
    {id:16,year:2016, nombre:"Giannis Antetokounmpo", pos:"F", team:"Milwaukee Bucks", selection:"Eastern",price: 115, url: "/Img/Giannis.png"},
    {id:17,year:2016, nombre:"Jimmy Butler", pos:"GF", team:"Chicago Bulls", selection:"Eastern",price: 100, url: "/Img/Butler.png"},
    {id:18,year:2016, nombre:"Isaiah Thomas", pos:"PG", team:"Boston Celtics", selection:"Eastern",price: 80, url: "/Img/IsaiahT.png"},
    {id:19,year:2016, nombre:"John Wall", pos:"PG", team:"Washington Wizards", selection:"Eastern",price: 85, url: "/Img/JohnWall.png"},
    {id:20,year:2016, nombre:"Kevin Love", pos:"FC", team:"Cleveland Cavaliers", selection:"Eastern",price: 98, url: "/Img/KevinLove.png"},
    {id:21,year:2016, nombre:"Kyle Lowry", pos:"PG", team:"Toronto Raptors", selection:"Eastern",price: 70, url: "/Img/Lowry.png"},
    {id:22,year:2016, nombre:"Paul George", pos:"GF", team:"Indiana Pacers", selection:"Eastern",price: 75, url: "/Img/PaulGeorge.png"},
    {id:23,year:2016, nombre:"Kemba Walker", pos:"G", team:"Charlotte Hornets", selection:"Eastern",price: 65, url: "/Img/Kemba.png"},
    {id:24,year:2016, nombre:"Paul Millsap", pos:"FC", team:"Atlanta Hawks", selection:"Eastern",price: 40, url: "/Img/Millsap.png"},
]

//arreglo para registrar las compras al carrito
const ShoppingCart = []
const Usuarios = []

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

document.body.onload = OnPageLoad;

//when clicking on specific position
// const PosClick = document.getElementsByClassName("link");
// PosClick.onclick = PositionClicked(this.id) 

//when click on Add to cart
const btnBuy = document.getElementsByClassName("btn_Buy")
btnBuy.onclick = AddToCart

function AddToCart(e)
{
    e = e || window.event;
    e = e.target || e.srcElement;
    if (e.nodeName === 'BUTTON') {
        alert(e.id);
    }
}

//registra nombre de usuario en el arreglo
function RegUsuario()
{
    let user = prompt("Antes de iniciar, indique su nombre: ")
    Usuarios.push(user);
    console.log(Usuarios)
}

//filtrar por posicion
function FiltroPosicion()
{
    console.clear()
    let selecPos = prompt("Elija una posicion para filtrar (G,SG,SF,F,PF,C,FC): ")
    const posicion = NBA_AllStars.filter(dato => dato.pos == (selecPos))
    console.log(posicion);
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

//crea un arreglo con los equipos sin repetir
//los agrega al dropdown de equipos
function TeamsUnique()
{
    //console.clear()
    const equiposWest = new Set()
    const equiposEast = new Set()
    for (const iterator of NBA_AllStars) 
    {
        iterator.selection==="Western" ? equiposWest.add(iterator.team) : equiposEast.add(iterator.team)
    }
    
    equiposWest.forEach(element => 
    {
        let WestDropdown = document.createElement("linkTeam")
        WestDropdown.innerHTML = `<a href="#" class="link">${element}</a>`;
        let West = document.getElementById("West")
        West.appendChild(WestDropdown);
    });

    equiposEast.forEach(element => 
    {
        let EastDropdown = document.createElement("linkTeam")
        EastDropdown.innerHTML = `<a href="#" class="link">${element}</a>`;
        let East = document.getElementById("East")
        East.appendChild(EastDropdown);
    });
}

//crea un arreglo con las posiciones sin repetir
//los agrega al dropdown de posiciones
function PositionUnique()
{
    const Positions = new Set()
    for (const iterator of NBA_AllStars) 
    {
        Positions.add(iterator.pos)
    }

    Positions.forEach(element => 
    {
        let PosList = document.createElement("linkTeam")
        PosList.innerHTML = `<a id="${element}" class="link">${element}</a>`;
        let Pos = document.getElementById("Pos")
        Pos.appendChild(PosList);
    });
}

function OnPageLoad()
{
    CreateTable();
    TeamsUnique();
    PositionUnique();
}

//creates the entire table with the cards as contents
//loads the code to the HTML
function CreateTable()
{
    let counter=0;
    let tableNBA = document.createElement("tableNBA")
    let StringHTML="<table><table>";

    for (const datos of NBA_AllStars) 
    {
        StringHTML = StringHTML +
        `<td>
        <div class="card">
            <div class="top-section">
                <img id="image-container" src=${datos.url} alt="">
                <div class="price">$${datos.price}</div>
            </div>
            <div class="product-info">
                <div class="selection">${datos.selection}</div>
                <div class="position">${datos.pos}</div>
                <div class="year">${datos.year}</div>
                <button id=${datos.id} class="btn_Buy">Agregar al carrito</button>
            </div>
        </div>
        </td>`
        counter+=1;//5 cards per row
        if(counter===5 || datos === NBA_AllStars.length-1) //when 5 or end of array
        {
            StringHTML =  StringHTML + `</tr>`;
            counter=0;
        }        
    }

    StringHTML =  StringHTML + `</table>`
    tableNBA.innerHTML = StringHTML;
    let cuerpo = document.getElementById("cuerpo");
    cuerpo.appendChild(tableNBA);
}

function PositionClicked(id)
{
    //unfinished
}