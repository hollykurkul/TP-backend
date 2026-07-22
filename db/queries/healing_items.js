import db from "#db/client";

export const healingItems = [
  {
    name: "Berries",
    healingAmount: 1,
    description: "A handful of juicy berries. Naturally sweet and filling.",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/053/811/570/small/3d-render-of-juicy-purple-berries-png.png",
    locationId: 1,
  },
  {
    name: "Fish",
    healingAmount: 2,
    description: "A fresh fish, still wriggling. It smells of the stream.",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/048/718/584/small/fish-on-transparent-background-free-png.png",
    locationId: 1,
  },
  {
    name: "Apple",
    healingAmount: 1,
    description: "A crisp, red apple. Sweet and satisfying.",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/067/874/485/small/fresh-red-apple-with-green-leaf-free-png.png",
    locationId: 1,
  },
  {
    name: "Cactus Fruit",
    healingAmount: 1,
    description:
      "A spiky fruit that yields a sweet, refreshing juice. its the quenchiest",
    imageUrl:
      "https://www.havlikovaapoteka.cz/user/articles/images/opuncie--mucosave___.png",
    locationId: 2,
  },
  {
    name: "Water Bottle",
    healingAmount: 2,
    description: "An abandoned bottle filled with clean water.",
    imageUrl:
      "https://png.pngtree.com/png-vector/20250325/ourmid/pngtree-water-bottle-png-image_15868794.png",
    locationId: 2,
  },
  {
    name: "Road Kill",
    healingAmount: 1,
    description:
      "A small body of an animal that has been hit by a vehicle. still warm",
    imageUrl:
      "https://www.clipartmax.com/png/full/91-917882_dead-clipart-dead-mouse-dead-animal-cartoon-png.png",
    locationId: 2,
  },
  {
    name: "Fast Food Bag",
    healingAmount: 1,
    description:
      "A bag of fast food. Not very nutritious, but filling and delicious.",
    imageUrl:
      "https://www.pngarts.com/files/7/Paper-Bag-McDonalds-Bag-Vector-PNG.png",
    locationId: 3,
  },
  {
    name: "Lunch Box",
    healingAmount: 2,
    description:
      "A packed lunch box with a variety of food items. A hearty meal for the journey.",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/045/547/171/small/choosing-the-perfect-lunch-box-for-any-occasion-free-png.png",
    locationId: 3,
  },
  {
    name: "Thrown Out Food",
    healingAmount: 1,
    description:
      "A piece of food that has been discarded in the dump. Still edible, but not very appetizing.",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/033/293/177/small/food-waste-isolated-on-transparent-generative-ai-free-png.png",
    locationId: 3,
  },
];

export async function createHealingItem(
  name,
  healingAmount,
  description,
  imageUrl,
  locationId,
) {
  const sql = `
    INSERT INTO healing_items
        (name, healing_amount, description, image_url, location_id)
    VALUES
        ($1, $2, $3, $4, $5)
    `;
  const {
    rows: [healingItem],
  } = await db.query(sql, [
    name,
    healingAmount,
    description,
    imageUrl,
    locationId,
  ]);
  return healingItem;
}

export async function getHealingItemById(id) {
  const sql = `
    SELECT *
    FROM healing_items
    WHERE id = $1
    `;
  const {
    rows: [healingItem],
  } = await db.query(sql, [id]);
  return healingItem;
}

export async function getHealingItemsByLocationId(id) {
  const sql = `
    SELECT *
    FROM healing_items
    WHERE location_id = $1
    `;
  const {
    rows: [healingItems],
  } = await db.query(sql, [id]);
  return healingItems;
}
