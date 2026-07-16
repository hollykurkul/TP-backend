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
