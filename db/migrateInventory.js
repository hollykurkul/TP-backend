import db from "#db/client";
import { itemCatalog } from "#db/queries/items";

await db.connect();

try {
  await db.query("BEGIN");
  await db.query(`
    CREATE TABLE IF NOT EXISTS item_catalog (
      id serial PRIMARY KEY,
      name text NOT NULL,
      type text NOT NULL,
      effect text NOT NULL,
      description text NOT NULL,
      image_url text NOT NULL,
      can_equip boolean NOT NULL DEFAULT false,
      can_use boolean NOT NULL DEFAULT false,
      location_id integer NOT NULL REFERENCES locations(id) ON DELETE CASCADE
    )
  `);
  await db.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS item_catalog_name_location_idx
    ON item_catalog (name, location_id)
  `);
  await db.query(`
    CREATE TABLE IF NOT EXISTS user_inventory (
      id serial PRIMARY KEY,
      user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      item_id integer REFERENCES item_catalog(id) ON DELETE CASCADE
    )
  `);
  await db.query(`
    ALTER TABLE user_inventory
    DROP CONSTRAINT IF EXISTS one_item_type
  `);
  await db.query(`
    ALTER TABLE user_inventory
    ADD COLUMN IF NOT EXISTS item_id integer REFERENCES item_catalog(id) ON DELETE CASCADE
  `);
  await db.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS user_inventory_user_item_idx
    ON user_inventory (user_id, item_id)
    WHERE item_id IS NOT NULL
  `);

  for (const item of itemCatalog) {
    await db.query(
      `
        INSERT INTO item_catalog
          (name, type, effect, description, image_url, can_equip, can_use, location_id)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (name, location_id) DO UPDATE SET
          type = EXCLUDED.type,
          effect = EXCLUDED.effect,
          description = EXCLUDED.description,
          image_url = EXCLUDED.image_url,
          can_equip = EXCLUDED.can_equip,
          can_use = EXCLUDED.can_use
      `,
      [
        item.name,
        item.type,
        item.effect,
        item.description,
        item.imageUrl,
        item.canEquip,
        item.canUse,
        item.locationId,
      ],
    );
  }

  await db.query("COMMIT");
  console.log("Inventory tables migrated and item catalog seeded.");
} catch (error) {
  await db.query("ROLLBACK");
  throw error;
} finally {
  await db.end();
}
