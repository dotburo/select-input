import pkg from './package.json';
import {terser} from 'rollup-plugin-terser';

export default [{
    input: 'src/select-input.js',
    output: [{
        file: 'dist/select-input-min.js',
        format: 'es',
        name: 'SelectInput',
        banner: `/*! ${pkg.name} ${pkg.version} | ${pkg.author} !*/`,
        sourcemap: true
    }],
    plugins: [
        terser()
    ]
}];
