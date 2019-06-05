let sibling = document.getElementById("footer");
let cell;
const text = [
  ,
  {
    title: "The Little Red Dress",
    description:
      "The red dress effect is a putative phenomenon in which people wearing red clothing, such as a red dress, are perceived to be more sexually appealing than they are when wearing other colours."
  },
  {
    title: "Classic Sheath Dress",
    description:
      "In fashion, a sheath dress is a fitted, straight cut dress, often nipped at the waistline with no waist seam."
  },
  {
    title: "A Slip of Pink",
    description:
      "A slip dress is a woman's dress that closely resembles an underslip or petticoat. It is traditionally cut on the bias, with spaghetti straps. Slip dresses first became widely worn in the last decade of the 20th century, as part of the underwear-as-outerwear trend."
  },
  {
    title: "Peekaboo Lace Top",
    description:
      "Although the crop top started gaining prominence in the fashion industry during the 1930s, it was not until the sexual revolution of the late 1960s and early 1970s that it started to achieve widespread acceptance."
  },
  {
    title: "Sophisticated in Black",
    description:
      'The "little black dress" is considered essential to a complete wardrobe by many women and fashion observers, who believe it a "rule of fashion" that every woman should own a simple, elegant black dress that can be dressed up or down depending on the occasion: for example, worn with a jacket and pumps for daytime business wear or with more ornate jewelry and accessories for evening or a formal event such as a wedding or a ball.'
  }
];

function renderLooks() {
  for (let i = 1; i <= 5; i++) {
    cell = document.createElement("div");
    let insert = `<div class="pickup band"></div>
      <div id="p${i}" class="photo" style="background-image:url('../../assets/rosaline/${i}-0.png')"></div>
      <div class="pickup">
        <h2>${text[i].title}</h2>
        <p>${text[i].description}</p>
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
