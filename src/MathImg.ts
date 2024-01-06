
import { ImageType } from "./ImageType.js";
export class Heart {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;

  constructor(x: number, y: number, size: number, speedX: number, speedY: number) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.opacity = 1;
  }

  update(): void {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity -= 0.005;
  }
}
export class MathImg {
//AQUI VAN LOS EFECTOS

  public static initArray(width: number, height: number): any {
    var arrImage = new Array(3);
    arrImage[0] = new Array(height);
    arrImage[1] = new Array(height);
    arrImage[2] = new Array(height);
    for (let i = 0; i < height; i++) {
      arrImage[0][i] = new Array(width);
      arrImage[1][i] = new Array(width);
      arrImage[2][i] = new Array(width);
    }
    return arrImage;
  }
  public static aplicarDesenfoque(img: ImageType, radio: number): number[][][] {
    var arrImage = img.getArrayImg();
    var sal = this.initArray(img.getWidth(), img.getHeight());

    for (let i = 0; i <img.getHeight(); i++) {
        for (let j= 0;j < img.getWidth(); j++) {
            const pixel = this.aplicarDesenfoqueEnPixel(arrImage, i, j, radio);
            sal[0][i][j] = pixel[0];
            sal[1][i][j] = pixel[1];
            sal[2][i][j] = pixel[2];
        }
    }

    return sal;
}

private static aplicarDesenfoqueEnPixel(arrImage: number[][][], x: number, y: number, radio: number): number[] {
    const pixel = [0, 0, 0];

    for (let i =-radio; i <=radio;i++) {
        for (let j = -radio; j <= radio; j++) {
            const currentX = Math.min(Math.max(x + i, 0), arrImage[0].length - 1);
            const currentY = Math.min(Math.max(y + j, 0), arrImage.length - 1);

            pixel[0] += arrImage[0][currentX][currentY];
            pixel[1] += arrImage[1][currentX][currentY];
            pixel[2] += arrImage[2][currentX][currentY];
        }
    }

    const totalPixels = (2*radio+ 1) ** 2;

    
    const factorReduccion = 2; 
    pixel[0]/= totalPixels * factorReduccion;
    pixel[1] /= totalPixels * factorReduccion;
    pixel[2]/= totalPixels * factorReduccion;

    return pixel;
}
//Mejorar Imagen
public static pixelear(img: ImageType, blockSize: number): number[][][] {
  const arrImage = img.getArrayImg();
  const width = img.getWidth();
  const height = img.getHeight();
  const sal = this.initArray(width, height);

  for (let i=0; i<height;i +=blockSize) {
    for (let j = 0; j< width; j +=blockSize) {
      const blockSum = [0, 0, 0];

      for (let x = 0; x < blockSize; x++) {
        for (let y = 0; y < blockSize; y++) {
          const pixelX = i + x;
          const pixelY = j + y;

          if (pixelX < height && pixelY < width) {
            blockSum[0] += arrImage[0][pixelX][pixelY];
            blockSum[1]+= arrImage[1][pixelX][pixelY];
            blockSum[2] += arrImage[2][pixelX][pixelY];
          }
        }
      }

      const blockAvg = [
        blockSum[0]/ (blockSize * blockSize),
        blockSum[1] / (blockSize * blockSize),
        blockSum[2] / (blockSize * blockSize)
      ];

      for (let x =0; x< blockSize; x++) {
        for (let y = 0; y < blockSize; y++) {
          const pixelX =i +x;
          const pixelY =j +y;

          if (pixelX < height && pixelY < width) {
            sal[0][pixelX][pixelY]= blockAvg[0];
            sal[1][pixelX][pixelY]= blockAvg[1];
            sal[2][pixelX][pixelY]= blockAvg[2];
          }
        }
      }
    }
  }

  return sal;
}

public static aplicarEfectoSepia(img: ImageType): number[][][] {
  const arrImage = img.getArrayImg();
  const width = img.getWidth();
  const height = img.getHeight();
  const sal = this.initArray(width, height);

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const pixel = this.aplicarEfectoSepiaEnPixel(arrImage, i, j);
      sal[0][i][j] = pixel[0];
      sal[1][i][j] = pixel[1];
      sal[2][i][j] = pixel[2];
    }
  }

  return sal;
}

private static aplicarEfectoSepiaEnPixel(arrImage: number[][][], x: number, y: number): number[] {
  const pixel = [0, 0, 0];

  const r =arrImage[0][x][y];
  const g =arrImage[1][x][y];
  const b =arrImage[2][x][y];

  
  pixel[0] = Math.min(255, 0.393* r +0.769 * g + 0.150* b);
  pixel[1] = Math.min(255, 0.349* r +0.686 * g + 0.168* b);
  pixel[2] = Math.min(255, 0.272* r +0.534 * g + 0.131* b);

  return pixel;
}
public static aplicarEfectoGlitch(img: ImageType, blockSize: number): number[][][] {
  const arrImage = img.getArrayImg();
  const width = img.getWidth();
  const height = img.getHeight();
  const sal = this.initArray(width, height);

  for (let i = 0; i < height; i += blockSize) {
    for (let j = 0; j < width; j += blockSize) {
      const isGlitch = Math.random() < 0.3;

      if (isGlitch) {
        const displacement = Math.floor(Math.random() * (blockSize * 2) - blockSize);
        const glitchWidth = Math.min(blockSize + displacement, width - j);
        const glitchHeight = Math.min(blockSize + displacement, height - i);

        for (let x = 0; x < glitchHeight; x++) {
          for (let y = 0; y < glitchWidth; y++) {
            const pixelX = i + x;
            const pixelY = j + y;

            const glitchColor = [
              Math.random() * 255,   // red
              Math.random() * 255,   // green 
              Math.random() * 255    // Blue 
            ];

            const alpha = Math.random() * 0.5 + 0.5;

            sal[0][pixelX][pixelY] = (1 - alpha) * arrImage[0][pixelX][pixelY] + alpha * glitchColor[0];
            sal[1][pixelX][pixelY] = (1 - alpha) * arrImage[1][pixelX][pixelY] + alpha * glitchColor[1];
            sal[2][pixelX][pixelY] = (1 - alpha) * arrImage[2][pixelX][pixelY] + alpha * glitchColor[2];
          }
        }
      } else {
        for (let x = 0; x < blockSize; x++) {
          for (let y = 0; y < blockSize; y++) {
            const pixelX = i + x;
            const pixelY = j + y;

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
}
public static aplicarDestelloDeFoco(img: ImageType, size: number): number[][][] {
  const arrImage = img.getArrayImg();
  const width = img.getWidth();
  const height = img.getHeight();
  const sal = this.initArray(width, height);

  const centerX = width / 2;
  const centerY = height / 2;

  for (let i= 0; i< height; i++) {
    for (let j =0; j< width; j++) {
      const distanceToCenter = Math.sqrt((i - centerY) ** 2 + (j - centerX) ** 2);
      const intensity = 1 - Math.min(1, distanceToCenter / size);
      const pixel = this.aplicarDestelloDeFocoEnPixel(arrImage, i, j, intensity);
      sal[0][i][j] = pixel[0];
      sal[1][i][j] = pixel[1];
      sal[2][i][j] = pixel[2];
    }
  }

  return sal;
}

private static aplicarDestelloDeFocoEnPixel(arrImage: number[][][], x: number, y: number, intensity: number): number[] {
  const pixel = [0, 0, 0];

  for (let c =0; c < 3;c++) {
    pixel[c] = arrImage[c][x][y] + intensity * 255;
  }

  return pixel;
}

public static aplicarDistorsion(img: ImageType, factor: number): number[][][] {
  const arrImage = img.getArrayImg();
  const width = img.getWidth();
  const height = img.getHeight();
  const sal = this.initArray(width, height);

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const newX = Math.floor(j + Math.sin(i * factor) * factor * 10);
      const newY = Math.floor(i + Math.sin(j * factor) * factor * 10);

      if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
        sal[0][i][j] = arrImage[0][newY][newX];
        sal[1][i][j] = arrImage[1][newY][newX];
        sal[2][i][j] = arrImage[2][newY][newX];
      }
    }
  }

  return sal;
}
public static aplicarVortice(img: ImageType, centerX: number, centerY: number, strength: number, angle: number): number[][][] {
  const arrImage = img.getArrayImg();
  const width = img.getWidth();
  const height = img.getHeight();
  const sal = this.initArray(width, height);

  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);


  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const deltaX = j - centerX;
      const deltaY = i - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const angleOffset = strength * Math.exp(-distance / 1000) * Math.PI / 180;
      const newX = cosA * deltaX - sinA * deltaY + centerX;
      const newY = sinA * deltaX + cosA * deltaY + centerY;

      if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
        sal[0][i][j] = arrImage[0][Math.floor(newY)][Math.floor(newX)];
        sal[1][i][j] = arrImage[1][Math.floor(newY)][Math.floor(newX)];
        sal[2][i][j] = arrImage[2][Math.floor(newY)][Math.floor(newX)];
      }
    }
  }

  return sal;
}


public static aplicarOndas(img: ImageType, amplitude: number, frequency: number, offset: number): number[][][] {
  const arrImage=img.getArrayImg();
  const width=img.getWidth();
  const height=img.getHeight();
  const sal=this.initArray(width, height);

  for (let i=0; i<height; i++) {
    for (let j =0; j<width; j++) {
      const yOffset = amplitude * Math.sin((j / width) * 2 * Math.PI * frequency + offset);
      const newX = j;
      const newY = i + yOffset;

      if (newY >= 0 && newY < height) {
        sal[0][i][j]=arrImage[0][Math.floor(newY)][newX];
        sal[1][i][j]=arrImage[1][Math.floor(newY)][newX];
        sal[2][i][j]=arrImage[2][Math.floor(newY)][newX];
      }
    }
  }
  return sal;
}
public static aplicarZoomDinamico(img: ImageType, scale: number): number[][][] {
  const arrImage = img.getArrayImg();
  const width= img.getWidth();
  const height= img.getHeight();
  const sal= this.initArray(width, height);
  const centerX= width/2;
  const centerY =height/2;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const offsetX =j- centerX;
      const offsetY =i- centerY;

      const newX =centerX+ offsetX* scale;
      const newY =centerY+ offsetY* scale;

      if (newX >= 0&&newX< width&&newY>= 0 &&newY <height) {
        sal[0][i][j]=arrImage[0][Math.floor(newY)][Math.floor(newX)];
        sal[1][i][j]=arrImage[1][Math.floor(newY)][Math.floor(newX)];
        sal[2][i][j]=arrImage[2][Math.floor(newY)][Math.floor(newX)];
      }
    }
  }
  return sal;
}

public static aplicarPerturbacion(img: ImageType, amplitude: number, frequency: number, time: number): number[][][] {
  const arrImage = img.getArrayImg();
  const width = img.getWidth();
  const height = img.getHeight();
  const sal = this.initArray(width, height);

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const offsetX = this.calcularOffset(amplitude, frequency, j, i, time);
      const offsetY = this.calcularOffset(amplitude, frequency, i, j, time); // Intercambiamos i y j para una perturbación diferente

      const newX = j + offsetX;
      const newY = i + offsetY;

      if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
        sal[0][i][j] = arrImage[0][Math.floor(newY)][Math.floor(newX)];
        sal[1][i][j] = arrImage[1][Math.floor(newY)][Math.floor(newX)];
        sal[2][i][j] = arrImage[2][Math.floor(newY)][Math.floor(newX)];
      }
    }
  }

  return sal;
}

private static calcularOffset(amplitude: number, frequency: number, x: number, y: number, time: number): number {
  const noise = Math.sin(frequency * x + time) + Math.cos(frequency * y + time);
  return amplitude * noise;
}
public static crearSistemaSolar(img: ImageType, tiempo: number): number[][][] {
  const arrImage = img.getArrayImg();
  const width = img.getWidth();
  const height = img.getHeight();
  const sal = this.initArray(width, height);
  
  for (let i= 0; i<height; i++) {
    for (let j= 0;j< width; j++) {
      sal[0][i][j] =arrImage[0][i][j];
      sal[1][i][j] =arrImage[1][i][j];
      sal[2][i][j] =arrImage[2][i][j];
    }
  }
  // Crear el sol en el centro
  const solX = Math.floor(width / 2);
  const solY = Math.floor(height / 2);
  const solColor = "#FFFF00"; // Color amarillo para el sol
  this.dibujarCirculo(sal, solX, solY, 20, solColor, width, height); // Tamaño para el sol

  // Creando los palnetas
  const numPlanetas = 5;
  for (let i = 0; i < numPlanetas; i++) {
    const radioOrbita = 50 + i * 20; // Destancia del planeta del sol
    const velocidadGiro = 0.001 / (i + 1); //Velocidad 
  
    const angulo = (tiempo * velocidadGiro) % (2 * Math.PI);
  
    const planetaX = solX + Math.floor(radioOrbita * Math.cos(angulo));
    const planetaY = solY + Math.floor(radioOrbita * Math.sin(angulo));
  
    let planetaColor = "";
  
    // se le da colores a cada planeta
    if (i=== 0) {
      planetaColor="#B0AFA7";
    } else if (i===1) {
      planetaColor="#E09B00";
    } else if (i===2) {
      planetaColor="#0077C8";
    } else if (i===3) {
      planetaColor="#FF5733";
    } else if (i===4) {
      planetaColor="#D16B54";
    } 
    this.dibujarCirculo(sal, planetaX, planetaY, 10, planetaColor, width, height); //tamaño del planeta
  }

  return sal;
}
private static dibujarCirculo(sal: number[][][], x: number, y: number, radio: number, color: string, width: number, height: number): void {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const distanciaAlCentro=Math.sqrt((i - y)** 2 + (j - x)** 2);
      const smoothness = 1;
      const alpha = Math.max(0, Math.min(1, (radio - distanciaAlCentro) / smoothness));

      if (distanciaAlCentro<radio) {
        const existingColor=sal.map(channel => channel[i][j]/255);
        const newColor =[parseInt(color.substring(1, 3), 16)/255, parseInt(color.substring(3, 5), 16) / 255, parseInt(color.substring(5, 7), 16) / 255];
        for (let k=0; k<3; k++) {
          sal[k][i][j] = Math.round((1 - alpha) * existingColor[k] + alpha * newColor[k]) * 255;
        }
      }
    }
  }
}

public static AplicarRemolinos(img: ImageType, strength: number, frequency: number, elapsed: number): number[][][] {
  const arrImage=img.getArrayImg();
  const sal=this.initArray(img.getWidth(),img.getHeight());

  const width=img.getWidth();
  const height=img.getHeight();

  for (let i=0; i<height; i++) {
     for (let j=0; j<width; j++) {
      const displacement = Math.sin(frequency * elapsed + i * j) * strength;
      const newX= Math.floor(j + displacement);
      const newY= Math.floor(i + displacement);

      if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
        sal[0][i][j]=arrImage[0][newY][newX];
         sal[1][i][j]=arrImage[1][newY][newX];
        sal[2][i][j]=arrImage[2][newY][newX];
      }
    }
  }
   return sal;
}
public static aplicarTransformacion(img: ImageType, centerX: number, centerY: number, scaleX: number, scaleY: number): number[][][] {
  const arrImage=img.getArrayImg();
  const width=img.getWidth();
  const height=img.getHeight();
  const sal=this.initArray(width, height);
  for (let i= 0; i<height; i++) {
    for (let j=0; j<width; j++) {
      const deltaX=j - centerX;
      const deltaY=i - centerY;
      const newX =centerX + deltaX*scaleX;
      const newY = centerY + deltaY*scaleY;
      if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
        sal[0][i][j]= arrImage[0][Math.floor(newY)][Math.floor(newX)];
         sal[1][i][j]=arrImage[1][Math.floor(newY)][Math.floor(newX)];
        sal[2][i][j]=arrImage[2][Math.floor(newY)][Math.floor(newX)];
      }
    }
  }
  return sal;
}
public static AplicarEfectoCorazones(img: ImageType, hearts: Heart[]): number[][][] {
  const arrImage=img.getArrayImg();
  const width=img.getWidth();
  const height=img.getHeight();
  const sal=this.initArray(width, height);

  for (let i=0; i<height; i++) {
    for (let j=0; j<width; j++) {
      sal[0][i][j]=arrImage[0][i][j];
      sal[1][i][j]=arrImage[1][i][j];
      sal[2][i][j]=arrImage[2][i][j];
    }
  }

  for (const heart of hearts) {
    if (heart.opacity>0) {
      const heartX=Math.floor(heart.x);
      const heartY=Math.floor(heart.y);
      const heartSize=Math.floor(heart.size);
      if (
        heartX>= 0 && heartX<width &&
        heartY>=0 && heartY<height
      ) {
        const color=[0xc8, 0xa2, 0xc8];

        // Dibuja la forma del corazón
        this.drawHeart(sal, heartX, heartY, heartSize, color);
      }
      heart.update();
    }
  }
  return sal;
}
private static drawHeart(sal: number[][][], x: number, y: number, size: number, color: number[]): void {
  const heartShape = [
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

  for (let i= 0; i <heartShape.length; i++) {
    for (let j= 0; j <heartShape[i].length; j++) {
      if (heartShape[i][j] === '*') {
        const pixelX =x-Math.floor(heartShape[i].length/ 2)+ j;
        const pixelY =y-Math.floor(heartShape.length/ 2)+ i;
        if (
          pixelX>= 0 && pixelX < sal[0][0].length &&
          pixelY>= 0 && pixelY < sal[0].length
        ) {
          sal[0][pixelY][pixelX] = color[0];
          sal[1][pixelY][pixelX] = color[1];
          sal[2][pixelY][pixelX] = color[2];
        }
      }
    }
  }
}
//Aplica Ondas que se van a ocupar al efecto burbuja
public static aplicarDistorsionConOndasMovimiento(img: ImageType, factor: number, centerX: number, centerY: number): number[][][] {
  const arrImage=img.getArrayImg();
  const width=img.getWidth();
  const height=img.getHeight();
  const sal=this.initArray(width, height);

  for (let i=0; i<height; i++) {
    for (let j=0; j<width; j++) {
      const deltaX=j-centerX;
      const deltaY=i-centerY;

      const distance=Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const angle=Math.atan2(deltaY, deltaX);

      // Agregar movimiento aleatorio a las ondas
      const randomMovement=Math.random()*factor;
      const waveDistortion=Math.sin(distance*factor+randomMovement);

      const newX= j +waveDistortion * Math.cos(angle);
      const newY= i +waveDistortion * Math.sin(angle);

      if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
        sal[0][i][j]=arrImage[0][Math.floor(newY)][Math.floor(newX)];
        sal[1][i][j]=arrImage[1][Math.floor(newY)][Math.floor(newX)];
        sal[2][i][j]=arrImage[2][Math.floor(newY)][Math.floor(newX)];
      }
    }
  }

  return sal;
}
/// Efecto Burbuja
public static aplicarEfectoBurbuja(img: ImageType, evt: any, factorDistorsion: number, explosionRadius: number): number[][][] {
  const arrImage = img.getArrayImg();
  const width = img.getWidth();
  const height = img.getHeight();
  const sal = this.initArray(width, height);

  const { offsetX, offsetY } = evt;
  const dispersionFactor = 0.05; // factor de dispersion
  //Se ocupa distorcion para fondo
  const imgDistorsionada = this.aplicarDistorsionConOndasMovimiento(img, factorDistorsion, offsetX, offsetY);
  
  //const imgDistorsionada = this.aplicarDistorsion(img, factorDistorsion);
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const deltaX = j - offsetX;
      const deltaY = i - offsetY;

      // Aplicar distorsión como fondo antes de la explosión
      const distorsionX = Math.floor(j + Math.sin(i * factorDistorsion) * factorDistorsion * 10);
      const distorsionY = Math.floor(i + Math.sin(j * factorDistorsion) * factorDistorsion * 10);

      if (distorsionX >= 0 && distorsionX < width && distorsionY >= 0 && distorsionY < height) {
        sal[0][i][j] = imgDistorsionada[0][distorsionY][distorsionX];
        sal[1][i][j] = imgDistorsionada[1][distorsionY][distorsionX];
        sal[2][i][j] = imgDistorsionada[2][distorsionY][distorsionX];
      }

      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      if (distance < explosionRadius) {
        const dispersionX = deltaX * dispersionFactor * (explosionRadius - distance);
        const dispersionY = deltaY * dispersionFactor * (explosionRadius - distance);
      const newX = j + dispersionX;
        const newY = i + dispersionY;

        if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
          const weight = (explosionRadius - distance) / explosionRadius;
           sal[0][i][j] = this.clamp(arrImage[0][Math.floor(newY)][Math.floor(newX)] + (imgDistorsionada[0][i][j] - arrImage[0][i][j]) * weight, 0, 255);
        sal[1][i][j] = this.clamp(arrImage[1][Math.floor(newY)][Math.floor(newX)] + (imgDistorsionada[1][i][j] - arrImage[1][i][j]) * weight, 0, 255);
          sal[2][i][j] = this.clamp(arrImage[2][Math.floor(newY)][Math.floor(newX)] + (imgDistorsionada[2][i][j] - arrImage[2][i][j]) * weight, 0, 255);
        }
      }
    }
  }
  return sal;
}
public static clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
public static aplicarEfectoFuego(img: ImageType, evt: any, factorMovimiento: number, factorDetalle: number): number[][][] {
  const arrImage= img.getArrayImg();
  const width=img.getWidth();
  const height=img.getHeight();
  const sal=this.initArray(width, height);

  const { offsetX, offsetY } = evt;

  for (let i=0; i <height; i++) {
    for (let j=0; j <width; j++) {
      const deltaX=j-offsetX;
      const deltaY=i -offsetY;

      const distance=Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const angle=Math.atan2(deltaY, deltaX);

      
      const movimiento=Math.sin(distance*factorMovimiento);
      const detalleFractal=Math.sin(distance*factorDetalle);

      const newX = j + movimiento * Math.cos(angle) + detalleFractal * 10;
      const newY = i + movimiento * Math.sin(angle) + detalleFractal * 10;

      if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
        // colores para una apariencia más definida
        const colorVariation = Math.random() * 30;
        const red = this.clamp(255 - distance * 2 + colorVariation, 0, 255);
        const green = this.clamp(100 - distance * 1.5 + colorVariation * 0.5, 0, 255);
        const blue = this.clamp(20 - distance + colorVariation * 0.2, 0, 255);

        const weight=0.3; // Peso de la iimagen originak
        const intensity=Math.sin(distance * 0.1) * 0.5 + 3; // Intencidad de la variacion del calor de la bola de fuego

        sal[0][i][j]=this.clamp(arrImage[0][Math.floor(newY)][Math.floor(newX)] * weight + red * (1 - weight) * intensity, 0, 255);
        sal[1][i][j]=this.clamp(arrImage[1][Math.floor(newY)][Math.floor(newX)] * weight + green * (1 - weight) * intensity, 0, 255);
        sal[2][i][j]=this.clamp(arrImage[2][Math.floor(newY)][Math.floor(newX)] * weight + blue * (1 - weight) * intensity, 0, 255);
      }
    }
  }

  return sal;
}
}