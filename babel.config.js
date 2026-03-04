module.exports = {

    presets: [
        [
            '@babel/preset-env',
            {
                exclude: ["@babel/plugin-transform-named-capturing-groups-regex"]
            }
        ],
        ["@babel/preset-react", { "runtime": "automatic" }]
    ]

}
