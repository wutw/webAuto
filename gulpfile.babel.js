/**
 * Created by wtw on 2017/10/30.
 */
import gulp from 'gulp';
/*import concat from 'gulp-concat';合并*/
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import browserSync from 'browser-sync';
import uglify from 'gulp-uglify';
import htmlmin from 'gulp-htmlmin';
import sass from 'gulp-sass';
import cssnano from 'gulp-cssnano';
import {log,colors} from 'gulp-util'
import named from "vinyl-named"
import autoprefixer from 'gulp-autoprefixer'
import plumber from 'gulp-plumber';
import del from 'del';
import gulpSequence from 'gulp-sequence';
gulp.task('clean',function(){
    return del(['dist/'])
})

gulp.task('css',function(){
    gulp.src(['app/themes/scss/*.scss'])
        .pipe(sass().on('error',sass.logError))
        .pipe(autoprefixer({
            browsers:['last 3 versions','Android >= 4.0']
        }))

              .pipe(cssnano())

   .pipe(gulp.dest('dist/themes/css'))
   .pipe(browserSync.reload({
        stream:true
    }))
});

gulp.task('third',function(){
    gulp.src(['app/scripts/third/**/*'])
    .pipe(gulp.dest('dist/scripts/third'))
    .pipe(browserSync.reload({
        stream:true
    }))
})

gulp.task('script',function(){
    return gulp.src(['app/scripts/*.js','!app/scripts/third/**/*'])
      .pipe(plumber({//防止包被破坏
         errorHandle:function(){

      }
    }))
        .pipe(named())
        .pipe(gulpWebpack({
            module:{
                loaders:[
                {
                        test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/,
                        loader: "imports-loader?this=>window"
                },
                {
                    test:/\.js/,
                    loader:'babel-loader'//现在高版本不能用babel
                },
                {
                    test:/\.css$/,
                    use:[
                    'style-loader',
                    'css-loader'

                    ]
                },{
                    test:/\.(png|jpg|gif|svg)/i,
                    loader:'file-loader'

                }]
            }

        }),null,(err,stats)=>{
      log(`Finished '${colors.cyan('scripts')}'`,stats.toString({
        chunks:false
      }))
    })


      //.pipe(uglify())//压缩

        .pipe(gulp.dest('dist/scripts/'))
        .pipe(browserSync.reload({
        stream:true
    }))

});
gulp.task('image',function(){
    gulp.src(['app/themes/images/*','app/*.ico'])
   .pipe(gulp.dest('dist/themes/images'))
   .pipe(browserSync.reload({
        stream:true
    }))
});
gulp.task('html', function(){
    gulp.src(['app/*.html'])
        .pipe(htmlmin({
            collapseWhitespace:true,
            removeComments:true
        }))
        .pipe(gulp.dest('dist'))

    .pipe(browserSync.reload({
        stream:true
    }))
});
gulp.task('serve',function(){
    browserSync({
        server:{
            baseDir:['dist']//根目录，默认输出index页，其它页面http://localhost:3000/main.html
        }
    },function(err,bs){


    });
        gulp.watch('app/themes/scss/*.scss',['css']);
        gulp.watch('app/themes/images/*',['image']);
        gulp.watch('app/*.html',['html']);
        gulp.watch('app/scripts/*.js',['script']);
        gulp.watch('app/scripts/third/**/',['third']);
});
gulp.task('build',gulpSequence('clean','image','third','css', 'script','html','serve'));
