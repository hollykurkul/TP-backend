import db from "#db/client";

export async function createLocation(name, description) {
    const sql = `
        INSERT INTO locations (name, description)
        VALUES ($1, $2)
        RETURNING *;
        `;
        const {rows: [locations]} = await db.query (sql, [name, description]);
    return locations;
}

export async function getAllLocations() {
    const sql = `
        SELECT * FROM locations;
        `;
    const {rows: locations} = await db.query(sql);
return locations;
}

export async function getLocationById(id) {
    const sql = `
        SELECT * FROM locations WHERE id = $1;
        `;
    const {rows: [location]} = await db.query(sql, [id]);
return location;
}