import db from "#db/client";

export async function createUserItem(userId, itemId) {
  const sql = `
        INSERT INTO user_items
            (user_id, item_id)
        VALUES
            ($1, $2)
        RETURNING *
    `;
  const {
    rows: [userItem],
  } = await db.query(sql, [userId, itemId]);
  return userItem;
}

export async function getUserItemsByUserId(userId) {
  const sql = `
        SELECT *
        FROM user_items
        WHERE user_id = $1
    `;
  const { rows: userItems } = await db.query(sql, [userId]);
  return userItems;
}

export async function getUserItemByItemId(itemId) {
  const sql = `
        SELECT *
        FROM user_items
        WHERE item_id = $1
    `;
  const { rows: userItem } = await db.query(sql, [itemId]);
  return userItem;
}
