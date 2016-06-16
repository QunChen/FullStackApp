'use strict';

module.exports = function(grunt){
	
	require('time-grunt')(grunt);
	
	require('jit-grunt')(grunt,{
		useminPrepare:'grunt-usemin'
	});
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		jshint: {
			options: {
				jshintrc:'.jshintrc',
				reporter: require('jshint-stylish')
			},
			all:{
				src:[
					'Gruntfile.js', 
					'app/scripts/{,*/}*.js'
					]
			}
		},
			copy:{
				dist: {
					cwd: 'app',
					src: ['**','!styles/**/*.css','!scripts/**/*.js'],
					dest:'dist',
					expand:true
				},
				fonts: {
					files:[
							{
								expand:true,
								dot:true,
								cwd:'bower_components/bootstrap/dist',
								src:['fonts/*.*'],
								dest:'dist'
							},{
								expand:true,
							    dot:true,
							    cwd: 'bower_components/font-awesome',
								src:['fonts/*.*'],
								dest:'dist'
							}
						]
				}
			},
			clean:{
				build:{
					src:['dist/']
				}
			},
			useminPrepare: {
				html: 'app/menu.html',
				options:{
					dest:'dist'
				}
			},
			concat:{
				options:{
					separator:";"
				},
				dist:{}
			},
			uglify:{
				dist:{}
			},
			cssmin:{
				dist:{}
			},
			filerev:{
				options:{
					encoding:'utf8',
					algorithm:'md5',
					length:20
				},
				release:{
					files:[{
						src:[
							'dist/scripts/*.js',
							'dist/styles/*.css',
							]
					}]
				}
			},
			usemin:{
				html:['dist/menu.html'],
				css:['dist/styles/*.css'],
				options:{
					assetsDirs:['dist','dist/styles']
				}
			}
	});
	
	grunt.registerTask('build', [
		'clean',
		'jshint',
		'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
		'copy',
		'filerev',
		'usemin']);
	
	grunt.registerTask('default',['build']);
	
};