import db from "#db/client";

export async function createStoryChoice(
    StoryNodeId,
    label,
    choiceText,
    nextNodeId,
    sortOrder,
) {
    const sql =`
        INSERT INTO story_choices
            (story_node_id, label, choice_text, next_node_id, sort_order)
            VALUES
            ($1, $2, $3, $4, $5)
        `;
    const { rows: [storyChoice],
    } = await db.query(sql, [StoryNodeId, label, choiceText, nextNodeId, sortOrder]);
return storyChoice;
}

export async function getAllStoryChoices() {
    const sql = `
        SELECT * FROM story_choices
        `;
    const { rows: storyChoices } = await db.query(sql);
return storyChoices;
}