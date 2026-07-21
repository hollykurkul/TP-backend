import db from "#db/client";

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
