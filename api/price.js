export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const response = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=VICUSDT");
        const data = await response.json();
        const vicPrice = parseFloat(data.price);

        if (isNaN(vicPrice)) {
            throw new Error("Invalid price received from Binance");
        }

        const frollPrice = vicPrice * 100;

        res.status(200).json({
            symbol: "FROLL",
            price_usd: frollPrice,
            source: "Binance"
        });
    } catch (error) {
        console.error("Error fetching price:", error.message);
        res.status(500).json({ error: "Failed to fetch price" });
    }
}
