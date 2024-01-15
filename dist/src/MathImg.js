//Estos son para el efecto de cursor corazon 
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
export { Heart };
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
    //efecto desenfoque
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
    //efecto sepia
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
    //efecto falla Glitch
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
    //Efecto de destello foco
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
    //efecto distorcion
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
    //efecto vortice
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
    //efecto ondas 
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
    //efecto zoom
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
    //Efecto perturbacion
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
    //Creando sistema solar
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
    //Aplicar efecto de mosaicos
    MathImg.AplicarMosaicos = function (img, strength, frequency, elapsed) {
        var arrImage = img.getArrayImg();
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var width = img.getWidth();
        var height = img.getHeight();
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var displacement = Math.sin(frequency * elapsed + i * j) * strength;
                var newX = Math.floor(j + displacement);
                var newY = Math.floor(i + displacement);
                if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                    sal[0][i][j] = arrImage[0][newY][newX];
                    sal[1][i][j] = arrImage[1][newY][newX];
                    sal[2][i][j] = arrImage[2][newY][newX];
                }
            }
        }
        return sal;
    };
    //Aplicar efecto Deformación Espejo Rotativo
    MathImg.aplicarTransformacion = function (img, centerX, centerY, scaleX, scaleY) {
        var arrImage = img.getArrayImg();
        var width = img.getWidth();
        var height = img.getHeight();
        var sal = this.initArray(width, height);
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var deltaX = j - centerX;
                var deltaY = i - centerY;
                var newX = centerX + deltaX * scaleX;
                var newY = centerY + deltaY * scaleY;
                if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                    sal[0][i][j] = arrImage[0][Math.floor(newY)][Math.floor(newX)];
                    sal[1][i][j] = arrImage[1][Math.floor(newY)][Math.floor(newX)];
                    sal[2][i][j] = arrImage[2][Math.floor(newY)][Math.floor(newX)];
                }
            }
        }
        return sal;
    };
    //Efecto de portal
    MathImg.aplicarEfectoPortal = function (img, strength, targetX, targetY) {
        var arrImage = img.getArrayImg();
        var width = img.getWidth();
        var height = img.getHeight();
        var sal = this.initArray(width, height);
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var deltaX = j - targetX;
                var deltaY = i - targetY;
                var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                var distortion = Math.sin(distance / strength);
                var newX = j + distortion * (deltaX / distance) * strength;
                var newY = i + distortion * (deltaY / distance) * strength;
                if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                    sal[0][i][j] = this.clamp(arrImage[0][Math.floor(newY)][Math.floor(newX)], 0, 255);
                    sal[1][i][j] = this.clamp(arrImage[1][Math.floor(newY)][Math.floor(newX)], 0, 255);
                    sal[2][i][j] = this.clamp(arrImage[2][Math.floor(newY)][Math.floor(newX)], 0, 255);
                }
            }
        }
        return sal;
    };
    //Olas de cuadros
    MathImg.movimientoCuadrados = function (img, tiempo) {
        var arrImage = img.getArrayImg();
        var width = img.getWidth();
        var height = img.getHeight();
        var sal = this.initArray(width, height);
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                // dezplazamientios basados en el tiempo
                var offsetX = Math.sin(tiempo + j * 0.1) * 10;
                var offsetY = Math.cos(tiempo + i * 0.1) * 10;
                //  nuevas coordenadas
                var newX = Math.floor(j + offsetX);
                var newY = Math.floor(i + offsetY);
                // limites
                newX = Math.max(0, Math.min(width - 1, newX));
                newY = Math.max(0, Math.min(height - 1, newY));
                sal[0][i][j] = arrImage[0][newY][newX];
                sal[1][i][j] = arrImage[1][newY][newX];
                sal[2][i][j] = arrImage[2][newY][newX];
            }
        }
        return sal;
    };
    //Ondulacion
    MathImg.ondulacion = function (img, tiempo, amplitud) {
        var arrImage = img.getArrayImg();
        var width = img.getWidth();
        var height = img.getHeight();
        var sal = this.initArray(width, height);
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                // Aplicar lo que es la ondulacion
                var offsetY = Math.sin(tiempo + j * 0.1) * amplitud;
                var newY = Math.floor(i + offsetY);
                // Checar limites
                newY = Math.max(0, Math.min(height - 1, newY));
                sal[0][i][j] = arrImage[0][newY][j];
                sal[1][i][j] = arrImage[1][newY][j];
                sal[2][i][j] = arrImage[2][newY][j];
            }
        }
        return sal;
    };
    //Aplicar efecto de corazones
    MathImg.AplicarEfectoCorazones = function (img, hearts) {
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
        for (var _i = 0, hearts_1 = hearts; _i < hearts_1.length; _i++) {
            var heart = hearts_1[_i];
            if (heart.opacity > 0) {
                var heartX = Math.floor(heart.x);
                var heartY = Math.floor(heart.y);
                var heartSize = Math.floor(heart.size);
                if (heartX >= 0 && heartX < width &&
                    heartY >= 0 && heartY < height) {
                    var color = [0xc8, 0xa2, 0xc8];
                    // Dibuja la forma del corazón
                    this.drawHeart(sal, heartX, heartY, heartSize, color);
                }
                heart.update();
            }
        }
        return sal;
    };
    MathImg.drawHeart = function (sal, x, y, size, color) {
        var heartShape = [
            "  ***   ***  ",
            " *********** ",
            " ***********",
            " *********** ",
            "  *********  ",
            "   *******   ",
            "    *****    ",
            "     ***     ",
            "      *      "
        ];
        for (var i = 0; i < heartShape.length; i++) {
            for (var j = 0; j < heartShape[i].length; j++) {
                if (heartShape[i][j] === '*') {
                    var pixelX = x - Math.floor(heartShape[i].length / 2) + j;
                    var pixelY = y - Math.floor(heartShape.length / 2) + i;
                    if (pixelX >= 0 && pixelX < sal[0][0].length &&
                        pixelY >= 0 && pixelY < sal[0].length) {
                        sal[0][pixelY][pixelX] = color[0];
                        sal[1][pixelY][pixelX] = color[1];
                        sal[2][pixelY][pixelX] = color[2];
                    }
                }
            }
        }
    };
    //Aplica Ondas que se van a ocupar al efecto burbuja
    MathImg.aplicarDistorsionConOndasMovimiento = function (img, factor, centerX, centerY) {
        var arrImage = img.getArrayImg();
        var width = img.getWidth();
        var height = img.getHeight();
        var sal = this.initArray(width, height);
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var deltaX = j - centerX;
                var deltaY = i - centerY;
                var distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
                var angle = Math.atan2(deltaY, deltaX);
                // Agregar movimiento aleatorio a las ondas
                var randomMovement = Math.random() * factor;
                var waveDistortion = Math.sin(distance * factor + randomMovement);
                var newX = j + waveDistortion * Math.cos(angle);
                var newY = i + waveDistortion * Math.sin(angle);
                if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                    sal[0][i][j] = arrImage[0][Math.floor(newY)][Math.floor(newX)];
                    sal[1][i][j] = arrImage[1][Math.floor(newY)][Math.floor(newX)];
                    sal[2][i][j] = arrImage[2][Math.floor(newY)][Math.floor(newX)];
                }
            }
        }
        return sal;
    };
    /// Efecto Burbuja
    MathImg.aplicarEfectoBurbuja = function (img, evt, factorDistorsion, explosionRadius) {
        var arrImage = img.getArrayImg();
        var width = img.getWidth();
        var height = img.getHeight();
        var sal = this.initArray(width, height);
        var offsetX = evt.offsetX, offsetY = evt.offsetY;
        var dispersionFactor = 0.05; // factor de dispersion
        //Se ocupa distorcion para fondo
        var imgDistorsionada = this.aplicarDistorsionConOndasMovimiento(img, factorDistorsion, offsetX, offsetY);
        //const imgDistorsionada = this.aplicarDistorsion(img, factorDistorsion);
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var deltaX = j - offsetX;
                var deltaY = i - offsetY;
                // Aplicar distorsión como fondo antes de la explosión
                var distorsionX = Math.floor(j + Math.sin(i * factorDistorsion) * factorDistorsion * 10);
                var distorsionY = Math.floor(i + Math.sin(j * factorDistorsion) * factorDistorsion * 10);
                if (distorsionX >= 0 && distorsionX < width && distorsionY >= 0 && distorsionY < height) {
                    sal[0][i][j] = imgDistorsionada[0][distorsionY][distorsionX];
                    sal[1][i][j] = imgDistorsionada[1][distorsionY][distorsionX];
                    sal[2][i][j] = imgDistorsionada[2][distorsionY][distorsionX];
                }
                var distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
                if (distance < explosionRadius) {
                    var dispersionX = deltaX * dispersionFactor * (explosionRadius - distance);
                    var dispersionY = deltaY * dispersionFactor * (explosionRadius - distance);
                    var newX = j + dispersionX;
                    var newY = i + dispersionY;
                    if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                        var weight = (explosionRadius - distance) / explosionRadius;
                        sal[0][i][j] = this.clamp(arrImage[0][Math.floor(newY)][Math.floor(newX)] + (imgDistorsionada[0][i][j] - arrImage[0][i][j]) * weight, 0, 255);
                        sal[1][i][j] = this.clamp(arrImage[1][Math.floor(newY)][Math.floor(newX)] + (imgDistorsionada[1][i][j] - arrImage[1][i][j]) * weight, 0, 255);
                        sal[2][i][j] = this.clamp(arrImage[2][Math.floor(newY)][Math.floor(newX)] + (imgDistorsionada[2][i][j] - arrImage[2][i][j]) * weight, 0, 255);
                    }
                }
            }
        }
        return sal;
    };
    MathImg.clamp = function (value, min, max) {
        return Math.min(Math.max(value, min), max);
    };
    MathImg.aplicarEfectoFuego = function (img, evt, factorMovimiento, factorDetalle) {
        var arrImage = img.getArrayImg();
        var width = img.getWidth();
        var height = img.getHeight();
        var sal = this.initArray(width, height);
        var offsetX = evt.offsetX, offsetY = evt.offsetY;
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var deltaX = j - offsetX;
                var deltaY = i - offsetY;
                var distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
                var angle = Math.atan2(deltaY, deltaX);
                var movimiento = Math.sin(distance * factorMovimiento);
                var detalleFractal = Math.sin(distance * factorDetalle);
                var newX = j + movimiento * Math.cos(angle) + detalleFractal * 10;
                var newY = i + movimiento * Math.sin(angle) + detalleFractal * 10;
                if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                    // colores para una apariencia más definida
                    var colorVariation = Math.random() * 30;
                    var red = this.clamp(255 - distance * 2 + colorVariation, 0, 255);
                    var green = this.clamp(100 - distance * 1.5 + colorVariation * 0.5, 0, 255);
                    var blue = this.clamp(20 - distance + colorVariation * 0.2, 0, 255);
                    var weight = 0.3; // Peso de la iimagen originak
                    var intensity = Math.sin(distance * 0.1) * 0.5 + 3; // Intencidad de la variacion del calor de la bola de fuego
                    sal[0][i][j] = this.clamp(arrImage[0][Math.floor(newY)][Math.floor(newX)] * weight + red * (1 - weight) * intensity, 0, 255);
                    sal[1][i][j] = this.clamp(arrImage[1][Math.floor(newY)][Math.floor(newX)] * weight + green * (1 - weight) * intensity, 0, 255);
                    sal[2][i][j] = this.clamp(arrImage[2][Math.floor(newY)][Math.floor(newX)] * weight + blue * (1 - weight) * intensity, 0, 255);
                }
            }
        }
        return sal;
    };
    MathImg.aplicarEfectoSimulacionCuantico = function (img, evt, factorMovimiento, factorDetalle) {
        var arrImage = img.getArrayImg();
        var width = img.getWidth();
        var height = img.getHeight();
        var sal = this.initArray(width, height);
        var offsetX = evt.offsetX, offsetY = evt.offsetY;
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var deltaX = j - offsetX;
                var deltaY = i - offsetY;
                var distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
                var angle = Math.atan2(deltaY, deltaX);
                // Aplicar movimiento 
                var movimiento = Math.sin(distance * factorMovimiento);
                var detalleCuántico = Math.sin(distance * factorDetalle);
                var newX = j + movimiento * Math.cos(angle) + detalleCuántico * 10;
                var newY = i + movimiento * Math.sin(angle) + detalleCuántico * 10;
                if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                    // mezcla de colores 
                    var quantumRed = Math.sin(newX * 0.1) * 255;
                    var quantumGreen = Math.cos(newY * 0.05) * 255;
                    var quantumBlue = Math.sin((newX + newY) * 0.1) * 255;
                    var originalWeight = 0.5; //  peso de la imagen original
                    var red = this.clamp(quantumRed * (1 - originalWeight) + arrImage[0][i][j] * originalWeight, 0, 255);
                    var green = this.clamp(quantumGreen * (1 - originalWeight) + arrImage[1][i][j] * originalWeight, 0, 255);
                    var blue = this.clamp(quantumBlue * (1 - originalWeight) + arrImage[2][i][j] * originalWeight, 0, 255);
                    sal[0][i][j] = red;
                    sal[1][i][j] = green;
                    sal[2][i][j] = blue;
                }
            }
        }
        return sal;
    };
    MathImg.AplicarEfectoOndulado = function (img, mouseX, mouseY) {
        var arrImage = img.getArrayImg();
        var width = img.getWidth();
        var height = img.getHeight();
        var sal = this.initArray(width, height);
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                // Distancia entre el puntero del mouse y el pixel actual
                var distancia = Math.sqrt(Math.pow(mouseX - j, 2) + Math.pow(mouseY - i, 2));
                // parametros para el ondulado
                var amplitud = 60;
                var frecuencia = 0.1;
                // se aplice el efecto basado en la distancia
                var offsetX = Math.sin(distancia * frecuencia) * amplitud;
                var offsetY = Math.cos(distancia * frecuencia) * amplitud;
                // nueva ubi
                var newX = Math.floor(j + offsetX);
                var newY = Math.floor(i + offsetY);
                // cehecar los limites
                newX = Math.max(0, Math.min(width - 1, newX));
                newY = Math.max(0, Math.min(height - 1, newY));
                sal[0][i][j] = arrImage[0][newY][newX];
                sal[1][i][j] = arrImage[1][newY][newX];
                sal[2][i][j] = arrImage[2][newY][newX];
            }
        }
        return sal;
    };
    return MathImg;
}());
export { MathImg };
