/* put your medicines info here */
let medicines = [
  {
    mName: "m1",
    mImgSrc: "imgs/p1.png",
  },
  {
    mName: "m2",
    mImgSrc: "imgs/p2.png",
  },
  {
    mName: "m3",
    mImgSrc: "imgs/p3.png",
  },
];

/* put your medicines info here */
/* NOTE:- 
* bactria medicine value should be equal to medicine mName value in medicines array
*/
let bactria = [
  {
    bName: "b1",
    medicine: "m1",
    bImgSrc: "imgs/bacteria-1.png",
  },
  {
    bName: "b2",
    medicine: "m2",
    bImgSrc: "imgs/bacteria-2.png",
  },
  {
    bName: "b3",
    medicine: "m3",
    bImgSrc: "imgs/bacteria-3.png",
  },
  {
    bName: "b1",
    medicine: "m1",
    bImgSrc: "imgs/bacteria-1.png",
  },
  {
    bName: "b2",
    medicine: "m2",
    bImgSrc: "imgs/bacteria-2.png",
  },
  {
    bName: "b3",
    medicine: "m3",
    bImgSrc: "imgs/bacteria-3.png",
  },
  {
    bName: "b1",
    medicine: "m1",
    bImgSrc: "imgs/bacteria-1.png",
  },
  {
    bName: "b2",
    medicine: "m2",
    bImgSrc: "imgs/bacteria-2.png",
  },
  {
    bName: "b3",
    medicine: "m3",
    bImgSrc: "imgs/bacteria-3.png",
  },
  {
    bName: "b1",
    medicine: "m1",
    bImgSrc: "imgs/bacteria-1.png",
  },
  {
    bName: "b2",
    medicine: "m2",
    bImgSrc: "imgs/bacteria-2.png",
  },
  {
    bName: "b3",
    medicine: "m3",
    bImgSrc: "imgs/bacteria-3.png",
  },
];

let correctCards = 0;

/* call init() */
$(init);

function init() {
  // Hide the success message
  $("#successMessage").hide();
  $("#successMessage").css({
    left: "580px",
    top: "250px",
    width: 0,
    height: 0,
  });

  // Reset the game
  correctCards = 0;
  $("#cardPile").html("");
  $("#cardSlots").html("");
  $("#scoreBoard .row").html("")

  // Create the pile of shuffled cards
  medicines.sort(function () {
    return Math.random() - 0.5;
  });
  for (let i = 0; i < medicines.length; i++) {
    // medicineELement
    $("<div/>")
      .html(`<img src="${medicines[i].mImgSrc}" class="img-fluid"> `)
      .data("medicine", medicines[i].mName)
      .attr("id", "card" + medicines[i].mName)
      .appendTo("#cardPile")
      .draggable({
        stack: "#cardPile div",
        cursor: "move",
        revert: true,
      });

    // score Element
    $("<div/>")
      .html(
        `
        <div id="${medicines[i].mName}Score" class="text-center">
            <h4 class="text-danger">${medicines[i].mName}</h4>
            <p>0</p>
        </div>
      `
      )
      .addClass("col")
      .appendTo("#scoreBoard .row");
  }

  // Create the card slots
  bactria.sort(function () {
    return Math.random() - 0.5;
  });
  for (let i = 0; i < bactria.length; i++) {
    $("<div/>").html(`<img src="${bactria[i].bImgSrc}" class="img-fluid"> `).data("medicine", bactria[i].medicine).addClass("col-1").appendTo("#cardSlots").droppable({
      accept: "#cardPile div",
      hoverClass: "hovered",
      drop: handleCardDrop,
    });
  }
}

function handleCardDrop(event, ui) {
  let slotMedicineName = $(this).data("medicine");
  let cardMedicineName = ui.draggable.data("medicine");

  // If the card was dropped to the correct slot,
  // change the card colour, position it directly
  // on top of the slot, and prevent it being dragged
  // again

  if (slotMedicineName == cardMedicineName) {
    // ui.draggable.addClass( 'correct' );
    // ui.draggable.draggable( 'disable' );
    $(this).droppable("disable");
    $(this).animate({ opacity: 0 }, 500);
    let medicineScore = Number($(`#${cardMedicineName}Score p`).html());
    $(`#${cardMedicineName}Score p`).html(medicineScore+1);
    // ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    // ui.draggable.draggable( 'option', 'revert', false );
    correctCards++;
  }

  // If all the cards have been placed correctly then display a message
  // and reset the cards for another go

  if (correctCards == bactria.length) {
    $("#successMessage").show();
    $("#successMessage").animate({
      left: "380px",
      top: "200px",
      width: "400px",
      height: "100px",
      opacity: 1,
    });
  }
}
