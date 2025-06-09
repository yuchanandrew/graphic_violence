const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({path: '../.env'});

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'graphic_violence'
}).promise();

async function getComments(){
    const [rows] = await pool.query("SELECT * FROM comments");
    return rows;
}

async function getComment(id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM comments
        WHERE id = ?
    `, [id]);
    return rows;
}

async function createComment(name, contents, email) {
    const result = await pool.query(`
        INSERT INTO comments(name, contents, email)
        VALUES (?, ?, ?)
    `, [name, contents, email]);
    
    return result;
}

// Creating functions for inventory

async function getItems() { 
    const [rows] = await pool.query("SELECT * FROM inventory;");
    return rows;
}

async function getItem(id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM inventory
        WHERE id = ?;
    `, [id]);
    
    return rows;
}

async function buyItem(id, quantity) {
    const[items] = await getItem(id);
    const item = items[0];

    if (!item) {
        return { success: false, message: 'Item not found.'};
    }
    
    if (item.count < quantity) {
        return { success: false, message: `Not enough items. We only have ${item.count} in stock for ${item.name}.`}
    }

    const [result] = await pool.query(`
        UPDATE inventory
        SET count = count - ?
        WHERE id = ? AND count >= ?;
    `, [quantity, id, quantity]);

    if (result.affectedRows === 1) {
        return { success: true, message: 'Purchase successful!'};
    } else {
        return { success: false, message: 'Failed to update inventory'};
    }
}

module.exports = {
    getComment,
    getComments,
    createComment,
    getItems,
    getItem,
    buyItem
};

// async function run() {
//     const result = await buyItem(1, 2);
//     console.log(result);
// }

// run();