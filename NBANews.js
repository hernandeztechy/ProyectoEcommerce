//para volver a la pagina principal
const logo = document.getElementById("logo");
logo.onclick = () => {window.location.pathname = ('/index.html')}

const cuerpo = document.getElementById("cuerpoNews");

fetch('https://nba-latest-news.p.rapidapi.com/news', {
    method: "GET",
    //params: {team: 'GSW', date: '31-12-2022'},
    headers: {
        'X-RapidAPI-Key': '2acf64c086mshe6e97287299b75bp1d65ccjsn123b42069162',
        'X-RapidAPI-Host': 'nba-latest-news.p.rapidapi.com'
    }
})
    .then((response) => response.json())
    .then((data) => data.forEach((info) =>
        {
            const newsDiv = document.createElement('div')
            newsDiv.innerHTML = 
            `<div class="newsCard">
                <h3>${info.title}</h3>
                <a class="newslink" href=${info.url}' target="_blank"><h4>Leer más en ${info.source}<h4></a>
            </div>`
    
            cuerpo.append(newsDiv)
        }))