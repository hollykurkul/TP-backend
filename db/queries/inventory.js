import db from "#db/client";

export async function getUserInventory(userId) {
  const sql = `
    SELECT item_catalog.*
    FROM user_inventory
    JOIN item_catalog ON item_catalog.id = user_inventory.item_id
    WHERE user_inventory.user_id = $1
    ORDER BY item_catalog.location_id, item_catalog.id
  `;
  const { rows: inventory } = await db.query(sql, [userId]);
  return inventory;
}

export async function addRandomLocationItem(userId, locationId) {
  const sql = `
    WITH available_item AS (
      SELECT item_catalog.*
      FROM item_catalog
      WHERE item_catalog.location_id = $2
        AND NOT EXISTS (
          SELECT 1
          FROM user_inventory
          WHERE user_inventory.user_id = $1
            AND user_inventory.item_id = item_catalog.id
        )
      ORDER BY random()
      LIMIT 1
    ), inserted_item AS (
      INSERT INTO user_inventory (user_id, item_id)
      SELECT $1, available_item.id
      FROM available_item
      ON CONFLICT DO NOTHING
      RETURNING item_id
    )
    SELECT available_item.*
    FROM available_item
    JOIN inserted_item ON inserted_item.item_id = available_item.id
    `;
  const {
    rows: [item],
  } = await db.query(sql, [userId, locationId]);
  return item;
}

export async function getInventoryItemForUser(userId, itemId) {
  const sql = `
    SELECT item_catalog.*
    FROM user_inventory
    JOIN item_catalog ON item_catalog.id = user_inventory.item_id
    WHERE user_inventory.user_id = $1
      AND item_catalog.id = $2
  `;
  const {
    rows: [item],
  } = await db.query(sql, [userId, itemId]);
  return item;
}

export async function removeItemFromInventory(userId, itemId) {
  const sql = `
    DELETE FROM user_inventory
    WHERE user_id = $1
      AND item_id = $2
    RETURNING item_id
  `;
  const {
    rows: [removedItem],
  } = await db.query(sql, [userId, itemId]);
  return removedItem;
}
