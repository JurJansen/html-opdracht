// ------------------------------------ \\
// Medemogelijk gemaakt door ChatGPT :) \\
// ------------------------------------ \\

const pres = document.querySelectorAll('pre');

pres.forEach(pre => {
  let mouseDownPos = null;

  pre.addEventListener('mousedown', e => {
    mouseDownPos = { x: e.clientX, y: e.clientY };
  });

  pre.addEventListener('mouseup', e => {
    const dx = e.clientX - mouseDownPos.x;
    const dy = e.clientY - mouseDownPos.y;
    if (Math.sqrt(dx*dx + dy*dy) < 5) {
      pres.forEach(p => {
        if (p !== pre) p.classList.remove('fullscreen');
      });

      pre.classList.toggle('fullscreen');
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    pres.forEach(pre => pre.classList.remove('fullscreen'));
  }
});
