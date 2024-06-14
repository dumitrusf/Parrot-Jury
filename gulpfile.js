// importa la fuente(src) y el destino (dist) desde el script del package.json gulp
import {src, dest, watch, series} from 'gulp';
//  parallel en vez de series para correr todo

// tráeme toda la dependencia de sass pero ese paquete que traeremos se llamara dartSass
import * as dartSass from 'sass'; 

// traeme la dependencia de gulp-sass (es decir extraemos tambien gulpSass y ...)
import gulpSass from 'gulp-sass';


// ... y lo que hacemos es unirlas en una sola
// voy a compilar sass usando las dependecia de sass(dartSass pero a la vez tambien gulpsass) 
const sass = gulpSass(dartSass);

export function js( done ) {

    src('src/js/app.js')

    .pipe( dest('dist/js'))
    
    done();
};



export function css( done ) {
    // una vez que ubicamos el donde esta el archivo .. que lo compile usando pipe()
    src('src/scss/app.scss')

    // compilamos usando sass del package.json
    .pipe( sass().on('error', sass.logError))
    .pipe( dest('dist/css'))
    

    done();
};

export function dev() {
    watch('src/scss/**/*.scss', css)
};
/* 
// arrancar todas de golpe
export default parallel(js, css, dev)
 */
// arrancar una y la acaba... arrancar una y la acaba...
export default series(js, css, dev)