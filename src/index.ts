import { ImageLocal } from "./ImageLocal.js";
import { ImageType } from "./ImageType.js";
import { MathImg } from "./MathImg.js";
import { Particle } from "./particle.js";
import { ParticleText } from "./particle.js";
import { CanvasLocal } from './canvasLocal.js';

let lienzo1: HTMLCanvasElement;
let lienzo2: HTMLCanvasElement;
let lienzo4: HTMLCanvasElement;
let pantalla1: CanvasRenderingContext2D;
let pantalla2: CanvasRenderingContext2D;
let pantalla4: CanvasRenderingContext2D;

/* Este evento controla la forma de abrir un archivo mediante el evento de arrastrar y soltar */
function handleDragOver(evt:any) {
    evt.stopPropagation();
    evt.preventDefault(); //que no se abra en otra ventana sola la imagen
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

  /** Variables que controla el canvas de la imagen, el primero 
   * posteriormemte se volveran arreglos cuando ya controlemos las seis ventanas de nuestro frame
  */
lienzo1 = <HTMLCanvasElement>document.getElementById('img1');
pantalla1 = lienzo1.getContext("2d");
lienzo2 = <HTMLCanvasElement>document.getElementById('img2');
pantalla2 = lienzo2.getContext("2d");
lienzo4 = <HTMLCanvasElement>document.getElementById('img4');
pantalla4 = lienzo4.getContext("2d");

var dropZone = lienzo1;//document.getElementById('img1');
var imgLocal: ImageLocal = new ImageLocal(pantalla1);
imgLocal.getImage().onload = imgLocal.onload;
var imgLocal4: ImageLocal = new ImageLocal(pantalla4);
imgLocal4.getImage().onload = imgLocal4.onload;





function aplicarDesenfoque(evt: any): void {
  const radioDesenfoque = 1; 
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarDesenfoque(imagenSal, radioDesenfoque));
}

function pixelearImagen(evt: any): void {
  const blockSize = 10; // Tamaño del bloqur
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.pixelear(imagenSal, blockSize));
}
function aplicarEfectoSepia(evt: any): void {
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarEfectoSepia(imagenSal));
}
function aplicarEfectoGlitch(evt: any): void {
  const blockSize = 20; 
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarEfectoGlitch(imagenSal, blockSize));
}
function aplicarDestelloDeFoco(evt: any): void {
  const valorIngresado = prompt('Ingrese el valor numérico para el destello de foco (entre 10 y 100):');
  
  if (valorIngresado!== null) {
    const size = Math.min(100, Math.max(10, parseInt(valorIngresado, 10))) || 50;

    const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarDestelloDeFoco(imagenSal, size));
  }
}

function aplicarDistorsion(evt: any): void {

  const factorDistorsion = 0.5;
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarDistorsion(imagenSal, factorDistorsion));
}


let vorticeAngle = 0; // Declaración e inicialización de vorticeAngle
let vorticeStrength = 0; // Declaración e inicialización de vorticeStrength
let vorticeAnimationId: number | null = null;

function AplicarEfectoVortice(evt: any): void {
  if (vorticeAnimationId !== null) {
    cancelAnimationFrame(vorticeAnimationId);
    vorticeAnimationId = null;
  }

  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  const centerX = imagenSal.getWidth() / 2;
  const centerY = imagenSal.getHeight() / 2;

  vorticeAngle += 0.02; 
  vorticeStrength += 0.1; 

  imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarVortice(imagenSal, centerX, centerY, vorticeStrength, vorticeAngle));

  // bucle animacion
  vorticeAnimationId = requestAnimationFrame(() => AplicarEfectoVortice(evt));
}


let wavesAmplitude= 10
;
let wavesFrequency= 0.1;
let wavesSpeed =0.1;
let wavesOffset= 0;

function AplicarEfectoOndas(evt: any): void {
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());

  wavesOffset += wavesSpeed; 

  imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarOndas(imagenSal, wavesAmplitude, wavesFrequency, wavesOffset));
  // llama otra vez a la funcion para hacer un ciclo de animaciones
  requestAnimationFrame(() => AplicarEfectoOndas(evt));
}


let zoomScale = 1.0;
let zoomDirection = 1;

function AplicarEfectoZoom(evt: any): void {
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());


  const zoomSpeed = 0.01;
  const zoomRange = 0.5;

  zoomScale += zoomDirection * zoomSpeed;

  if (zoomScale > 1 + zoomRange || zoomScale < 1 - zoomRange) {
    zoomDirection *= -1;
  }

  imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarZoomDinamico(imagenSal, zoomScale));

  requestAnimationFrame(() => AplicarEfectoZoom(evt));
}

function aplicarPerturbacion(evt: any): void {
  const amplitude = 10; 
  const frequency = 0.1; 

  let startTime: number;

  function animate(currentTime: number) {
    if (!startTime) {
      startTime = currentTime;
    }

    const elapsed = (currentTime - startTime) / 1000; // Tiempo transcurrido en segundos

    const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarPerturbacion(imagenSal, amplitude, frequency, elapsed));

    // Sigue animando
    requestAnimationFrame(animate);
  }

  // Inicia la animación
  requestAnimationFrame(animate);
}

let tiempoInicioAnimacion: number = 0;
function aplicarSistemaSolar(evt: any): void {
  // Se obtiene el tiempo actual y además calcula el tiem´po transcurrido
  const tiempoActual = Date.now();
  const tiempoTranscurrido = tiempoActual - tiempoInicioAnimacion;
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.crearSistemaSolar(imagenSal, tiempoTranscurrido));
  requestAnimationFrame((time) => {
    aplicarSistemaSolar(evt);
  });
}

lienzo1.addEventListener("mousemove", imgLocal.drawSmallImg);
document.getElementById('files').addEventListener('change', imgLocal.handleFileSelect, false);
document.getElementById('files2').addEventListener('change', imgLocal4.handleFileSelect, false);
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', imgLocal.handleFileSelect, false);

//Efectos  basicos
document.getElementById("op-desenfoque").addEventListener('click', aplicarDesenfoque, false);
document.getElementById("op-pixelate").addEventListener('click', pixelearImagen, false);
document.getElementById("op-sepia").addEventListener('click', aplicarEfectoSepia, false);
document.getElementById("op-glitch").addEventListener('click', aplicarEfectoGlitch, false);
document.getElementById("op-foco").addEventListener('click', aplicarDestelloDeFoco, false);
document.getElementById("op-distorsion").addEventListener('click', aplicarDistorsion, false);
//Efectos Intermedios
document.getElementById("op-vortice").addEventListener('click', AplicarEfectoVortice, false);
document.getElementById("op-ondas").addEventListener("click", AplicarEfectoOndas, false);
document.getElementById("op-zoom").addEventListener("click", AplicarEfectoZoom, false);
document.getElementById("op-perturbacion").addEventListener('click', aplicarPerturbacion, false);
document.getElementById("op-sistema-solar").addEventListener("click", function(evt) {
  //Se inicia la animacin cuando se selecciona sistema solar
  tiempoInicioAnimacion = Date.now();
  aplicarSistemaSolar(evt);
}, false);
