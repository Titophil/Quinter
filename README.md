# Cryptocurrency Tracker

## Overview
This project is a web-based cryptocurrency tracker that fetches real-time data from CoinLore's API and displays information about various cryptocurrencies, including their prices, market trends, and supply details. Users can mark favorite cryptocurrencies and get the latest news on them.

## Features
- Fetch and display cryptocurrency data from the [CoinLore API](https://www.coinlore.com/cryptocurrency-data-api).
- Display real-time prices, 1-hour, and 24-hour percentage changes.
- Allow users to add favorite coins and view related news articles.
- Display interactive charts showing price trends.
- Search for specific cryptocurrencies by name or symbol.
- Responsive design for seamless usage on various devices.

## Technologies Used
- HTML, CSS, JavaScript
- CoinLore API for fetching cryptocurrency data
- Google News RSS for fetching cryptocurrency-related news
- Chart.js for visualizing price trends

## Setup Instructions
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/crypto-tracker.git
   cd crypto-tracker
   ```
2. Open `index.html` in a web browser.
3. Ensure `icons.json` is available in the same directory for displaying coin icons.

## How It Works
- The application fetches cryptocurrency data from CoinLore and displays it in a table.
- Users can click on a cryptocurrency to view detailed information and charts.
- Clicking the heart button (♡) adds a cryptocurrency to the favorites panel.
- Double-clicking a coin's icon scrolls the page to the favorite panel.
- The search form allows users to find a specific cryptocurrency by name or symbol.

## Future Enhancements
- Implement user authentication for saving favorite lists.
- Add a dark mode for better UI/UX.
- Fetch historical price data for more advanced charting.
- Improve UI responsiveness and animations.

## License
This project is licensed under the MIT License.

## Author
[Titus Kiprono](https://github.com/yourusername)
