require('dotenv').config();

const express = require('express');
const cors = require('cors');

const session = require('express-session');

const {getComments, getComment, createComment, getItems, getItem, buyItem} = require('./db/db.js');

const app = express();
app.use(express.json());
app.use(cors());

// Establish the session-based middleware
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
}));

const stripe = require('stripe')(process.env.STRIPE_SK);

// // Temporary database of items
// const storeItems = new Map([
//     [1, { priceInCents: 10000, name: "Food"}],
//     [2, {priceInCents: 20000, name: "clothes"}],
// ]);

app.get("/", (req, res) => {
    res.send("server is up");
});

// Getting the cart
app.get("/cart", (req, res) => {
    res.status(200).json({ cart: req.session.cart || [] });
});

// Adding to the cart
app.post("/cart/add", (req, res) => {
    const{ itemId, quantity } = req.body;

    // If session cart does not exist,
    if (!req.session.cart) {
        req.session.cart = []; // Make it an empty array
    }

    // Find the item in cart with itemId
    const existingItem = req.session.cart.find(item => item.itemId === itemId);

    if (existingItem) { // If found,
        existingItem.quantity += quantity; // Increase the number of item by quantity (1)
    } else {
        req.session.cart.push({ itemId, quantity }); // Otherwise, push it as the first instance of the item in cart
    }

    res.status(200).json({ message: 'Added to cart', cart: req.session.cart });
});

// Subtracting from cart
app.post("/cart/subtract", (req, res) => {
    const { itemId } = req.body;

    // Check if the item even exists
    const existingItem = req.session.cart.find(item => item.itemId === itemId);

    // If it does, then subtract one first
    if (existingItem) {
        existingItem.quantity -= 1;

        // After subtracting one, if quantity is 0,
        if (existingItem.quantity === 0) {
            req.session.cart = cart.filter(item => item.itemId !== itemId); // Keep all items that do not have itemId in cart
        }
    }
});

// Remove an item completely from cart
app.post("/cart/remove", (req, res) => {
    const { itemId } = req.body;

    // Check if cart is empty (probably unnecessary?? will check later)
    if (!req.session.cart) {
        return res.status(400).json({ message: "Cart is empty" });
    }

    // Filter out the item by keeping all other items in cart
    req.session.cart = req.session.cart.filter(item => item.itemId !== itemId);

    res.status(200).json({ message: "Item removed from cart", cart: req.session.cart });
});

// Create the checkout session
app.post("/create-checkout-session", async(req, res) => {
    try {
        // Get the item's id and quantity from request body
        const { itemId, quantity } = req.body;

        // Get the actual item from id
        const [result] = getItem(itemId);
        const item = result[0];
        

        // Create new stripe checkout session
        const stripe_session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: item.price * 100, // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",

            // Store all metadata into the session metadata
            metadata: {
                itemId: itemId,
                quantity: quantity
            }
        });

        res.json({url: session.url});
    } catch(error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// Redirect from /success -> homepage
app.get("/success", (req, res) => {
    res.redirect("http://localhost:5173/");
})

// Webhook post request (happens in Stripe internally)
app.post("/webhook", express.raw({ type: 'application/json' }), async (req, res) => {
    const signature = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WHSEC);
    } catch (err) {
        console.log(`Webhook signature verification failed.`, err.message);
        return res.sendStatus(400);
    }

    // i.e. upon completion of checkout session...
    if (event.type === 'checkout.session.completed') {
        const stripe_session = event.data.object;
        console.log('Payment completed: ', stripe_session);

        const itemId = stripe_session.metadata.itemId;
        const quantity = parseInt(stripe_session.metadata.quantity, 10);

        try {
            const result = await buyItem(itemId, quantity);
            console.log(result.message);
        } catch (error) {
            console.log('Error updating inventory: ', error);
        }
    }

    res.status(200).send('Received webhook');
});

app.listen(3000, () => console.log("app is running"));