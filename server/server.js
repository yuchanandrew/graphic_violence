require('dotenv').config();

const express = require('express');
const cors = require('cors');

const session = require('express-session');

const {getComments, getComment, createComment, getItems, getItem, buyItem} = require('./db/db.js');

const app = express();
const stripe = require('stripe')(process.env.STRIPE_SK);

// Webhook post request (happens in Stripe internally)
app.post("/webhook", express.raw({ type: 'application/json' }), async (req, res) => {
    console.log("Webhook has been hit!");
    const signature = req.headers['stripe-signature'];
    // console.log("Signature:", signature);

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

        console.log("Webhook metadata received:", stripe_session.metadata);

        // console.log('Payment completed: ', stripe_session);

        try {
            const cart = JSON.parse(stripe_session.metadata.cart);

            for(const item of cart) {
                const itemId = item.itemId;
                const quantity = parseInt(item.quantity, 10);

                const result = await buyItem(itemId, quantity);
                console.log("buyItem result:", result.message);

                // if (result.success === false) {
                    
                // }
            }
        } catch (error) {
            console.log('Error updating inventory: ', error);
        }
    }

    res.status(200).send('Received webhook');
});

app.use(express.json());
app.use(cors({
    origin: 'https://sparkly-hotteok-085673.netlify.app/',
    credentials: true
}));

// Establish the session-based middleware
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
}));

// // Temporary database of items
// const storeItems = new Map([
//     [1, { priceInCents: 10000, name: "Food"}],
//     [2, {priceInCents: 20000, name: "clothes"}],
// ]);

app.get("/", (req, res) => {
    res.send("server is up");
});

app.get("/getItems", async(req, res) => {
    const items = await getItems();
    res.json(items);
});

// Getting the cart
app.get("/cart", async(req, res) => {
    const cart = req.session.cart || [];

    console.log(cart);

    if (cart.length > 0){
        const populatedCart = await Promise.all(
            cart.map(async(item) => {
                const[result] = await getItem(item.itemId);

                console.log("result:", result.quantity);

                // const product = result ? result[0] : null;

                // if (!product) {
                //     console.warn(`Item not found for itemId: ${item.name}`);
                //     return{
                //         ...item,
                //         name: "Unknown item"
                //     };
                // }

                return {
                    ...item,
                    name: result.name,
                    price: result.price,
                };
            })
        );

        const quantity_sum = parseFloat(populatedCart.reduce((acc, item) => {
                return acc + item.quantity;
            }, 0).toFixed(2)
        );

        const total = parseFloat(populatedCart.reduce((acc, item) => {
                return acc + item.price * item.quantity;
            }, 0).toFixed(2)
        );

        res.status(200).json({cart: populatedCart, total, quantity_sum});
    } else {
        res.status(200).json({cart: [], total: 0, quantity_sum: 0});
    }
});

// Adding to the cart
app.post("/cart-add", (req, res) => {
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
app.post("/cart-subtract", (req, res) => {
    const { itemId } = req.body;

    console.log("Subtract route reached!");

    // Check if the item even exists
    const existingItem = req.session.cart.find(item => item.itemId === itemId);

    // If it does, then subtract one first
    if (existingItem) {
        existingItem.quantity -= 1;

        // After subtracting one, if quantity is 0,
        if (existingItem.quantity === 0) {
            req.session.cart = req.session.cart.filter(item => item.itemId !== itemId); // Keep all items that do not have itemId in cart
            return res.status(200).json({ message: 'Removed from cart since quantity was 1', cart: req.session.cart});
        }

        return res.status(200).json({ message: 'Successfully subtracted from cart', cart: req.session.cart });
    }
});

// Remove an item completely from cart
app.post("/cart-remove", (req, res) => {
    const { itemId } = req.body;

    // Check if cart is empty (probably unnecessary?? will check later)
    if (!req.session.cart) {
        return res.status(400).json({ message: "Cart is empty" });
    }

    // Filter out the item by keeping all other items in cart
    req.session.cart = req.session.cart.filter(item => item.itemId !== itemId);

    res.status(200).json({ message: "Item removed from cart", cart: req.session.cart });
});

app.post("/cart-clear", (req, res) => {
    console.log("Route hit!");
    req.session.cart = [];
    res.status(200).json({ message: "Cart cleared.", cart: req.session.cart });
});

// Create the checkout session
app.post("/create-checkout-session", async(req, res) => {
    try {
        // Get the item's id and quantity from request body
        const cart = req.session.cart;
        console.log("cart:", cart);

        const line_items_array = await Promise.all(
            cart.map(async (element) => {
                const result = await getItem(element.itemId);
                console.log("result in promise:", result);

                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: result[0].name,
                        },
                        unit_amount: Math.round(result[0].price * 100),
                    },
                    quantity: element.quantity,
                };
            })
        );

        console.log("Metadata cart stringified:", JSON.stringify(cart));
        

        // Create new stripe checkout session
        const stripe_session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            mode: "payment",
            line_items: line_items_array,
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",

            // Store all metadata into the session metadata
            metadata: {
                cart: JSON.stringify(cart),
            }
        });

        res.json({url: stripe_session.url});
    } catch(error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// Redirect from /success -> homepage
app.get("/success", (req, res) => {
    res.redirect("http://localhost:5173/");
})

app.listen(3000, () => console.log("app is running"));