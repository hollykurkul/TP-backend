import db from "#db/client";

export async function createUserWeapon(userId, weaponId) {
  const sql = `
    INSERT INTO user_weapons
        (user_id, weapon_id)
    VALUES
        ($1, $2)
    RETURNING *
    `;
  const {
    rows: [userWeapon],
  } = await db.query(sql, [userId, weaponId]);
  return userWeapon;
}

export async function getUserWeaponsByUserId(userId) {
  const sql = `
    SELECT *
    FROM user_weapons
    WHERE user_id = $1
    `;
  const { rows: userWeapons } = await db.query(sql, [userId]);
  return userWeapons;
}

export async function getUserWeaponByWeaponId(weaponId) {
  const sql = `
    SELECT *
    FROM user_weapons
    WHERE weapon_id = $1
    `;
  const { rows: userWeapon } = await db.query(sql, [weaponId]);
  return userWeapon;
}
