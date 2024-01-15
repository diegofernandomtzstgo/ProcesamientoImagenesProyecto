import { ImageLocal } from "./ImageLocal.js";
import { ImageType } from "./ImageType.js";
import { MathImg } from "./MathImg.js";
var lienzo1;
var lienzo2;
var lienzo3;
var pantalla1;
var pantalla2;
var pantalla3;
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
lienzo3 = document.getElementById('img3');
pantalla3 = lienzo3.getContext("2d");
var dropZone = lienzo1; //document.getElementById('img1');
var imgLocal = new ImageLocal(pantalla1);
imgLocal.getImage().onload = imgLocal.onload;
//var imgLocal4: ImageLocal = new ImageLocal(pantalla3);
//imgLocal4.getImage().onload = imgLocal4.onload;
function aplicarDesenfoque(evt) {
    var radioDesenfoque = 1;
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla3, MathImg.aplicarDesenfoque(imagenSal, radioDesenfoque));
}
function pixelearImagen(evt) {
    var blockSize = 10; // Tamaño del bloqur
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla3, MathImg.pixelear(imagenSal, blockSize));
}
function aplicarEfectoSepia(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla3, MathImg.aplicarEfectoSepia(imagenSal));
}
function aplicarEfectoGlitch(evt) {
    var blockSize = 20;
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla3, MathImg.aplicarEfectoGlitch(imagenSal, blockSize));
}
function aplicarDestelloDeFoco(evt) {
    var valorIngresado = prompt('Ingrese el valor numérico para el destello de foco (entre 10 y 100):');
    if (valorIngresado !== null) {
        var size = Math.min(100, Math.max(10, parseInt(valorIngresado, 10))) || 50;
        var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
        imagenSal.imageArray2DtoData(pantalla3, MathImg.aplicarDestelloDeFoco(imagenSal, size));
    }
}
function aplicarDistorsion(evt) {
    var factorDistorsion = 0.5;
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla3, MathImg.aplicarDistorsion(imagenSal, factorDistorsion));
}
//AQUI EMPIEZA LOS EFECTOS DE MOVIMIENTO
var vorticeAngle = 0;
var vorticeStrength = 0;
var vorticeTime = 0;
var vorticeAnimationId = null;
function AplicarEfectoVortice(evt) {
    if (vorticeAnimationId !== null) {
        cancelAnimationFrame(vorticeAnimationId);
        vorticeAnimationId = null;
    }
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    var centerX = imagenSal.getWidth() / 2;
    var centerY = imagenSal.getHeight() / 2;
    vorticeTime += 0.05; // Ajusta la velocidad del vórtice en el tiempo
    vorticeAngle = Math.sin(vorticeTime) * 2 * Math.PI; // Utiliza la función seno para crear un movimiento cíclico
    vorticeStrength += 0.1;
    imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarVortice(imagenSal, centerX, centerY, vorticeStrength, vorticeAngle));
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
function AplicarEfectoMosaicos(evt) {
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
        imagenSal.imageArray2DtoData(pantalla2, MathImg.AplicarMosaicos(imagenSal, strength, frequency, elapsed));
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}
var stretchAnimationId = null;
function AplicarEfectoEstiramiento(evt) {
    if (stretchAnimationId !== null) {
        cancelAnimationFrame(stretchAnimationId);
        stretchAnimationId = null;
    }
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    var centerX = imagenSal.getWidth() / 2;
    var centerY = imagenSal.getHeight() / 2;
    var stretchTime = 0;
    var stretchEffect = function () {
        stretchTime += 0.01; // velocidad del estiramientoo
        var scaleX = Math.sin(stretchTime);
        var scaleY = Math.cos(stretchTime);
        imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarTransformacion(imagenSal, centerX, centerY, scaleX, scaleY));
        stretchAnimationId = requestAnimationFrame(stretchEffect);
    };
    stretchEffect();
}
var portalAnimationId = null;
var portalStrength = 0;
var portalTargetX = 0;
var portalTargetY = 0;
var ctx2 = lienzo2.getContext('2d');
function AnimarPortalAuto() {
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
    var deltaX = portalTargetX - lienzo2.width / 2;
    var deltaY = portalTargetY - lienzo2.height / 2;
    var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    portalStrength = Math.min(distance / 20, 100);
    // aplicar efecto del portal de la imagen 
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarEfectoPortal(imagenSal, portalStrength, portalTargetX, portalTargetY));
    // el bucle de anomacion
    portalAnimationId = requestAnimationFrame(function () { return AnimarPortalAuto(); });
}
var duracion = 0;
function AplicarOndasCuadradas() {
    duracion += 0.1;
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.movimientoCuadrados(imagenSal, duracion));
    requestAnimationFrame(AplicarOndasCuadradas);
}
var duracionOndulacion = 0;
function AplicarOndulacion() {
    duracionOndulacion += 0.1;
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.ondulacion(imagenSal, duracionOndulacion, 20)); // ajustar amplitud
    requestAnimationFrame(AplicarOndulacion);
}
//AQUI EMPIEZA LOS EFECTOS DE CURSOR
// Agrega una variable para almacenar los corazones en movimiento
var hearts = [];
var Heart = /** @class */ (function () {
    function Heart(x, y, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.opacity = 1;
    }
    Heart.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.005;
    };
    return Heart;
}());
// aplicar efecto corazones
function AplicarEfectoCorazones(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    // aqui se genera un nuevo corazon
    var heartSize = Math.random() * 25;
    var heartSpeedX = (Math.random() - 0.5) * 2;
    var heartSpeedY = Math.random() * 3;
    var newHeart = new Heart(evt.offsetX, evt.offsetY, heartSize, heartSpeedX, heartSpeedY);
    hearts.push(newHeart);
    var messageElement = document.getElementById("mensaje-efecto");
    // mostrando mensaje
    if (messageElement) {
        messageElement.innerText = "Pase el cursor en la imagen";
    }
    imagenSal.imageArray2DtoData(pantalla3, MathImg.AplicarEfectoCorazones(imagenSal, hearts));
}
function AplicarEfectoBurbuja(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    var messageElement = document.getElementById("mensaje-efecto");
    if (messageElement) {
        messageElement.innerText = "Pase el cursor en la imagen";
    }
    imagenSal.imageArray2DtoData(pantalla3, MathImg.aplicarEfectoBurbuja(imagenSal, evt, 0.2, 90));
}
function AplicarEfectoFuego(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    var messageElement = document.getElementById("mensaje-efecto");
    if (messageElement) {
        messageElement.innerText = "Mueva el cursor para ver el fuego en accion.";
    }
    var factorMovimiento = 0.05;
    var factorDetalle = 0.02;
    imagenSal.imageArray2DtoData(pantalla3, MathImg.aplicarEfectoFuego(imagenSal, evt, factorMovimiento, factorDetalle));
}
function aplicarEfectoSimulacionCuantico(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    var messageElement = document.getElementById("mensaje-efecto");
    if (messageElement) {
        messageElement.innerText = "Mueva el cursor.";
    }
    var factorMovimiento = 0.02; // movimiento
    var factorDetalle = 0.04; // detalle del efecto
    imagenSal.imageArray2DtoData(pantalla3, MathImg.aplicarEfectoSimulacionCuantico(imagenSal, evt, factorMovimiento, factorDetalle));
}
function aplicarEfectoOndulado(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    var messageElement = document.getElementById("mensaje-efecto");
    if (messageElement) {
        messageElement.innerText = "Mueva el cursor para ver el efecto de remolino ondulado.";
    }
    var mouseX = evt.clientX - lienzo3.getBoundingClientRect().left;
    var mouseY = evt.clientY - lienzo3.getBoundingClientRect().top;
    imagenSal.imageArray2DtoData(pantalla3, MathImg.AplicarEfectoOndulado(imagenSal, mouseX, mouseY));
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
document.getElementById("op-sistema-solar").addEventListener("click", function (evt) {
    //Se inicia la animacin cuando se selecciona sistema solar
    tiempoInicioAnimacion = Date.now();
    aplicarSistemaSolar(evt);
}, false);
document.getElementById("op-mosaicos").addEventListener('click', AplicarEfectoMosaicos, false);
document.getElementById("op-estiramiento").addEventListener('click', AplicarEfectoEstiramiento, false);
document.getElementById("op-portal").addEventListener('click', AnimarPortalAuto, false);
document.getElementById("op-movimientoCuadrado").addEventListener('click', AplicarOndasCuadradas, false);
document.getElementById("op-ondulacion").addEventListener('click', AplicarOndulacion, false);
//Efectos con Puntero
document.getElementById("op-corazones").addEventListener('click', function () {
    // Agrega un mensaje indicando que el efecto está activado
    var messageElement = document.getElementById("vortex-message");
    if (messageElement) {
        messageElement.innerText = "Efecto de vórtice activado. Pase el cursor en la imagen.";
    }
    hearts = []; // reinicia la lista de corazones
    AplicarEfectoCorazones(event);
    lienzo3.addEventListener('mousemove', AplicarEfectoCorazones, false);
});
document.getElementById("op-burbuja").addEventListener('click', function () {
    var messageElement = document.getElementById("mensaje-efecto");
    if (messageElement) {
        messageElement.innerText = "Efecto de Burbuja activado. Pase el cursor en la imagen.";
    }
    AplicarEfectoBurbuja(event);
    lienzo3.addEventListener('mousemove', function (evt) { return AplicarEfectoBurbuja(evt); }, false);
});
document.getElementById("op-fuego").addEventListener('click', function () {
    var messageElement = document.getElementById("mensaje-efecto");
    if (messageElement) {
        messageElement.innerText = "Efecto de Fuego Fractal activado. Mueva el cursor para ver el fuego en acción.";
    }
    AplicarEfectoFuego(event);
    lienzo3.addEventListener('mousemove', function (evt) { return AplicarEfectoFuego(evt); }, false);
});
document.getElementById("op-cuantico").addEventListener('click', function () {
    var messageElement = document.getElementById("mensaje-efecto");
    if (messageElement) {
        messageElement.innerText = "Efecto Cuantico activado. Mueva el cursor para experimentar el efecto.";
    }
    aplicarEfectoSimulacionCuantico(event);
    lienzo3.addEventListener('mousemove', function (evt) { return aplicarEfectoSimulacionCuantico(evt); }, false);
});
document.getElementById("op-Ondulado").addEventListener('click', function () {
    var messageElement = document.getElementById("mensaje-efecto");
    if (messageElement) {
        messageElement.innerText = "Efecto Remolino Ondulado activado. Mueva el cursor para experimentar el efecto.";
    }
    aplicarEfectoOndulado(event);
    lienzo3.addEventListener('mousemove', function (evt) { return aplicarEfectoOndulado(evt); }, false);
});
