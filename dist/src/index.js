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
    // Puedes ajustar el radio del desenfoque según tus necesidades
    var radioDesenfoque = 1;
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarDesenfoque(imagenSal, radioDesenfoque));
}
function pixelearImagen(evt) {
    var blockSize = 10; // Tamaño del bloque, ajusta según sea necesario
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.pixelear(imagenSal, blockSize));
}
function aplicarEfectoSepia(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarEfectoSepia(imagenSal));
}
function aplicarEfectoGlitch(evt) {
    var blockSize = 20; // Puedes ajustar el tamaño del bloque según sea necesario
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
    // Puedes ajustar el factor de distorsión según tus necesidades
    var factorDistorsion = 0.5;
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.aplicarDistorsion(imagenSal, factorDistorsion));
}
//
lienzo1.addEventListener("mousemove", imgLocal.drawSmallImg);
document.getElementById('files').addEventListener('change', imgLocal.handleFileSelect, false);
document.getElementById('files2').addEventListener('change', imgLocal4.handleFileSelect, false);
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', imgLocal.handleFileSelect, false);
//Filtros basicos
document.getElementById("op-desenfoque").addEventListener('click', aplicarDesenfoque, false);
document.getElementById("op-pixelate").addEventListener('click', pixelearImagen, false);
document.getElementById("op-sepia").addEventListener('click', aplicarEfectoSepia, false);
document.getElementById("op-glitch").addEventListener('click', aplicarEfectoGlitch, false);
document.getElementById("op-foco").addEventListener('click', aplicarDestelloDeFoco, false);
document.getElementById("op-distorsion").addEventListener('click', aplicarDistorsion, false);
// Agrega un evento para la opción de burbujas
