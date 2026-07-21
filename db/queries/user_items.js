import db from "#db/client";

export async function getUserItemsByUserId(userId) {
    const sql = `
        SELECT * FROM user_items
        WHERE user_id = $1
        `;
    const { rows: [userItems] } = await db.query(sql, [userId]);
return userItems;
}   

export async function getUserItemById(id) {
    const sql = `
        SELECT * FROM user_items
        WHERE id= $1
        `;
    const { rows: [userItem] } = await db.query(sql, [id]);
return userItem;
}

export async function getUserItemByUserIdAndItemId(userId, itemId) {
    const sql = `
        SELECT * FROM user_items
        WHERE user_id = $1 AND item_id = $2
        `;
    const { rows: [userItem] } = await db.query(sql, [userId, itemId]);
return userItem;
}   

export async function addUserItem(userId, itemId, quantity) {
    const sql = `
        INSERT INTO user_items
            (user_id, item_id, quantity)
            VALUES
            ($1, $2, $3)
        `;
    const { rows: [userItem],
    } = await db.query(sql, [userId, itemId, quantity]);
return userItem;
}

export async function updateUserItem(id, userId, itemId, quantity) {
    const sql = `
        UPDATE user_items
        SET user_id = $2,
            item_id = $3,
            quantity = $4
        WHERE id = $1
        RETURNING *
        `;
    const { rows: [userItem] } = await db.query(sql, [id, userId, itemId, quantity]);
return userItem;
}

export async function deleteUserItem(id) {
    const sql = `
        DELETE FROM user_items
        WHERE id= $1
        `;
    const { rows: [userItem] } = await db.query(sql, [id]);
return rows[0] || null;
}