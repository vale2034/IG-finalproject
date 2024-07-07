import * as THREE from './utils/three.module.js';
import { GLTFLoader } from './utils/GLTFLoader.js';  // Assicurati che il percorso sia corretto
import { OrbitControls } from './utils/OrbitControls.js';


var scene, camera, renderer, light, mesh, controls;
let loader;

var moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
var velocity = new THREE.Vector3();
var cameraCoordinates = document.getElementById('camera-coordinates');

// Inizializza la scena, la camera e il renderer
scene = new THREE.Scene();
// Aggiungere un cielo azzurro


// Carica l'immagine JPEG per la skybox
loader = new THREE.TextureLoader();
const texture = loader.load('assets/sunflowers_puresky.jpg');

scene.background = texture;

renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Aggiungi illuminazione
light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(3, 10, 2).normalize();
scene.add(light);


//camera e sua posizione 
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-8.53,5.90,-17.12);  // Posizionare la camera all'altezza dell'omino


//Inizializza OrbitControls
controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(-8, 1, 10);  // Punto di interesse iniziale della camera
controls.update();  // Necessario se la camera è stata modificata manualmente


//carica modello
loader = new GLTFLoader();
loader.load(
    'models/penalty_area/scene.gltf',
    function (gltf) {
        gltf.scene.traverse(function (child) {
            
            if (child.name === 'Layer:Layer 1') {
                // Rimuovi il nodo dalla scena
                child.parent.remove(child);
            }
            
    
        });

        // Aggiungi la scena GLTF alla scena principale
        scene.add(gltf.scene);

    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('Error loading model', error);
        console.error(error.stack);
    }
);


// Funzione per creare una nuvola
function createCloud(x, y, z) {
    const cloudGeometry = new THREE.PlaneGeometry(5, 5);
    const cloudMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('path/to/cloud/texture.png'),
        transparent: true
    });
    const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloud.position.set(x, y, z);
    scene.add(cloud);
}

// Crea alcune nuvole
createCloud(0, 5, -10);
createCloud(5, 7, -15);
createCloud(-5, 6, -12);


/*Ascolta il click per calciare la palla
window.addEventListener('click', kickBall);
// Funzione per calciare la palla
function kickBall() {
    const targetPosition = { x: 0, y: 0.2, z: 10 };
    const tween = new TWEEN.Tween(ball.position).to(targetPosition, 1000);
    tween.start();
}*/

// Ascolta il click per calciare la palla
//window.addEventListener('click', kickBall);

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


document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

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

