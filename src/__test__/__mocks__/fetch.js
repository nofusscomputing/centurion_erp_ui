
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











// import fs from 'fs/promises';
// import path from 'path';



// global.fetch = jest.fn(async (src) => {

//     // resolve the path relative to project root
//     // const filePath = path.resolve(process.cwd(), String(src).split('/src/')[1].replace('', ''));
//     const filePath = String(src);

    

//     let data;

//     try {

//         data = await fs.readFile(filePath, 'utf-8');

//     } catch (err) {

//         throw new Error(`File not found: ${filePath}`);

//     }



//     // minimal Response-like object that has .text()
//     return {
//         text: async () => data
//     };

// });





// import fs from 'fs/promises'

// import path from 'path'



// global.fetch = jest.fn(async (src, headers) => {

//     if (typeof src !== 'string') {

//         throw new Error('Only string URLs supported in mock')

//     }



//     // strip leading slash → make relative
//     const cleanPath = url.replace(/^\/+/, '')



//     // resolve relative to project root (or adjust if needed)
//     const filePath = path.resolve(process.cwd(), cleanPath)



//     let data

//     try {

//         data = await fs.readFile(filePath)

//     } catch (err) {

//         return {

//             ok: false,

//             status: 404,

//             text: async () => '',

//             json: async () => { throw new Error('Not found') }

//         }

//     }



//     return {

//         ok: true,

//         status: 200,



//         text: async () => data.toString(),



//         json: async () => JSON.parse(data.toString())

//     }

// })


// import fs from 'fs/promises'

// import path from 'path'



// global.fetch = jest.fn(async (url) => {

//     const filePath = path.resolve(process.cwd(), url.replace('/assets', '/home/sysadmin/git/centurion-erp-ui/src/images/'))



//     const data = await fs.readFile(filePath)



//     return {

//         ok: true,

//         status: 200,



//         // RAW accessors (like real fetch)
//         text: async () => data.toString(),

//         json: async () => JSON.parse(data.toString()),

//         arrayBuffer: async () => data,



//         // optional: mimic real Response a bit closer
//         headers: {

//             get: () => null

//         }

//     }

// })
