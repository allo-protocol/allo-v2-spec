module.exports = {
    options: {
        connection: process.env.SPEC_DATABASE_URL,
        host: process.env.SPEC_GRAPH_HOST || 'localhost',
        port: process.env.SPEC_GRAPH_PORT || 5555,
        graphql: '/graphql',
        schema: ['public'],
        watch: true,
        defaultRole: 'spec',
        skipPlugins: 'graphile-build:NodePlugin',
        appendPlugins: [
            '@graphile-contrib/pg-simplify-inflector',
        ],
        simpleCollections: 'only',
        dynamicJson: true,
        ignoreIndexes: false,
        extendedErrors: ['errcode'],
        enableQueryBatching: true,
        graphileBuildOptions: {
            pgOmitListSuffix: true,
        },
    },
}