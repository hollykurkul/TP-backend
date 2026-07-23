import db from "#db/client";

export const enemies = [
  {
    name: "Rabbit",
    hp: 3,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1529645770784116746/rabbit.png?ex=6a62b123&is=6a615fa3&hm=3c60b304782df0a01e046ebf6ec5e206210fa2e63197877d7fc8db61d88cb63b",
    locationId: 1,
  },
  {
    name: "Squirrel",
    hp: 3,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1529645859384459274/squirrel.png?ex=6a62b138&is=6a615fb8&hm=89acf3cef8b9884c4cb7e7e14f25d100de45ed698e39d2fb5585a67bd21f9411",
    locationId: 1,
  },
  {
    name: "Fox",
    hp: 3,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1529646657388675183/fox.png?ex=6a62b1f6&is=6a616076&hm=9b6a3bdd9950d3821cd738f803c3e9d2732fc85fcf1315ea92c4512c3af17cb6",
    locationId: 1,
  },
  {
    name: "Armadillo",
    hp: 3,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1529647458643214396/Armadillo.png?ex=6a62b2b5&is=6a616135&hm=b616333f48084daeda6d77796d1bb7dbba27bcfabf911efca85aada2fa24feb2",
    locationId: 2,
  },
  {
    name: "Snake",
    hp: 3,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1529649442754400266/snake.png?ex=6a62b48e&is=6a61630e&hm=1372a70048c0f047d2a067a7b783e2f1d0b71cc21d26afdb15386011228dca75",
    locationId: 2,
  },
  {
    name: "Hawk",
    hp: 3,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1529650072806096997/hawk.png?ex=6a62b524&is=6a6163a4&hm=c92c243b5db01dfe790b9c8c3065751ee9b6805f642a8c50157b358cc34c1cd6",
    locationId: 2,
  },
  {
    name: "Stray Animal",
    hp: 3,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1529651584554897659/stray_animal.png?ex=6a62b68d&is=6a61650d&hm=1a62282f83256272153b38ae45818f4990281ac7cfb4a098d2ffe66ffccd5b1a",
    locationId: 3,
  },
  {
    name: "Rat",
    hp: 3,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1529652482861568240/rat.png?ex=6a62b763&is=6a6165e3&hm=82973d349253c8068fa4209f530f13a59a0f806f30ba685f33fd388bae5d7ec6",
    locationId: 3,
  },
  {
    name: "Aggressive Kid",
    hp: 3,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1529653799352795176/aggressive_kid.png?ex=6a62b89d&is=6a61671d&hm=cfe5ccc87bc453ffeff0afb59a9742b2bfd850bd4675ef2cdeebece0087016d3",
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
