import * as THREE from './utils/three.module.js';


let models = {}; // Oggetto per memorizzare i modelli
var mario, luigi, palla, rete;
let characterCurrentAnimationTweens = {};


// Inizializza i personaggi con i modelli caricati e la scena
export function initCharacters(loadedModels, scene) {
    models = loadedModels;
    mario = models.mario;
    luigi = models.luigi;
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
export function marioKickBallAnimation() {
    console.log("Mario is kicking the ball!");

        
        if (!mario || !mario.mesh) {
            console.error('Mario is not initialized');
            return;
        }
        
        characterReset(mario);

        var animationTime = 500; // Durata dell'animazione in millisecondi
        
        /* ----- LEVARE PIEDE PER IL CALCIO ----- */
        var kickMaxAngle = 60;
        
        var legRotationStart = { x: 0, y: 0, z: 0 };
        var legTweenStart = new TWEEN.Tween(legRotationStart)
        .to({ x: -kickMaxAngle, y: 0, z: 0 }, animationTime / 2)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function () {
            mario.bones.right_thigh.rotation.x = degToRad(legRotationStart.x);
        })
        .start();
        
        var legRotationEnd = { x: -kickMaxAngle, y: 0, z: 0 };
        var legTweenEnd = new TWEEN.Tween(legRotationEnd)
        .to({ x: 0, y: 0, z: 0 }, animationTime / 2)
        .easing(TWEEN.Easing.Quadratic.In)
        .onUpdate(function () {
            mario.bones.right_thigh.rotation.x = degToRad(legRotationEnd.x);
        })
        .start();

        legTweenStart.chain(legTweenEnd);
        
        /* ----- MOVIMENTO DEL PIEDE ----- */
        var footMaxAngle = 45;
        
        var footRotationStart = { x: 0, y: 0, z: 0 };
        var footTweenStart = new TWEEN.Tween(footRotationStart)
        .to({ x: footMaxAngle, y: 0, z: 0 }, animationTime / 2)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function () {
            mario.bones.right_foot.rotation.x = degToRad(footRotationStart.x);
        })
        .start();
        
        var footRotationEnd = { x: footMaxAngle, y: 0, z: 0 };
        var footTweenEnd = new TWEEN.Tween(footRotationEnd)
        .to({ x: 0, y: 0, z: 0 }, animationTime / 2)
        .easing(TWEEN.Easing.Quadratic.In)
        .onUpdate(function () {
            mario.bones.right_foot.rotation.x = degToRad(footRotationEnd.x);
        })
        .start();
        
        footTweenStart.chain(footTweenEnd);
        
        /* ----- MOVIMENTO DELLA PALLA ----- */
    var ballPositionStart = { x: palla.position.x, y: palla.position.y, z: palla.position.z };
    var ballPositionEnd = { x: palla.position.x + 10, y: palla.position.y, z: palla.position.z }; // Modifica il valore di x per la distanza desiderata
    var ballTween = new TWEEN.Tween(ballPositionStart)
        .to(ballPositionEnd, animationTime)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function () {
            palla.position.x = ballPositionStart.x;
            palla.position.y = ballPositionStart.y;
            palla.position.z = ballPositionStart.z;
        })
        .start();
        
        // Aggiungi tutti i tween all'array characterCurrentAnimationTweens
        characterCurrentAnimationTweens = [];
        characterCurrentAnimationTweens.push(legTweenStart, legTweenEnd);
        characterCurrentAnimationTweens.push(footTweenStart, footTweenEnd);
        characterCurrentAnimationTweens.push(ballTween);
   
}


window.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        marioKickBallAnimation(); // Chiama l'animazione quando premi Space
    }
});
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    






































/*
export function initAnimations(mario) {
    mixer = new THREE.AnimationMixer(mario);

    // Esempio di creazione di una animazione (es. calcio della palla)
    createKickAnimation(mario);
}

function createKickAnimation(mario) {
    let rightFootBone = mario.bones.right_foot;

    // Posizione iniziale del bone (posizione di partenza del calcio)
    let startPosition = rightFootBone.rotation.clone();

    // Creazione di una traccia di animazione (KeyframeTrack)
    let track = new THREE.KeyframeTrack(
        '.rotation[x]',
        [0, 0.5, 1], // Timestamps in seconds
        [startPosition.x, startPosition.x - 0.3, startPosition.x]
    );

    // Creazione di una clip di animazione
    let clip = new THREE.AnimationClip('Kick', 1, [track]);

    // Aggiungi la clip di animazione al mixer
    mixer.clipAction(clip).play();
}

export function updateAnimations(delta) {
    if (mixer) {
        mixer.update(delta);
    }
}



let ballMoving = false;
let ballDirection = new THREE.Vector3(0, 0, -1); // Direction of the kick
let ballSpeed = 0.1; // Speed of the ball
let ballKickDuration = 2; // Duration of the kick in seconds
let ballKickStartTime;

function kickBall() {
    ballMoving = true;
    ballKickStartTime = Date.now();
}

function updateBall() {
    if (ballMoving) {
        let elapsed = (Date.now() - ballKickStartTime) / 1000; // Convert to seconds
        if (elapsed < ballKickDuration) {
            palla.position.add(ballDirection.clone().multiplyScalar(ballSpeed)); // Move the ball
        } else {
            ballMoving = false; // Stop moving after duration
        }
    }
}





function checkCollision() {
    const ballBox = new THREE.Box3().setFromObject(palla);
    const luigiBox = new THREE.Box3().setFromObject(luigi.mesh);

    if (ballBox.intersectsBox(luigiBox)) {
        console.log("Goalie hit!");
        ballMoving = false; // Stop the ball if it hits Luigi
        // Handle scoring or game logic here
    }
}



let luigiDirection = 1; // 1 per destra, -1 per sinistra
const luigiSpeed = 0.1; // Velocità di movimento
const luigiMaxX = -40; // Limite destro
const luigiMinX = -50; // Limite sinistro*/

/*export function updateLuigiMovement(luigi) {
    if (luigi.mesh) {
        luigi.mesh.position.x += luigiDirection * luigiSpeed;

        // Cambia direzione se raggiunge i limiti
        if (luigi.mesh.position.x >= luigiMaxX || luigi.mesh.position.x <= luigiMinX) {
            luigiDirection *= -1;
        }
    }
}*/







/*
export function animateCharacters() {
    console.log('animateCharacters called');

    TWEEN.update();
    // Example animation for Mario (kicking the ball)
    if (mario && palla && rete) {
        // Start the animation when spacebar is pressed
            startMarioShootAnimation();
    } else {
        console.log(" Palla non definita o personaggio non caricato. ")
    }

    // Example animations or operations on models
}

function startMarioShootAnimation() {
    console.log('startMarioShootAnimation called');
    if (mario && palla && rete) {
        var kickTween = new TWEEN.Tween({ angle: 0 })
            .to({ angle: -45 }, 500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function() {
                if (mario.bones && mario.bones.right_knee) {
                    mario.bones.right_knee.rotation.x = THREE.MathUtils.degToRad(this.angle);
                }
            })
            .onComplete(function() {
                new TWEEN.Tween({ angle: -45 })
                    .to({ angle: 0 }, 500)
                    .easing(TWEEN.Easing.Quadratic.In)
                    .onUpdate(function() {
                        if (mario.bones && mario.bones.right_knee) {
                            mario.bones.right_knee.rotation.x = THREE.MathUtils.degToRad(this.angle);
                        }
                    })
                    .start();

                moveBallToGoal(palla,luigi, rete);
            })
            .start();
    } else {
        console.log(" Il problema è qui ")
    }
}

function moveBallToGoal(palla, rete) {
    if (!palla || !rete) {
        console.error('Palla o rete non definiti correttamente.');
        return;
    }

    const goalPosition = new THREE.Vector3(); // Posizione della porta (Box012)
    rete.getWorldPosition(goalPosition); // Otteniamo la posizione assoluta della porta

    const targetDirection = new THREE.Vector3();
    targetDirection.copy(goalPosition).sub(palla.position).normalize();

    var ballTween = new TWEEN.Tween(palla.position)
        .to({ x: goalPosition.x, y: goalPosition.y, z: goalPosition.z }, 1000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onComplete(function() {
            // Dopo che l'animazione della palla è completata, chiamiamo luigiSaveAttempt
            luigiSaveAttempt(luigi, palla);
        })
        .start();
}


export function luigiSaveAttempt() {
    console.log('luigiSaveAttempt called');

    const goalPosition = new THREE.Vector3(); // Posizione della porta (Box012)
    rete.getWorldPosition(goalPosition); // Otteniamo la posizione assoluta della porta
    
    // Limitiamo la posizione di Luigi alla posizione della porta
    const saveDirection = (Math.random() < 0.5) ? -1 : 1;

    var luigiTween = new TWEEN.Tween({ angle: 0, x: 0 })
        .to({ angle: saveDirection * 45, x: saveDirection * 2 }, 500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function() {
            if (luigi.bones && luigi.bones.spine) {
                luigi.bones.spine.rotation.y = THREE.MathUtils.degToRad(this.angle);
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
                        luigi.bones.spine.rotation.y = THREE.MathUtils.degToRad(this.angle);
                    }
                    if (luigi.mesh) {
                        luigi.mesh.position.x = this.x;
                    }
                })
                .start();
        })
        .start();
}

//    const goalPosition = (rete.position.x, rete.position.y, rete.position.y) // Posizione della porta (Box012)

*/