$(document).ready(function () {
  $("#addTask").click(function (e) {
    e.preventDefault();

    let text = $("#taskInput").val();

    if (text !== "") {
      let li = $("<li>");
      let p = $("<p>").text(text);
      let checkbox = $("<input>").attr("type", "checkbox");
      let editBtn = $("<button>")
        .append('<i class="fas fa-pencil-alt"></i>')
        .addClass("btn-edit");
      let deleteBtn = $("<button>")
        .append('<i class="fas fa-trash-alt"></i>')
        .addClass("btn-delete");

      li.append(p);
      li.append(checkbox);
      li.append(editBtn);
      li.append(deleteBtn);
      $("ul").append(li);

      $("#taskInput").val("");
      $(".empty").hide();
    }
  });

  $(document).on("click", ".btn-delete", function () {
    // se agraga sweetalert2 para confirmar la eliminacion
    Swal.fire({
      title: "Estas seguro?",
      text: "No podras revertir cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!",
    }).then((result) => {
      if (result.isConfirmed) {
        $(this).closest("li").remove();
        if ($("li").length === 0) {
          $(".empty").show();
        }
        Swal.fire({
          title: "Borrado!",
          text: "Tu tarea fue eliminada.",
          icon: "success",
        });
      }
    });
  });

  $(document).on("click", ".btn-edit", function () {
    // Obtener el parrafo (p) que contiene el texto de la tarea
    let p = $(this).siblings("p");

    // Crear un input de tipo texto con el texto actual como valor predeterminado
    let input = $("<input>")
      .attr("type", "text")
      .val(p.text())
      .addClass("inp_text");

    // Reemplazar el párrafo (p) con el input
    p.replaceWith(input);

    // Seleccionar el input y enfocarlo automáticamente
    input.focus();

    // Al presionar Enter en el input
    input.keypress(function (e) {
      if (e.which === 13) {
        // Código de tecla Enter
        // Obtener el nuevo texto del input
        let newText = $(this).val();

        // Si el nuevo texto no está vacío
        if (newText.trim() !== "") {
          // Crear un nuevo párrafo con el nuevo texto
          let newP = $("<p>").text(newText);

          // Reemplazar el input con el nuevo párrafo
          $(this).replaceWith(newP);
        }
      }
    });

    // Al hacer clic fuera del input
    input.blur(function () {
      // Obtener el nuevo texto del input
      let newText = $(this).val();

      // Si el nuevo texto no está vacío
      if (newText.trim() !== "") {
        // Crear un nuevo párrafo con el nuevo texto
        let newP = $("<p>").text(newText);

        // Reemplazar el input con el nuevo párrafo
        $(this).replaceWith(newP);
      }
    });
  });

  // Al hacer clic en un checkbox
  $(document).on("change", 'input[type="checkbox"]', function () {
    let task = $(this).siblings("p");
    if ($(this).is(":checked")) {
      // Si el checkbox está marcado
      task.css("text-decoration", "line-through"); // Tachar el texto de la tarea
    } else {
      task.css("text-decoration", "none"); // Quitar el tachado del texto de la tarea
    }
  });
});
