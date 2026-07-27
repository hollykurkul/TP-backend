import db from "#db/client";

export const enemies = [
  {
    name: "Rabbit",
    hp: 3,
    imageUrl:
      "https://drive.google.com/file/d/1DoYMahDkMJl2KNBXKx1Qcb6pT3d-K7o8/view?usp=sharing",
    locationId: 1,
  },
  {
    name: "Squirrel",
    hp: 3,
    imageUrl:
      "https://drive.google.com/file/d/1twR7bHsgn3vVsMQ2Ls58SCteDvBAoS1b/view?usp=sharing",
    locationId: 1,
  },
  {
    name: "Fox",
    hp: 3,
    imageUrl:
      "https://drive.google.com/file/d/1DoYMahDkMJl2KNBXKx1Qcb6pT3d-K7o8/view?usp=sharing",
    locationId: 1,
  },
  {
    name: "Armadillo",
    hp: 3,
    imageUrl:
      "https://drive.google.com/file/d/1XKC0csyHcVTnY8iQdEQg_8w83MJsDmcQ/view?usp=sharing",
    locationId: 2,
  },
  {
    name: "Snake",
    hp: 3,
    imageUrl:
      "https://drive.google.com/file/d/1W37gswgJg6iBAU57x3qB_qe6q7aDFsv_/view?usp=sharing",
    locationId: 2,
  },
  {
    name: "Hawk",
    hp: 3,
    imageUrl:
      "https://drive.google.com/file/d/1aTKN7SvFrQUxspoWNy77FU9YCAZ2B_3W/view?usp=sharing",
    locationId: 2,
  },
  {
    name: "Stray Animal",
    hp: 3,
    imageUrl:
      "https://drive.google.com/file/d/1IhSEKmFPVmUNKEZvfjqZoQ93btmFJVXA/view?usp=sharing",
    locationId: 3,
  },
  {
    name: "Rat",
    hp: 3,
    imageUrl:
      "https://drive.google.com/file/d/1YVUPmpamGXifX-KAJPYIlrttmI9xQhv-/view?usp=sharing",
    locationId: 3,
  },
  {
    name: "Aggressive Kid",
    hp: 3,
    imageUrl:
      "https://drive.google.com/file/d/1BcUALURFcieyxTE9ryUTwDfNC9IltVfU/view?usp=sharing",
    locationId: 3,
  },
];

function withEnemyImage(enemy) {
  const seededEnemy = enemies.find(
    ({ name, locationId }) =>
      name === enemy.name && locationId === enemy.location_id,
  );

  return {
    ...enemy,
    image_url: enemy.image_url ?? seededEnemy?.imageUrl,
  };
}

export async function createEnemy(name, hp, imageUrl, locationId) {
  const sql = `
    INSERT INTO enemies
        (name, hp, image_url, location_id)
    VALUES
        ($1, $2, $3, $4)
    `;
  const {
    rows: [enemy],
  } = await db.query(sql, [name, hp, imageUrl, locationId]);
  return enemy;
}

export async function getAllEnemies() {
  const sql = `
    SELECT *
    FROM enemies
    `;
  const {
    rows: [enemies],
  } = await db.query(sql);
  return enemies;
}
export async function getEnemyById(id) {
  const sql = `
    SELECT *
    FROM enemies
    WHERE id = $1
    `;
  const {
    rows: [enemy],
  } = await db.query(sql, [id]);
  return enemy;
}

export async function getEnemiesByLocationId(id) {
  const sql = `
    SELECT *
    FROM enemies
    WHERE location_id = $1
    `;
  const { rows: enemyRows } = await db.query(sql, [id]);
  return enemyRows.map(withEnemyImage);
}
