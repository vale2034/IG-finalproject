import * as THREE from './utils/three.module.js';
import { GLTFLoader } from './utils/GLTFLoader.js';
import { OrbitControls } from './utils/OrbitControls.js';
import * as animations from './animations.js';  // Importa animations.js correttamente
import { initCharacters, marioKickBallAnimation } from './animations.js';


let clock = new THREE.Clock();
let scene, camera, renderer, controls;
let loader;
let models = {};
var cameraCoordinates = document.getElementById('camera-coordinates');
var moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;


    scene = new THREE.Scene();
    
    // Carica l'immagine JPEG per la skybox
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('assets/sunflowers_puresky.jpg');
    scene.background = texture;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(-1, 5, -1).normalize();
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    // Inizializza la camera e OrbitControls
    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 100000);
    camera.position.set(-8.53, 5.90, -17.12);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(-8, 1, 10);
    controls.update(); // Necessario se la camera è stata modificata manualmente

   



  // URL dei modelli da caricare
  const modelsToLoad = [
    { name: 'penalty_area', url: 'models/penalty_area/scene.gltf', scale: 5, namesToRemove: [
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
    ] },
    { name: 'luigi', url: 'models/luigi/scene.gltf', scale: 1.25, namesToRemove: [] },
    { name: 'mario', url: 'models/mario/scene.gltf', scale: 0.19, namesToRemove: [] }
];


    const loadingManager = new THREE.LoadingManager();
    loader = new GLTFLoader(loadingManager);


    

    modelsToLoad.forEach(model => {
        loader.load(model.url, gltf => {
            models[model.name] = gltf.scene;
    
            // Applica la scala specificata al modello
            models[model.name].scale.set(model.scale, model.scale, model.scale);
            
            // Personalizza la posizione e altre proprietà per modelli specifici
            if (model.name === 'mario') {
                camera.position.set(-62.85, 48.19, -91.31);
                controls.target.set(-62.85, 48.19, 91.31);
            } else if (model.name === 'luigi') {
                
            } else if (model.name === 'penalty_area') {
                // Recupera oggetti specifici dalla scena del modello
                const prato = gltf.scene.getObjectByName('Plane001');
                const palla = gltf.scene.getObjectByName('Sphere001');
                
                if (prato) {
                    prato.scale.set(1, 0.6, 1);
                    prato.position.set(25, 0, 0);
                    scene.add(prato); // Aggiungi prato alla scena
                } else {
                    console.warn('Oggetto prato non trovato.');
                }
                
            }
            
            removeObjects(gltf.scene, model.namesToRemove); // Rimuovi gli oggetti specificati da namesToRemove
            scene.add(models[model.name]);
            
            
        }, undefined, error => {
            console.error(`Errore durante il caricamento di ${model.name}:`, error);
        });
    });


    loadingManager.onLoad = () => {
        console.log('Caricamento completato.');
        // Inizializza i personaggi (Mario, Luigi, ecc.) in animations.js
        initCharacters(models, scene);


    };

   
   


   


// Funzione per rimuovere gli oggetti indesiderati dalla scena
function removeObjects(gltfScene, namesToRemove) {
    let objectsToRemove = [];

   // console.log('Traversing the scene to find objects to remove...');
    gltfScene.traverse(function (child) {
      //  console.log('Checking object:', child.name);
        if (namesToRemove.includes(child.name)) {
            objectsToRemove.push(child);
         //   console.log('Marked for removal:', child.name);
        }
    });

    objectsToRemove.forEach(function (child) {
        if (child.parent) {
          //  console.log('Removing object:', child.name);
            child.parent.remove(child);
        } else {
          //  console.warn('Parent is undefined for object:', child.name);
        }
    });
}




document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);


// Gestisce gli eventi di pressione dei tasti per il movimento della camera
function onKeyDown(event) {
    console.log('Key pressed:', event.code);
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyS':
            moveForward = true;
            break;
        case 'ArrowLeft':
        case 'KeyD':
            moveLeft = true;
            break;
        case 'ArrowDown':
        case 'KeyW':
            moveBackward = true;
            break;
        case 'ArrowRight':
        case 'KeyA':
            moveRight = true;
            break;
    }
}

function onKeyUp(event) {
    console.log('Key released:', event.code);
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyS':
            moveForward = false;
            break;
        case 'ArrowLeft':
        case 'KeyD':
            moveLeft = false;
            break;
        case 'ArrowDown':
        case 'KeyW':
            moveBackward = false;
            break;
        case 'ArrowRight':
        case 'KeyA':
            moveRight = false;
            break;
    }
}





 //Funzione per l'animazione della scena
function animate() {
    requestAnimationFrame(animate);
    let delta = clock.getDelta();


    // Logica per il movimento della camera
    const velocity = new THREE.Vector3();
    if (moveForward) velocity.z -= 2;
    if (moveBackward) velocity.z += 2;
    if (moveLeft) velocity.x -= 2;
    if (moveRight) velocity.x += 2;
    camera.position.add(velocity);
    velocity.multiplyScalar(0.9); // Damping
    

   


    // Aggiorna OrbitControls e renderizza la scena
    controls.update();

    cameraCoordinates.innerHTML = `Camera Position: X=${camera.position.x.toFixed(2)}, Y=${camera.position.y.toFixed(2)}, Z=${camera.position.z.toFixed(2)}`;

    renderer.render(scene, camera);

}

animate()
