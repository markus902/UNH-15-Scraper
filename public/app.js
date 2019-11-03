
$(document).ready(function () {

  $("#noteBox").hide();

  $.getJSON("/articles", function (data) {
    data.forEach(element => {
      let newArticleHeadline = $("<h2>");
      let newArticlelink = $("<a>");
      let newNoteButton = $("<button>");

      newArticleHeadline
        .addClass("articleHeadline")
        .text(element.title)
        .attr("value", element._id);

      newArticlelink
        .addClass("articleLink")
        .text("Go to page ...")
        .attr("href", element.link);

      newNoteButton.addClass("noteButton btn btn-primary")
        .attr("value", element._id)
        .text("Note");

      $("#articles")
        .append(newArticleHeadline)
        .append(newArticlelink)
        .append(newNoteButton);
    });
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

        $("#notes").append(newForm).append(newSaveButton);

        if (data.note) {
          $("#titleinput").val(data.note.title);
          $("#bodyinput").val(data.note.body);
        }
      });
  });

  $(document).on("click", "#saveNote", function () {
    var thisId = $(this).attr("value");
    // console.log(thisId, $("#noteTitleInput").val(), $("#noteBodyInput").val())

    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        title: $("#noteTitleInput").val(),
        body: $("#noteBodyInput").val(),
      }
    })
      .then(function (data) {
        console.log(data);
        $("#notesTitleInput").empty();
        $("#notesBodyInput").empty();
      });

    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
});