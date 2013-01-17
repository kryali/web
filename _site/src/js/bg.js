$(document).ready(function(){

    sceneObjects = {};
    var mouseX = 0;
    var mouseY = 0;
    var windowHalfY = window.innerHeight/2;
    var windowHalfX = window.innerWidth/2;
    
    function close() {
      Utils.hideLoadingScreen(false);
    }
    is3D = false;

    function hideCanvas() {
      $(".canvas-container").animate(
          {opacity:0},
          500,
          function() {
              $("#del-wrapper").css("z-index", 1);
              $(".canvas-container").css("z-index", 0);
              //$("canvas").css("display", "none");
          });
    }

    function showCanvas() {
      //$("canvas").css("display", "block");
      $(".canvas-container").animate(
          {opacity:1},
          500,
          function() {
              $("#del-wrapper").css("z-index", 0);
              $(".canvas-container").css("z-index", 1);
              $("canvas").css("display", "block");
          });
    }

    INIT_3D = function() {
        
      $delTags = $(".delicious-cloud").children();
      $(document).mousemove( function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
      });

      init_scene();
      var startx= -300;
      var starty= -100;

      create_light({
          x: 10,
          y: 50,
          z: 500,
          intensity: 0.8,
      });

      var start_time = (new Date()).getTime();
      //console.log("started");

      for( var i = 0; i < 45; i++) {
        create_text({
          size: 5,
          height: 1,
          curveSegments: 6,
          text: $($delTags[i]).text(),
          random: true,
          color: 0x999999
        });
      }
      //console.log("ended");
      var end_time = (new Date()).getTime();
      //console.log("took " + (end_time - start_time) + "ms" );

      showCanvas();
      $(".canvas-container").append( renderer.domElement );
        
      Utils.hideLoadingScreen(true);
      animate();
      is3D = true;
    }

    function animate() {
      requestAnimationFrame( animate );
      main_render();
    }

    function main_render() {
        //moveSpheres();
        //moveLights();
        //camera.position.z -= .1;

        camera.position.x += ( (windowHalfX - mouseX) - camera.position.x ) * 0.05;
        camera.position.y += ( - (windowHalfY - mouseY) - camera.position.y ) * 0.15;
        camera.lookAt( scene.position );
        renderer.render( scene, camera );
    }

    function moveLights() {
        var lights = getObjects("light");
        for( var i = 0; i < lights.length; i++) {
            var light = lights[i];
            light.position.x = (windowHalfX - mouseX) * -1;
            light.position.y = windowHalfY - mouseY;
            light.position.z = 200;
        }
    }

    function moveSpheres() {
        var spheres = getSphereObjects();
        for( var i = 0; i < spheres.length; i++) {
            var sphere = spheres[i];
            sphere.position.y -= 1;
        }
    }

    function init_scene() {
        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;

        var VIEW_ANGLE = 45,
            ASPECT = WIDTH / HEIGHT,
            NEAR = 0.1,
            FAR = 10000;

        $body = $("body");
        renderer = new THREE.WebGLRenderer();
        camera = new THREE.PerspectiveCamera(
                            VIEW_ANGLE,
                            ASPECT,
                            NEAR,
                            FAR );

        camera.position.z = 200;
        camera.position.y = 0;

        scene = new THREE.Scene();
        scene.add( camera );

        renderer.setSize(WIDTH, HEIGHT);
        renderer.sortObjects = false;
        renderer.setClearColorHex( 0xefefef, 1.00 );
    }

    function create_text( options ) {
      var textGeo = new THREE.TextGeometry( 
                      options.text,
                      { 
                        size: options.size, 
                        height: options.height,
                        curveSegments: options.curveSegments,
                        font: 'helvetiker',
                        weight: "normal"
                      }
                  );
      var textMaterial = new THREE.MeshPhongMaterial(
        { 
          color: options.color,
          wireframe: false,
        });

      var textMesh = new THREE.Mesh( textGeo, textMaterial );
      if( !options.random ) {
        textMesh.position.x = options.x;
        textMesh.position.y = options.y;
        textMesh.position.z = options.z;
      } else {
        textMesh.position.x = getRandom(-350, 350);
        textMesh.position.y = getRandom(-100, 100);
        textMesh.position.z = getRandom(-400, 0);//getRandom(300, 600);
      }

      textMesh.matrixAutoUpdate = false;
      textMesh.updateMatrix();
      textMesh.castShadow = true;
      textMesh.receiveShadow = true;

      getTextObjects().push( textMesh );
      scene.add( textMesh );
    }

    function create_light( options ) {
        var pointLight = new THREE.PointLight( 0xFFFFFF );
        //var pointLight = new THREE.DirectionalLight( 0xFFFFFF );
        pointLight.position.x = options.x;
        pointLight.position.y = options.y;
        pointLight.position.z = options.z;

        pointLight.castShadow = true;

        scene.add( pointLight );
        getObjects("light").push( pointLight );
    }

    /* Returns all scene objects of given type */
    function getObjects( type ) {
        if( type == "sphere" ) {
            return getSphereObjects();
        } else if( type == "light") {
            return getLightObjects();
        };
    }

    /* 
      !!!!!!!
      GETTERS 
      !!!!!!!
    */

    function getRandom( min, max ) {
      var range = (max - min);
      var rand = Math.random();
      var res = (rand * range) + min;
      return res;
    }

    function getSphereObjects() {
        if( sceneObjects.spheres == undefined ) {
            sceneObjects.spheres = [];
        }
        return sceneObjects.spheres;
    }

    function getLightObjects() {
        if( sceneObjects.lights == undefined ) {
            sceneObjects.lights = [];
        }
        return sceneObjects.lights;
    }

    function getTextObjects() {
      if( sceneObjects.texts == undefined ) {
        sceneObjects.texts = [];
      }
      return sceneObjects.texts;
    }

    function setMouseCoordinates( event ) {
        var event = event || window.event;
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
    }

    /* 
      !!!!!!!!!!!
      END GETTERS 
      !!!!!!!!!!!
    */
    
    function create_sphere( options, position) {
        var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xCC0000 });
        var sphere = new THREE.Mesh( 
                        new THREE.SphereGeometry( options.radius, options.segments, options.rings), 
                     sphereMaterial );
        if( position ) {
          sphere.position.x = position.x;
          sphere.position.y = position.y;
          sphere.position.z = position.z;
        }
        scene.add( sphere );

        getSphereObjects().push( sphere );
    };

    START_3D = function() {
      if( Detector.webgl ) {
        if( is3D ) return;
        Utils.showLoadingScreen(true);
        //setTimeout( Helper.THREE.start , 100);
        setTimeout( INIT_3D , 100);
      } else {
        alert("Please use Google Chrome to see 3D effects");
      }
    }

    function build_scene_clean() {
      console.log( "dicks" );
      Helper.THREE.start();
    }

    $("#space").click( function() {
      //build_scene_clean();
    });
    
    $("#threed").click( function() {
      mpq.track("Switched to 3D");
      $("#switcher .label").hide();
      $(this).removeClass("not-selected")
             .addClass("selected");
      $("#twod").removeClass("selected")
                  .addClass("not-selected");
      if( is3D ) {
        showCanvas();
      }
      START_3D();
    });

    $("#twod").click( function() {
      mpq.track("Switched to 2D");
      $(this).removeClass("not-selected")
             .addClass("selected");
      $("#threed").removeClass("selected")
                  .addClass("not-selected");
      hideCanvas();
    });
});
