import db from "#db/client";

export async function createWeapon(name, description, damage, locationId) {
  const sql = `
    INSERT INTO weapons
        (name, description, damage, location_id)
    VALUES
        ($1, $2, $3, $4)
    RETURNING *
    `;
  const {
    rows: [weapon],
  } = await db.query(sql, [name, description, damage, locationId]);
  return weapon;
}

export async function getWeaponById(id) {
  const sql = `
    SELECT *
    FROM weapons
    WHERE id = $1
    `;
  const {
    rows: [weapon],
  } = await db.query(sql, [id]);
  return weapon;
}

export async function getWeaponsByLocationId(id) {
  const sql = `
    SELECT *
    FROM weapons
    WHERE location_id = $1
    `;
  const {
    rows: [weapons],
  } = await db.query(sql, [id]);
  return weapons;
}
