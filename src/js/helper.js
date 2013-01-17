Helper = {

  /* None of this works sadface.jpg */
  THREE: {

    /* CONSTANTS */
    WIDTH: undefined,
    HEIGHT: undefined,
    ASPECT: undefined,
    VIEW_ANGLE: 45,
    NEAR: 0.1,
    FAR: 10000,

    /* VARIABLES */
    $body: undefined,
    renderer: undefined,
    scene: undefined,
    camera: undefined,
    mouseX: undefined,
    mouseY: undefined,

    start: function() {
      this.initScene();
      this.addObjects();
      this.showScene();
      this.animate();
    },

    animate: function() {
      requestAnimationFrame( Helper.THREE.animate );
      Helper.THREE.render();
    },

    render: function() {
      this.camera.position.x += ( (this.WIDTH/2 - this.mouseX) - this.camera.position.x ) * 0.05;
      this.camera.position.y += ( - (this.HEIGHT/2 - this.mouseY) - this.camera.position.y ) * 0.15;
      this.camera.lookAt( this.scene.position );
      this.renderer.render( this.scene, this.camera );
    },

    showScene: function() {
      var domElement = this.renderer.domElement;
      $(".delicious-cloud").animate({
        opacity: 0
        },
        500, 
        function () {
          $(this).css("background", "#000")
                 .empty()
                 .append( Helper.THREE.renderer.domElement )
                 .animate({ opacity: 1}, 500);
        });
      //Utils.hideLoadingScreen(true);
    },

    addObjects: function() {
      $delTags = $(".delicious-cloud").children();
      this.createLight({ x: 10, y: 50, z: 500, intensity: 0.8, });

      var maxNumTags = 45;
      for( var i = 0; i < maxNumTags; i++) {
        this.createText({
          size: 5,
          height: 1,
          curveSegments: 6,
          text: $($delTags[i]).text(),
          random: true,
          color: 0x999999
        });
      }
    },

    initScene: function() {

        $(document).mousemove( function(e) {
          Helper.THREE.mouseX = e.pageX;
          Helper.THREE.mouseY = e.pageY;
        });

        this.WIDTH = window.innerWidth,
        this.HEIGHT = window.innerHeight;

        this.ASPECT = this.WIDTH / this.HEIGHT,

        this.$body = $("body");
        this.renderer = new THREE.WebGLRenderer();
        this.camera = new THREE.PerspectiveCamera(
                            this.VIEW_ANGLE,
                            this.ASPECT,
                            this.NEAR,
                            this.FAR );

        this.camera.position.z = 200;
        this.camera.position.y = 0;

        this.scene = new THREE.Scene();
        this.scene.add( this.camera );

        this.renderer.setSize( this.WIDTH, this.HEIGHT);
        this.renderer.sortObjects = false;
        this.renderer.setClearColorHex( 0xeeeeee, 0.25 );
    },

    sceneObjects: {},
    getObjects: function(type) {
      if( this.sceneObjects[type] == undefined ) {
          this.sceneObjects[type] = [];
      }
      return this.sceneObjects[type];
    },

    createSphere: function( options, position) {
        var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xCC0000 });
        var sphere = new THREE.Mesh( 
                        new THREE.SphereGeometry( options.radius, options.segments, options.rings), 
                     sphereMaterial );
        if( position ) {
          sphere.position.x = position.x;
          sphere.position.y = position.y;
          sphere.position.z = position.z;
        }
        this.scene.add( sphere );
        this.getObjects("sphere").push( sphere );
    },

    createText: function( options ) {
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
        textMesh.position.x = Utils.getRandom(-350, 350);
        textMesh.position.y = Utils.getRandom(-100, 100);
        textMesh.position.z = Utils.getRandom(-400, 0);//getRandom(300, 600);
      }

      textMesh.matrixAutoUpdate = false;
      textMesh.updateMatrix();
      textMesh.castShadow = true;
      textMesh.receiveShadow = true;

      this.getObjects("text").push( textMesh );
      this.scene.add( textMesh );
    },

    createLight: function( options ) {
        var pointLight = new THREE.PointLight( 0xFFFFFF );
        //var pointLight = new THREE.DirectionalLight( 0xFFFFFF );
        pointLight.position.x = options.x;
        pointLight.position.y = options.y;
        pointLight.position.z = options.z;

        pointLight.castShadow = true;

        this.scene.add( pointLight );
        this.getObjects("light").push( pointLight );
    }

  }

}
