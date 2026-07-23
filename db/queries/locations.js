import db from "#db/client";

export const locations = [
  { name: "Forest", hub: "Pond", rest: "Den", combat: "Clearing" },
  { name: "Road", hub: "Bus Stop", rest: "Rest Stop", combat: "Ditch" },
  { name: "City", hub: "City Park", rest: "Dumpster", combat: "Alleyway" },
];

export async function createLocation(name, hub, rest, combat) {
  const sql = `
        INSERT INTO locations (name, hub, rest, combat)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `;
  const {
    rows: [locations],
  } = await db.query(sql, [name, hub, rest, combat]);
  return locations;
}

export async function getAllLocations() {
  const sql = `
        SELECT * FROM locations;
        `;
  const { rows: locations } = await db.query(sql);
  return locations;
}

export async function getLocationById(id) {
  const sql = `
        SELECT * FROM locations WHERE id = $1;
        `;
  const {
    rows: [location],
  } = await db.query(sql, [id]);
  return location;
}
