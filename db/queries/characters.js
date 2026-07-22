import db from "#db/client";

export const characters = [
  {
    name: "Stan",
    animalType: "Chameleon",
    description:
      " A small yet mighty adventurer who doesn't back down from a fight, however his aim when catching prey could use some work",
    imageUrl:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1526381949013196920/37210721-F4C9-4BC3-AF43-253F7D6E7D1E.png?ex=6a56d177&is=6a557ff7&hm=85521e0d88811c791f494e63474dddd81cc23f32770dff2e06b9447f04aac5a5&",
  },
  {
    name: "Athena",
    animalType: "Dog",
    description:
      "A fur missile with limitless energy, a sharp mind, and a knack for finding trouble, she wont stop until she completes whatever task is set before her.",
    imageUrl:
      "https://media.discordapp.net/attachments/1523867510359720010/1526952398076252212/05D812C0-54F9-4056-8032-12EF1AE73DAF.png?ex=6a621f3d&is=6a60cdbd&hm=c0d7dc3a42c1bf8ef2c0e589bd2780e709fb7a92dcf231956033134f193e3331&=&format=webp&quality=lossless&width=890&height=890",
  },
  {
    name: "Tray",
    animalType: "Dog",
    description:
      "A loyal, intelligent and protective companion with playful spirit. Always ready for the next adventure.",
    imageUrl:
      "https://media.discordapp.net/attachments/1523867510359720010/1526952446759534797/295A859A-F2E7-4DC2-89C6-6774B57F5151.png?ex=6a621f48&is=6a60cdc8&hm=afdfd23fc9cda7640b64f49a18bd9d2c6163a524a04eea0a4576daad17e0742a&=&format=webp&quality=lossless&width=890&height=890",
  },
  {
    name: "Opie",
    animalType: "Cat",
    description:
      "As affectionate as he is clever, this tuxedo balances a brilliant and calculating mind with a deeply loving heart. Always figuring out the smartest way to handle trouble, but just as quick to cuddle up when the dust settles!",
    imageUrl:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1526381991862472704/1225AD3D-7550-4EEE-8ADC-866AE00EF7DC.png?ex=6a620641&is=6a60b4c1&hm=919db7ddd0129dc7d46956e9fd277eabb444920bb8b707da14a078d89c9ea58a",
  },
  {
    name: "Ajax",
    animalType: "Cat",
    description:
      "A wild little spitfire with boundless energy. He's a little stinker, but he'll steal your heart!",
    imageUrl:
      "https://media.discordapp.net/attachments/1523867510359720010/1524943777134018631/Ajax_asset.png?ex=6a6210d0&is=6a60bf50&hm=c13701aea2c0b8565ba7dbf6c89ce08974c633d029d6f49b80ffa799900ecbf4&=&format=webp&quality=lossless&width=890&height=890",
  },
  {
    name: "Lincoln",
    animalType: "Dog",
    description:
      "A total wildcard, Lincoln excels at making a class about web development feel fresh and exciting with every appearance.",
    imageUrl:
      "https://media.discordapp.net/attachments/1523867510359720010/1528940102078824568/8E5A8CC3-D1F7-499B-8AAE-D63A44975F74.png?ex=6a621a2e&is=6a60c8ae&hm=c516a6d0f0718d95c6c28f756f93d1a12c76be3544e16b9d3b7f2fd5d56ff23f&=&format=webp&quality=lossless&width=890&height=890",
  },
];

export async function createCharacter(
  name,
  animal_type,
  description,
  imageUrl,
) {
  const sql = `
        INSERT INTO characters (name, animal_type, description, image_url)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `;
  const {
    rows: [character],
  } = await db.query(sql, [name, animal_type, description, imageUrl]);
  return character;
}

export async function getAllCharacters() {
  const sql = `
        SELECT * FROM characters;
        `;
  const { rows: characters } = await db.query(sql);
  return characters;
}

export async function getCharacterById(id) {
  const sql = `
        SELECT * FROM characters WHERE id = $1;
        `;
  const {
    rows: [character],
  } = await db.query(sql, [id]);
  return character;
}
