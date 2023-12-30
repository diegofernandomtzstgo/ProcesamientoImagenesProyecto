var MathImg = /** @class */ (function () {
    function MathImg() {
    }
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
        // Fórmulas para el efecto sepia
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
                                Math.random() * 255, // Red channel
                                Math.random() * 255, // Green channel
                                Math.random() * 255 // Blue channel
                            ];
                            var alpha = Math.random() * 0.5 + 0.5; // Translucency
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
    return MathImg;
}());
export { MathImg };
