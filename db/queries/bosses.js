import db from "#db/client";

export const bosses = [
  {
    name: "Rabid Squirrel",
    hp: 5,
    imageUrl:
      "https://drive.google.com/file/d/1i50XN90J3GOXAxVFGSUbraGNfyULt-v1/view?usp=sharing",
    locationId: 1,
  },
  {
    name: "Rival Stray",
    hp: 5,
    imageUrl:
      "https://drive.google.com/file/d/1c3L72JsooSQBnybT-VXLnZmnhfu789wd/view?usp=sharing",
    locationId: 2,
  },
  {
    name: "Animal Control",
    hp: 5,
    imageUrl:
      "https://drive.google.com/file/d/13CPgMuR9QIn0xtBEtPYHNjRaKK29Okg-/view?usp=sharing",
    locationId: 3,
  },
];

function withBossImage(boss) {
  const seededBoss = bosses.find(
    ({ name, locationId }) =>
      name === boss.name && locationId === boss.location_id,
  );

  return {
    ...boss,
    image_url: boss.image_url ?? seededBoss?.imageUrl,
  };
}

export async function createBoss(name, hp, imageUrl, locationId) {
  const sql = `
INSERT INTO bosses
    (name, hp, image_url, location_id)
VALUES
    ($1, $2, $3, $4)
RETURNING *
`;
  const {
    rows: [boss],
  } = await db.query(sql, [name, hp, imageUrl, locationId]);
  return boss;
}

export async function getAllBosses() {
  const sql = `
    SELECT *
    FROM bosses
    `;
  const {
    rows: [bosses],
  } = await db.query(sql);
  return bosses;
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
  const { rows: bossRows } = await db.query(sql, [id]);
  return bossRows.map(withBossImage);
}
