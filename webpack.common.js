const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * Some options are put in comments as they're for frontend only version, for frontend-backend, we prefer write
 * a nodejs appli that permits also database and routing configurations
 */

const public = path.resolve(__dirname, 'public');



module.exports = {
    
    output: {
        filename: '[name].js',
        path: public,
        //publicPath: '/demo/'
    },
    
    
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env', 
                            '@babel/preset-react', {
                                'plugins': ['@babel/plugin-proposal-class-properties']
                            }
                        ]
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|ico)(\?[a-z0-9=.]+)?$/,
                loader: 'url-loader?limit=100000' 
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                type: 'javascript/auto'
            }
        ]
            
    }
};

