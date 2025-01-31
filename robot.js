Robot = function(x, y, z) {


    // head
    this.head = new THREE.Bone();
    this.head.position.x = x;
    this.head.position.y = y;
    this.head.position.z = z;

    this.neck = new THREE.Bone();
    // neck
    this.neck.position.y = -10; 
    this.head.add(this.neck);

    // body
    this.torso = new THREE.Bone();
    this.torso.position.y = -30;
    this.neck.add(this.torso);

    // left arm
    this.left_upper_arm = new THREE.Bone();
    this.left_upper_arm.position.y = -5;
    this.left_upper_arm.position.x = 5;
    this.neck.add(this.left_upper_arm);

    this.left_lower_arm = new THREE.Bone();
    this.left_lower_arm.position.y = -10;
    this.left_lower_arm.position.x = 10;
    this.left_upper_arm.add(this.left_lower_arm);
    //left hand
    this.left_hand = new THREE.Bone();
    this.left_hand.position.y = 3;
    this.left_hand.position.x = 5;
    this.left_lower_arm.add(this.left_hand);

    // right arm
    this.right_upper_arm = new THREE.Bone();
    this.right_upper_arm.position.y = -5;
    this.right_upper_arm.position.x = -5;
    this.neck.add(this.right_upper_arm);

    this.right_lower_arm = new THREE.Bone();
    this.right_lower_arm.position.y = -10;
    this.right_lower_arm.position.x = -10;
    this.right_upper_arm.add(this.right_lower_arm);
    // right hand
    this.right_hand = new THREE.Bone();
    this.right_hand.position.y = 3;
    this.right_hand.position.x = -5;
    this.right_lower_arm.add(this.right_hand);

    // left leg
    this.left_upper_leg = new THREE.Bone();
    this.left_upper_leg.position.y = -15;
    this.left_upper_leg.position.x = 5;
    this.torso.add(this.left_upper_leg);

    this.left_lower_leg = new THREE.Bone();
    this.left_lower_leg.position.y = -15;
    this.left_lower_leg.position.x = 10;
    this.left_upper_leg.add(this.left_lower_leg);

    this.left_foot = new THREE.Bone();
    this.left_foot.position.y = -5;
    this.left_foot.position.x = 1;
    this.left_lower_leg.add(this.left_foot);

    // right leg
    this.right_upper_leg = new THREE.Bone();
    this.right_upper_leg.position.y = -15;
    this.right_upper_leg.position.x = -5;
    this.torso.add(this.right_upper_leg);

    this.right_lower_leg = new THREE.Bone();
    this.right_lower_leg.position.y = -15;
    this.right_lower_leg.position.x = -10;
    this.right_upper_leg.add(this.right_lower_leg);

    this.right_foot = new THREE.Bone();
    this.right_foot.position.y = -5;
    this.right_foot.position.x = -1;
    this.right_lower_leg.add(this.right_foot);

};

Robot.prototype.show = function(scene) {

    rGroup = new THREE.Group();
    rGroup.add(this.head);
    scene.add(rGroup);

    helper = new THREE.SkeletonHelper(rGroup);
    scene.add(helper);

};

Robot.prototype.raise_left_arm = function() {
    this.movement = 'raise left arm';
};

Robot.prototype.lower_left_arm = function() {
    this.movement = 'lower left arm';
};

Robot.prototype.kick = function() {
    this.movement = 'kick';
};

Robot.prototype.onAnimate = function() {
    var PI = -Math.PI;

    if (this.movement == 'raise left arm') {

      this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(PI/2),   // x
                                                                0,               // y
                                                                0,               // z
                                                                Math.cos(PI/2)),  // w
                                          0.5 );  
    } 

    else if ( this.movement == 'lower left arm') {
        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(
            0,0,0,
            Math.cos(PI/2) ), 0.5);
        }

    else if (this.movement == 'kick') {

      // check if slerp reached almost the end
      if (this.right_upper_leg.quaternion.w < 0.72) {

        // signal that the kick is done and the leg should move back
        this.movement = 'kick done';

      } else {

        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( PI / 2 ),   // x
                                                                    0,                   // y
                                                                    0,                   // z
                                                                    Math.cos( PI / 2 ) ), // w
                                              0.5 );

      }

    } else if (this.movement == 'kick done') {
      this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.5 );
    }

  };