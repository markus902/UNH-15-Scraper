// import { get } from "https";

// import { WSAEINVALIDPROVIDER } from "constants";

$(document).ready(function () {

  $("#noteBox").hide();

  $.getJSON("/articles", function (data) {
    let counter = 0
    data.forEach(element => {
      let newArticleHeadline = $("<h2>");
      let newDivy = $("<div>");
      let newArticlelink = $("<a>");
      let newNoteButton = $("<button>");

      counter++;
      console.log(counter)

      if (counter % 2 == 0) {
        newDivy.css("background", "rgb(182, 196, 227)");
      } else {
        newDivy.css("background", "white");
      }
      newDivy.addClass("newDivy p-3")

      newArticleHeadline
        .addClass("articleHeadline")
        .text(element.title)
        .attr("value", element._id);

      newArticlelink
        .addClass("articleLink pl-4 pr-4")
        .text("Go to page ...")
        .attr("href", element.link);

      newNoteButton.addClass("noteButton btn btn-primary pl-4 pr-4")
        .attr("value", element._id)
        .text("Note");

      newDivy
        .append(newArticleHeadline)
        .append(newArticlelink)
        .append(newNoteButton);

      $("#articles")
        .append(newDivy);
    });
    counter = 0;
  });

  $("#scrapeButton").on("click", function () {
    $.getJSON("/scrape", function (data) {
      // console.log(data);
    }).then(function (data) {
      // console.log(data);;
    });
    location.reload(true)
  });

  $(document).on("click", ".noteButton", function () {
    $("#noteBox").show();
    $("#noteInput").empty();
    var thisId = $(this).attr("value");
    $("#saveNote").attr("value", thisId);

    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      .then(function (data) {
        console.log(data);
        if (data.note) {
          data.note.map((element) => {
            let newNote = $("<li>");
            newNote.text(element);
            $("#existingNotes").append(newNote);
          });
        } else {
          newNote.text("There are no notes for this article.")
          $("#existingNotes").append(newNote)
        };
      });
  });

  $(document).on("click", "#saveNote", function () {
    var thisId = $(this).attr("value");
    console.log(thisId, $("#noteTitleInput").val(), $("#noteBodyInput").val())

    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        title: $("#noteTitleInput").val(),
        body: $("#noteBodyInput").val(),
        id: thisId
      }
    })
      .then(function (data) {
        $("#notesTitleInput").empty();
        $("#notesBodyInput").empty();
        $("#existingNotes").empty();
      });

    $("#noteBox").hide();
  });
});