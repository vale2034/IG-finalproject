import * as THREE from './utils/three.module.js';
import { GLTFLoader } from './utils/GLTFLoader.js';  // Assicurati che il percorso sia corretto
import { OrbitControls } from './utils/OrbitControls.js';


var scene, camera, renderer, light, mesh, controls, player;
let loader;

var moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
var velocity = new THREE.Vector3();
var cameraCoordinates = document.getElementById('camera-coordinates');

// Inizializza la scena, la camera e il renderer
scene = new THREE.Scene();
//scene.background = new THREE.Color(0xFFFFFF);  // Aggiungere un cielo azzurro


//Carica l'immagine JPEG per la skybox
let load = new THREE.TextureLoader();
const texture = load.load('assets/sunflowers_puresky.jpg');
scene.background = texture;

renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Aggiungi illuminazione
light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(-1, 5, -1).normalize();
scene.add(light);
// Aggiungi illuminazione




//camera e sua posizione 
camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-8.53,5.90,-17.12);  // Posizionare la camera all'altezza dell'omino


//Inizializza OrbitControls
controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(-8, 1, 10);  // Punto di interesse iniziale della camera
controls.update();  // Necessario se la camera è stata modificata manualmente


let namesToRemove = [
    'LayerLayer_1', 'LayerLayer_1_1', 'Cylinder001', 'Cylinder002', 'Cylinder003',
    'Box001', 'Box002', 'Box003', 'Box004', 'Box005', 'Box006', 'Box007',
    'Box008', 'Box009', 'Box010', 'Box011',   "mixamorigHips_00", 'Alpha_Surface', 'Box013',
    "mixamorigSpine_01",
    "mixamorigSpine1_02",
    "mixamorigSpine2_03",
    "mixamorigNeck_04",
    "mixamorigHead_05",
    "mixamorigHeadTop_End_06",
    "mixamorigLeftEye_07",
    "mixamorigRightEye_08",
    "mixamorigLeftShoulder_09",
    "mixamorigLeftArm_010",
    "mixamorigLeftForeArm_011",
    "mixamorigLeftHand_012",
    "mixamorigLeftHandMiddle1_013",
    "mixamorigLeftHandMiddle2_014",
    "mixamorigLeftHandMiddle3_015",
    "mixamorigLeftHandMiddle4_016",
    "mixamorigLeftHandThumb1_017",
    "mixamorigLeftHandThumb2_018",
    "mixamorigLeftHandThumb3_019",
    "mixamorigLeftHandThumb4_020",
    "mixamorigLeftHandIndex1_021",
    "mixamorigLeftHandIndex2_022",
    "mixamorigLeftHandIndex3_023",
    "mixamorigLeftHandIndex4_024",
    "mixamorigLeftHandRing1_025",
    "mixamorigLeftHandRing2_026",
    "mixamorigLeftHandRing3_027",
    "mixamorigLeftHandRing4_028",
    "mixamorigLeftHandPinky1_029",
    "mixamorigLeftHandPinky2_030",
    "mixamorigLeftHandPinky3_031",
    "mixamorigLeftHandPinky4_032",
    "mixamorigRightShoulder_033",
    "mixamorigRightArm_034",
    "mixamorigRightForeArm_035",
    "mixamorigRightHand_036",
    "mixamorigRightHandMiddle1_037",
    "mixamorigRightHandMiddle2_038",
    "mixamorigRightHandMiddle3_039",
    "mixamorigRightHandMiddle4_040",
    "mixamorigRightHandThumb1_041",
    "mixamorigRightHandThumb2_042",
    "mixamorigRightHandThumb3_043",
    "mixamorigRightHandThumb4_044",
    "mixamorigRightHandIndex1_045",
    "mixamorigRightHandIndex2_046",
    "mixamorigRightHandIndex3_047",
    "mixamorigRightHandIndex4_048",
    "mixamorigRightHandRing1_049",
    "mixamorigRightHandRing2_050",
    "mixamorigRightHandRing3_051",
    "mixamorigRightHandRing4_052",
    "mixamorigRightHandPinky1_053",
    "mixamorigRightHandPinky2_054",
    "mixamorigRightHandPinky3_055",
    "mixamorigRightHandPinky4_056",
    "mixamorigRightUpLeg_057",
    "mixamorigRightLeg_058",
    "mixamorigRightFoot_059",
    "mixamorigRightToeBase_060",
    "mixamorigRightToe_End_061",
    "mixamorigLeftUpLeg_062",
    "mixamorigLeftLeg_063",
    "mixamorigLeftFoot_064",
    "mixamorigLeftToeBase_065",
    "mixamorigLeftToe_End_066",
    'Object_7',
    'Object_8',
    'Object_9'
];


//carica modello
loader = new GLTFLoader();
// Funzione per caricare e scalare il modello
function loadModelAndScale(url, scale, namesToRemove) {
    loader.load(
        url,
        function (gltf) {

            removeObjects(gltf, namesToRemove);

            // Applica la trasformazione di scala
            gltf.scene.scale.set(scale, scale, scale);

            // Aggiungi il modello alla scena
            scene.add(gltf.scene);


            // Modifica la posizione di Mario o Luigi se necessario
            if (url.includes('luigi')) {
                console.log('LuigiPosition' , gltf.scene.position)
                gltf.scene.position.set(-43, 0, 70); // Imposta la posizione di Luigi a (5, 0, 0)
                console.log('LuigiRotation' , gltf.scene.rotation)
                gltf.scene.rotation.set(-0.07,3.1,0);
            } else if (url.includes('mario')) {
                console.log('MarioPosition' , gltf.scene.position)
                gltf.scene.position.set(-43, 0, -55); // Imposta la posizione di Mario a (-5, 0, 0)
                 // Imposta la posizione della camera dietro Mario
                 camera.position.set(-62.85, 48.19, -91.31); // Posiziona la camera dietro Mario
                 controls.target.set(-62.85, 48.19, 91.31);  // Punto di interesse iniziale della camera
            } else if (url.includes('penalty_area')) {
                const prato = gltf.scene.getObjectByName('Plane001')
                const palla = gltf.scene.getObjectByName('Sphere001')
                scene.add(prato);
                palla.scale.set(2,2,2)
                palla.position.set(-480,30,-500)
                prato.position.set(25, 0, 0);
                console.log("Scale", prato.scale);
                prato.scale.set(1, 0.6, 1);
                exploreScene(scene);
            }
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('Error loading model', error);
            console.error(error.stack);
        }
    );
}

// Esempio di utilizzo per caricare e scalare i modelli
loadModelAndScale('models/penalty_area/scene.gltf', 5, namesToRemove); // Scala 0.1 (10% della dimensione originale)
loadModelAndScale('models/luigi/scene.gltf', 1.25, []); // Scala 0.05 (5% della dimensione originale)
loadModelAndScale('models/mario/scene.gltf', 0.19, []); // Scala 0.05 (5% della dimensione originale)




function printNodeNames(object, level = 0) {
    let indent = ' '.repeat(level * 2);
    console.log(indent + object.name);
    object.children.forEach(child => {
        printNodeNames(child, level + 1);
    });
}



//Funzione per esplorare la scena
function exploreScene(scene) {
    scene.traverse(function (child) {
        console.log('Object:', child.name);
        console.log('Position:', child.position);
        //console.log('Rotation:', child.rotation);
        //console.log('Scale:', child.scale);
        //console.log('Visibility:', child.visible);
        //console.log('Material:', child.material); // Assicurati che il materiale sia accessibile correttamente

        // Esplora il genitore (parent)
        if (child.parent) {
            console.log('Parent:', child.parent.name);
        } else {
            console.log('No parent');
        }
    });
}

function traverseHierarchy(object, playerName) {
    let player = null;

    object.traverse(function(child) {
        // Trova l'oggetto principale dell'omino
        if (child.name === playerName) {
            player = child;
        }

        // Esempio: raccogli anche i genitori e i figli diretti dell'omino
        if (player && (child.parent === player || child.parent === player.parent)) {
            console.log('Parent:', child.parent ? child.parent.name : null);
            console.log('Object:', child.name);
            console.log('Position:', child.position);
            console.log('Rotation:', child.rotation);
            console.log('Scale:', child.scale);
            console.log('Visibility:', child.visible);
            console.log('Material:', child.material); // Se l'oggetto ha un materiale applicato
            console.log('---');
        }
    });

    return player;
}

// Funzione per rimuovere gli oggetti indesiderati dalla scena
function removeObjects(gltf, namesToRemove) {
    let objectsToRemove = [];

    gltf.scene.traverse(function (child) {
        if (namesToRemove.includes(child.name)) {
            objectsToRemove.push(child);
        }
    });

    objectsToRemove.forEach(function (child) {
        if (child.parent) {
            //console.log('Removing object:', child.name);
            child.parent.remove(child);
        } else {
            console.warn('Parent is undefined for object:', child.name);
        }
    });

    /*gltf.scene.traverse(function (child) {
        console.log('After removal check - object:', child.name);
    });*/

}

function addObjects(gltf, namesToAdd) {
    let objectsToAdd = [];

    gltf.scene.traverse(function (child) {
        if (namesToAdd.includes(child.name)) {
            objectsToAdd.push(child);
        }
    });

    objectsToAdd.forEach(function (child) {
        if (child.parent) {
            console.log('Adding object:', child.name);
            child.parent.add(child);
        } else {
            console.warn('Parent is undefined for object:', child.name);
        }
    });

    gltf.scene.traverse(function (child) {
        console.log('After adding check - object:', child.name);
    });

}

function onKeyDown(event) {
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
            moveBackward = true;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            moveLeft = true;
            break;
        case 'ArrowDown':
        case 'KeyS':
            moveForward = true;
            break;
        case 'ArrowRight':
        case 'KeyD':
            moveRight = true;
            break;
    }
}

function onKeyUp(event) {
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
            moveBackward = false;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            moveLeft = false;
            break;
        case 'ArrowDown':
        case 'KeyS':
            moveForward = false;
            break;
        case 'ArrowRight':
        case 'KeyD':
            moveRight = false;
            break;
    }
}

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);



// Anima la scena
function animate() {
    requestAnimationFrame(animate);

    if (moveForward) velocity.z -= 0.1;
    if (moveBackward) velocity.z += 0.1;
    if (moveLeft) velocity.x -= 0.1;
    if (moveRight) velocity.x += 0.1;

    camera.position.add(velocity);
    velocity.multiplyScalar(0.9);  // Damping

    TWEEN.update();
    controls.update();  // Necessario per aggiornare la posizione della camera


    cameraCoordinates.innerHTML = `Camera Position: X=${camera.position.x.toFixed(2)}, Y=${camera.position.y.toFixed(2)}, Z=${camera.position.z.toFixed(2)}`;

    renderer.render(scene, camera);
}

animate();
