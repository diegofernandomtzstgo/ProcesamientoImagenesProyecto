var MathImg = /** @class */ (function () {
    function MathImg() {
    }
    //AQUI VAN LOS EFECTOS
    MathImg.initArray = function (width, height) {
        var arrImage = new Array(3);
        arrImage[0] = new Array(height);
        arrImage[1] = new Array(height);
        arrImage[2] = new Array(height);
        for (var i = 0; i < height; i++) {
            arrImage[0][i] = new Array(width);
            arrImage[1][i] = new Array(width);
            arrImage[2][i] = new Array(width);
        }
        return arrImage;
    };
    MathImg.aplicarDesenfoque = function (img, radio) {
        var arrImage = img.getArrayImg();
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                var pixel = this.aplicarDesenfoqueEnPixel(arrImage, i, j, radio);
                sal[0][i][j] = pixel[0];
                sal[1][i][j] = pixel[1];
                sal[2][i][j] = pixel[2];
            }
        }
        return sal;
    };
    MathImg.aplicarDesenfoqueEnPixel = function (arrImage, x, y, radio) {
        var pixel = [0, 0, 0];
        for (var i = -radio; i <= radio; i++) {
            for (var j = -radio; j <= radio; j++) {
                var currentX = Math.min(Math.max(x + i, 0), arrImage[0].length - 1);
                var currentY = Math.min(Math.max(y + j, 0), arrImage.length - 1);
                pixel[0] += arrImage[0][currentX][currentY];
                pixel[1] += arrImage[1][currentX][currentY];
                pixel[2] += arrImage[2][currentX][currentY];
            }
        }
        var totalPixels = Math.pow((2 * radio + 1), 2);
        var factorReduccion = 2;
        pixel[0] /= totalPixels * factorReduccion;
        pixel[1] /= totalPixels * factorReduccion;
        pixel[2] /= totalPixels * factorReduccion;
        return pixel;
    };
    //Mejorar Imagen
    MathImg.pixelear = function (img, blockSize) {
        var arrImage = img.getArrayImg();
        var width = img.getWidth();
        var height = img.getHeight();
        var sal = this.initArray(width, height);
        for (var i = 0; i < height; i += blockSize) {
            for (var j = 0; j < width; j += blockSize) {
                var blockSum = [0, 0, 0];
                for (var x = 0; x < blockSize; x++) {
                    for (var y = 0; y < blockSize; y++) {
                        var pixelX = i + x;
                        var pixelY = j + y;
                        if (pixelX < height && pixelY < width) {
                            blockSum[0] += arrImage[0][pixelX][pixelY];
                            blockSum[1] += arrImage[1][pixelX][pixelY];
                            blockSum[2] += arrImage[2][pixelX][pixelY];
                        }
                    }
                }
                var blockAvg = [
                    blockSum[0] / (blockSize * blockSize),
                    blockSum[1] / (blockSize * blockSize),
                    blockSum[2] / (blockSize * blockSize)
                ];
                for (var x = 0; x < blockSize; x++) {
                    for (var y = 0; y < blockSize; y++) {
                        var pixelX = i + x;
                        var pixelY = j + y;
                        if (pixelX < height && pixelY < width) {
                            sal[0][pixelX][pixelY] = blockAvg[0];
                            sal[1][pixelX][pixelY] = blockAvg[1];
                            sal[2][pixelX][pixelY] = blockAvg[2];
                        }
                    }
                }
            }
        }
        return sal;
    };
    MathImg.aplicarEfectoSepia = function (img) {
        var arrImage = img.getArrayImg();
        var width = img.getWidth();
        var height = img.getHeight();
        var sal = this.initArray(width, height);
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var pixel = this.aplicarEfectoSepiaEnPixel(arrImage, i, j);
                sal[0][i][j] = pixel[0];
                sal[1][i][j] = pixel[1];
                sal[2][i][j] = pixel[2];
            }
        }
        return sal;
    };
    MathImg.aplicarEfectoSepiaEnPixel = function (arrImage, x, y) {
        var pixel = [0, 0, 0];
        var r = arrImage[0][x][y];
        var g = arrImage[1][x][y];
        var b = arrImage[2][x][y];
        pixel[0] = Math.min(255, 0.393 * r + 0.769 * g + 0.150 * b);
        pixel[1] = Math.min(255, 0.349 * r + 0.686 * g + 0.168 * b);
        pixel[2] = Math.min(255, 0.272 * r + 0.534 * g + 0.131 * b);
        return pixel;
    };
    MathImg.aplicarEfectoGlitch = function (img, blockSize) {
        var arrImage = img.getArrayImg();
        var width = img.getWidth();
        var height = img.getHeight();
        var sal = this.initArray(width, height);
        for (var i = 0; i < height; i += blockSize) {
            for (var j = 0; j < width; j += blockSize) {
                var isGlitch = Math.random() < 0.3;
                if (isGlitch) {
                    var displacement = Math.floor(Math.random() * (blockSize * 2) - blockSize);
                    var glitchWidth = Math.min(blockSize + displacement, width - j);
                    var glitchHeight = Math.min(blockSize + displacement, height - i);
                    for (var x = 0; x < glitchHeight; x++) {
                        for (var y = 0; y < glitchWidth; y++) {
                            var pixelX = i + x;
                            var pixelY = j + y;
                            var glitchColor = [
                                Math.random() * 255, // red
                                Math.random() * 255, // green 
                                Math.random() * 255 // Blue 
                            ];
                            var alpha = Math.random() * 0.5 + 0.5;
                            sal[0][pixelX][pixelY] = (1 - alpha) * arrImage[0][pixelX][pixelY] + alpha * glitchColor[0];
                            sal[1][pixelX][pixelY] = (1 - alpha) * arrImage[1][pixelX][pixelY] + alpha * glitchColor[1];
                            sal[2][pixelX][pixelY] = (1 - alpha) * arrImage[2][pixelX][pixelY] + alpha * glitchColor[2];
                        }
                    }
                }
                else {
                    for (var x = 0; x < blockSize; x++) {
                        for (var y = 0; y < blockSize; y++) {
                            var pixelX = i + x;
                            var pixelY = j + y;
                            if (pixelX < height && pixelY < width) {
                                sal[0][pixelX][pixelY] = arrImage[0][pixelX][pixelY];
                                sal[1][pixelX][pixelY] = arrImage[1][pixelX][pixelY];
                                sal[2][pixelX][pixelY] = arrImage[2][pixelX][pixelY];
                            }
                        }
                    }
                }
            }
        }
        return sal;
    };
    MathImg.aplicarDestelloDeFoco = function (img, size) {
        var arrImage = img.getArrayImg();
        var width = img.getWidth();
        var height = img.getHeight();
        var sal = this.initArray(width, height);
        var centerX = width / 2;
        var centerY = height / 2;
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var distanceToCenter = Math.sqrt(Math.pow((i - centerY), 2) + Math.pow((j - centerX), 2));
                var intensity = 1 - Math.min(1, distanceToCenter / size);
                var pixel = this.aplicarDestelloDeFocoEnPixel(arrImage, i, j, intensity);
                sal[0][i][j] = pixel[0];
                sal[1][i][j] = pixel[1];
                sal[2][i][j] = pixel[2];
            }
        }
        return sal;
    };
    MathImg.aplicarDestelloDeFocoEnPixel = function (arrImage, x, y, intensity) {
        var pixel = [0, 0, 0];
        for (var c = 0; c < 3; c++) {
            pixel[c] = arrImage[c][x][y] + intensity * 255;
        }
        return pixel;
    };
    MathImg.aplicarDistorsion = function (img, factor) {
        var arrImage = img.getArrayImg();
        var width = img.getWidth();
        var height = img.getHeight();
        var sal = this.initArray(width, height);
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var newX = Math.floor(j + Math.sin(i * factor) * factor * 10);
                var newY = Math.floor(i + Math.sin(j * factor) * factor * 10);
                if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                    sal[0][i][j] = arrImage[0][newY][newX];
                    sal[1][i][j] = arrImage[1][newY][newX];
                    sal[2][i][j] = arrImage[2][newY][newX];
                }
            }
        }
        return sal;
    };
    MathImg.aplicarVortice = function (img, centerX, centerY, strength, angle) {
        var arrImage = img.getArrayImg();
        var width = img.getWidth();
        var height = img.getHeight();
        var sal = this.initArray(width, height);
        var cosA = Math.cos(angle);
        var sinA = Math.sin(angle);
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var deltaX = j - centerX;
                var deltaY = i - centerY;
                var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                var angleOffset = strength * Math.exp(-distance / 1000) * Math.PI / 180;
                var newX = cosA * deltaX - sinA * deltaY + centerX;
                var newY = sinA * deltaX + cosA * deltaY + centerY;
                if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                    sal[0][i][j] = arrImage[0][Math.floor(newY)][Math.floor(newX)];
                    sal[1][i][j] = arrImage[1][Math.floor(newY)][Math.floor(newX)];
                    sal[2][i][j] = arrImage[2][Math.floor(newY)][Math.floor(newX)];
                }
            }
        }
        return sal;
    };
    MathImg.aplicarOndas = function (img, amplitude, frequency, offset) {
        var arrImage = img.getArrayImg();
        var width = img.getWidth();
        var height = img.getHeight();
        var sal = this.initArray(width, height);
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var yOffset = amplitude * Math.sin((j / width) * 2 * Math.PI * frequency + offset);
                var newX = j;
                var newY = i + yOffset;
                if (newY >= 0 && newY < height) {
                    sal[0][i][j] = arrImage[0][Math.floor(newY)][newX];
                    sal[1][i][j] = arrImage[1][Math.floor(newY)][newX];
                    sal[2][i][j] = arrImage[2][Math.floor(newY)][newX];
                }
            }
        }
        return sal;
    };
    MathImg.aplicarZoomDinamico = function (img, scale) {
        var arrImage = img.getArrayImg();
        var width = img.getWidth();
        var height = img.getHeight();
        var sal = this.initArray(width, height);
        var centerX = width / 2;
        var centerY = height / 2;
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var offsetX = j - centerX;
                var offsetY = i - centerY;
                var newX = centerX + offsetX * scale;
                var newY = centerY + offsetY * scale;
                if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                    sal[0][i][j] = arrImage[0][Math.floor(newY)][Math.floor(newX)];
                    sal[1][i][j] = arrImage[1][Math.floor(newY)][Math.floor(newX)];
                    sal[2][i][j] = arrImage[2][Math.floor(newY)][Math.floor(newX)];
                }
            }
        }
        return sal;
    };
    MathImg.aplicarPerturbacion = function (img, amplitude, frequency, time) {
        var arrImage = img.getArrayImg();
        var width = img.getWidth();
        var height = img.getHeight();
        var sal = this.initArray(width, height);
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var offsetX = this.calcularOffset(amplitude, frequency, j, i, time);
                var offsetY = this.calcularOffset(amplitude, frequency, i, j, time); // Intercambiamos i y j para una perturbación diferente
                var newX = j + offsetX;
                var newY = i + offsetY;
                if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                    sal[0][i][j] = arrImage[0][Math.floor(newY)][Math.floor(newX)];
                    sal[1][i][j] = arrImage[1][Math.floor(newY)][Math.floor(newX)];
                    sal[2][i][j] = arrImage[2][Math.floor(newY)][Math.floor(newX)];
                }
            }
        }
        return sal;
    };
    MathImg.calcularOffset = function (amplitude, frequency, x, y, time) {
        var noise = Math.sin(frequency * x + time) + Math.cos(frequency * y + time);
        return amplitude * noise;
    };
    MathImg.crearSistemaSolar = function (img, tiempo) {
        var arrImage = img.getArrayImg();
        var width = img.getWidth();
        var height = img.getHeight();
        var sal = this.initArray(width, height);
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                sal[0][i][j] = arrImage[0][i][j];
                sal[1][i][j] = arrImage[1][i][j];
                sal[2][i][j] = arrImage[2][i][j];
            }
        }
        // Crear el sol en el centro
        var solX = Math.floor(width / 2);
        var solY = Math.floor(height / 2);
        var solColor = "#FFFF00"; // Color amarillo para el sol
        this.dibujarCirculo(sal, solX, solY, 20, solColor, width, height); // Tamaño para el sol
        // Creando los palnetas
        var numPlanetas = 5;
        for (var i = 0; i < numPlanetas; i++) {
            var radioOrbita = 50 + i * 20; // Destancia del planeta del sol
            var velocidadGiro = 0.001 / (i + 1); //Velocidad 
            var angulo = (tiempo * velocidadGiro) % (2 * Math.PI);
            var planetaX = solX + Math.floor(radioOrbita * Math.cos(angulo));
            var planetaY = solY + Math.floor(radioOrbita * Math.sin(angulo));
            var planetaColor = "";
            // se le da colores a cada planeta
            if (i === 0) {
                planetaColor = "#B0AFA7";
            }
            else if (i === 1) {
                planetaColor = "#E09B00";
            }
            else if (i === 2) {
                planetaColor = "#0077C8";
            }
            else if (i === 3) {
                planetaColor = "#FF5733";
            }
            else if (i === 4) {
                planetaColor = "#D16B54";
            }
            this.dibujarCirculo(sal, planetaX, planetaY, 10, planetaColor, width, height); //tamaño del planeta
        }
        return sal;
    };
    MathImg.dibujarCirculo = function (sal, x, y, radio, color, width, height) {
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                var distanciaAlCentro = Math.sqrt(Math.pow((i - y), 2) + Math.pow((j - x), 2));
                var smoothness = 1;
                var alpha = Math.max(0, Math.min(1, (radio - distanciaAlCentro) / smoothness));
                if (distanciaAlCentro < radio) {
                    var existingColor = sal.map(function (channel) { return channel[i][j] / 255; });
                    var newColor = [parseInt(color.substring(1, 3), 16) / 255, parseInt(color.substring(3, 5), 16) / 255, parseInt(color.substring(5, 7), 16) / 255];
                    for (var k = 0; k < 3; k++) {
                        sal[k][i][j] = Math.round((1 - alpha) * existingColor[k] + alpha * newColor[k]) * 255;
                    }
                }
            };
            for (var j = 0; j < width; j++) {
                _loop_2(j);
            }
        };
        for (var i = 0; i < height; i++) {
            _loop_1(i);
        }
    };
    return MathImg;
}());
export { MathImg };
