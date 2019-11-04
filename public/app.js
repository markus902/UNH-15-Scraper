// import { get } from "https";

// import { WSAEINVALIDPROVIDER } from "constants";

$(document).ready(function () {

  $("#noteBox").hide();

  $.getJSON("/articles", function (data) {
    let counter = 0
    console.log(data);
    data.forEach(element => {
      let newArticleHeadline = $("<h2>");
      let newDivy = $("<div>");
      let newArticlelink = $("<a>");
      let newNoteTitleButton = $("<button>");

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

      newNoteTitleButton.addClass("noteButton btn btn-primary pl-4 pr-4")
        .attr("value", element._id)
        .text("Note");

      newDivy
        .append(newArticleHeadline)
        .append(newArticlelink)
        .append(newNoteTitleButton);

      $("#articles")
        .append(newDivy);
    });
    counter = 0;
  });

  $("#closeNote").on("click", function () {
    $("#noteBox").hide();
    $("#existingNotes").empty();
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
        console.log(data.note);
        if (data.note) {
          data.note.map((element) => {
            let newNoteTitle = $("<p>");
            newNoteTitle.css("font-weight", "bold").text(element.title);
            let newNoteBody = $("<p>").text(element.body);
            let newLine = $("<hr>");
            newNoteBody.text(element.body);
            $("#existingNotes").append(newNoteTitle).append(newNoteBody).append(newLine);

          });
        } else {
          newNoteTitle.text("There are no notes for this article.")
          $("#existingNotes").append(newNoteTitle)
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