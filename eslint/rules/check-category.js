export default {

    meta: {

        type: "suggestion",

        schema: []

    },



    create(context) {

        const sourceCode = context.sourceCode;



        function getJsdoc(node) {

            // get all comments
            const jsdoc = sourceCode.getAllComments();



            // reverse so closest comments are checked first
            return [...jsdoc].reverse().find(comment =>

                comment.range[1] <= node.range[0] &&

                comment.type === "Block" &&

                comment.value.startsWith("*")

            );

        }



        function check(node) {

            const jsdoc = getJsdoc(node);



            if (!jsdoc) return;



            if (!jsdoc.value.includes("@category")) {

                context.report({

                    node,

                    message: "Documented item is missing @category tag"

                });

            }

        }



        return {

            FunctionDeclaration(node) {

                check(node);

            },



            VariableDeclarator(node) {

                /*
                * Ignore nested variables/functions
                * inside other functions/components.
                */

                if (
                    node.parent?.parent?.type !== "Program" &&
                    node.parent?.parent?.type !== "ExportNamedDeclaration"
                ) {

                    return;

                }



                if (

                    node.init &&

                    (

                        node.init.type === "ArrowFunctionExpression" ||

                        node.init.type === "FunctionExpression"

                    )

                ) {

                    check(node);

                }

            },



            ClassDeclaration(node) {

                check(node);

            }

        };

    }

};