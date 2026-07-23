import db from "#db/client";

export const bosses = [
  {
    name: "Rabid Squirrel",
    hp: 5,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1529637477260726352/rabid_squirrel.png?ex=6a62a969&is=6a6157e9&hm=8bd5a0913f11c5f55c956ed38feab2c7034a121067b9e5590ab31a4612aa0d6f",
    locationId: 1,
  },
  {
    name: "Rival Stray",
    hp: 5,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1529638267954401412/Rival_stray.png?ex=6a62aa26&is=6a6158a6&hm=80d6dd5dd7c3fbcfc3baa6aa071d9de021dd1d25412f526845c928e5586f5e01",
    locationId: 2,
  },
  {
    name: "Animal Control",
    hp: 5,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1529641243494322186/animal_control.png?ex=6a62aceb&is=6a615b6b&hm=bfecd9cad0b6e2ba1c385440acbf0791a376c5fb1b02e898556dae866b0b2a5b",
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
