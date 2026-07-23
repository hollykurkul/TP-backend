import db from "#db/client";

export async function addItemToInventory(userId, itemId) {
  const sql = `
      INSERT INTO user_inventory 
        (user_id, item_id)
      VALUES 
        ($1, $2)
      RETURNING *;
    `;
  const {
    rows: [inventoryItem],
  } = await db.query(sql, [userId, itemId]);
  return inventoryItem;
}

export async function getUserInventory() {
  const sql = `
    SELECT *
    FROM user_inventory
    `;
  const { rows: inventory } = await db.query(sql);
  return inventory;
}
