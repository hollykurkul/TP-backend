import db from "#db/client";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");
import { createCharacter, characters } from "#db/queries/characters";
import { createEnemy, enemies } from "#db/queries/enemies";
import { createBoss, bosses } from "#db/queries/bosses";
import { createWeapon, weapons } from "#db/queries/weapons";
import { createHealingItem, healingItems } from "#db/queries/healing_items";
import { createLocation, locations } from "#db/queries/locations";
async function seed() {
  for (const character of characters) {
    await createCharacter(
      character.name,
      character.animalType,
      character.description,
      character.imageUrl,
    );
  }
  for (const location of locations) {
    await createLocation(
      location.name,
      location.hub,
      location.rest,
      location.combat,
    );
  }
  for (const enemy of enemies) {
    await createEnemy(enemy.name, enemy.hp, enemy.locationId);
  }
  for (const boss of bosses) {
    await createBoss(boss.name, boss.hp, boss.locationId);
  }
  for (const weapon of weapons) {
    await createWeapon(
      weapon.name,
      weapon.damage,
      weapon.description,
      weapon.imageUrl,
      weapon.locationId,
    );
  }
  for (const item of healingItems) {
    await createHealingItem(
      item.name,
      item.healingAmount,
      item.description,
      item.imageUrl,
      item.locationId,
    );
  }
}
