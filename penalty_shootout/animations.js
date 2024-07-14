import * as THREE from './utils/three.module.js';


let models = {}; // Oggetto per memorizzare i modelli
var mario, luigi, palla, rete, prato;
let characterCurrentAnimationTweens = {};
let key;


// Inizializza i personaggi con i modelli caricati e la scena
export function initCharacters(loadedModels, scene) {
    models = loadedModels;
    mario = models.mario;
    luigi = models.luigi;
    prato = models.penalty_area ? models.penalty_area.getObjectByName('Plane001') : null;
    palla = models.penalty_area ? models.penalty_area.getObjectByName('Sphere001') : null; // Assign palla correctly
    rete = models.penalty_area ? models.penalty_area.getObjectByName('Box012') : null; // Assign palla correctly
    // Inizializzazione di bones per Mario e Luigi
    mario.bones = {};
    luigi.bones = {};
    // Esempio di inizializzazione per Mario e Luigi
    if (mario) {
        mario.mesh = new THREE.Object3D();
        mario.mesh.name = "mario";
        // Aggiungi il corpo del modello a mesh di Mario
        let marioBody = mario.getObjectByName("RootNode");
        marioBody.scale.set(0.19, 0.19, 0.19);
        // Altri setup per Mario se necessario
        mario.mesh.add(marioBody);
        mario.mesh.position.set(-40, 0.1, -55);
        scene.add(mario.mesh);
        console.log("Mario initialized:", mario);
        setCharacterBones(mario, boneMappingMario);
        characterReset(mario);
        
    } else {
        console.error("Mario model not found in loaded models.");
    }
    
    if (luigi) {
        luigi.mesh = new THREE.Object3D();
        luigi.mesh.name = "luigi";
        // Aggiungi il corpo del modello a mesh di Luigi
        let luigiBody = luigi.getObjectByName("RootNode");
        luigiBody.scale.set(1.25, 1.25, 1.25);
        // Assicurati di usare il nome corretto nel tuo modello GLTF
        luigi.mesh.add(luigiBody);
        
        // Altri setup per Luigi se necessario
        luigi.mesh.position.set(-43, 0, 70);
        luigi.mesh.rotation.set(-0.07,3.1,0);
        scene.add(luigi.mesh);
        console.log("Luigi initialized:", luigi);
        setCharacterBones(luigi, boneMappingLuigi);
        characterReset(luigi);

    } else {
        console.error("Luigi model not found in loaded models.");
    }


    if(prato){
        prato.scale.set(1, 0.5, 0.5);
        prato.position.set(-40, 0, 70);
        scene.add(prato); // Aggiungi prato alla scena
    } else {
        console.log("Prato not found")
    }


    
    if (palla) {
        palla.scale.set(0.2, 0.2, 0.2);
        palla.position.set(-43, 3, -46);
        scene.add(palla);
        console.log("Palla initialized:", palla);

    }else {
        console.error("Palla not found in loaded models.");
    }

    if (rete) {
        rete.scale.set(0.094, 0.094, 0.094);
        rete.position.set(-42, 10, 69);
        scene.add(rete);
        console.log("Rete initialized:", rete);

    } else {
        console.error("Rete not found in loaded models.");
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
    'L_finger2_2_025': 'left_finger2_2', // verifica se il nome è corretto
    'L_finger3_1_026': 'left_finger3_1',
    'L_finger3_2_027': 'left_finger3_2',
    'L_finger4_1_028': 'left_finger4_1',
    'L_finger4_2_029': 'left_finger4_2',
    'L_thumb_1_030': 'left_thumb_1',
    'L_thumb_2_031': 'left_thumb_2',
    'R_upperarm_038': 'right_upperarm',
    'R_forearm_039': 'right_forearm',
    'R_hand_040': 'right_hand',
    'R_hand_roll_052': 'right_hand_roll', // verifica se il nome è corretto
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
            console.log(`Bone found: ${o.name}`);
            if (boneMapping[o.name]) {
                character.bones[boneMapping[o.name]] = o;
            }    
        }    
    });    
}    




// Funzione per convertire gradi in radianti
function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

// Funzione per resettare l'animazione del personaggio
function characterReset(character) {
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


    // Animazione di calcio per Mario
// Animazione di calcio per Mario
export function marioKickBallAnimation(key) {
    console.log("Mario is kicking the ball!");

    if (!mario || !mario.mesh) {
        console.error('Mario is not initialized');
        return;
    }

    // Calcola la distanza tra Mario e la palla
    const distance = mario.mesh.position.distanceTo(palla.position);

    // Definisci una distanza massima per poter calciare
    const kickDistance = 10; // Modifica questo valore secondo necessità

    if (distance > kickDistance) {
        console.log("La palla è troppo lontana per essere calciata.");
        return; // Esci se la palla è troppo lontana
    }

    characterReset(mario);

    var animationTime = 1000; // Durata dell'animazione in millisecondi

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

    /* ----- LEVARE PIEDE PER IL CALCIO ----- */
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
    leftLegTweenStart.chain(leftLegTweenEnd);


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

    let ballTween;
    let ballRotationTween;

    setTimeout(() => {
        // Definizione delle traiettorie
        let trajectory;

        switch (key) {
            case 'F':
                // Tiro forte
                trajectory = {
                    positionEnd: { x: palla.position.x + 27, y: palla.position.y + 14, z: palla.position.z + 122 },
                    rotationEnd: { x: 0, y: 0, z: 360 }
                };
                break;
            case 'G':
                // Tiro a giro
                trajectory = {
                    positionEnd: { x: palla.position.x - 27, y: palla.position.y +14 , z: palla.position.z + 122 },
                    rotationEnd: { x: 0, y: 360, z: 0 }
                };
                break;
            case 'B':
                // Tiro basso
                trajectory = {
                    positionEnd: { x: palla.position.x -27, y: palla.position.y , z: palla.position.z + 122 },
                    rotationEnd: { x: 0, y: 0, z: 360 }
                };
                break;
            default:
                console.error("Tiro non riconosciuto");
                return;
        }

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

        // Rimbalzo della palla
        ballTween.onComplete(() => {
            var bounceHeight = 14;
            var groundY = 2.9;

            function simulateBounce() {
                let currentHeight = bounceHeight;
                let gravity = 9.8;

                function bounce() {
                    if (currentHeight < 0.1) return;

                    let timeUp = Math.sqrt((1 * currentHeight) / gravity);
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
        });
    }, 500);
    

    
    // Aggiungi tutti i tween all'array characterCurrentAnimationTweens
    characterCurrentAnimationTweens = [];
    characterCurrentAnimationTweens.push(legTweenStart, legTweenEnd);
    characterCurrentAnimationTweens.push(footTweenStart, footTweenEnd);
    characterCurrentAnimationTweens.push(ballTween);
    characterCurrentAnimationTweens.push(ballRotationTween);

}




export function luigiSaveAttempt(){
    console.log("Luigi try to save the ball!");

    if (!luigi || !luigi.mesh) {
        console.error('Luigi is not initialized');
        return;
    }

    // Calcola la distanza tra Luigi e la palla
    const distance = luigi.mesh.position.distanceTo(palla.position);

    // Definisci una distanza massima per poter parare
    const kickDistance = 50; // Modifica questo valore secondo necessità

    if (distance > kickDistance) {
        console.log("La palla è troppo lontana per essere parata.");
        return; // Esci se la palla è troppo lontana
    }

    characterReset(luigi);



    //Definire la scelta casuale della parate per i 3 tipi di traiettoria. 
    const animationTime = 500;

     // Scegliere una traiettoria casuale per il tiro
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
    var thighMaxAngle;



    switch (saveDirection) {
        case 'F':
            savePosition = { x: -23, y: 3, z: 70  }; // Posizione per tiro forte
            spineMaxAngleY = -30;
            spineMaxAngleZ = 45
            pelvisMaxAngle = 45;
            upperArmMaxAngleX = 30
            upperArmMaxAngleY = 45
            upperArmMaxAngleZ = 45
            thighMaxAngle = -45;


            console.log("Parata per tiro a forte")

            break;
        case 'G':
            savePosition = {x: -60, y: 3, z: 70 }; // Posizione per tiro a giro
            console.log("Parata per tiro a giro")
            spineMaxAngleY = 30;
            spineMaxAngleZ = -45;
            pelvisMaxAngle = -180;
            upperArmMaxAngleX = 30
            upperArmMaxAngleY = 45
            upperArmMaxAngleZ = 45
            var thighMaxAngle = 45;



            break;
        case 'B':
            savePosition = { x: -60, y: -4, z: 70 }; // Posizione per tiro basso
            console.log("Parata per tiro basso")
            spineMaxAngleY = 60;
            spineMaxAngleZ = -70;
            pelvisMaxAngle = -45;
            upperArmMaxAngleX = 30
            upperArmMaxAngleY = 45
            upperArmMaxAngleY = 45
            thighMaxAngle = 90;




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


    
    
    // --------------------------------------------- LEGS MOVEMENT ----------------------------------------------- //

  

    var thighRotationStart = {x:0, y:0, z:thighMaxAngle};
    var thighRotationEnd = {x:0, y:0, z:thighMaxAngle};
    var thighTweenStart = new TWEEN.Tween(thighRotationStart)
    .to(thighRotationEnd, animationTime)
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(function() {
        luigi.bones.left_thigh.rotation.z = degToRad(thighRotationStart.z);
        luigi.bones.right_thigh.rotation.z = degToRad(-thighRotationStart.z);
    })
    .start();

    
    


     /*
    //----------------------------------------------------------- CALF------------------------------------------------- //
    var calfMaxAngle = -50;

    var calfRotationStart = {x:-calfMaxAngle, y:0, z:0};
    var calfTweenStart = new TWEEN.Tween(calfRotationStart)
    .to({x:0, y:0, z:0}, animationTime)
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(function() {
        luigi.bones.left_calf.rotation.x = degToRad(-(calfMaxAngle+calfRotationStart.x));
        luigi.bones.right_calf.rotation.x = degToRad(calfRotationStart.x);
    })
    .start();

    var calfRotationEnd = {x:0, y:0, z:0};
    var calfTweenEnd = new TWEEN.Tween(calfRotationEnd)
    .to({x:-calfMaxAngle, y:0, z:0}, animationTime)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(function() {
        luigi.bones.left_calf.rotation.x = degToRad(-(calfMaxAngle+calfRotationEnd.x));
        luigi.bones.right_calf.rotation.x = degToRad(calfRotationEnd.x);
    })
    .start();

    calfTweenEnd.chain(calfTweenStart);
    

    // ---------------------------------------------- BODY MOVEMENT --------------------------------------------- //

    */
    // Tween per la posizione del corpo
    var bodyMaxPosition = 3;
    
    
    const bodyStartPosition = { x: luigi.mesh.position.x, y:bodyMaxPosition, z: luigi.mesh.position.z };
    const bodyEndPosition = savePosition;
    const bodyTween = new TWEEN.Tween(bodyStartPosition)
        .to(bodyEndPosition, animationTime)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function () {
            luigi.mesh.position.x = bodyStartPosition.x;
            luigi.mesh.position.y = bodyStartPosition.y;
            luigi.mesh.position.z = bodyStartPosition.z;
        })
        .start();



        //chiamarlo BodyTween da migliorare la collisione 
    // Completamento dell'animazione
    bodyTweenStart.onUpdate(() => {
        const collisionDistance = 1;
        console.log("Luigi ha tentato di parare la palla!");
        // Logica aggiuntiva per verificare se la parata ha avuto successo
        if (luigi.mesh.position.distanceTo(palla.position) < collisionDistance) {
            console.log("Palla parata!");
            ballTween.stop();
        }
    });

    
    // Aggiungi tutti i tween all'array characterCurrentAnimationTweens
    characterCurrentAnimationTweens.push(spineTween);
    characterCurrentAnimationTweens.push(bodyTween);
    characterCurrentAnimationTweens.push(pelvisTween);
    characterCurrentAnimationTweens.push(upperArmTweenStart);
    characterCurrentAnimationTweens.push(thighTweenStart);
}


/*
export function luigiSaveAttempt() {
    console.log("Luigi is trying to save the ball!");

    if (!luigi || !luigi.mesh) {
        console.error('Luigi is not initialized');
        return;
    }

    // Calcola la distanza tra Luigi e la palla
    const distance = luigi.mesh.position.distanceTo(palla.position);

    // Definisci una distanza massima per poter parare
    const saveDistance = 10; // Modifica questo valore secondo necessità

    if (distance > saveDistance) {
        console.log("La palla è troppo lontana per essere parata.");
        return; // Esci se la palla è troppo lontana
    }

    characterReset(luigi);

    const animationTime = 1000;

    // Scegliere una traiettoria casuale per il tiro
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
    switch (saveDirection) {
        case 'F':
            savePosition = { x: 20, y: 10, z: 122 }; // Posizione per tiro forte
            break;
        case 'G':
            savePosition = { x: -20, y: 10, z: 122 }; // Posizione per tiro a giro
            break;
        case 'B':
            savePosition = { x: 0, y: 5, z: 122 }; // Posizione per tiro basso
            break;
        default:
            console.error("Tipo di parata non riconosciuto");
            return;
    }

    // Animazione delle braccia e del corpo di Luigi per la parata
    const armStartRotation = { x: 0, y: 0, z: 0 };
    const armEndRotation = { x: -30, y: 0, z: 0 };

    const armTween = new TWEEN.Tween(armStartRotation)
        .to(armEndRotation, animationTime / 2)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function () {
            luigi.bones.left_forearm.rotation.x = degToRad(armStartRotation.x);
            luigi.bones.right_forearm.rotation.x = degToRad(armStartRotation.x);
        })
        .start();

    // Tween per la posizione del corpo
    const bodyStartPosition = { x: luigi.mesh.position.x, y: luigi.mesh.position.y, z: luigi.mesh.position.z };
    const bodyEndPosition = savePosition;

    const bodyTween = new TWEEN.Tween(bodyStartPosition)
        .to(bodyEndPosition, animationTime)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function () {
            luigi.mesh.position.x = bodyStartPosition.x;
            luigi.mesh.position.y = bodyStartPosition.y;
            luigi.mesh.position.z = bodyStartPosition.z;
        })
        .start();

    // Completamento dell'animazione
    bodyTween.onComplete(() => {
        console.log("Luigi ha tentato di parare la palla!");
        // Logica aggiuntiva per verificare se la parata ha avuto successo
    });

    // Aggiungi tutti i tween all'array characterCurrentAnimationTweens
    characterCurrentAnimationTweens = [];
    characterCurrentAnimationTweens.push(armTween);
    characterCurrentAnimationTweens.push(bodyTween);
}*/





document.addEventListener('keydown', (event) => {
    if (event.key === 'f' || event.key === 'g' || event.key === 'b') {
        marioKickBallAnimation(event.key.toUpperCase());
    }

    setTimeout(() => {
    luigiSaveAttempt();
    }, 1000);
    
});

    

/*savePosition = { x: -20, y: 5, z: 70 }; // Posizione per tiro forte
console.log("Prova a parare tiro forte")
break;
case 'G':
savePosition = { x: -70, y: 5, z: 70 }; // Posizione per tiro a giro
console.log("Prova a parare tiro a giro")
break;
case 'B':
savePosition = { x: -70, y: 0, z: 70 }; // Posizione per tiro basso
console.log("Prova a parare tiro basso")*/
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    























