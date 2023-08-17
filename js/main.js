/* put your medicines info here */
let medicines = [
  {
    mName: "medicine-1",
    mImgSrc: "imgs/p1.png",
  },
  {
    mName: "medicine-2",
    mImgSrc: "imgs/p2.png",
  },
  {
    mName: "medicine-3",
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
    medicine: "medicine-1",
    bImgSrc: "imgs/bacteria-1.png",
  },
  {
    bName: "b2",
    medicine: "medicine-2",
    bImgSrc: "imgs/bacteria-2.png",
  },
  {
    bName: "b3",
    medicine: "medicine-3",
    bImgSrc: "imgs/bacteria-3.png",
  },
  {
    bName: "b1",
    medicine: "medicine-1",
    bImgSrc: "imgs/bacteria-1.png",
  },
  {
    bName: "b2",
    medicine: "medicine-2",
    bImgSrc: "imgs/bacteria-2.png",
  },
  {
    bName: "b3",
    medicine: "medicine-3",
    bImgSrc: "imgs/bacteria-3.png",
  },
  {
    bName: "b1",
    medicine: "medicine-1",
    bImgSrc: "imgs/bacteria-1.png",
  },
  {
    bName: "b2",
    medicine: "medicine-2",
    bImgSrc: "imgs/bacteria-2.png",
  },
  {
    bName: "b3",
    medicine: "medicine-3",
    bImgSrc: "imgs/bacteria-3.png",
  },
  {
    bName: "b1",
    medicine: "medicine-1",
    bImgSrc: "imgs/bacteria-1.png",
  },
  {
    bName: "b2",
    medicine: "medicine-2",
    bImgSrc: "imgs/bacteria-2.png",
  },
  {
    bName: "b3",
    medicine: "medicine-3",
    bImgSrc: "imgs/bacteria-3.png",
  },
];

let correctCards = 0;

/* call init() */
$(init);

function init() {
  // Hide the success message
  $("#successMessage").hide();

  // Reset the game
  correctCards = 0;
  $("#cardPile .content").html("");
  $("#cardSlots .content").html("");
  $("#scoreBoard .row").html("");

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
      .appendTo("#cardPile .content")
      .draggable({
        stack: "#cardPile .content div",
        cursor: "move",
        revert: true,
      });

    // score Element
    $("<div/>")
      .html(
        `
        <div id="${medicines[i].mName}Score" class="d-flex justify-content-around flex-wrap text-white">
            <h4>${medicines[i].mName}: </h4>
            <p><span class="points">0</span> Points</p>
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
    $("<div/>").html(`<img src="${bactria[i].bImgSrc}" class="img-fluid"> `).data("medicine", bactria[i].medicine).addClass("col-1").appendTo("#cardSlots .content").droppable({
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
  // hide the slot and disable it
  // then revert the card back to its original position
  // again

  if (slotMedicineName == cardMedicineName) {
    $(this).droppable("disable");
    $(this).animate({ opacity: 0 }, 500);
    let medicineScore = Number($(`#${cardMedicineName}Score .points`).html());
    $(`#${cardMedicineName}Score .points`).html(medicineScore + 1);
    correctCards++;
  }

  // If all the cards have been placed correctly then display a message
  // and reset the cards for another go

  if (correctCards == bactria.length) {
    $("#successMessage").show();
    $("#successMessage").animate(
      {
        opacity: 1,
      },
      500
    );
  }
}

$(document).bind("ready",function () {
  $(document).bind("contextmenu", function (e) {
    e.preventDefault();
  });
  $(document).bind("dbClick", function (e) {
    e.preventDefault();
  });
});
