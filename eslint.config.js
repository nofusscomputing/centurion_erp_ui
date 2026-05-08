import jsdoc from "eslint-plugin-jsdoc";
import typedocPlugin from "eslint-plugin-typedoc";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

import checkSince from "./eslint/rules/check-since.js";
import checkCategory from "./eslint/rules/check-category.js";



export default [
    {
        ignores: [
            "**/*.js",
            "**/*.jsx"
        ]
    },
    {
    //    files: ["**/*.{js,jsx,ts,tsx}"],
       files: ["**/*.{ts,tsx}"],


    

        languageOptions: {

            parser: tsparser,

            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true
                }
            }
        },

        plugins: {
            custom: {
                rules: {
                    "check-category": checkCategory,
                    "check-since": checkSince
                }
            },
            jsdoc,
            typedoc: typedocPlugin,
            "@typescript-eslint": tseslint
        },

        rules: {

            // ❌ DO NOT require JSDoc everywhere
            "jsdoc/require-jsdoc": "off",

            // ✅ ONLY validate existing JSDoc blocks
            "jsdoc/check-alignment": "error",
            "jsdoc/check-param-names": "error",
            "custom/check-category": "error",
            "custom/check-since": "error",
            "typedoc/require-since-tag-description": "error",
            "jsdoc/check-tag-names": "error",
            "jsdoc/check-types": "error",
            "jsdoc/check-indentation": "error",

            // ✅ Ensure correctness when tags exist
            "jsdoc/require-param-name": "error",
            "jsdoc/require-param-description": "error",
            "jsdoc/require-returns-description": "off",

            // optional stricter checks
            "jsdoc/no-undefined-types": "error",

            // Always

            "typedoc/no-unknown-tags": [
                "error",
                {
                    additionalTags: [
                        // "customTag",
                    ]
                },
            ],

        },

        settings: {
            jsdoc: {
                mode: "typescript"
            }
        }
    }
];