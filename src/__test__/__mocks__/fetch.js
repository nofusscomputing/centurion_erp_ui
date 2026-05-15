import "../../../public/assets/js/env"


import fs from 'fs/promises';

global.fetch = jest.fn(async (src) => {

    const filePath = String(src);

    let data;

    try {
        data = await fs.readFile(filePath, 'utf-8');
    } catch (err) {
        return {
            ok: false,
            status: 404,
            text: async () => `File not found: ${filePath}`
        };
    }

    return {
        ok: true,
        status: 200,
        text: async () => data,
        json: async () => JSON.parse(data)
    };
});
