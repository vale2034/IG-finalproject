import * as THREE from './utils/three.module.js';
import { GLTFLoader } from './utils/GLTFLoader.js';
import { OrbitControls } from './utils/OrbitControls.js';
import { initCharacters } from './animations.js';


let scene, camera, renderer, controls;
let loader;
let models = {};
var cameraCoordinates = document.getElementById('camera-coordinates');
var moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;


    scene = new THREE.Scene();
    
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('assets/sunflowers_puresky.jpg');
    scene.background = texture;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 2.5);
    light.position.set(-70, 50, 150).normalize();
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff,2.5);
    ambientLight.position.set(-40,10,-55);
    scene.add(ambientLight);

    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-55, 23, -105);

    
    
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(-62.85, 48.19, 100);
    controls.update(); 

   



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
    { name: 'mario', url: 'models/mario/scene.gltf', scale: 0.19, namesToRemove: [] },
    { name:'forest', url: 'models/forest/scene.gltf', scale: 0.0, namesToRemove: ['pPlane3', 'pPlane4']},
    { name:'forest1', url: 'models/forest/scene.gltf', scale: 0.0, namesToRemove: ['pPlane3', 'pPlane4', 'pPlane5']},
    { name:'forest2', url: 'models/forest/scene.gltf', scale: 0.0, namesToRemove: ['pPlane3', 'pPlane4','pPlane5']},
    { name:'forest3', url: 'models/forest/scene.gltf', scale: 0.0, namesToRemove: ['pPlane3', 'pPlane4']}
    

];


    const loadingManager = new THREE.LoadingManager();
    loader = new GLTFLoader(loadingManager);
    

    modelsToLoad.forEach(model => {
        loader.load(model.url, gltf => {
            models[model.name] = gltf.scene;
    
            models[model.name].scale.set(model.scale, model.scale, model.scale);
            
           
            
            removeObjects(gltf.scene, model.namesToRemove);
            scene.add(models[model.name]);
            
            
        }, undefined, error => {
            console.error(`Errore durante il caricamento di ${model.name}:`, error);
        });
    });


    loadingManager.onLoad = () => {
        console.log('Caricamento completato.');
        initCharacters(models, scene);

    };

   
   


   


function removeObjects(gltfScene, namesToRemove) {
    let objectsToRemove = [];

   // console.log('Traversing the scene to find objects to remove...');
    gltfScene.traverse(function (child) {
      //  console.log('Checking object:', child.name);
        if (namesToRemove.includes(child.name)) {
            objectsToRemove.push(child);
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


function onKeyDown(event) {
    //console.log('Key pressed:', event.code);
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
    //console.log('Key released:', event.code);
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





function animate() {
    requestAnimationFrame(animate);


    const velocity = new THREE.Vector3();
    if (moveForward) velocity.z -= 2;
    if (moveBackward) velocity.z += 2;
    if (moveLeft) velocity.x -= 2;
    if (moveRight) velocity.x += 2;
    camera.position.add(velocity);
    velocity.multiplyScalar(0.9); 
    

   
    TWEEN.update(); 

    controls.update();

    cameraCoordinates.innerHTML = `Camera Position: X=${camera.position.x.toFixed(2)}, Y=${camera.position.y.toFixed(2)}, Z=${camera.position.z.toFixed(2)}`;

    renderer.render(scene, camera);

}

animate()
