//objeto de jugadores
const NBA_AllStars = 
[
    {year:2016, nombre:"Stephen Curry", pos:"G", team:"Golden State Warriors", selection:"Western"},
    {year:2016, nombre:"James Harden", pos:"SG", team:"Houston Rockets", selection:"Western"},
    {year:2016, nombre:"Kevin Durant", pos:"SF", team:"Golden State Warriors", selection:"Western"},
    {year:2016, nombre:"Kawhi Leonard", pos:"F", team:"San Antonio Spurs", selection:"Western"},
    {year:2016, nombre:"Anthony Davis", pos:"PF", team:"New Orleans Pelicans", selection:"Western"},
    {year:2016, nombre:"Russell Westbrook", pos:"G", team:"Oklahoma City Thunder", selection:"Western"},
    {year:2016, nombre:"DeMarcus Cousins", pos:"C", team:"Sacramento Kings", selection:"Western"},
    {year:2016, nombre:"Klay Thompson", pos:"G", team:"Golden State Warriors", selection:"Western"},
    {year:2016, nombre:"Draymond Green", pos:"F", team:"Golden State Warriors", selection:"Western"},
    {year:2016, nombre:"Marc Gasol", pos:"C", team:"Memphis Grizzlies", selection:"Western"},
    {year:2016, nombre:"DeAndre Jordan", pos:"C", team:"Los Angeles Clippers", selection:"Western"},
    {year:2016, nombre:"Gordon Hayward", pos:"GF", team:"Utah Jazz", selection:"Western"},
    {year:2016, nombre:"Kyrie Irving", pos:"G", team:"Cleveland Cavaliers", selection:"Eastern"},
    {year:2016, nombre:"DeMar DeRozan", pos:"GF", team:"Toronto Raptors", selection:"Eastern"},
    {year:2016, nombre:"LeBron James", pos:"F", team:"Cleveland Cavaliers", selection:"Eastern"},
    {year:2016, nombre:"Giannis Antetokounmpo", pos:"F", team:"Milwaukee Bucks", selection:"Eastern"},
    {year:2016, nombre:"Jimmy Butler", pos:"GF", team:"Chicago Bulls", selection:"Eastern"},
    {year:2016, nombre:"Isaiah Thomas", pos:"PG", team:"Boston Celtics", selection:"Eastern"},
    {year:2016, nombre:"John Wall", pos:"PG", team:"Washington Wizards", selection:"Eastern"},
    {year:2016, nombre:"Kevin Love", pos:"FC", team:"Cleveland Cavaliers", selection:"Eastern"},
    {year:2016, nombre:"Kyle Lowry", pos:"PG", team:"Toronto Raptors", selection:"Eastern"},
    {year:2016, nombre:"Paul George", pos:"GF", team:"Indiana Pacers", selection:"Eastern"},
    {year:2016, nombre:"Kemba Walker", pos:"G", team:"Charlotte Hornets", selection:"Eastern"},
    {year:2016, nombre:"Paul Millsap", pos:"FC", team:"Atlanta Hawks", selection:"Eastern"},
]

//arreglo para registrar a los usuarios
const Usuarios = []


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

