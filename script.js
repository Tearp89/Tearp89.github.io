window.addEventListener('scroll', function() {
  let scrollAmount = window.scrollY;

  // Obtener los elementos de las solapas y el contenedor del sobre
  let lidOne = document.querySelector('.lid.one');
  let lidTwo = document.querySelector('.lid.two');
  let wrapper = document.querySelector('.wrapper');

  // Ajustar la rotación del sobre conforme el scroll
  let lidRotation = Math.min(scrollAmount / 5, 90); // Limita la rotación a 90 grados
  lidOne.style.transform = `rotateX(${lidRotation}deg)`; // Rota la primera solapa
  lidTwo.style.transform = `rotateX(${lidRotation + 90}deg)`; // Rota la segunda solapa

  // Hacer que el sobre ocupe toda la pantalla
  let scaleAmount = Math.min(1 + (scrollAmount / 500), 4); // Escala del sobre, ajustado para ocupar más espacio
  wrapper.style.transform = `scale(${scaleAmount})`; // Agranda el sobre conforme se hace scroll

  // Ajustar la posición del sobre para que se quede centrado
  let translateAmount = Math.min(scrollAmount / 4, 200); // Cuánto se desplaza el sobre
  wrapper.style.transform += ` translateY(${translateAmount}px)`; // Desplazamiento para centrar el sobre

  // Opcionalmente, hacer que el sobre se mantenga en su lugar hasta un cierto punto
  if (scrollAmount > 200) {
      wrapper.style.transform = `scale(4) translateY(200px)`; // Asegura que el sobre ocupe toda la pantalla
  }
});
