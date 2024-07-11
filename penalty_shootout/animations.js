import * as THREE from './utils/three.module.js';

let models = {}; // Oggetto per memorizzare i modelli

// Inizializza i personaggi con i modelli caricati e la scena
export function initCharacters(loadedModels, scene) {
    models = loadedModels;
    // Esempio di inizializzazione per Mario e Luigi
    if (models.mario) {
        models.mario.mesh = new THREE.Object3D();
        models.mario.mesh.name = "mario";
        // Aggiungi il corpo del modello a mesh di Mario
        let marioBody = models.mario.getObjectByName("RootNode");
        marioBody.scale.set(0.19, 0.19, 0.19);
        marioBody.position.set(-43, 0.1, -55);
        models.mario.mesh.add(marioBody);
        scene.add(models.mario.mesh);
        // Altri setup per Mario se necessario
    }

    if (models.luigi) {
        models.luigi.mesh = new THREE.Object3D();
        models.luigi.mesh.name = "luigi";
        // Aggiungi il corpo del modello a mesh di Luigi
        let luigiBody = models.luigi.getObjectByName("RootNode");
        luigiBody.scale.set(1.25, 1.25, 1.25);
        luigiBody.position.set(-43, 0, 70);
        luigiBody.rotation.set(-0.07,3.1,0);
        // Assicurati di usare il nome corretto nel tuo modello GLTF
        models.luigi.mesh.add(luigiBody);
        scene.add(models.luigi.mesh);
        // Altri setup per Luigi se necessario
    }


    setMarioBones();
    setLuigiBones();
}



function setMarioBones() {
    models.mario.bones = {}; // Inizializza models.mario.bones come un oggetto vuoto

    models.mario.mesh.traverse(o => {
        if (o.isBone) {
            switch (o.name) {
                case 'pelvis_03':
                    models.mario.bones.pelvis = o;
                    break;
                case 'spine00_04':
                    models.mario.bones.spine = o;
                    break;
                case 'head_05':
                    models.mario.bones.head = o;
                    break;
                case 'head_aimcont_06':
                    models.mario.bones.head_aimcont = o;
                    break;
                case 'cap_07':
                    models.mario.bones.cap = o;
                    break;
                case 'chin_014':
                    models.mario.bones.chin = o;
                    break;
                case 'lower_lip_015':
                    models.mario.bones.lower_lip = o;
                    break;
                case 'upper_lip_016':
                    models.mario.bones.upper_lip = o;
                    break;
                case 'attach_head_019':
                    models.mario.bones.attach_head = o;
                    break;
                case 'L_upperarm_021':
                    models.mario.bones.left_upperarm = o;
                    break;
                case 'L_forearm_022':
                    models.mario.bones.left_forearm = o;
                    break;
                case 'L_hand_023':
                    models.mario.bones.left_hand = o;
                    break;
                case 'L_finger2_1_024':
                    models.mario.bones.left_finger2_1 = o;
                    break;
                case 'L_finger2_2_025':
                    models.mario.bones.left_finger2_2 = o;
                    break;
                case 'L_finger3_1_026':
                    models.mario.bones.left_finger3_1 = o;
                    break;
                case 'L_finger3_2_027':
                    models.mario.bones.left_finger3_2 = o;
                    break;
                case 'L_finger4_1_028':
                    models.mario.bones.left_finger4_1 = o;
                    break;
                case 'L_finger4_2_029':
                    models.mario.bones.left_finger4_2 = o;
                    break;
                case 'L_thumb_1_030':
                    models.mario.bones.left_thumb_1 = o;
                    break;
                case 'L_thumb_2_031':
                    models.mario.bones.left_thumb_2 = o;
                    break;
                case 'L_finger1_1_032':
                    models.mario.bones.left_finger1_1 = o;
                    break;
                case 'L_finger1_2_033':
                    models.mario.bones.left_finger1_2 = o;
                    break;
                case 'L_hand_roll_035':
                    models.mario.bones.left_hand_roll = o;
                    break;
                case 'L_elbow_036':
                    models.mario.bones.left_elbow = o;
                    break;
                case 'R_upperarm_038':
                    models.mario.bones.right_upperarm = o;
                    break;
                case 'R_forearm_039':
                    models.mario.bones.right_forearm = o;
                    break;
                case 'R_hand_040':
                    models.mario.bones.right_hand = o;
                    break;
                case 'R_finger2_1_041':
                    models.mario.bones.right_finger2_1 = o;
                    break;
                case 'R_finger2_2_042':
                    models.mario.bones.right_finger2_2 = o;
                    break;
                case 'R_finger3_1_043':
                    models.mario.bones.right_finger3_1 = o;
                    break;
                case 'R_finger3_2_044':
                    models.mario.bones.right_finger3_2 = o;
                    break;
                case 'R_finger4_1_045':
                    models.mario.bones.right_finger4_1 = o;
                    break;
                case 'R_finger4_2_046':
                    models.mario.bones.right_finger4_2 = o;
                    break;
                case 'R_thumb_1_047':
                    models.mario.bones.right_thumb_1 = o;
                    break;
                case 'R_thumb_2_048':
                    models.mario.bones.right_thumb_2 = o;
                    break;
                case 'R_finger1_1_049':
                    models.mario.bones.right_finger1_1 = o;
                    break;
                case 'R_finger1_2_050':
                    models.mario.bones.right_finger1_2 = o;
                    break;
                case 'R_hand_roll_052':
                    models.mario.bones.right_hand_roll = o;
                    break;
                case 'R_elbow_053':
                    models.mario.bones.right_elbow = o;
                    break;
                case 'L_thigh_054':
                    models.mario.bones.left_thigh = o;
                    break;
                case 'L_calf_055':
                    models.mario.bones.left_calf = o;
                    break;
                case 'L_foot_056':
                    models.mario.bones.left_foot = o;
                    break;
                case 'L_toe_057':
                    models.mario.bones.left_toe = o;
                    break;
                case 'L_knee_059':
                    models.mario.bones.left_knee = o;
                    break;
                case 'R_thigh_060':
                    models.mario.bones.right_thigh = o;
                    break;
                case 'R_calf_061':
                    models.mario.bones.right_calf = o;
                    break;
                case 'R_foot_00':
                    models.mario.bones.right_foot = o;
                    break;
                case 'R_toe_062':
                    models.mario.bones.right_toe = o;
                    break;
                case 'R_knee_064':
                    models.mario.bones.right_knee = o;
                    break;
                default:
                    break;
            }
        }
    });
}

function setLuigiBones() {
    models.luigi.bones = {}; // Inizializza models.luigi.bones come un oggetto vuoto

    models.luigi.mesh.traverse(o => {
        if (o.isBone) {
            switch (o.name) {
                case 'pelvis_03':
                    models.luigi.bones.pelvis = o;
                    break;
                case 'spine00_04':
                    models.luigi.bones.spine = o;
                    break;
                case 'head_05':
                    models.luigi.bones.head = o;
                    break;
                case 'head_aimcont_06':
                    models.luigi.bones.head_aimcont = o;
                    break;
                case 'cap_07':
                    models.luigi.bones.cap = o;
                    break;
                case 'chin_014':
                    models.luigi.bones.chin = o;
                    break;
                case 'lower_lip_015':
                    models.luigi.bones.lower_lip = o;
                    break;
                case 'upper_lip_018':
                    models.luigi.bones.upper_lip = o;
                    break;
                case 'attach_head_022':
                    models.luigi.bones.attach_head = o;
                    break;
                case 'L_upperarm_024':
                    models.luigi.bones.left_upperarm = o;
                    break;
                case 'L_forearm_025':
                    models.luigi.bones.left_forearm = o;
                    break;
                case 'L_hand_026':
                    models.luigi.bones.left_hand = o;
                    break;
                case 'L_finger1_1_027':
                    models.luigi.bones.left_finger1_1 = o;
                    break;
                case 'L_finger1_2_028':
                    models.luigi.bones.left_finger1_2 = o;
                    break;
                case 'L_finger2_1_029':
                    models.luigi.bones.left_finger2_1 = o;
                    break;
                case 'L_finger2_2_030':
                    models.luigi.bones.left_finger2_2 = o;
                    break;
                case 'L_finger3_1_031':
                    models.luigi.bones.left_finger3_1 = o;
                    break;
                case 'L_finger3_2_032':
                    models.luigi.bones.left_finger3_2 = o;
                    break;
                case 'L_finger4_1_033':
                    models.luigi.bones.left_finger4_1 = o;
                    break;
                case 'L_finger4_2_034':
                    models.luigi.bones.left_finger4_2 = o;
                    break;
                case 'L_thumb_1_035':
                    models.luigi.bones.left_thumb_1 = o;
                    break;
                case 'L_thumb_2_036':
                    models.luigi.bones.left_thumb_2 = o;
                    break;
                case 'L_hand_roll_037':
                    models.luigi.bones.left_hand_roll = o;
                    break;
                case 'L_elbow_039':
                    models.luigi.bones.left_elbow = o;
                    break;
                case 'R_upperarm_041':
                    models.luigi.bones.right_upperarm = o;
                    break;
                case 'R_forearm_042':
                    models.luigi.bones.right_forearm = o;
                    break;
                case 'R_hand_043':
                    models.luigi.bones.right_hand = o;
                    break;
                case 'R_finger1_1_044':
                    models.luigi.bones.right_finger1_1 = o;
                    break;
                case 'R_finger1_2_045':
                    models.luigi.bones.right_finger1_2 = o;
                    break;
                case 'R_finger2_1_046':
                    models.luigi.bones.right_finger2_1 = o;
                    break;
                case 'R_finger2_2_047':
                    models.luigi.bones.right_finger2_2 = o;
                    break;
                case 'R_finger3_1_048':
                    models.luigi.bones.right_finger3_1 = o;
                    break;
                case 'R_finger3_2_049':
                    models.luigi.bones.right_finger3_2 = o;
                    break;
                case 'R_finger4_1_050':
                    models.luigi.bones.right_finger4_1 = o;
                    break;
                case 'R_finger4_2_051':
                    models.luigi.bones.right_finger4_2 = o;
                    break;
                case 'R_thumb_1_052':
                    models.luigi.bones.right_thumb_1 = o;
                    break;
                case 'R_thumb_2_053':
                    models.luigi.bones.right_thumb_2 = o;
                    break;
                case 'R_hand_roll_054':
                    models.luigi.bones.right_hand_roll = o;
                    break;
                case 'R_elbow_056':
                    models.luigi.bones.right_elbow = o;
                    break;
                case 'L_thigh_057':
                    models.luigi.bones.left_thigh = o;
                    break;
                case 'L_calf_058':
                    models.luigi.bones.left_calf = o;
                    break;
                case 'L_foot_059':
                    models.luigi.bones.left_foot = o;
                    break;
                case 'L_toe_060':
                    models.luigi.bones.left_toe = o;
                    break;
                case 'L_knee_062':
                    models.luigi.bones.left_knee = o;
                    break;
                case 'R_thigh_063':
                    models.luigi.bones.right_thigh = o;
                    break;
                case 'R_calf_064':
                    models.luigi.bones.right_calf = o;
                    break;
                case 'R_foot_065':
                    models.luigi.bones.right_foot = o;
                    break;
                case 'R_toe_066':
                    models.luigi.bones.right_toe = o;
                    break;
                case 'R_knee_068':
                    models.luigi.bones.right_knee = o;
                    break;
                default:
                    break;
            }
        }
    });
}




export function animateCharacters() {
    TWEEN.update();
    // Example animation for Mario (kicking the ball)
    if (models.mario && models.ball) {
        // Start the animation when spacebar is pressed
        document.addEventListener('keydown', function(event) {
            if (event.code === 'Space') {
                startMarioShootAnimation();
            }
        });
    }

    // Example animations or operations on models
}

function startMarioShootAnimation() {
    if (models.mario && models.ball) {
        var kickTween = new TWEEN.Tween({ angle: 0 })
            .to({ angle: -45 }, 500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function() {
                if (models.mario.bones && models.mario.bones.right_lower_leg) {
                    models.mario.bones.right_lower_leg.rotation.x = THREE.Math.degToRad(this.angle);
                }
            })
            .onComplete(function() {
                new TWEEN.Tween({ angle: -45 })
                    .to({ angle: 0 }, 500)
                    .easing(TWEEN.Easing.Quadratic.In)
                    .onUpdate(function() {
                        if (models.mario.bones && models.mario.bones.right_lower_leg) {
                            models.mario.bones.right_lower_leg.rotation.x = THREE.Math.degToRad(this.angle);
                        }
                    })
                    .start();

                moveBallToGoal(models.ball, models.mario, models.luigi);
            })
            .start();
    }
}

function moveBallToGoal(ball, mario, luigi) {
    var ballTween = new TWEEN.Tween(ball.position)
        .to({ x: 0, y: 0, z: 30 }, 1000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onComplete(function() {
            luigiSaveAttempt(luigi, ball);
        })
        .start();
}

function luigiSaveAttempt(luigi, ball) {
    var saveDirection = (Math.random() < 0.5) ? -1 : 1;

    var luigiTween = new TWEEN.Tween({ angle: 0, x: 0 })
        .to({ angle: saveDirection * 45, x: saveDirection * 2 }, 500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function() {
            if (luigi.bones && luigi.bones.spine) {
                luigi.bones.spine.rotation.y = THREE.Math.degToRad(this.angle);
            }
            if (luigi.mesh) {
                luigi.mesh.position.x = this.x;
            }
        })
        .onComplete(function() {
            new TWEEN.Tween({ angle: saveDirection * 45, x: saveDirection * 2 })
                .to({ angle: 0, x: 0 }, 500)
                .easing(TWEEN.Easing.Quadratic.In)
                .onUpdate(function() {
                    if (luigi.bones && luigi.bones.spine) {
                        luigi.bones.spine.rotation.y = THREE.Math.degToRad(this.angle);
                    }
                    if (luigi.mesh) {
                        luigi.mesh.position.x = this.x;
                    }
                })
                .start();
        })
        .start();
}

// Optional: Initialize keyboard event listeners for characters
export function initCharacterKeybordEventListeners() {
    // Example: Listen for keyboard events and trigger animations
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            startMarioShootAnimation();
        }
        // Add more event handling as needed
    });
}
