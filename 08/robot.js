class Robot {

	constructor(x, y, z) {
		this.robot = new THREE.Group();
		// head, neck and torso:
		var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
		var geometry = fromHelper[0];
		var material = fromHelper[1];
		var bones = fromHelper[2];

		var mesh = new THREE.SkinnedMesh(geometry, material);
		var skeleton = new THREE.Skeleton(bones);
		mesh.add(bones[0]);
		mesh.bind(skeleton);

		this.root = bones[0];
		this.root.position.set(x, y, z);

		// add a sphere for a head
		// texture is of "koro-sensei" from Assassination Classroom!
		// Character by Yusei Matsui
		var korosphere = new THREE.SphereGeometry(20, 20, 20);
		var texture = new THREE.TextureLoader().load( 'https://th.bing.com/th/id/R.13da85390b49ceb845cd9d68cfd4ccbc?rik=DygJO90oDXZAEQ&riu=http%3a%2f%2f2.bp.blogspot.com%2f-zVBRqQVVtNE%2fVq7zpHgYG1I%2fAAAAAAAALhM%2fiBNycn84_nk%2fs1600%2fSquare-Smiley.jpg&ehk=NMAgvxiANG6tjay76TMjpjYpIia52DPoR3nggXflTY0%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1' );
		var koromaterial = new THREE.MeshStandardMaterial(
			{map: texture, roughness: 1}
		);
		this.koromesh = new THREE.Mesh(korosphere, koromaterial);
		this.root.add(this.koromesh);
		this.koromesh.position.y += 15;

		// bones is a 4 element array
		// element 0 is anchor point
		// element 1 is the head
		this.head = bones[1];
		// element 2 is the neck
		this.neck = bones[2];
		this.neck.position.y = -10;
		// element 3 is the torso
		this.torso = bones[3];
		this.torso.position.y = -30;

		this.bodyMesh = mesh;

		// left arm
		var fromHelper = HELPER.cylinderSkeletonMesh(4, 5, 'red');
		var geometry = fromHelper[0];
		var material = fromHelper[1];
		var bones = fromHelper[2];

		var mesh = new THREE.SkinnedMesh(geometry, material);
		var skeleton = new THREE.Skeleton(bones);
		mesh.add(bones[0]);
		mesh.bind(skeleton);
		this.bodyMesh.add(mesh);
		this.neck.add(bones[0]); // arm comes from neck

		this.left_shoulder = bones[1];
		this.left_shoulder.position.x = -1;
		this.left_upper_arm = bones[2];
		this.left_upper_arm.position.x = -5;
		this.left_upper_arm.position.y = -5;
		this.left_lower_arm = bones[3];
		this.left_lower_arm.position.x = -5;
		this.left_lower_arm.position.y = -10;
		this.left_hand = bones[4];
		this.left_hand.position.x = -3;
		this.left_hand.position.y = -1;

		// right arm
		var fromHelper = HELPER.cylinderSkeletonMesh(4, 5, 'red');
		var geometry = fromHelper[0];
		var material = fromHelper[1];
		var bones = fromHelper[2];

		var mesh = new THREE.SkinnedMesh(geometry, material);
		var skeleton = new THREE.Skeleton(bones);
		mesh.add(bones[0]);
		mesh.bind(skeleton);
		this.bodyMesh.add(mesh);
		this.neck.add(bones[0]); // arm comes from neck

		this.right_shoulder = bones[1];
		this.right_shoulder.position.x = 1;
		this.right_upper_arm = bones[2];
		this.right_upper_arm.position.y = -5;
		this.right_upper_arm.position.x = 5;
		this.right_lower_arm = bones[3];
		this.right_lower_arm.position.y = -10;
		this.right_lower_arm.position.x = 5;
		this.right_hand = bones[4];
		this.right_hand.position.x = 3;
		this.right_hand.position.y = -1;

		// left leg
		var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'purple');
		var geometry = fromHelper[0];
		var material = fromHelper[1];
		var bones = fromHelper[2];

		var mesh = new THREE.SkinnedMesh(geometry, material);
		var skeleton = new THREE.Skeleton(bones);
		mesh.add(bones[0]);
		mesh.bind(skeleton);
		this.bodyMesh.add(mesh);
		this.torso.add(bones[0]); // leg comes from torso

		this.left_upper_leg = bones[1];
		this.left_upper_leg.position.y = -10;
		this.left_upper_leg.position.x = -5;
		this.left_lower_leg = bones[2];
		this.left_lower_leg.position.y = -10;
		this.left_lower_leg.position.x = -2;
		this.left_foot = bones[3];
		this.left_foot.position.x = -2;
		this.left_foot.position.y = -1;
		this.left_foot.position.z = 5;

		// right leg
		var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'purple');
		var geometry = fromHelper[0];
		var material = fromHelper[1];
		var bones = fromHelper[2];

		var mesh = new THREE.SkinnedMesh(geometry, material);
		var skeleton = new THREE.Skeleton(bones);
		mesh.add(bones[0]);
		mesh.bind(skeleton);
		this.bodyMesh.add(mesh);
		this.torso.add(bones[0]); // leg comes from torso

		this.right_upper_leg = bones[1];
		this.right_upper_leg.position.y = -10;
		this.right_upper_leg.position.x = 5;
		this.right_lower_leg = bones[2];
		this.right_lower_leg.position.y = -10;
		this.right_lower_leg.position.x = 2;
		this.right_foot = bones[3];
		this.right_foot.position.x = 2;
		this.right_foot.position.y = -1;
		this.right_foot.position.z = 5;

		this.robot.add(this.bodyMesh);
	}

	show = function(scene) {
		scene.add(this.robot);
	}

	raise_left_arm = function() {
		this.movement = 'raise_left_arm';
	}

	lower_left_arm = function() {
		this.movement = 'lower_left_arm';
	}

	kick = function() {
		this.movement = 'kick';
	}

	walk = function() {
		this.movement = 'walk';
	}

	onStep = function() {
		this.root.translateZ(1);
		if(Math.abs(this.root.position.x) >= 500
		|| Math.abs(this.root.position.z) >= 500) {
			this.root.rotateY(Math.PI);
		}
		scene.children.forEach(child => {
			if(child.type == "Group" && child.uuid != this.robot.uuid) {
				var otherPos = child.children[0].children[0].position;
				if(this.root.position.distanceTo(otherPos) < 100) {
					this.root.rotateY(Math.random() * Math.PI);
				}
			}
		});
	}

	onAnimate = function() {
		if (this.movement == 'raise_left_arm') {
			// I added the shoulder so that I could move the entire arm
			// rather than only the lower arm
			const qStart = this.left_shoulder.quaternion;
			const qEnd = new THREE.Quaternion();
			qEnd.setFromAxisAngle(new THREE.Vector3(0, 0, -1), Math.PI *2/3);
			qStart.slerp(qEnd, 0.1);
		} else if (this.movement == 'lower_left_arm') {
			// I added the shoulder so that I could move the entire arm
			// rather than only the lower arm
			const qStart = this.left_shoulder.quaternion;
			const qEnd = new THREE.Quaternion();
			qEnd.setFromAxisAngle(new THREE.Vector3(0, 0, 1), 0);
			qStart.slerp(qEnd, 0.1);
		} else if (this.movement == 'kick') {
			// TODO slerping and check once it is done for a backwards slerp
  		// you can use the identity quaternion for a backwards slerp
			const qStart = this.right_upper_leg.quaternion;
			const qEnd = new THREE.Quaternion();
			qEnd.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI/2);
			qStart.slerp(qEnd, 0.1);
			// Quaternion.equals() didn't seem to work
			if(qStart.w.toFixed(2) === qEnd.w.toFixed(2)) {
				this.movement = 'kick_down';
			}
		} else if (this.movement == 'kick_down') {
			const qStart = this.right_upper_leg.quaternion;
			const qEnd = new THREE.Quaternion();
			qEnd.setFromAxisAngle(new THREE.Vector3(1, 0, 0), 0);
			qStart.slerp(qEnd, 0.1);
		} else if (this.movement == 'walk') {
			const qStartLeft = this.left_upper_leg.quaternion;
			const qEndLeft = new THREE.Quaternion();
			qEndLeft.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI/4);
			qStartLeft.slerp(qEndLeft, 0.1);
			// Move other leg down!
			const qStartOther = this.right_upper_leg.quaternion;
			const qEndOther = new THREE.Quaternion();
			qEndOther.setFromAxisAngle(new THREE.Vector3(1, 0, 0), 0);
			qStartOther.slerp(qEndOther, 0.1);
			// detect time to stop
			if(this.left_upper_leg.quaternion.w < 0.93) {
				this.movement = 'walk2';
			}
			this.onStep();
		} else if (this.movement == 'walk2') {
			const qStartRight = this.right_upper_leg.quaternion;
			const qEndRight = new THREE.Quaternion();
			qEndRight.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI/4);
			qStartRight.slerp(qEndRight, 0.1);
			// Move other leg down!
			const qStartOther = this.left_upper_leg.quaternion;
			const qEndOther = new THREE.Quaternion();
			qEndOther.setFromAxisAngle(new THREE.Vector3(1, 0, 0), 0);
			qStartOther.slerp(qEndOther, 0.1);
			// detect time to swap
			if(this.right_upper_leg.quaternion.w < 0.93) {
				this.movement = 'walk';
			}
			this.onStep();
		}
	}
}