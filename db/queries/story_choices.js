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
    const { rows: [storyChoices] } = await db.query(sql);
return storyChoices;
}

export async function getStoryChoiceById(id) {
    const sql = `
        SELECT * FROM story_choices
        WHERE id= $1
        `;
    const { rows: [storyChoice] } = await db.query(sql, [id]);
return storyChoice;
}

export async function getStoryChoicesByStoryNodeId(storyNodeId) {
    const sql = `
        SELECT * FROM story_choices
        WHERE story_node_id = $1
        `;
    const { rows: [storyChoices] } = await db.query(sql, [storyNodeId]);
return storyChoices;
}

export async function updateStoryChoice(id, StoryNodeId, label, choiceText, nextNodeId, sortOrder) {
    const sql = `
        UPDATE story_choices
        SET story_node_id = $2,
            label = $3,
            choice_text = $4,
            next_node_id = $5,
            sort_order = $6
        WHERE id = $1
        RETURNING *
        `;
    const { rows: [storyChoice] } = await db.query(sql, [id, StoryNodeId, label, choiceText, nextNodeId, sortOrder]);
return storyChoice;
}

export async function deleteStoryChoice(id) {
    const sql = `
        DELETE FROM story_choices
        WHERE id= $1
        `;
    const { rows: [storyChoice] } = await db.query(sql, [id]);
return rows[0] || null;
}

