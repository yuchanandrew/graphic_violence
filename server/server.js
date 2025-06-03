require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const stripe = require('stripe')(process.env.STRIPE_SK);

const storeItems = new Map([
    [1, { priceInCents: 10000, name: "Food"}],
    [2, {priceInCents: 20000, name: "clothes"}],
]);

app.get("/", (req, res) => {
    res.send("server is up");
});

app.get("/success", (req, res) => {
    res.redirect("http://localhost:5173/");
})

app.post("/create-checkout-session", async(req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Food"
                        },
                        unit_amount: 10000,
                    },
                    quantity: 1,
                },
            ],
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
        });

        res.json({url: session.url});
    } catch(error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(3000, () => console.log("app is running"));