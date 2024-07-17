import * as THREE from './utils/three.module.js';


let models = {}; 
var mario, luigi, palla, rete, prato, forest, forest1, forest2, forest3;
let animationTweens = {};
let key;


// Inizializza i personaggi con i modelli caricati e la scena
export function initCharacters(loadedModels, scene) {
    models = loadedModels;
    mario = models.mario;
    luigi = models.luigi;
    forest = models.forest;
    forest1 = models.forest1;
    forest2 = models.forest2;
    forest3 = models.forest3;
    prato = models.penalty_area ? models.penalty_area.getObjectByName('Plane001') : null;
    palla = models.penalty_area ? models.penalty_area.getObjectByName('Sphere001') : null; // Assign palla correctly
    rete = models.penalty_area ? models.penalty_area.getObjectByName('Box012') : null; // Assign palla correctly
    mario.bones = {};
    luigi.bones = {};
    if (mario) {
        mario.mesh = new THREE.Object3D();
        mario.mesh.name = "mario";
        let corpo_mario = mario.getObjectByName("RootNode");
        corpo_mario.scale.set(0.19, 0.19, 0.19);
        mario.mesh.add(corpo_mario);
        mario.mesh.position.set(-40, 0.1, -77);
        scene.add(mario.mesh);
        setCharacterBones(mario, boneMappingMario);
        resetPose(mario);
        
    } else {
        console.error("Mario model not found in loaded models.");
    }
    
    if (luigi) {
        luigi.mesh = new THREE.Object3D();
        luigi.mesh.name = "luigi";
        let corpo_luigi = luigi.getObjectByName("RootNode");
        corpo_luigi.scale.set(1.25, 1.25, 1.25);
        luigi.mesh.add(corpo_luigi);
        luigi.mesh.position.set(-43, 0, 65);
        luigi.mesh.rotation.set(-0.07,3.1,0);
        scene.add(luigi.mesh);
        setCharacterBones(luigi, boneMappingLuigi);
        resetPose(luigi);

    } else {
        console.error("Luigi model not found in loaded models.");
    }


    if(prato){
        prato.scale.set(1, 0.5, 0.5);
        prato.position.set(-40, 0, 70);
        scene.add(prato); 
    } else {
        console.log("Prato not found")
    }


    
    if (palla) {
        palla.scale.set(0.2, 0.2, 0.2);
        palla.position.set(-43, 3, -46);
        scene.add(palla);
    }else {
        console.error("Palla not found in loaded models.");
    }

    if (rete) {
        rete.scale.set(0.094, 0.094, 0.094);
        rete.position.set(-42, 10, 69);
        scene.add(rete);
    } else {
        console.error("Rete not found in loaded models.");
    }


    if (forest) {
        forest.mesh = new THREE.Object3D();
        forest.mesh.name = "forest";
        forest.scale.set(100, 50, 70);
        forest.position.set(72, 17, 125);
        forest.rotation.set(0,-20.4,0 )
        scene.add(forest.mesh);

    } else {
        console.error("Forest not found in loaded models.");
    }

    if (forest1) {
        forest1.mesh = new THREE.Object3D();
        forest1.mesh.name = "forest1";
        forest1.scale.set(120, 50, 70);
        forest1.position.set(-140, 17, 125);
        forest1.rotation.set(0,-20.4,0 )
        scene.add(forest1.mesh);

    } else {
        console.error("Forest not found in loaded models.");
    }

    if (forest2) {
        forest2.mesh = new THREE.Object3D();
        forest2.mesh.name = "forest2";
        forest2.scale.set(55, 50, 70);
        forest2.position.set(-45, 15, 155);
        forest2.rotation.set(0,0,0 )
        scene.add(forest2.mesh);

    } else {
        console.error("Forest not found in loaded models.");
    }



    if (forest3) {
        forest3.mesh = new THREE.Object3D();
        forest3.mesh.name = "forest3";
        forest3.scale.set(65, 50, 70);
        forest3.position.set(82, 17, -24);
        forest3.rotation.set(0,-20.4,0 );
        scene.add(forest3.mesh);

    } else {
        console.error("Forest not found in loaded models.");
    }
    


  

    


    
    
}




const boneMappingMario = {
    'pelvis_03': 'pelvis',
    'spine00_04': 'spine',
    'head_05': 'head',
    'head_aimcont_06': 'head_aimcont',
    'cap_07': 'cap',
    'L_upperarm_021': 'left_upperarm',
    'L_forearm_022': 'left_forearm',
    'L_hand_023': 'left_hand',
    'L_hand_roll_035': 'left_hand_roll',
    'L_finger1_1_032': 'left_finger1_1',
    'L_finger1_2_033': 'left_finger1_2',
    'L_finger2_1_024': 'left_finger2_1',
    'L_finger2_2_025': 'left_finger2_2', 
    'L_finger3_1_026': 'left_finger3_1',
    'L_finger3_2_027': 'left_finger3_2',
    'L_finger4_1_028': 'left_finger4_1',
    'L_finger4_2_029': 'left_finger4_2',
    'L_thumb_1_030': 'left_thumb_1',
    'L_thumb_2_031': 'left_thumb_2',
    'R_upperarm_038': 'right_upperarm',
    'R_forearm_039': 'right_forearm',
    'R_hand_040': 'right_hand',
    'R_hand_roll_052': 'right_hand_roll', 
    'R_finger1_1_049': 'right_finger1_1',
    'R_finger1_2_050': 'right_finger1_2',
    'R_finger2_1_041': 'right_finger2_1',
    'R_finger2_2_042': 'right_finger2_2',
    'R_finger3_1_043': 'right_finger3_1',
    'R_finger3_2_044': 'right_finger3_2',
    'R_finger4_1_045': 'right_finger4_1',
    'R_finger4_2_046': 'right_finger4_2',
    'R_thumb_1_047': 'right_thumb_1',
    'R_thumb_2_048': 'right_thumb_2',
    'L_thigh_054': 'left_thigh',
    'L_calf_055': 'left_calf',
    'L_foot_056': 'left_foot',
    'R_thigh_060': 'right_thigh',
    'R_calf_061': 'right_calf',
    'R_foot_00': 'right_foot'
};

const boneMappingLuigi = {
    'pelvis_03': 'pelvis',
    'spine00_04': 'spine',
    'head_05': 'head',
    'head_aimcont_06': 'head_aimcont',
    'cap_07': 'cap',
    'L_upperarm_024': 'left_upperarm',
    'L_forearm_025': 'left_forearm',
    'L_hand_026': 'left_hand',
    'L_hand_roll_038': 'left_hand_roll',
    'L_finger1_1_027': 'left_finger1_1',
    'L_finger1_2_028': 'left_finger1_2',
    'L_finger2_1_029': 'left_finger2_1',
    'L_finger2_2_030': 'left_finger2_2',
    'L_finger3_1_031': 'left_finger3_1',
    'L_finger3_2_032': 'left_finger3_2',
    'L_finger4_1_033': 'left_finger4_1',
    'L_finger4_2_034': 'left_finger4_2',
    'L_thumb_1_035': 'left_thumb_1',
    'L_thumb_2_036': 'left_thumb_2',
    'R_upperarm_041': 'right_upperarm',
    'R_forearm_042': 'right_forearm',
    'R_hand_043': 'right_hand',
    'R_hand_roll_055': 'right_hand_roll',
    'R_finger1_1_044': 'right_finger1_1',
    'R_finger1_2_045': 'right_finger1_2',
    'R_finger2_1_046': 'right_finger2_1',
    'R_finger2_2_047': 'right_finger2_2',
    'R_finger3_1_048': 'right_finger3_1',
    'R_finger3_2_049': 'right_finger3_2',
    'R_finger4_1_050': 'right_finger4_1',
    'R_finger4_2_051': 'right_finger4_2',
    'R_thumb_1_052': 'right_thumb_1',
    'R_thumb_2_053': 'right_thumb_2',
    'L_thigh_057': 'left_thigh',
    'L_calf_058': 'left_calf',
    'L_foot_00': 'left_foot',
    'R_thigh_062': 'right_thigh',
    'R_calf_063': 'right_calf',
    'R_foot_064': 'right_foot'
};



function setCharacterBones(character, boneMapping) {
    character.mesh.traverse(o => {
        if (o.isBone) {
            //console.log(`Bone found: ${o.name}`);
            if (boneMapping[o.name]) {
                character.bones[boneMapping[o.name]] = o;
            }    
        }    
    });    
}    



function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}


function resetPose(character) {
    if (!character.mesh || !character.bones) {
        console.error('Mesh or bones not defined for character:', character);
        return;
    }
    character.mesh.rotation.x = degToRad(0);

    character.bones.spine.rotation.set(degToRad(0), degToRad(0), degToRad(0));
    character.bones.pelvis.rotation.set(degToRad(0), degToRad(0), degToRad(0));
    character.bones.head.rotation.set(degToRad(0), degToRad(0), degToRad(0));
    character.bones.head_aimcont.rotation.set(degToRad(0), degToRad(0), degToRad(0));
    character.bones.cap.rotation.set(degToRad(0), degToRad(0), degToRad(0));
    character.bones.left_upperarm.rotation.set(degToRad(-15), degToRad(0), degToRad(35));
    character.bones.left_forearm.rotation.set(degToRad(-45), degToRad(0), degToRad(0));
    character.bones.left_hand.rotation.set(degToRad(-15), degToRad(30), degToRad(0));
    character.bones.left_hand_roll.rotation.set(degToRad(-15), degToRad(30), degToRad(0));
    character.bones.left_finger1_1.rotation.set(degToRad(-80), degToRad(0), degToRad(0));
    character.bones.left_finger1_2.rotation.set(degToRad(-90), degToRad(0), degToRad(0));
    character.bones.left_finger2_1.rotation.set(degToRad(-80), degToRad(0), degToRad(0));
    character.bones.left_finger2_2.rotation.set(degToRad(-90), degToRad(0), degToRad(0));
    character.bones.left_finger3_1.rotation.set(degToRad(-80), degToRad(0), degToRad(0));
    character.bones.left_finger3_2.rotation.set(degToRad(-90), degToRad(0), degToRad(0));
    character.bones.left_finger4_1.rotation.set(degToRad(-80), degToRad(0), degToRad(0));
    character.bones.left_finger4_2.rotation.set(degToRad(-90), degToRad(0), degToRad(0));
    character.bones.left_thumb_1.rotation.set(degToRad(90), degToRad(90), degToRad(-100));
    character.bones.left_thumb_2.rotation.set(degToRad(-110), degToRad(0), degToRad(0));
    character.bones.right_upperarm.rotation.set(degToRad(-15), degToRad(0), degToRad(35));
    character.bones.right_forearm.rotation.set(degToRad(-45), degToRad(0), degToRad(0));
    character.bones.right_hand.rotation.set(degToRad(-15), degToRad(30), degToRad(0));
    character.bones.right_hand_roll.rotation.set(degToRad(-15), degToRad(30), degToRad(0));
    character.bones.right_finger1_1.rotation.set(degToRad(-80), degToRad(0), degToRad(0));
    character.bones.right_finger1_2.rotation.set(degToRad(-90), degToRad(0), degToRad(0));
    character.bones.right_finger2_1.rotation.set(degToRad(-80), degToRad(0), degToRad(0));
    character.bones.right_finger2_2.rotation.set(degToRad(-90), degToRad(0), degToRad(0));
    character.bones.right_finger3_1.rotation.set(degToRad(-80), degToRad(0), degToRad(0));
    character.bones.right_finger3_2.rotation.set(degToRad(-90), degToRad(0), degToRad(0));
    character.bones.right_finger4_1.rotation.set(degToRad(-80), degToRad(0), degToRad(0));
    character.bones.right_finger4_2.rotation.set(degToRad(-90), degToRad(0), degToRad(0));
    character.bones.right_thumb_1.rotation.set(degToRad(90), degToRad(90), degToRad(-100));
    character.bones.right_thumb_2.rotation.set(degToRad(-110), degToRad(0), degToRad(0));
    character.bones.left_thigh.rotation.set(degToRad(180), degToRad(0), degToRad(-5));
    character.bones.left_calf.rotation.set(degToRad(0), degToRad(0), degToRad(0));
    character.bones.left_foot.rotation.set(degToRad(-58), degToRad(-5), degToRad(0));
    character.bones.right_thigh.rotation.set(degToRad(0), degToRad(0), degToRad(-5));
    character.bones.right_calf.rotation.set(degToRad(0), degToRad(0), degToRad(0));
    character.bones.right_foot.rotation.set(degToRad(-58), degToRad(-5), degToRad(0));
}


function stopAllAnimations() {
    TWEEN.removeAll();
}





export function marioRunShoot() {

    if (!mario || !mario.mesh) {
        console.error('Mario is not initialized');
        return;
    }

    var animationTime = 800;
    

    //------------SPINA-----------// 
    var spineMaxAngle = 50;

    var spineRotationStart = {x: 0, y: spineMaxAngle, z: 0};
    var spineTweenStart = new TWEEN.Tween(spineRotationStart)
        .to({x: 0, y: -spineMaxAngle, z: 0}, animationTime)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {
            mario.bones.spine.rotation.y = degToRad(spineRotationStart.y);
        })
        .start();

    var spineRotationEnd = {x: 0, y: -spineMaxAngle, z: 0};
    var spineTweenEnd = new TWEEN.Tween(spineRotationEnd)
        .to({x: 0, y: spineMaxAngle, z: 0}, animationTime)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {
            mario.bones.spine.rotation.y = degToRad(spineRotationEnd.y);
        })
        .start();

    spineTweenStart.chain(spineTweenEnd);




    //----------- Bacino ------------ //
    var pelvisMaxAngle = -10;

    var pelvisRotationStart = {x: 0, y: pelvisMaxAngle, z: 0};
    var pelvisTweenStart = new TWEEN.Tween(pelvisRotationStart)
        .to({x: 0, y: -pelvisMaxAngle, z: 0}, animationTime)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {
            mario.bones.pelvis.rotation.y = degToRad(pelvisRotationStart.y);
        })
        .start();

    var pelvisRotationEnd = {x: 0, y: -pelvisMaxAngle, z: 0};
    var pelvisTweenEnd = new TWEEN.Tween(pelvisRotationEnd)
        .to({x: 0, y: pelvisMaxAngle, z: 0}, animationTime)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {
            mario.bones.pelvis.rotation.y = degToRad(pelvisRotationEnd.y);
        })
        .start();

    pelvisTweenStart.chain(pelvisTweenEnd);
 


     // ------- BRACCIA ----- //
    var upperArmMaxAngleX = 30;
    var upperArmMaxAngleY = 50;

    var upperArmRotationStart = {x: upperArmMaxAngleX, y: upperArmMaxAngleY, z: 0};
    var upperArmTweenStart = new TWEEN.Tween(upperArmRotationStart)
        .to({x: -upperArmMaxAngleX, y: -upperArmMaxAngleY, z: 0}, animationTime)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function() {
            mario.bones.left_upperarm.rotation.x = degToRad(upperArmRotationStart.x);
            mario.bones.right_upperarm.rotation.x = degToRad(-upperArmRotationStart.x);
            mario.bones.left_upperarm.rotation.y = degToRad(upperArmRotationStart.y);
            mario.bones.right_upperarm.rotation.y = degToRad(-upperArmRotationStart.y);
        })
        .start();

    var upperArmRotationEnd = {x: -upperArmMaxAngleX, y: -upperArmMaxAngleY, z: 0};
    var upperArmTweenEnd = new TWEEN.Tween(upperArmRotationEnd)
        .to({x: upperArmMaxAngleX, y: upperArmMaxAngleY, z: 0}, animationTime)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function() {
            mario.bones.left_upperarm.rotation.x = degToRad(upperArmRotationEnd.x);
            mario.bones.right_upperarm.rotation.x = degToRad(-upperArmRotationEnd.x);
            mario.bones.left_upperarm.rotation.y = degToRad(upperArmRotationEnd.y);
            mario.bones.right_upperarm.rotation.y = degToRad(-upperArmRotationEnd.y);
        })
        .start();

    upperArmTweenStart.chain(upperArmTweenEnd);
    



   
    // ---- GAMBE ---- //


    var thighMaxAngle = -50;

    var thighRotationStart = {x: thighMaxAngle, y: 0, z: 0};
    var thighTweenStart = new TWEEN.Tween(thighRotationStart)
        .to({x: -thighMaxAngle, y: 0, z: 0}, animationTime)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {
            mario.bones.left_thigh.rotation.x = degToRad(180+ thighRotationStart.x);
            mario.bones.right_thigh.rotation.x = degToRad(-thighRotationStart.x);
        })
        .start();

    var thighRotationEnd = {x: -thighMaxAngle, y: 0, z: 0};
    var thighTweenEnd = new TWEEN.Tween(thighRotationEnd)
        .to({x: thighMaxAngle, y: 0, z: 0}, animationTime)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {
            mario.bones.left_thigh.rotation.x = degToRad(180+thighRotationEnd.x);
            mario.bones.right_thigh.rotation.x = degToRad(-thighRotationEnd.x);
        })
        .start();

    thighTweenStart.chain(thighTweenEnd);
   


    // ----------- CORPO -------------------- //

    let kickPosition =  { x: -40, y: 0.1, z: -55 };

    const bodyStartPosition = { x: mario.mesh.position.x, y:mario.mesh.position.y, z: mario.mesh.position.z };
    const bodyEndPosition = kickPosition;
    const bodyTweenStart= new TWEEN.Tween(bodyStartPosition)
        .to(bodyEndPosition, animationTime)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function () {
            mario.mesh.position.x = bodyStartPosition.x;
            mario.mesh.position.y = bodyStartPosition.y;
            mario.mesh.position.z = bodyStartPosition.z;
        })
        .start();


       

    animationTweens = [];
    animationTweens.push(spineTweenStart, spineTweenEnd);
    animationTweens.push(pelvisTweenStart, pelvisTweenEnd);
    animationTweens.push(upperArmTweenStart, upperArmTweenEnd);
    animationTweens.push(thighTweenStart, thighTweenEnd);
    animationTweens.push(bodyTweenStart);

}





export function marioKickBallAnimation(key) {
    console.log("Mario is kicking the ball!");

    if (!mario || !mario.mesh) {
        console.error('Mario is not initialized');
        return;
    }
    
    marioRunShoot();

    
    setTimeout(() => {
        stopAllAnimations();
        resetPose(mario);

        
        // Check collission
        const distance = mario.mesh.position.distanceTo(palla.position);

        
        const kickDistance = 10; 

        if (distance > kickDistance) {
            console.log("La palla è troppo lontana per essere calciata.");
            return; 
        }


        var animationTime = 800; 


        /* ----- Coordinazione per il tiro ----- */

        //START - ARMS 
        var MaxAngle = -30;

        var RightArmRotationStart = { x: 2, y: -2, z: 0 };
        var LeftArmRotationStart = { x: 2, y: -2, z: 0 };
        var LeftArmTweenStart = new TWEEN.Tween(LeftArmRotationStart)
            .to({ x: -MaxAngle, y: 0, z: 0 }, animationTime / 3)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function () {
                mario.bones.left_forearm.rotation.x = degToRad(LeftArmRotationStart.x);
                mario.bones.left_upperarm.rotation.x = degToRad(LeftArmRotationStart.x);
            })
            .start();

        var RightArmTweenStart = new TWEEN.Tween(RightArmRotationStart)
            .to({ x: -MaxAngle, y: 0, z: 0 }, animationTime / 3)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function () {
                mario.bones.right_forearm.rotation.x = degToRad(RightArmRotationStart.x);
                mario.bones.right_upperarm.rotation.x = degToRad(RightArmRotationStart.x);
            })
            .start();


        //END - ARMS
        var RightArmRotationEnd = { x: -MaxAngle, y: 0, z: 0 };
        var LeftArmRotationEnd = { x: -MaxAngle, y: 0, z: 0 };
        var RightArmTweenEnd = new TWEEN.Tween(RightArmRotationEnd)
            .to({ x: 0, y: 0, z: 0 }, animationTime / 3)
            .easing(TWEEN.Easing.Quadratic.In)
            .onUpdate(function () {
                mario.bones.right_forearm.rotation.x = degToRad(RightArmRotationEnd.x);
                mario.bones.right_upperarm.rotation.x = degToRad(RightArmRotationEnd.x);
            })
            .start();
        var LeftArmTweenEnd = new TWEEN.Tween(LeftArmRotationEnd)
            .to({ x: 0, y: 0, z: 0 }, animationTime / 3)
            .easing(TWEEN.Easing.Quadratic.In)
            .onUpdate(function () {
                mario.bones.left_forearm.rotation.x = degToRad(LeftArmRotationEnd.x);
                mario.bones.left_upperarm.rotation.x = degToRad(LeftArmRotationEnd.x);
            })
            .start();


        RightArmTweenStart.chain(RightArmTweenEnd);
        LeftArmTweenStart.chain(LeftArmTweenEnd);

        // ----- ALZARE LA GAMBA PER IL TIRO ----- //

        // START - LEGS SHOOT MOVEMENT
        var kickMaxAngle = -60;
        var kickMaxAngle1 = -180;


        //RIGHT THIGH
        var legRotationStart = { x: 0, y: 0, z: 0 };
        var legTweenStart = new TWEEN.Tween(legRotationStart)
            .to({ x: -kickMaxAngle, y: 0, z: 0 }, animationTime / 3)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function () {
                mario.bones.right_thigh.rotation.x = degToRad(legRotationStart.x);

            })
            .start();

        //LEFT THIGH
        var leftLegRotationStart = { x: 0, y: 0, z: 0 };
        var leftLegTweenStart = new TWEEN.Tween(leftLegRotationStart)
            .to({ x: -kickMaxAngle, y: 0, z: 0 }, animationTime / 3)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function () {
                mario.bones.left_thigh.rotation.x = degToRad(leftLegRotationStart.x);

            })
            .start();


        //END - LEGS SHOOT MOVEMENT+

        //RIGHT 
        var legRotationEnd = { x: -kickMaxAngle, y: 0, z: 0 };
        var legTweenEnd = new TWEEN.Tween(legRotationEnd)
            .to({ x: 0, y: 0, z: 0 }, animationTime / 3)
            .easing(TWEEN.Easing.Quadratic.In)
            .onUpdate(function () {
                mario.bones.right_thigh.rotation.x = degToRad(legRotationEnd.x);
            })
            .start();


        //LEFT
        var leftLegRotationEnd = { x: kickMaxAngle1, y: 0, z: 0 };
        var leftLegTweenEnd = new TWEEN.Tween(leftLegRotationEnd)
            .to({ x: -90, y: -1, z: 0 }, animationTime / 3)
            .easing(TWEEN.Easing.Quadratic.In)
            .onUpdate(function () {
                mario.bones.left_thigh.rotation.x = degToRad(leftLegRotationEnd.x);
            })
            .start();

        legTweenStart.chain(legTweenEnd);
       
       


        /* ----- MOVIMENTO DEL PIEDE ----- */
        var footMaxAngle = 90;

        var footRotationStart = { x: 0, y: 0, z: -5 };
        var footTweenStart = new TWEEN.Tween(footRotationStart)
            .to({ x: footMaxAngle, y: 0, z: 0 }, animationTime / 3)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function () {
                mario.bones.right_foot.rotation.z = degToRad(footRotationStart.z);
            })
            .start();

        var footRotationEnd = { x: footMaxAngle, y: 0, z: 2 };
        var footTweenEnd = new TWEEN.Tween(footRotationEnd)
            .to({ x: 0, y: 0, z: 0 }, animationTime / 3)
            .easing(TWEEN.Easing.Quadratic.In)
            .onUpdate(function () {
                mario.bones.right_foot.rotation.z = degToRad(footRotationEnd.z);
            })
            .start();

        footTweenStart.chain(footTweenEnd);

        
        
        animationTweens.push(RightArmTweenStart, RightArmTweenEnd);
        animationTweens.push(LeftArmTweenStart, LeftArmTweenEnd);
        animationTweens.push(legTweenStart, legTweenEnd);
        animationTweens.push(footTweenStart, footTweenEnd);


        
        const tiroMario = key; 
        
        console.log(" " + key)
        const parataLuigi = luigiSaveAttempt(); 
        ballAnimation(tiroMario, parataLuigi); 
        
        
        if(tiroMario == parataLuigi){
            setTimeout(() => {
                celebrate(luigi);
                defeat(mario);
            },1100 );
            console.log("CHE PARATA DI LUIGI")
        } else {
            setTimeout(() => {
                celebrate(mario);
                defeat(luigi); 
            },1100 );
            console.log("CHE GRAN GOAL DI MARIO")
        }
    },800);
}



export function luigiSaveAttempt(){
    console.log("Luigi try to save the ball!");

    if (!luigi || !luigi.mesh) {
        console.error('Luigi is not initialized');
        return;
    }

    const distance = luigi.mesh.position.distanceTo(palla.position);

    const kickDistance = 1000; 

    if (distance > kickDistance) {
        console.log("La palla è troppo lontana per essere parata.");
        return; 
    }

    resetPose(luigi);



    const animationTime = 700;

    const randomSave = Math.random();
    let saveDirection;

    if (randomSave < 0.33) {
        saveDirection = 'F'; // Parata per il tiro forte
    } else if (randomSave < 0.66) {
        saveDirection = 'G'; // Parata per il tiro a giro
    } else {
        saveDirection = 'B'; // Parata per il tiro basso
    }

    let savePosition;
    let spineMaxAngleY;
    let spineMaxAngleZ;
    let pelvisMaxAngle;   
    let upperArmMaxAngleX;
    let upperArmMaxAngleY;
    let upperArmMaxAngleZ;
    let thighMaxAngleZ0;
    let thighMaxAngleZ1;



    switch (saveDirection) {
        case 'F':
            savePosition = { x: -23, y: 3, z: 65  }; // Posizione per tiro forte
            spineMaxAngleY = -10;
            spineMaxAngleZ = 30
            pelvisMaxAngle = -45;
            upperArmMaxAngleX = 30
            upperArmMaxAngleY = 45
            upperArmMaxAngleZ = 45
            thighMaxAngleZ0 = 0;
            thighMaxAngleZ1 = -25;


            

            break;
        case 'G':
            savePosition = {x: -65, y: 3, z: 65 }; // Posizione per tiro a giro
            
            spineMaxAngleY = 10;
            spineMaxAngleZ = -30;
            pelvisMaxAngle = 45;
            upperArmMaxAngleX = 30
            upperArmMaxAngleY = 45
            upperArmMaxAngleZ = 45
            thighMaxAngleZ0 = 0;
            thighMaxAngleZ1 = -25;



            break;
        case 'B':
            savePosition = { x: -65, y: -4, z: 65 }; // Posizione per tiro basso
           
            spineMaxAngleY = 20;
            spineMaxAngleZ = -30;
            pelvisMaxAngle = 95;
            upperArmMaxAngleX = 30;
            upperArmMaxAngleY = 45;
            upperArmMaxAngleZ = 45;
            thighMaxAngleZ0 = 0;
            thighMaxAngleZ1 = -95;


            break;
        default:
            console.error("Tipo di parata non riconosciuto");
            return;
    }
    // ------------------------------------ SPINE MOVEMENT ------------------------------------------------------ //

    
    var spineRotationStart = { x: 0, y: 0, z: 0 };
    var spineRotationEnd = { x: 0, y: spineMaxAngleY, z: spineMaxAngleZ };

    var spineTween = new TWEEN.Tween(spineRotationStart)
        .to(spineRotationEnd, animationTime)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function () {
            luigi.bones.spine.rotation.x = degToRad(spineRotationStart.x);
            luigi.bones.spine.rotation.y = degToRad(spineRotationStart.y);
            luigi.bones.spine.rotation.z = degToRad(spineRotationStart.z);
        })
        .start();


    // --------------------------------------------- PELVIS MOVEMENT ---------------------------------------------- //

    
    var pelvisRotationStart = {x:0, y:0, z:pelvisMaxAngle};
    var pelvisRotationEnd = {x:0, y:0, z:pelvisMaxAngle};
    var pelvisTween = new TWEEN.Tween(pelvisRotationStart)
    .to(pelvisRotationEnd, animationTime)
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(function() {
         luigi.bones.pelvis.rotation.y = degToRad(pelvisRotationStart.y);  
    })
    .start();

   

    // --------------------------------------------- ARMS MOVEMENT ---------------------------------------------- //

   
    var upperArmRotationStart = {x:-upperArmMaxAngleX, y:upperArmMaxAngleY, z:upperArmMaxAngleZ};
    var upperArmRotationEnd = {x:upperArmMaxAngleX, y:-upperArmMaxAngleY, z:-upperArmMaxAngleZ};
    var upperArmTweenStart = new TWEEN.Tween(upperArmRotationStart)
    .to(upperArmRotationEnd, animationTime)
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(function() {
        luigi.bones.left_upperarm.rotation.x = degToRad(upperArmRotationStart.x);
        luigi.bones.left_upperarm.rotation.y = degToRad(upperArmRotationStart.y);
        luigi.bones.left_upperarm.rotation.z = degToRad(upperArmRotationStart.z);
        luigi.bones.right_upperarm.rotation.x = degToRad(upperArmRotationStart.x);
        luigi.bones.right_upperarm.rotation.y = degToRad(upperArmRotationStart.y);
        luigi.bones.right_upperarm.rotation.z = degToRad(upperArmRotationStart.z);
       
      
       
    })
    .start();


    
    
    // --------------------------------------------- THIGH MOVEMENT ----------------------------------------------- //

  

    var thighRotationStart = {x:0, y:0, z:thighMaxAngleZ0};
    var thighRotationEnd = {x:0, y:0, z:thighMaxAngleZ1};
    var thighTweenStart = new TWEEN.Tween(thighRotationStart)
    .to(thighRotationEnd, animationTime)
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(function() {
        luigi.bones.left_thigh.rotation.z = degToRad(thighRotationStart.z);
        luigi.bones.right_thigh.rotation.z = degToRad(thighRotationStart.z);
       
    })
    .start();

   
    // Tween per la posizione del corpo
    var bodyMaxPosition = 3;
    
    
    const bodyStartPosition = { x: luigi.mesh.position.x, y:bodyMaxPosition, z: luigi.mesh.position.z };
    const bodyEndPosition = savePosition;
    const bodyTweenStart= new TWEEN.Tween(bodyStartPosition)
        .to(bodyEndPosition, animationTime)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function () {
            luigi.mesh.position.x = bodyStartPosition.x;
            luigi.mesh.position.y = bodyStartPosition.y;
            luigi.mesh.position.z = bodyStartPosition.z;

        })
        .start();

        
      
        

    
    animationTweens.push(spineTween);
    animationTweens.push(bodyTweenStart);
    animationTweens.push(pelvisTween);
    animationTweens.push(upperArmTweenStart);
    animationTweens.push(thighTweenStart);


    return saveDirection;
}





export function ballAnimation(tiroMario, parataLuigi){

    let ballTween;
    let ballRotationTween;
    let reboundTween;
    let trajectory;
    let bounceHeight;

    if(tiroMario == parataLuigi){

        
        switch (tiroMario) {
            case 'F':
                console.log("Tiro Forte");
                bounceHeight = 15;
                trajectory = {
                    positionEnd: { x: palla.position.x + 27, y: palla.position.y + 15, z: palla.position.z + 110 },
                    rotationEnd: { x: 360, y: 0, z: 360 }
                };
                break;
            case 'G':
                console.log("Tiro a giro");
                bounceHeight = 15;
                trajectory = {
                    positionEnd: { x: palla.position.x - 27, y: palla.position.y +15 , z: palla.position.z + 110 },
                    rotationEnd: { x: 0, y: 360, z: 0 }
                };
                break;
            case 'B':
                console.log("Tiro all'angolino");
                bounceHeight = 0
                trajectory = {
                    positionEnd: { x: palla.position.x -27, y: palla.position.y , z: palla.position.z + 110 },
                    rotationEnd: { x: 0, y: 0, z: 360 }
                };
                break;
            default:
                console.error("Tiro non riconosciuto");
                return;
        }

    } else {
    
        
        switch (tiroMario) {
            case 'F':
                console.log("Tiro Forte");
                bounceHeight = 15;
                trajectory = {
                    positionEnd: { x: palla.position.x + 27, y: palla.position.y +14.8, z: palla.position.z + 122 },
                    rotationEnd: { x: 0, y: 0, z: 360 }
                };
                break;
            case 'G':
                console.log("Tiro a Giro");
                bounceHeight = 15;
                trajectory = {
                    positionEnd: { x: palla.position.x - 27, y: palla.position.y + 14.8 , z: palla.position.z + 122 },
                    rotationEnd: { x: 0, y: 360, z: 0 }
                };
                break;
            case 'B':
                console.log("Tiro all'angolino");
                bounceHeight = 0
                trajectory = {
                    positionEnd: { x: palla.position.x -27, y: palla.position.y, z: palla.position.z + 122 },
                    rotationEnd: { x: 0, y: 0, z: 360 }
                };
                break;
            default:
                console.error("Tiro non riconosciuto");
                return;
        }


    }

    

        var animationTime = 700;


        /* ----- MOVIMENTO DELLA PALLA ----- */
        var ballPositionStart = { x: palla.position.x, y: palla.position.y, z: palla.position.z };
        var ballPositionEnd = trajectory.positionEnd;
        var ballRotationStart = { x: 0, y: 0, z: 0 };
        var ballRotationEnd = trajectory.rotationEnd;

        ballTween = new TWEEN.Tween(ballPositionStart)
            .to(ballPositionEnd, animationTime)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function () {
                palla.position.x = ballPositionStart.x;
                palla.position.y = ballPositionStart.y;
                palla.position.z = ballPositionStart.z;
            })
            .onComplete(() => {
                
            })
            .start();

        ballRotationTween = new TWEEN.Tween(ballRotationStart)
            .to(ballRotationEnd, animationTime)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function () {
                palla.rotation.x = degToRad(ballRotationStart.x);
                palla.rotation.y = degToRad(ballRotationStart.y);
                palla.rotation.z = degToRad(ballRotationStart.z);
            })
            .start();


        
    bounceBall(bounceHeight);

   
    
    animationTweens = [];
    animationTweens.push(ballTween);
    animationTweens.push(ballRotationTween);
    animationTweens.push(reboundTween);

}




function celebrate(character) {

    const jumpHeight = 3; 
    const jumpTime = 300; 

    const upPosition = { y: character.mesh.position.y + jumpHeight }; 
    const downPosition = { y: character.mesh.position.y };

        
     
     const resetBonePositions = () => {
             const resetTime = 500; 
             const originalSpineRotation = { x: 0, y: 0, z: 0 }; 
             const originalPelvisRotation = { x: 0, y: 0, z: 0 }; 
             const originalUpperArmRotation = { x: 0, y: 0, z: 0 }; 
             const originalThighRotation = { x:3.1, y: 0, z: 0 };   
             const originalBodyStartPosition = { x: character.mesh.position.x, y:character.mesh.position.y +3, z: character.mesh.position.z };
             
             const spineTweenReset = new TWEEN.Tween(character.bones.spine.rotation)
                 .to(originalSpineRotation, resetTime)
                 .onUpdate(() => {
                     character.bones.spine.rotation.x = degToRad(spineTweenReset._object.x);
                     character.bones.spine.rotation.y = degToRad(spineTweenReset._object.y);
                     character.bones.spine.rotation.z = degToRad(spineTweenReset._object.z);
                 })
                 .start();   
             
             const pelvisTweenReset = new TWEEN.Tween(character.bones.pelvis.rotation)
                 .to(originalPelvisRotation, resetTime)
                 .onUpdate(() => {
                     character.bones.pelvis.rotation.x = degToRad(pelvisTweenReset._object.x);
                     character.bones.pelvis.rotation.y = degToRad(pelvisTweenReset._object.y);
                     character.bones.pelvis.rotation.z = degToRad(pelvisTweenReset._object.z);
                 })
                 .start();   
             
             const upperArmTweenReset = new TWEEN.Tween(character.bones.left_upperarm.rotation)
                 .to(originalUpperArmRotation, resetTime)
                 .onUpdate(() => {
                     character.bones.left_upperarm.rotation.x = degToRad(upperArmTweenReset._object.x + 10);
                     character.bones.left_upperarm.rotation.y = degToRad(upperArmTweenReset._object.y - 25);
                     character.bones.left_upperarm.rotation.z = degToRad(upperArmTweenReset._object.z - 25);
                     character.bones.right_upperarm.rotation.x = degToRad(upperArmTweenReset._object.x + 10);
                     character.bones.right_upperarm.rotation.y = degToRad(upperArmTweenReset._object.y -25);
                     character.bones.right_upperarm.rotation.z = degToRad(upperArmTweenReset._object.z -25);
                 })
                 .start();   
            
             const thighTweenReset = new TWEEN.Tween(character.bones.left_thigh.rotation)
                 .to(originalThighRotation, resetTime)
                 .onUpdate(() => {
                    character.bones.left_thigh.rotation.z = degToRad(thighTweenReset._object.z -25);
                    character.bones.left_thigh.rotation.x = degToRad(thighTweenReset._object.x +180);
                    character.bones.right_thigh.rotation.z = degToRad(thighTweenReset._object.z -25);
                 })
                 .start();  
             const bodyResetTween = new TWEEN.Tween(character.mesh.position)
             .to(originalBodyStartPosition, resetTime)
             .easing(TWEEN.Easing.Quadratic.Out)
             .onUpdate(() => {
                character.mesh.position.x = bodyResetTween._object.x;
                character.mesh.position.y = bodyResetTween._object.y;
                character.mesh.position.z = bodyResetTween._object.z;
             })
            .start();
     };  

         
     function jump() {
        const upTween = new TWEEN.Tween(character.mesh.position)
            .to(upPosition, jumpTime)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(() => {
                character.mesh.position.y = upTween._object.y;
            })
            .onComplete(() => {
                downTween.start();
            });

        const downTween = new TWEEN.Tween(character.mesh.position)
            .to(downPosition, jumpTime)
            .easing(TWEEN.Easing.Quadratic.In)
            .onUpdate(() => {
                character.mesh.position.y = downTween._object.y;
            })
            .onComplete(() => {
                upTween.start();
            });

        upTween.start();
    }

   
    jump();

    resetBonePositions();

}




function defeat(character) {
    const spinTime = 1000; // Tempo per una rotazione completa

    // Funzione per ripristinare la posizione originale delle ossa
    const resetBonePositions = () => {
        const resetTime = 500; // Tempo per ripristinare le rotazioni
       // Rotazioni originali
        const originalSpineRotation = { x: 0, y: 0, z: 0 }; // Posizione originale della colonna vertebrale
        const originalPelvisRotation = { x: 0, y: 0, z: 0 }; // Posizione originale del bacino
        const originalUpperArmRotation = { x: 0, y: 0, z: 0 }; // Posizione originale del braccio
        const originalThighRotation = { x:3.1, y: 0, z: 0 }; // Posizione originale della coscia  
        const originalBodyStartPosition = { x: character.mesh.position.x, y:character.mesh.position.y, z: character.mesh.position.z };
        // Tween per ripristinare la colonna vertebrale
        const spineTweenReset = new TWEEN.Tween(character.bones.spine.rotation)
            .to(originalSpineRotation, resetTime)
            .onUpdate(() => {
                character.bones.spine.rotation.x = degToRad(spineTweenReset._object.x + 50);
                character.bones.spine.rotation.y = degToRad(spineTweenReset._object.y);
                character.bones.spine.rotation.z = degToRad(spineTweenReset._object.z);
            })
            .start();   
        // Tween per ripristinare il bacino
        const pelvisTweenReset = new TWEEN.Tween(character.bones.pelvis.rotation)
            .to(originalPelvisRotation, resetTime)
            .onUpdate(() => {
                character.bones.pelvis.rotation.x = degToRad(pelvisTweenReset._object.x);
                character.bones.pelvis.rotation.y = degToRad(pelvisTweenReset._object.y);
                character.bones.pelvis.rotation.z = degToRad(pelvisTweenReset._object.z);
            })
            .start();   
        // Tween per ripristinare i bracci
        const upperArmTweenReset = new TWEEN.Tween(character.bones.left_upperarm.rotation)
            .to(originalUpperArmRotation, resetTime)
            .onUpdate(() => {
                character.bones.left_upperarm.rotation.x = degToRad(upperArmTweenReset._object.x - 100);
                character.bones.left_upperarm.rotation.y = degToRad(upperArmTweenReset._object.y - 20);
                character.bones.left_upperarm.rotation.z = degToRad(upperArmTweenReset._object.z - 60);
                character.bones.right_upperarm.rotation.x = degToRad(upperArmTweenReset._object.x - 100);
                character.bones.right_upperarm.rotation.y = degToRad(upperArmTweenReset._object.y - 20);
                character.bones.right_upperarm.rotation.z = degToRad(upperArmTweenReset._object.z - 60);
            })
            .start();   
        // Tween per ripristinare le cosce
        const thighTweenReset = new TWEEN.Tween(character.bones.left_thigh.rotation)
            .to(originalThighRotation, resetTime)
            .onUpdate(() => {
               character.bones.left_thigh.rotation.z = degToRad(thighTweenReset._object.z -25);
               character.bones.left_thigh.rotation.x = degToRad(thighTweenReset._object.x +180);
               character.bones.right_thigh.rotation.z = degToRad(thighTweenReset._object.z -25);
            })
            .start();  
        const bodyResetTween = new TWEEN.Tween(character.mesh.position)
        .to(originalBodyStartPosition, resetTime)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
           character.mesh.position.x = bodyResetTween._object.x;
           character.mesh.position.y = bodyResetTween._object.y+3;
           character.mesh.position.z = bodyResetTween._object.z;
        })
            .start();
    };  



    function spin() {
        const startRotation = { y: character.mesh.rotation.y }; // Rotazione iniziale
        const endRotation = { y: character.mesh.rotation.y + 2 * Math.PI }; 

        const spinTween = new TWEEN.Tween(startRotation)
            .to(endRotation, spinTime)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(() => {
                character.mesh.rotation.y = startRotation.y;
            })
            .onComplete(() => {
                spin(); // Ripeti la rotazione
            });

        spinTween.start();
    }

    // Avvia la prima rotazione
    spin();

    // Restart bones: 
    resetBonePositions();
}




function bounceBall(bounceHeight) {
    const groundY = 2.9;

    function simulateBounce() {
        let currentHeight = bounceHeight;
        let gravity = 9.8;

        function bounce() {
            if (currentHeight < 0.1) return;

            let timeUp = Math.sqrt((2 * currentHeight) / gravity); //equazione del moto uniformemente accelerato
            let timeDown = timeUp;

            let bounceUp = new TWEEN.Tween({ y: groundY })
                .to({ y: groundY + currentHeight }, timeUp * 500)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onUpdate(function (object) {
                    palla.position.y = object.y;
                });

            let bounceDown = new TWEEN.Tween({ y: groundY + currentHeight })
                .to({ y: groundY }, timeDown * 500)
                .easing(TWEEN.Easing.Quadratic.In)
                .onUpdate(function (object) {
                    palla.position.y = object.y;
                });

            bounceUp.chain(bounceDown);
            bounceUp.start();

            currentHeight *= 0.5;
            bounceDown.onComplete(bounce);
        }

        bounce();
    }

    simulateBounce();
}




document.addEventListener('keydown', (event) => {
    const validKeys = ['f', 'g', 'b'];
    if (validKeys.includes(event.key.toLowerCase())) {
        marioKickBallAnimation(event.key.toUpperCase());
    }
});


