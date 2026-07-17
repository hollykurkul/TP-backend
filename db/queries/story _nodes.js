import db from "#db/client";

export async function createStoryNode(chapter_title, scene_title, body_lines, speaker, dialogue) {
    const sql = `
        INSERT INTO story_nodes (chapter_title, scene_title, body_lines, speaker, dialogue)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `;
        const {rows: [storyNode]} = await db.query(sql, [chapter_title, scene_title, body_lines, speaker, dialogue]);
    return storyNode;
}

export async function getAllStoryNodes() {
    const sql = `
        SELECT * FROM story_nodes;
        `;
        const {rows: storyNodes} = await db.query(sql);
    return storyNodes;
}

export async function getStoryNodeById(id) {
    const sql = `
        SELECT * FROM story_nodes WHERE id = $1;
        `;
        const {rows: [storyNode]} = await db.query(sql, [id]);
    return storyNode;
}