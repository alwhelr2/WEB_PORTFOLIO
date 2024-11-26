const path = require( 'path' );
const fs = require( 'fs' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = {
    entry: path.join( __dirname, 'src', 'index.tsx' ),
    devtool: 'inline-source-map',
    mode: 'production',
    target: 'web',
    output: {
        filename: 'bundle.js',
        path:  path.join( __dirname, 'dist' ),
        publicPath: '/'
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    devServer: {
        setupMiddlewares: ( middlewares, devServer ) => {

            if (!devServer) {
                throw new Error('webpack-dev-server is not defined');
            }

            devServer.app.get( '*', ( req, res, next ) => {
                // console.log( `req`, req );
                if ( req.ip !== `::ffff:10.0.0.195` && req.ip !== `::ffff:10.0.0.177` ) console.log( `from ${ req.ip } - ${ req.method } - ${ req.originalUrl }` );
                next();
            } );

            return middlewares;
        },
        historyApiFallback: true,
        // allowedHosts: 'all',
        allowedHosts: [
            'adrianwheeler.tech'
        ],
        server: {
            type: 'https',
            options: {
                key: fs.readFileSync( './public/private.key' ),
                cert: fs.readFileSync( './public/certificate.crt' ),
                ca: fs.readFileSync( './public/ca_bundle.pem' )
            }
        },
        port: 443
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js', '.jsx' ]
    },
    module: {
        rules: [
            // {
            //     test: /\.(ts|tsx)$/,
            //     exclude: /node_modules/,
            //     loader: 'ts-loader'
            // },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin( {
            template: path.join( __dirname, 'public', 'index.html' ),
            favicon: './public/favicon.ico'
        } ),
        new MiniCssExtractPlugin()
    ]
};