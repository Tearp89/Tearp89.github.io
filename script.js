window.addEventListener('scroll', function () {
  let scrollAmount = window.scrollY;

  // Elementos
  let lidOne = document.querySelector('.lid.one');
  let lidTwo = document.querySelector('.lid.two');
  let wrapper = document.querySelector('.wrapper');
  let content = document.querySelector('.content'); // Contenido adicional

  // Rotación de las solapas
  let lidRotation = Math.min(scrollAmount / 5, 90); // Rotación limitada a 90 grados
  lidOne.style.transform = `rotateX(${lidRotation}deg)`; // Rotación superior
  lidTwo.style.transform = `rotateX(${lidRotation + 90}deg)`; // Rotación inferior

  // Desplazamiento hacia arriba del sobre
  let translateAmount = Math.max(-scrollAmount / 3, -200); // Límite para subir máximo 200px
  wrapper.style.transform = `translateY(${translateAmount}px)`; // Se desplaza hacia arriba

  // Mostrar contenido cuando el sobre se ha abierto por completo
  if (lidRotation >= 90) {
      content.classList.add('visible'); // Mostrar contenido
  } else {
      content.classList.remove('visible'); // Ocultar contenido
  }
});

let chars, particles, canvas, ctx, w, h, current;
    let duration = 5000;
    let str = ['MAII´S', 'FEST', '2025'];

    init();
    resize();
    requestAnimationFrame(render);
    addEventListener('resize', resize);

    function makeChar(c) {
        let tmp = document.createElement('canvas');
        let size = tmp.width = tmp.height = w < 400 ? 200 : 300;
        let tmpCtx = tmp.getContext('2d');
        tmpCtx.font = 'bold ' + size + 'px Arial';
        tmpCtx.fillStyle = 'white';
        tmpCtx.textBaseline = "middle";
        tmpCtx.textAlign = "center";
        tmpCtx.fillText(c, size / 2, size / 2);
        let char2 = tmpCtx.getImageData(0, 0, size, size);
        let char2particles = [];
        for (var i = 0; char2particles.length < particles; i++) {
            let x = size * Math.random();
            let y = size * Math.random();
            let offset = parseInt(y) * size * 4 + parseInt(x) * 4;
            if (char2.data[offset])
                char2particles.push([x - size / 2, y - size / 2]);
        }
        return char2particles;
    }

    function init() {
        const container = document.getElementById('animation-container'); // Contenedor específico
        canvas = document.createElement('canvas');
        container.append(canvas); // Anexa al contenedor
        ctx = canvas.getContext('2d');
    }

    function resize() {
        const container = document.getElementById('animation-container');
        w = canvas.width = container.clientWidth; // Ancho del contenedor
        h = canvas.height = container.clientHeight; // Altura del contenedor
        particles = w < 400 ? 55 : 99;
    }

    function makeChars(t) {
        let actual = parseInt(t / duration) % str.length;
        if (current === actual)
            return;
        current = actual;
        chars = [...str[actual]].map(makeChar);
    }

    let img = new Image();
        img.src = 'resources/media/images/clouds.jpg';
        img.onload = () => {
          render(0);
        }

    function render(t) {
        makeChars(t);
        requestAnimationFrame(render);
        
        ctx.drawImage(img, 0, 0, w, h)

        let gradient = ctx.createLinearGradient(0, 0, 0, h); // De arriba hacia abajo
        gradient.addColorStop(0, 'rgba(96, 130, 182, 0)');    // Azul fuerte
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)'); // Transparente en el medio
        gradient.addColorStop(1, 'rgba(96, 130, 182, 0)');    // Azul fuerte otra vez

        // Dibuja el degradado sobre la imagen
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);

        chars.forEach((pts, i) => firework(t, i, pts));
    }

    function firework(t, i, pts) {
        t -= i * 200;
        let id = i + chars.length * parseInt(t - t % duration);
        t = t % duration / duration;
        let dx = (i + 1) * w / (1 + chars.length);
        dx += Math.min(0.33, t) * 100 * Math.sin(id);
        let dy = h * 0.5;
        dy += Math.sin(id * 4547.411) * h * 0.1;
        if (t < 0.33) {
            rocket(dx, dy, id, t * 3);
        } else {
            explosion(pts, dx, dy, id, Math.min(1, Math.max(0, t - 0.33) * 2));
        }
    }

    function rocket(x, y, id, t) {
        ctx.fillStyle = 'white';
        let r = 2 - 2 * t + Math.pow(t, 15 * t) * 16;
        y = h - y * t;
        circle(x, y, r);
    }

    function explosion(pts, x, y, id, t) {
        let dy = (t * t * t) * 20;
        let r = Math.sin(id) * 1 + 3;
        r = t < 0.5 ? (t + 0.5) * t * r : r - t * r;
        ctx.fillStyle = `hsl(${id * 55}, 55%, 55%)`;
        pts.forEach((xy, i) => {
            if (i % 20 === 0)
                ctx.fillStyle = `hsl(${id * 55}, 55%, ${55 + t * Math.sin(t * 55 + i) * 45}%)`;
            circle(t * xy[0] + x, h - y + t * xy[1] + dy, r);
        });
    }

    function circle(x, y, r) {
        ctx.beginPath();
        ctx.ellipse(x, y, r, r, 0, 0, 6.283);
        ctx.fill();
    }


    const targetDate = new Date("2025-03-01T14:00:00").getTime(); // Fecha objetivo

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("countdown").textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
        document.getElementById("countdown").textContent = "¡El evento ha comenzado!";
    }
}

// Actualiza cada segundo
setInterval(updateCountdown, 1000);
updateCountdown();


const music = document.getElementById("background-music");
    
      function toggleMusic() {
        if (music.paused) {
          music.play();
        } else {
          music.pause();
        }
      }

const lyricsContainer = document.getElementById('lyrics-container');
const lyrics = [
    { time: 0, text: "Bolso escolar en la mano, se va de casa temprano en la mañana" },
    { time: 8, text: "Diciendo adiós con una sonrisa distraída" },
    { time: 17, text: "La veo ir con una oleada de esa conocida tristeza" },
    { time: 15, text: "¡Y la cuarta línea emocionante!" },
    { time: 20, text: "Última línea de ejemplo, final de la letra." }
];

lyrics.forEach(line => {
    const p = document.createElement('p');
    p.textContent = line.text;
    lyricsContainer.appendChild(p);
});

// Actualiza las letras en función del tiempo
audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const lines = lyricsContainer.querySelectorAll('p');

    lyrics.forEach((line, index) => {
        if (currentTime >= line.time) {
            // Resalta la línea actual
            lines.forEach(line => line.classList.remove('highlight')); // Quita resaltar de todas
            if (lines[index]) {
                lines[index].classList.add('highlight');
            }
        }
    });
});

