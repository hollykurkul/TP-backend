import db from "#db/client";

export const bosses = [
  { name: "Rabid Squirrel", hp: 5, locationId: 1 },
  { name: "Rival Stray", hp: 5, locationId: 2 },
  { name: "Animal Control", hp: 5, locationId: 3 },
];

export async function createBoss(name, description, hp, locationId) {
  const sql = `
INSERT INTO bosses
    (name, description, hp, location_id)
VALUES
    ($1, $2, $3, $4)
RETURNING *
`;
  const {
    rows: [boss],
  } = await db.query(sql, [name, description, hp, locationId]);
  return boss;
}

export async function getBossById(id) {
  const sql = `
    SELECT *
    FROM bosses
    WHERE id = $1
    `;
  const {
    rows: [boss],
  } = await db.query(sql, [id]);
  return boss;
}

export async function getBossByLocationId(id) {
  const sql = `
    SELECT *
    FROM bosses
    WHERE location_id = $1
    `;
  const { rows: boss } = await db.query(sql, [id]);
  return boss;
}
