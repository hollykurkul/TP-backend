import db from "#db/client";

export const weapons = [
  {
    name: "Little Stick",
    damage: 1,
    description: "A small stick, pointy at the tip. ouch!",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/055/079/271/small/thin-wooden-stick-with-rustic-texture-free-png.png",
    locationId: 1,
  },
  {
    name: "Big Branch",
    damage: 1,
    description: "A sturdy branch, perfect for a makeshift club.",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/050/768/669/small/tree-branch-isolated-on-transparent-background-png.png",
    locationId: 1,
  },
  {
    name: "The Twig Blade",
    damage: 1,
    description: "",
    imageUrl: "",
    locationId: 1,
  },
  {
    name: "Stop Sign",
    damage: 1,
    description: "A fallen stop sign, rusted and weathered.",
    imageUrl:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/acb5cb15-636b-4bd5-a06e-a62420c5fb7f/db9ryel-b6cd963e-af04-474e-a2e0-091f26cbc12d.png/v1/fill/w_1024,h_2977/stop_signs_png_by_kooyooss_db9ryel-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9Mjk3NyIsInBhdGgiOiIvZi9hY2I1Y2IxNS02MzZiLTRiZDUtYTA2ZS1hNjI0MjBjNWZiN2YvZGI5cnllbC1iNmNkOTYzZS1hZjA0LTQ3NGUtYTJlMC0wOTFmMjZjYmMxMmQucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.qWoo4rbj18Vq8AN3Iwp2k6l8UpU7IEd9md7-nqfCxlQ",
    locationId: 2,
  },
  {
    name: "Rock",
    damage: 1,
    description: "A smooth, round stone. Perfect for throwing.",
    imageUrl: "https://images.fallout.wiki/3/3a/FO76WA_Pet_rock.png",
    locationId: 2,
  },
  {
    name: "Pocket Sand",
    damage: 1,
    description: "A small pouch of fine sand. Useful for distracting foes.",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/035/320/452/small/ai-generated-sand-pile-isolated-on-transparent-background-png.png",
    locationId: 2,
  },
  {
    name: "Lead Pipe",
    damage: 1,
    description: "A heavy pipe, useful for striking enemies.",
    imageUrl: "https://images.fallout.wiki/2/23/Lead_pipe.png",
    locationId: 3,
  },
  {
    name: "Walking Stick",
    damage: 1,
    description: "A simple stick, useful for support and striking.",
    imageUrl:
      "https://pngimg.com/uploads/walking_stick/walking_stick_PNG33.png",
    locationId: 3,
  },
  {
    name: "Moon Ball",
    damage: 1,
    description:
      "A very bouncy ball. Never fails to bounce back to the thrower.",
    imageUrl:
      "https://dischub.com/cdn/shop/files/moon-ball-blue.png?v=1693274777&width=1445",
    locationId: 3,
  },
];

export async function createWeapon(
  name,
  damage,
  description,
  imageUrl,
  locationId,
) {
  const sql = `
    INSERT INTO weapons
        (name, damage, description, image_url, location_id)
    VALUES
        ($1, $2, $3, $4, $5)
    RETURNING *
    `;
  const {
    rows: [weapon],
  } = await db.query(sql, [name, damage, description, imageUrl, locationId]);
  return weapon;
}

export async function getWeaponById(id) {
  const sql = `
    SELECT *
    FROM weapons
    WHERE id = $1
    `;
  const {
    rows: [weapon],
  } = await db.query(sql, [id]);
  return weapon;
}

export async function getWeaponsByLocationId(id) {
  const sql = `
    SELECT *
    FROM weapons
    WHERE location_id = $1
    `;
  const {
    rows: [weapons],
  } = await db.query(sql, [id]);
  return weapons;
}
