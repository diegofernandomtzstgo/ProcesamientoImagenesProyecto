import { ImageLocal } from "./ImageLocal.js";
import { ImageType } from "./ImageType.js";
import { MathImg } from "./MathImg.js";
var lienzo1;
var lienzo2;
var lienzo4;
var pantalla1;
var pantalla2;
var pantalla4;
/* Este evento controla la forma de abrir un archivo mediante el evento de arrastrar y soltar */
function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault(); //que no se abra en otra ventana sola la imagen
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}
/** Variables que controla el canvas de la imagen, el primero
 * posteriormemte se volveran arreglos cuando ya controlemos las seis ventanas de nuestro frame
*/
lienzo1 = document.getElementById('img1');
pantalla1 = lienzo1.getContext("2d");
lienzo2 = document.getElementById('img2');
pantalla2 = lienzo2.getContext("2d");
lienzo4 = document.getElementById('img4');
pantalla4 = lienzo4.getContext("2d");
var dropZone = lienzo1; //document.getElementById('img1');
var imgLocal = new ImageLocal(pantalla1);
imgLocal.getImage().onload = imgLocal.onload;
var imgLocal4 = new ImageLocal(pantalla4);
imgLocal4.getImage().onload = imgLocal4.onload;
function aplicarDesenfoque(evt) {
    var radioDesenfoque = 1;
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarDesenfoque(imagenSal, radioDesenfoque));
}
function pixelearImagen(evt) {
    var blockSize = 10; // Tamaño del bloqur
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.pixelear(imagenSal, blockSize));
}
function aplicarEfectoSepia(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarEfectoSepia(imagenSal));
}
function aplicarEfectoGlitch(evt) {
    var blockSize = 20;
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarEfectoGlitch(imagenSal, blockSize));
}
function aplicarDestelloDeFoco(evt) {
    var valorIngresado = prompt('Ingrese el valor numérico para el destello de foco (entre 10 y 100):');
    if (valorIngresado !== null) {
        var size = Math.min(100, Math.max(10, parseInt(valorIngresado, 10))) || 50;
        var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
        imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarDestelloDeFoco(imagenSal, size));
    }
}
function aplicarDistorsion(evt) {
    var factorDistorsion = 0.5;
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarDistorsion(imagenSal, factorDistorsion));
}
var vorticeAngle = 0; // Declaración e inicialización de vorticeAngle
var vorticeStrength = 0; // Declaración e inicialización de vorticeStrength
var vorticeAnimationId = null;
function AplicarEfectoVortice(evt) {
    if (vorticeAnimationId !== null) {
        cancelAnimationFrame(vorticeAnimationId);
        vorticeAnimationId = null;
    }
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    var centerX = imagenSal.getWidth() / 2;
    var centerY = imagenSal.getHeight() / 2;
    vorticeAngle += 0.02;
    vorticeStrength += 0.1;
    imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarVortice(imagenSal, centerX, centerY, vorticeStrength, vorticeAngle));
    // bucle animacion
    vorticeAnimationId = requestAnimationFrame(function () { return AplicarEfectoVortice(evt); });
}
var wavesAmplitude = 10;
var wavesFrequency = 0.1;
var wavesSpeed = 0.1;
var wavesOffset = 0;
function AplicarEfectoOndas(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    wavesOffset += wavesSpeed;
    imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarOndas(imagenSal, wavesAmplitude, wavesFrequency, wavesOffset));
    // llama otra vez a la funcion para hacer un ciclo de animaciones
    requestAnimationFrame(function () { return AplicarEfectoOndas(evt); });
}
var zoomScale = 1.0;
var zoomDirection = 1;
function AplicarEfectoZoom(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    var zoomSpeed = 0.01;
    var zoomRange = 0.5;
    zoomScale += zoomDirection * zoomSpeed;
    if (zoomScale > 1 + zoomRange || zoomScale < 1 - zoomRange) {
        zoomDirection *= -1;
    }
    imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarZoomDinamico(imagenSal, zoomScale));
    requestAnimationFrame(function () { return AplicarEfectoZoom(evt); });
}
function aplicarPerturbacion(evt) {
    var amplitude = 10;
    var frequency = 0.1;
    var startTime;
    function animate(currentTime) {
        if (!startTime) {
            startTime = currentTime;
        }
        var elapsed = (currentTime - startTime) / 1000; // Tiempo transcurrido en segundos
        var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
        imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarPerturbacion(imagenSal, amplitude, frequency, elapsed));
        // Sigue animando
        requestAnimationFrame(animate);
    }
    // Inicia la animación
    requestAnimationFrame(animate);
}
var tiempoInicioAnimacion = 0;
function aplicarSistemaSolar(evt) {
    // Se obtiene el tiempo actual y además calcula el tiem´po transcurrido
    var tiempoActual = Date.now();
    var tiempoTranscurrido = tiempoActual - tiempoInicioAnimacion;
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.crearSistemaSolar(imagenSal, tiempoTranscurrido));
    requestAnimationFrame(function (time) {
        aplicarSistemaSolar(evt);
    });
}
function AplicarEfectoRemolinos(evt) {
    var strength = 10;
    var frequency = 0.01;
    var startTime;
    var elapsed = 0;
    function animate(currentTime) {
        if (!startTime) {
            startTime = currentTime;
        }
        var deltaTime = (currentTime - startTime) / 1000;
        elapsed += deltaTime;
        var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
        imagenSal.imageArray2DtoData(pantalla2, MathImg.AplicarRemolinos(imagenSal, strength, frequency, elapsed));
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
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
//document.getElementById("op-sistema-solar").addEventListener("click", aplicarSistemaSolar, false);
document.getElementById("op-sistema-solar").addEventListener("click", function (evt) {
    //Se inicia la animacin cuando se selecciona sistema solar
    tiempoInicioAnimacion = Date.now();
    aplicarSistemaSolar(evt);
}, false);
document.getElementById("op-remolino").addEventListener('click', AplicarEfectoRemolinos, false);
