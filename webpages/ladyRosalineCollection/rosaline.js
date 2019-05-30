let sibling = document.getElementById("footer");
let cell;
const tag = [
  ,
  "The Little Red Dress",
  "Confidence",
  "Playful Pink",
  "Peekaboo Lace Top",
  "Sophisticated in Black"
];

function renderLooks() {
  for (let i = 1; i <= 5; i++) {
    cell = document.createElement("div");
    let insert = `<div class="pickup band"></div>
      <div id="p${i}" class="photo" style="background-image:url('../../assets/rosaline/${i}-0.png')"></div>
      <div class="pickup">
        <h2>${tag[i]}</h2>
        <div class="mixups">`;
    for (let j = 0; j < 4; j++) {
      insert += `<img
      class="mix"
      src="../../assets/rosaline/${i}-${j}.png"
      alt=""
      onclick="magick(${i},${j})"
    />`;
    }
    insert += `</div>
</div>`;
    cell.innerHTML = insert;
    cell.id = "look" + i;
    cell.classList.add("photoContainer");
    document.body.insertBefore(cell, sibling);
  }
}
renderLooks();

function magick(a, b) {
  document.getElementById(
    "p" + a
  ).style.backgroundImage = `url("../../assets/rosaline/${a}-${b}.png")`;
}
