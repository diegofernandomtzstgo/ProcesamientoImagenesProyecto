import { ImageLocal } from "./ImageLocal.js";
import { ImageType } from "./ImageType.js";
import { MathImg } from "./MathImg.js";


let lienzo1: HTMLCanvasElement;
let lienzo2: HTMLCanvasElement;
let lienzo3: HTMLCanvasElement;
let pantalla1: CanvasRenderingContext2D;
let pantalla2: CanvasRenderingContext2D;
let pantalla3: CanvasRenderingContext2D;

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
lienzo3 = <HTMLCanvasElement>document.getElementById('img3');
pantalla3 = lienzo3.getContext("2d");

var dropZone = lienzo1;//document.getElementById('img1');
var imgLocal: ImageLocal = new ImageLocal(pantalla1);
imgLocal.getImage().onload = imgLocal.onload;
//var imgLocal4: ImageLocal = new ImageLocal(pantalla3);
//imgLocal4.getImage().onload = imgLocal4.onload;





function aplicarDesenfoque(evt: any): void {
  const radioDesenfoque = 1; 
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla3, MathImg.aplicarDesenfoque(imagenSal, radioDesenfoque));
}

function pixelearImagen(evt: any): void {
  const blockSize = 10; // Tamaño del bloqur
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla3, MathImg.pixelear(imagenSal, blockSize));
}
function aplicarEfectoSepia(evt: any): void {
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla3, MathImg.aplicarEfectoSepia(imagenSal));
}
function aplicarEfectoGlitch(evt: any): void {
  const blockSize = 20; 
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla3, MathImg.aplicarEfectoGlitch(imagenSal, blockSize));
}
function aplicarDestelloDeFoco(evt: any): void {
  const valorIngresado = prompt('Ingrese el valor numérico para el destello de foco (entre 10 y 100):');
  
  if (valorIngresado!== null) {
    const size = Math.min(100, Math.max(10, parseInt(valorIngresado, 10))) || 50;

    const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla3, MathImg.aplicarDestelloDeFoco(imagenSal, size));
  }
}

function aplicarDistorsion(evt: any): void {

  const factorDistorsion = 0.5;
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla3, MathImg.aplicarDistorsion(imagenSal, factorDistorsion));
}


//AQUI EMPIEZA LOS EFECTOS DE MOVIMIENTO
let vorticeAngle = 0;
let vorticeStrength = 0;
let vorticeTime = 0;
let vorticeAnimationId: number | null = null;

function AplicarEfectoVortice(evt: any): void {
  if (vorticeAnimationId !== null) {
    cancelAnimationFrame(vorticeAnimationId);
    vorticeAnimationId = null;
  }

  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  const centerX = imagenSal.getWidth() / 2;
  const centerY = imagenSal.getHeight() / 2;

  vorticeTime += 0.05;  // Ajusta la velocidad del vórtice en el tiempo
  vorticeAngle = Math.sin(vorticeTime) * 2 * Math.PI;  // Utiliza la función seno para crear un movimiento cíclico
  vorticeStrength += 0.1;

  imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarVortice(imagenSal, centerX, centerY, vorticeStrength, vorticeAngle));

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

function AplicarEfectoMosaicos(evt: any): void {
  const strength =10; 
  const frequency =0.01; 

  let startTime: number;
  let elapsed =0;

  function animate(currentTime: number) {
    if (!startTime) {
      startTime = currentTime;
    }

    const deltaTime = (currentTime - startTime)/1000; 
     elapsed+=deltaTime;
    const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.AplicarMosaicos(imagenSal, strength, frequency, elapsed));
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}
let stretchAnimationId: number | null = null;

function AplicarEfectoEstiramiento(evt: any): void {
  if (stretchAnimationId !== null) {
    cancelAnimationFrame(stretchAnimationId);
    stretchAnimationId = null;
  }

  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  const centerX = imagenSal.getWidth() / 2;
  const centerY = imagenSal.getHeight() / 2;

  let stretchTime= 0;

  const stretchEffect= () => {
    stretchTime += 0.01;  // velocidad del estiramientoo

    const scaleX = Math.sin(stretchTime);
    const scaleY = Math.cos(stretchTime);

    imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarTransformacion(imagenSal, centerX, centerY, scaleX, scaleY));

    stretchAnimationId = requestAnimationFrame(stretchEffect);
  };
  stretchEffect();
}
let portalAnimationId: number | null = null;
let portalStrength = 0;
let portalTargetX = 0;
let portalTargetY = 0;
const ctx2: CanvasRenderingContext2D = lienzo2.getContext('2d');

function AnimarPortalAuto(): void {
  // incrementa la posicion objetivo del portal automaticamente
  portalTargetX += 1;
  portalTargetY += 1;

  // Reinicia el portal si alcanza los limites
  if (portalTargetX > lienzo2.width + 120) {
    portalTargetX = -120;
  }
  if (portalTargetY > lienzo2.height + 120) {
    portalTargetY = -120;
  }
  // calculando la fuerxa del portal basamdonse  en la distancia entre la distancia de la posicion actual y la posición objetivo
  const deltaX = portalTargetX - lienzo2.width / 2;
  const deltaY = portalTargetY - lienzo2.height / 2;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  portalStrength = Math.min(distance / 20, 100); 
  // aplicar efecto del portal de la imagen 
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarEfectoPortal(imagenSal, portalStrength, portalTargetX, portalTargetY));
  // el bucle de anomacion
  portalAnimationId = requestAnimationFrame(() => AnimarPortalAuto());
}


let duracion= 0;

function AplicarOndasCuadradas(): void {
    duracion +=0.1;
    var imagenSal: ImageType =new ImageType(pantalla1,imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.movimientoCuadrados(imagenSal,duracion));
    requestAnimationFrame(AplicarOndasCuadradas);
}

let duracionOndulacion= 0;
function AplicarOndulacion(): void {
    duracionOndulacion += 0.1;
    var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.ondulacion(imagenSal,duracionOndulacion,20)); // ajustar amplitud
    requestAnimationFrame(AplicarOndulacion);
}


//AQUI EMPIEZA LOS EFECTOS DE CURSOR
// Agrega una variable para almacenar los corazones en movimiento
let hearts: Heart[] = [];
class Heart {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;

  constructor(x: number, y: number, size: number, speedX: number, speedY: number) {
    this.x=x;
    this.y=y;
    this.size=size;
    this.speedX=speedX;
    this.speedY=speedY;
    this.opacity=1;
  }
  update(): void {
    this.x+=this.speedX;
    this.y+=this.speedY;
    this.opacity -= 0.005;
  }
}
// aplicar efecto corazones
function AplicarEfectoCorazones(evt: any): void {
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  // aqui se genera un nuevo corazon
  const heartSize=Math.random()*25;
  const heartSpeedX=(Math.random()- 0.5)*2;
  const heartSpeedY=Math.random()*3;
  const newHeart=new Heart(evt.offsetX, evt.offsetY, heartSize, heartSpeedX, heartSpeedY);
  hearts.push(newHeart);

  const messageElement=document.getElementById("mensaje-efecto");
  // mostrando mensaje
  if (messageElement) {
    messageElement.innerText="Pase el cursor en la imagen";
  }
  imagenSal.imageArray2DtoData(pantalla3, MathImg.AplicarEfectoCorazones(imagenSal, hearts)) ;
  
}

function AplicarEfectoBurbuja(evt: any): void {
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  const messageElement = document.getElementById("mensaje-efecto");

  if (messageElement) {
    messageElement.innerText = "Pase el cursor en la imagen";
  }
  imagenSal.imageArray2DtoData(pantalla3, MathImg.aplicarEfectoBurbuja(imagenSal, evt, 0.2, 90));
}

function AplicarEfectoFuego(evt: any): void {
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  const messageElement = document.getElementById("mensaje-efecto");

  if (messageElement) {
  messageElement.innerText="Mueva el cursor para ver el fuego en accion.";
  }
  const factorMovimiento = 0.05;
  const factorDetalle = 0.02; 

  imagenSal.imageArray2DtoData(pantalla3, MathImg.aplicarEfectoFuego(imagenSal, evt, factorMovimiento, factorDetalle));
}

function aplicarEfectoSimulacionCuantico(evt: any): void {
  const imagenSal: ImageType=new ImageType(pantalla1,imgLocal.getImage());
  const messageElement=document.getElementById("mensaje-efecto");

  if (messageElement) {
    messageElement.innerText="Mueva el cursor.";
  }
  const factorMovimiento=0.02; // movimiento
  const factorDetalle=0.04; // detalle del efecto

  imagenSal.imageArray2DtoData(pantalla3, MathImg.aplicarEfectoSimulacionCuantico(imagenSal, evt, factorMovimiento, factorDetalle));
}

function aplicarEfectoOndulado(evt: any): void {
  const imagenSal: ImageType=new ImageType(pantalla1, imgLocal.getImage());
  const messageElement=document.getElementById("mensaje-efecto");

  if (messageElement) {
    messageElement.innerText = "Mueva el cursor para ver el efecto de remolino ondulado.";
  }

  let mouseX=evt.clientX -lienzo3.getBoundingClientRect().left;
  let mouseY=evt.clientY -lienzo3.getBoundingClientRect().top;
  imagenSal.imageArray2DtoData(pantalla3,MathImg.AplicarEfectoOndulado(imagenSal, mouseX, mouseY));
}

lienzo1.addEventListener("mousemove", imgLocal.drawSmallImg);
document.getElementById('files').addEventListener('change', imgLocal.handleFileSelect, false);
//document.getElementById('files2').addEventListener('change', imgLocal4.handleFileSelect, false);
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', imgLocal.handleFileSelect, false);

//Efectos  basicos
document.getElementById("op-desenfoque").addEventListener('click', aplicarDesenfoque, false);
document.getElementById("op-pixelate").addEventListener('click', pixelearImagen, false);
document.getElementById("op-sepia").addEventListener('click', aplicarEfectoSepia, false);
document.getElementById("op-glitch").addEventListener('click', aplicarEfectoGlitch, false);
document.getElementById("op-foco").addEventListener('click', aplicarDestelloDeFoco, false);
document.getElementById("op-distorsion").addEventListener('click', aplicarDistorsion, false);
//Efectos Con Movimiento
document.getElementById("op-vortice").addEventListener('click', AplicarEfectoVortice, false);
document.getElementById("op-ondas").addEventListener("click", AplicarEfectoOndas, false);
document.getElementById("op-zoom").addEventListener("click", AplicarEfectoZoom, false);
document.getElementById("op-perturbacion").addEventListener('click', aplicarPerturbacion, false);
//document.getElementById("op-sistema-solar").addEventListener("click", aplicarSistemaSolar, false);
document.getElementById("op-sistema-solar").addEventListener("click", function(evt) {
  //Se inicia la animacin cuando se selecciona sistema solar
  tiempoInicioAnimacion = Date.now();
  aplicarSistemaSolar(evt);
}, false);
document.getElementById("op-mosaicos").addEventListener('click', AplicarEfectoMosaicos, false);
document.getElementById("op-estiramiento").addEventListener('click', AplicarEfectoEstiramiento, false);
document.getElementById("op-portal").addEventListener('click', AnimarPortalAuto, false);
document.getElementById("op-movimientoCuadrado").addEventListener('click', AplicarOndasCuadradas, false);
document.getElementById("op-ondulacion").addEventListener('click',AplicarOndulacion, false);

//Efectos con Puntero
document.getElementById("op-corazones").addEventListener('click', () => {
  // Agrega un mensaje indicando que el efecto está activado
  const messageElement = document.getElementById("vortex-message");
  if (messageElement) {
    messageElement.innerText = "Efecto de vórtice activado. Pase el cursor en la imagen.";
  }
  hearts = []; // reinicia la lista de corazones
  AplicarEfectoCorazones(event); 
  lienzo3.addEventListener('mousemove', AplicarEfectoCorazones, false); 
});

document.getElementById("op-burbuja").addEventListener('click', () => {
  const messageElement = document.getElementById("mensaje-efecto");
  if (messageElement) {
    messageElement.innerText = "Efecto de Burbuja activado. Pase el cursor en la imagen.";
  }
  AplicarEfectoBurbuja(event); 
  lienzo3.addEventListener('mousemove', (evt) => AplicarEfectoBurbuja(evt), false);
});
document.getElementById("op-fuego").addEventListener('click', () => {
  const messageElement = document.getElementById("mensaje-efecto");
  if (messageElement) {
    messageElement.innerText = "Efecto de Fuego Fractal activado. Mueva el cursor para ver el fuego en acción.";
  }
  AplicarEfectoFuego(event);
  lienzo3.addEventListener('mousemove', (evt) => AplicarEfectoFuego(evt), false);
});
document.getElementById("op-cuantico").addEventListener('click', () => {
  const messageElement=document.getElementById("mensaje-efecto");
  if (messageElement) {
    messageElement.innerText="Efecto Cuantico activado. Mueva el cursor para experimentar el efecto.";
  }
  aplicarEfectoSimulacionCuantico(event);
  lienzo3.addEventListener('mousemove', (evt) => aplicarEfectoSimulacionCuantico(evt), false);
});
document.getElementById("op-Ondulado").addEventListener('click', () => {
  const messageElement = document.getElementById("mensaje-efecto");
  if (messageElement) {
    messageElement.innerText = "Efecto Remolino Ondulado activado. Mueva el cursor para experimentar el efecto.";
  }
  aplicarEfectoOndulado(event);
  lienzo3.addEventListener('mousemove', (evt) => aplicarEfectoOndulado(evt), false);

});
