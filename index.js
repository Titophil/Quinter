document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById("box")
    const coinDetails = document.getElementById("coin-details")
    let char = document.querySelector(".char")
    let favoritePanel = document.createElement("div")
    favoritePanel.id = "favorite-panel"
    char.appendChild(favoritePanel)


    let favoriteCoins = []
    let coinData = []

    if (!container) {
        console.error("Not found!")
        return
    }

    fetch("icons.json")
        .then(res => res.json())
        .then(iconMap => {
            fetch("https://api.coinlore.net/api/tickers/")
                .then(res => res.json())
                .then(data => {
                    if (data && data.data) {
                        coinData = data.data;
                        const table = document.createElement("table")
                        table.style.width = "100%";
                        table.style.borderCollapse = "collapse"

                        const headerRow = table.insertRow()
                        headerRow.innerHTML = `
                            <th>Action</th>
                            <th>Icon</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>1hr</th>
                            <th>24hr</th>
                        `;

         data.data.forEach(coin => {
             if (coin && coin.symbol && iconMap[coin.symbol.toUpperCase()]) {
                const row = table.insertRow();
                let heartSymbol = "♡"
                if (favoriteCoins.some(c => c.id === coin.id)) {
                heartSymbol = "❤️"
                 }
                row.innerHTML = `
                    <td><button class="add-favorite">${heartSymbol}</button></td>
                     <td style="text-align: center;">
                      <div class="${iconMap[coin.symbol.toUpperCase()]}" style="font-size: 35px;"></div>
                         </td>
                             <td>${coin.name} (${coin.symbol})</td>
                                 <td>${parseFloat(coin.price_usd).toFixed(2)}</td>
                                 <td>${parseFloat(coin.percent_change_1h).toFixed(2)}</td>
                                    <td>${parseFloat(coin.percent_change_24h).toFixed(2)}</td>
                                `

                row.addEventListener("click", (event) => {
                    if (!event.target.classList.contains("add-favorite")) {
                     selectedCoin = coin
                    showCoinDetails(coin)
                                    }
                                })
                     row.querySelector("div").addEventListener('dblclick', () => {
                         if (char) {
                             char.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                    }
                                })
                                table.appendChild(row)
                            }
                        });
                        container.appendChild(table)
                    }

                const bitcoin = coinData.find(coin=>coin.symbol.toLowerCase()==="btc")
                if(bitcoin){
                    showCoinDetails(bitcoin)
                }
                })

        })

    function addToFavorites(coin) {
        if (!favoriteCoins.some(c => c.id === coin.id)) {
            favoriteCoins.push(coin)
            displayFavorites()

            const buttons = document.querySelectorAll(".add-favorite")
            buttons.forEach(button => {
                const row = button.closest("tr");
                const coinName = row.querySelector("td:nth-child(3)").textContent;
                if (coinName === `${coin.name} (${coin.symbol})`) {
                    button.textContent = "❤️"
                }
            })
        }
    }
    function rssFeed(symbol) {
    return `https://news.google.com/rss/search?q=${symbol}+cryptocurrency`
    }
    async function displayFavorites() {
        favoritePanel.innerHTML = "<h5>Favorites</h5>"
        for(const coin of favoriteCoins){
        const favoriteItem = document.createElement("div")
            favoriteItem.classList.add("favorite-item")
            let news = ""
            try{
            const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssFeed((coin.symbol)))}`)
            const data = await response.json()
        if(data.items){
            news = "<ul>"
            data.items.slice(0,4).forEach(item=>{
                news += `<li style='color:white'><a href="${item.link}" target= "-blank" style='color: white'>${item.title}</a></li>`
            })
            news += "</ul>"
        }
}catch (error) {
    console.error("Error fetching news", error)
}
    
        favoriteItem.innerHTML = `<span>❤️</span> ${coin.symbol} ${coin.csupply} ${coin.tsupply} ${coin.msupply} ${news}`
            favoritePanel.appendChild(favoriteItem);
            
        }
    }

    
    function showCoinDetails(coin) {
        coinDetails.innerHTML = `
            <h2>${coin.name} (${coin.symbol}) Details</h2>
            <p>Price: ${parseFloat(coin.price_usd).toFixed(2)}</p>
            <p>1h Change: ${parseFloat(coin.percent_change_1h).toFixed(2)}%</p>
            <p>24h Change: ${parseFloat(coin.percent_change_24h).toFixed(2)}%</p>
            <canvas id="chart-1h" width="400" height="200"></canvas>
            <canvas id="chart-24h" width="400" height="200"></canvas>`
        
    
        const canvas1 = document.getElementById("chart-1h")
        const canvas2 = document.getElementById("chart-24h")

        new Chart(canvas1, {
            type: "line",
            data: {
                labels: ["", ""],
                datasets: [{
                    data: [0, coin.percent_change_1h],
                    borderColor: coin.percent_change_1h < 0 ? "red" : "green",
                    borderWidth: 2,
                    pointRadius: 0,
                }],
            },
            options: {
                scales: { display: false },
                plugins: { legend: { display: false } },
            },
        });

        new Chart(canvas2, {
            type: "line",
            data: {
                labels: ["", ""],
                datasets: [{
                    data: [0, coin.percent_change_24h],
                    borderColor: coin.percent_change_24h < 0 ? "red" : "green",
                    borderWidth: 2,
                    pointRadius: 0,
                }],
            },
            options: {
                scales: { display: false },
                plugins: { legend: { display: false } },
            },
        });
    }
  

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("add-favorite")) {
            const row = event.target.closest("tr");
            const coinName = row.querySelector("td:nth-child(3)").textContent;
            const coin = coinData.find(c => `${c.name} (${c.symbol})` === coinName)
            if (coin) {
                addToFavorites(coin);
               
            }
        }
    })

    const form = document.getElementById("myForm")
    const formOutput = document.getElementById("formOutput")

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const userInput = document.getElementById("userInput").value;
            const foundCoin = coinData.find(coin => coin.name.toLowerCase() === userInput.toLowerCase() || coin.symbol.toLowerCase() === userInput.toLowerCase())
            if (foundCoin) {
                showCoinDetails(foundCoin)
            }
           
        })
    }
})
                   