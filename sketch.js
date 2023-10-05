const s = (p) => {
  let audio, gif;
  let gifWidth, gifHeight; // Variables para almacenar el ancho y alto del gif
  let audioLoaded = false;
  let gifLoaded = false;
  // Selector del spinner
  const spinner = document.querySelector('#p5_loading5');
  const languages = ['es', 'en', 'fr']; // Lista de idiomas disponibles
  const elements = {
    tierraTit: '#tierraTit',
    tierraSub: '#tierraSub',
    soundOn: '#soundOn',
    play: '#play',
  };

  p.preload = () => {
    audio = p.loadSound('audio/demo0.mp3', () => {
      audioLoaded = true;
      spinner.style.display = 'none';
    });

    gif = p.loadImage('img/j.gif', () => {
      gifLoaded = true;
      gifWidth = gif.width;
      gifHeight = gif.height;
      spinner.style.display = 'none';
    });

    // Muestra el texto inicial en el idioma predeterminado (inglés)
    document.querySelector('#tierraTit').textContent = i18next.t('tierraTit');
    document.querySelector('#tierraSub').textContent = i18next.t('tierraSub');
    document.querySelector('#soundOn').textContent = i18next.t('soundOn');
    document.querySelector('#play').textContent = i18next.t('play');


  }

  p.setup = () => {
    const playBtn = document.querySelector('#play');
    playBtn.addEventListener('click', () => {
      if (audioLoaded) {
        document.body.classList.add('start-anim');
        audio.loop();
      }
    });

    // // Agrega el código para mostrar el spinner en tu HTML
    // const spinner = document.querySelector('#p5_loading');

    // // En el evento de carga de los archivos, oculta el spinner
    // document.addEventListener('DOMContentLoaded', () => {
    //   // Oculta el spinner y muestra el contenido
    //   spinner.style.display = 'none';
    //   // También puedes mostrar el botón "play" aquí
    // });

    p.pixelDensity(1);
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();

    const toggleBtn = document.querySelector('#toggle-btn');
    toggleBtn.addEventListener('click', () => {
      toggleBtn.classList.toggle('toggle--on');
      toggleAudio();
    });

    languages.forEach((lang) => {
      document.querySelector(`#${lang}-lang`).addEventListener('click', () => {
        i18next.changeLanguage(lang, () => {
          // Actualiza el contenido con el nuevo idioma para todos los elementos
          for (const key in elements) {
            if (elements.hasOwnProperty(key)) {
              const selector = elements[key];
              document.querySelector(selector).textContent = i18next.t(key);
            }
          }
        });
      });
    });

  }

  p.draw = () => {
    p.background(0); // Cambia el color de fondo según tus preferencias
    // Verifica si el gif se ha cargado antes de usarlo
    if (gifLoaded) {
      p.imageMode(p.CENTER);
      p.image(gif, 0, 0, gif.width, gif.height);
    }
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

  function toggleAudio() {
    if (audio.isPlaying()) {
      audio.pause();
    } else {
      audio.loop();
    }
  }
};

new p5(s);

import i18next from 'https://cdn.jsdelivr.net/gh/i18next/i18next/src/index.js';

i18next.init({
  lng: 'en', // Idioma predeterminado
  resources: {
    es: {
      translation: {
        tierraTit: 'TIERRA SELLO es parte de TIERRA',
        tierraSub:'Una agencia para el desarrollo integral de artistas multidisciplinares, que sitúa el Arte como principal eje de valor.',
        soundOn:'Suba el volumen',
        play: 'Reproducir',
      },
    },
    en: {
      translation: {
        tierraTit: 'TIERRA SELLO is part of TIERRA',
        tierraSub:'An agency for the integral development of multidisciplinary artists, which places Art as the main axis of value.',
        soundOn:'Turn your sound on',
        play: 'Play',
      },
    },
    fr: {
      translation: {
        tierraTit: 'TIERRA SELLO est au coeur de TIERRA',
        tierraSub: 'Une agence portée sur le développement intégral d’artistes multidisciplinaires, qui place l’Art comme principal axe de valeur.',
        soundOn: 'augmenter le volume',
        play: 'reproduire',
      },
    },
  },
});
