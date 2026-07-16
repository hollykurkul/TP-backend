import db from "#db/client";

export async function getAllCharacters() {
    const sql = `
        SELECT * FROM characters;
        `;
        const {rows: characters} = await db.query(sql);
    return characters;
}

export async function getCharacterById(id) {
    const sql = `
        SELECT * FROM characters WHERE id = $1;
        `;
        const {rows: [character]} = await db.query(sql, [id]);
    return character;
}

export async function createCharacter(character) {
    const sql = `
        INSERT INTO characters (name, animal_type, description)
        VALUES ($1, $2, $3)
        RETURNING *;
        `;
        const {rows:[characters]} = await db.query(sql, [character.name, character.animal_type, character.description]);
    return characters;
}