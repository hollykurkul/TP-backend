import db from "#db/client";

export const itemCatalog = [
  {
    name: "Little Stick",
    type: "Weapon",
    effect: "1d4 damage",
    description: "a small stick, pointy at the tip. ouch!",
    imageUrl:
      "https://game-icons.net/icons/ffffff/000000/1x1/delapouite/wood-stick.png",
    canEquip: true,
    canUse: false,
    locationId: 1,
  },
  {
    name: "Big Branch",
    type: "Weapon",
    effect: "1d6 Damage",
    description: "A sturdy branch, perfect for a makeshift club.",
    imageUrl:
      "https://game-icons.net/icons/ffffff/000000/1x1/lorc/tree-branch.png",
    canEquip: true,
    canUse: false,
    locationId: 1,
  },
  {
    name: "Twig Blade",
    type: "Weapon",
    effect: "1d6 damage",
    description: "A polished wooden blade, light enough for quick strikes.",
    imageUrl:
      "https://game-icons.net/icons/ffffff/000000/1x1/delapouite/two-handed-sword.png",
    canEquip: true,
    canUse: false,
    locationId: 1,
  },
  {
    name: "Berries",
    type: "Consumable",
    effect: "Restores 1 heart",
    description: "A handful of juicy berries. Naturally sweet and filling.",
    imageUrl:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1529636988062531745/berries.png?ex=6a62a8f5&is=6a615775&hm=faa74ee02e98ef342c406bb9a5168d3651936b0d4cef6ce9b686ed1044a7b40b",
    canEquip: false,
    canUse: true,
    locationId: 1,
  },
  {
    name: "Fish",
    type: "Consumable",
    effect: "Restores 2 hearts",
    description: "A fresh fish, still wriggling. It smells of the stream.",
    imageUrl:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1529637022145314957/fish.png?ex=6a62a8fd&is=6a61577d&hm=449fb1975ce6cb0083306d68c15e494871644b1ec4f968cd2a3a8701196e6ab7",
    canEquip: false,
    canUse: true,
    locationId: 1,
  },
  {
    name: "Apple",
    type: "Consumable",
    effect: "Restores 1 heart",
    description: "A crisp, red apple. Sweet and satisfying.",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/067/874/485/small/fresh-red-apple-with-green-leaf-free-png.png",
    canEquip: false,
    canUse: true,
    locationId: 1,
  },
  {
    name: "Stop Sign",
    type: "Weapon",
    effect: "1d8 damage",
    description: "A fallen stop sign, rusted and weathered.",
    imageUrl:
      "https://game-icons.net/icons/ffffff/000000/1x1/delapouite/stop-sign.png",
    canEquip: true,
    canUse: false,
    locationId: 2,
  },
  {
    name: "Rock",
    type: "Weapon",
    effect: "1d4 damage",
    description: "A smooth, round stone. Perfect for throwing.",
    imageUrl: "https://images.fallout.wiki/3/3a/FO76WA_Pet_rock.png",
    canEquip: true,
    canUse: false,
    locationId: 2,
  },
  {
    name: "Pocket Sand",
    type: "Consumable",
    effect: "Blinds an enemy for 1 turn",
    description: "A small pouch of fine sand. Useful for distracting foes.",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/035/320/452/small/ai-generated-sand-pile-isolated-on-transparent-background-png.png",
    canEquip: false,
    canUse: true,
    locationId: 2,
  },
  {
    name: "Cactus Fruit",
    type: "Consumable",
    effect: "Restores 1 heart",
    description:
      "A spiky fruit that yields a sweet, refreshing juice. its the quenchiest",
    imageUrl:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1529637115657453568/cactusfruit.png?ex=6a62a913&is=6a615793&hm=6eebaefa070cbd75412cb1df2372612523d0e83d7c75ab208da920a1aea6d48a",
    canEquip: false,
    canUse: true,
    locationId: 2,
  },
  {
    name: "Water Bottle",
    type: "Consumable",
    effect: "Restores 2 heart",
    description: "An abandoned bottle filled with clean water.",
    imageUrl:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1529637152525127692/waterbottle.png?ex=6a62a91c&is=6a61579c&hm=01d8821f2214c5dd24d1513c3ae09e7b2280a17e0bc3bd4fbad07a35992932e8",
    canEquip: false,
    canUse: true,
    locationId: 2,
  },
  {
    name: "Road Kill",
    type: "Consumable",
    effect: "Restores 1 heart",
    description:
      "A small body of an animal that has been hit by a vehicle. still warm",
    imageUrl:
      "https://www.clipartmax.com/png/full/91-917882_dead-clipart-dead-mouse-dead-animal-cartoon-png.png",
    canEquip: false,
    canUse: true,
    locationId: 2,
  },
  {
    name: "Lead Pipe",
    type: "Weapon",
    effect: "1d8 damage",
    description: "A heavy pipe, useful for striking enemies.",
    imageUrl: "https://images.fallout.wiki/2/23/Lead_pipe.png",
    canEquip: true,
    canUse: false,
    locationId: 3,
  },
  {
    name: "Walking Stick",
    type: "Weapon",
    effect: "1d4 damage",
    description: "A simple stick, useful for support and striking.",
    imageUrl:
      "https://game-icons.net/icons/ffffff/000000/1x1/lorc/wizard-staff.png",
    canEquip: true,
    canUse: false,
    locationId: 3,
  },
  {
    name: "Moon Ball",
    type: "Weapon",
    effect: "1d6 damage",
    description:
      "A very bouncy ball. Never fails to bounce back to the thrower.",
    imageUrl:
      "https://dischub.com/cdn/shop/files/moon-ball-blue.png?v=1693274777&width=1445",
    canEquip: true,
    canUse: true,
    locationId: 3,
  },
  {
    name: "Fast Food Bag",
    type: "Consumable",
    effect: "Restores 1 heart",
    description:
      "A bag of fast food. Not very nutritious, but filling and delicious.",
    imageUrl:
      "https://cdn.discordapp.com/attachments/1523867510359720010/1529637392548495543/fastfoodbag.png?ex=6a62a955&is=6a6157d5&hm=195cc86187fd03fb599a8c06f9051e1bfcb26ce72c11fdec0ca53930c85339e0",
    canEquip: false,
    canUse: true,
    locationId: 3,
  },
  {
    name: "Lunch Box",
    type: "Consumable",
    effect: "Restores 2 hearts",
    description:
      "A packed lunch box with a variety of food items. A hearty meal for the journey.",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/045/547/171/small/choosing-the-perfect-lunch-box-for-any-occasion-free-png.png",
    canEquip: false,
    canUse: true,
    locationId: 3,
  },
  {
    name: "Thrown Out Food",
    type: "Consumable",
    effect: "Restores 1 heart",
    description:
      "A piece of food that has been discarded in the dump. Still edible, but not very appetizing.",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/033/293/177/small/food-waste-isolated-on-transparent-generative-ai-free-png.png",
    canEquip: false,
    canUse: true,
    locationId: 3,
  },
];

export async function createItem(
  name,
  type,
  effect,
  description,
  imageUrl,
  canEquip,
  canUse,
  locationId,
) {
  const sql = `
    INSERT INTO item_catalog
        (name, type, effect, description, image_url, can_equip, can_use, location_id)
    VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
    `;
  const {
    rows: [item],
  } = await db.query(sql, [
    name,
    type,
    effect,
    description,
    imageUrl,
    canEquip,
    canUse,
    locationId,
  ]);
  return item;
}

export async function getItems() {}
