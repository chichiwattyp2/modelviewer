const viewer = document.getElementById( 'viewer' );
viewer.addEventListener('dragover', (event) => {
  event.preventDefault();
});
viewer.addEventListener('drop', (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  const filename = file.name.toLowerCase();
  if (filename.match(/\.(gltf|glb)$/)) {
    viewer.src = URL.createObjectURL(file);
  } else if (filename.match(/\.(hdr)$/)) {
    viewer.environmentImage = URL.createObjectURL(file) + '#.hdr';
  } else if (filename.match(/\.(png|jpg)$/)) {
    viewer.environmentImage = URL.createObjectURL(file);
  }
});
viewer.addEventListener('error', (event) => {
  console.error(event.detail);
  viewer.src = 'https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b/Astronaut.glb?1542147958948';
});

['backgroundColor']
  .forEach((property) => {
    const input = document.getElementById(`${property}`);
    const output = document.getElementById(`${property}Value`);
    input.addEventListener('input', (event) => {
      document.body.style.backgroundColor = event.target.value;
    });
  });

['src', 'environmentImage']
  .forEach((property) => {
    const input = document.getElementById(`${property}`);
    const output = document.getElementById(`${property}Value`);
    input.addEventListener('input', (event) => {
      viewer[property] = event.target.value;
    });
  });

['exposure', 'shadowIntensity']
  .forEach((property) => {
    const input = document.getElementById(`${property}`);
    const output = document.getElementById(`${property}Value`);
    input.addEventListener('input', (event) => {
      const value = parseFloat(event.target.value);
      output.value = value;
      viewer[property] = value;
    });
    output.addEventListener('input', (event) => {
      const value = parseFloat(event.target.value);
      input.value = value;
      viewer[property] = value;
    });
  });

['autoRotate']
  .forEach((property) => {
    const checkbox = document.getElementById(`${property}`);
    checkbox.addEventListener('change', (event) => {
      viewer[property] = checkbox.checked;
    });
  });