# Portfolio & Metal Tracking App

This app allows users to track their metal investments, including real-time prices, portfolio balance, transactions, and more. It supports buying and selling metals like Gold, Silver, Platinum, Palladium, and more.

## Features

* **Track Metal Prices**: View live prices and price changes for metals.
* **Buy & Sell Metals**: Simulate buying and selling metals within the app.
* **Portfolio Management**: View total portfolio balance, profit/loss (PnL), and transaction history.
* **Sparkline Graphs**: Dynamic graphs representing portfolio performance over time.
* **INR Pricing**: All metal prices are shown in INR (Indian Rupee).
* **Responsive UI**: Mobile-optimized design for both Android and iOS.

## Setup

### Prerequisites

Ensure you have the following installed:

* Node.js (preferably the latest LTS version)
* npm or yarn (depending on your preference)
* Expo CLI for development (optional but recommended for rapid prototyping)

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/PhazeAnkit/golden-invention.git
    ```

2. **Navigate into the project directory**:

    ```bash
    cd golden-invention
    ```

3. **Install dependencies**:

    ```bash
    npm install
    # OR
    yarn install
    ```

4. **Run the app**:

    To run the app in development mode, use the following command:

    ```bash
    npm start
    # OR
    yarn start
    ```

    This will launch Expo in your default browser, and you can either use the **QR code** to open the app on your mobile device or run it on a simulator/emulator.


### Key Directories

* **/context**: Contains all React Contexts that provide and manage global state for metals and portfolio data.
* **/components**: Contains reusable components like the `MetalMarketCard` and `PortfolioSummaryCard` that represent parts of the UI.
* **/screens**: Contains the main screens (`DashboardScreen`, `PortfolioScreen`, etc.), where app UI and functionality are defined.
* **/services**: Handles external API integrations like fetching metal price data, and any utilities required for data processing.

## Dependencies

* **react-native**: Framework for building native mobile apps.
* **react-navigation**: Navigation library for React Native apps.
* **react-native-chart-kit**: Charting library to render dynamic charts (e.g., Portfolio balance graphs).
* **axios/fetch**: To make API calls to the Metal Price API and fetch data.

## API Integration

The app uses the Metal Price API to fetch live metal prices in INR. Make sure to set up an API key.

## Development

1. **Adding New Metals**:

    * Add new metals by updating the `SUPPORTED_METALS` list in the `MetalsContext.js` file and ensuring that the appropriate API symbol is included in the `METAL_SYMBOL_MAP`.

2. **Expanding Portfolio Features**:

    * You can add more advanced portfolio management features, such as tracking metal performance over longer periods (1 year, 5 years) or adding charts that visualize the metal holdings.

## Contribution

1. Fork the repository and create your branch (`git checkout -b feature-name`).
2. Commit your changes (`git commit -m 'Add new feature'`).
3. Push to the branch (`git push origin feature-name`).
4. Open a pull request with a detailed explanation of what was added/modified.



