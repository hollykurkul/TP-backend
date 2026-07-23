import db from "#db/client";

export const characters = [
  {
    name: "Stan",
    animalType: "Chameleon",
    description:
      " A small yet mighty adventurer who doesn't back down from a fight, however his aim when catching prey could use some work",
    imageUrl:
      "https://drive.google.com/file/d/1bftNpf70FfNO1f_iyklIZrrRZs1-vv7J/view?usp=sharing",
  },
  {
    name: "Athena",
    animalType: "Dog",
    description:
      "A fur missile with limitless energy, a sharp mind, and a knack for finding trouble, she wont stop until she completes whatever task is set before her.",
    imageUrl:
      "https://drive.google.com/file/d/1ukUMYc0Y0alQtdlWLl13egNUg5DX0G0v/view?usp=sharing",
  },
  {
    name: "Tray",
    animalType: "Dog",
    description:
      "A loyal, intelligent and protective companion with playful spirit. Always ready for the next adventure.",
    imageUrl:
      "https://drive.google.com/file/d/1GaaqupMAtiUv6RHJgThs0KkXu2_2w_94/view?usp=sharing",
  },
  {
    name: "Opie",
    animalType: "Cat",
    description:
      "As affectionate as he is clever, this tuxedo balances a brilliant and calculating mind with a deeply loving heart. Always figuring out the smartest way to handle trouble, but just as quick to cuddle up when the dust settles!",
    imageUrl:
      "https://drive.google.com/file/d/1GGzN-grTVnrdAMTb5oPNHJE-9GSyrYSf/view?usp=sharing",
  },
  {
    name: "Ajax",
    animalType: "Cat",
    description:
      "A wild little spitfire with boundless energy. He's a little stinker, but he'll steal your heart!",
    imageUrl:
      "https://drive.google.com/file/d/1IqnGUMki8WyczNZm5hG8S3_p4VU8F68u/view?usp=sharing",
  },
  {
    name: "Lincoln",
    animalType: "Dog",
    description:
      "A total wildcard, Lincoln excels at making a class about web development feel fresh and exciting with every appearance.",
    imageUrl:
      "https://drive.google.com/file/d/1QSSDKwFdgTHJKzCqZmhh6CgtOzisCs98/view?usp=sharing",
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
