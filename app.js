//objeto de jugadores
const NBA_AllStars = 
[
    {year:2016, nombre:"Stephen Curry", pos:"G", team:"Golden State Warriors", selection:"Western",price: 150, url: "/Img/StephenCurry.png"},
    {year:2016, nombre:"James Harden", pos:"SG", team:"Houston Rockets", selection:"Western" ,price: 130, url: "/Img/Harden.png"},
    {year:2016, nombre:"Kevin Durant", pos:"SF", team:"Golden State Warriors", selection:"Western",price: 135, url: "/Img/Durant.png"},
    {year:2016, nombre:"Kawhi Leonard", pos:"F", team:"San Antonio Spurs", selection:"Western",price: 110, url: "/Img/Kawhi.png"},
    {year:2016, nombre:"Anthony Davis", pos:"PF", team:"New Orleans Pelicans", selection:"Western",price: 90, url: "/Img/Davis.png"},
    {year:2016, nombre:"Russell Westbrook", pos:"G", team:"Oklahoma City Thunder", selection:"Western",price: 90, url: "/Img/Westbrook.png"},
    {year:2016, nombre:"DeMarcus Cousins", pos:"C", team:"Sacramento Kings", selection:"Western",price: 60, url: "/Img/Cousins.png"},
    {year:2016, nombre:"Klay Thompson", pos:"G", team:"Golden State Warriors", selection:"Western",price: 130, url: "/Img/Klay.png"},
    {year:2016, nombre:"Draymond Green", pos:"F", team:"Golden State Warriors", selection:"Western",price: 110, url: "/Img/Draymond.png"},
    {year:2016, nombre:"Marc Gasol", pos:"C", team:"Memphis Grizzlies", selection:"Western",price: 75, url: "/Img/MarcGasol.png"},
    {year:2016, nombre:"DeAndre Jordan", pos:"C", team:"Los Angeles Clippers", selection:"Western",price: 75, url: "/Img/Deandre.png"},
    {year:2016, nombre:"Gordon Hayward", pos:"GF", team:"Utah Jazz", selection:"Western",price: 60, url: "/Img/Hayward.png"},
    {year:2016, nombre:"Kyrie Irving", pos:"G", team:"Cleveland Cavaliers", selection:"Eastern",price: 140, url: "/Img/Kyrie.png"},
    {year:2016, nombre:"DeMar DeRozan", pos:"GF", team:"Toronto Raptors", selection:"Eastern",price: 120, url: "/Img/Demar.png"},
    {year:2016, nombre:"LeBron James", pos:"F", team:"Cleveland Cavaliers", selection:"Eastern",price: 150, url: "/Img/Lebron.png"},
    {year:2016, nombre:"Giannis Antetokounmpo", pos:"F", team:"Milwaukee Bucks", selection:"Eastern",price: 115, url: "/Img/Giannis.png"},
    {year:2016, nombre:"Jimmy Butler", pos:"GF", team:"Chicago Bulls", selection:"Eastern",price: 100, url: "/Img/Butler.png"},
    {year:2016, nombre:"Isaiah Thomas", pos:"PG", team:"Boston Celtics", selection:"Eastern",price: 80, url: "/Img/IsaiahT.png"},
    {year:2016, nombre:"John Wall", pos:"PG", team:"Washington Wizards", selection:"Eastern",price: 85, url: "/Img/JohnWall.png"},
    {year:2016, nombre:"Kevin Love", pos:"FC", team:"Cleveland Cavaliers", selection:"Eastern",price: 98, url: "/Img/KevinLove.png"},
    {year:2016, nombre:"Kyle Lowry", pos:"PG", team:"Toronto Raptors", selection:"Eastern",price: 70, url: "/Img/Lowry.png"},
    {year:2016, nombre:"Paul George", pos:"GF", team:"Indiana Pacers", selection:"Eastern",price: 75, url: "/Img/PaulGeorge.png"},
    {year:2016, nombre:"Kemba Walker", pos:"G", team:"Charlotte Hornets", selection:"Eastern",price: 65, url: "/Img/Kemba.png"},
    {year:2016, nombre:"Paul Millsap", pos:"FC", team:"Atlanta Hawks", selection:"Eastern",price: 40, url: "/Img/Millsap.png"},
]

//arreglo para registrar a los usuarios
const Usuarios = []

document.body.onload = CreateTable;

const nav_Teams = document.getElementById("nav_Teams");
nav_Teams.onclick = TeamsUnique;

const nav_Player =document.getElementById("nav_Player");
//nav_Player.onclick = get players by year

const nav_Position = document.getElementById("nav_Position");
//nav_Position.onclick = get available positions


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
function TeamsUnique()
{
    console.clear()
    const equipos = new Set()
    for (const iterator of NBA_AllStars) {
        equipos.add(iterator.team)
    }
    console.log(equipos)
}

function CreateTable()
{
    let tableNBA = document.createElement("tableNBA")
    tableNBA.innerHTML = 
    `<table>
    <tr>
      <td>
        <div class="card">
            <div class="top-section">
                <img id="image-container" src="/Img/StephenCurry.png" alt="">
                <div class="price">$40</div>
            </div>
            <div class="product-info">
                <div class="selection">Western</div>
                <div class="position">Guard</div>
                <div class="year">2016</div>
                <button class="btn_Buy">Agregar al carrito</button>
            </div>
        </div>
      </td>
    </tr>
    </table>`
    let cuerpo = document.getElementById("cuerpo");
    cuerpo.appendChild(tableNBA);
}