import jsdoc from "eslint-plugin-jsdoc";
import typedocPlugin from "eslint-plugin-typedoc";
import tsdoc from "eslint-plugin-tsdoc";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

import checkSince from "./eslint/rules/check-since.js";
import checkCategory from "./eslint/rules/check-category.js";
import path from "path"

import { fileURLToPath } from "url"



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


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
                },
                project: "./tsconfig.json",
                tsconfigRootDir: __dirname,
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
            tsdoc,
            typedoc: typedocPlugin,
            "@typescript-eslint": tseslint
        },

        rules: {

            /**
             * Force require documentation everywhere.
             * 
             * As only ts/tsx files are included, this rule is enforced. Intent
             * is that anything a developer would require information on be
             * within the API docs.
             */
            "jsdoc/require-jsdoc": [
                "error",
                {
                    "publicOnly": true,
                    "contexts": [
                        "ExportNamedDeclaration",
                        "TSInterfaceDeclaration",
                        "TSTypeAliasDeclaration",
                        "ClassDeclaration",
                        "FunctionDeclaration",
                        "MethodDefinition",
                        "VariableDeclaration"
                        ]
                }
            ],

            // ✅ ONLY validate existing JSDoc blocks
            "jsdoc/check-alignment": "error",
            "jsdoc/check-param-names": "error",
            "typedoc/require-since-tag-description": "error",
            "jsdoc/check-tag-names": "off",    // Conflicts with TSDoc standard.
            "jsdoc/check-types": "error",
            "jsdoc/check-indentation": "error",

            // ✅ Ensure correctness when tags exist
            "jsdoc/require-param-name": "error",
            "jsdoc/require-param-description": "error",
            "jsdoc/require-returns-description": "off",

            "custom/check-category": "error",
            "custom/check-since": "error",

            // Always

            'tsdoc/syntax': 'warn',

            "typedoc/no-unknown-tags": [
                "error",
                {
                    additionalTags: [
                        "requires"
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