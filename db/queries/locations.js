import db from "#db/client";

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
