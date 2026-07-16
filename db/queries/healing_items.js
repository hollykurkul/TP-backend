import db from "#db/client";

export async function createHealingItem(
  name,
  description,
  healingAmount,
  locationId,
) {
  const sql = `
    INSERT INTO healing_items
        (name, description, healing_amount, location_id)
    VALUES
        ($1, $2, $3, $4)
    `;
  const {
    rows: [healingItem],
  } = await db.query(sql, [name, description, healingAmount, locationId]);
  return healingItem;
}

export async function getHealingItemById(id) {
  const sql = `
    SELECT *
    FROM healing_items
    WHERE id = $1
    `;
  const {
    rows: [healingItem],
  } = await db.query(sql, [id]);
  return healingItem;
}

export async function getHealingItemsByLocationId(id) {
  const sql = `
    SELECT *
    FROM healing_items
    WHERE location_id = $1
    `;
  const {
    rows: [healingItems],
  } = await db.query(sql, [id]);
  return healingItems;
}
