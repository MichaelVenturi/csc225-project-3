jQuery(document).ready(function ($) {
  $("#listing").html("<div class='col bg-dark text-light'>loading...</div>");
  const request = axios.get("https://csc225.mockable.io/consoles");
  request.then(function (response) {
    const consoles = response.data;
    const consolesHtml = consoles
      .map(function (x) {
        const { id, name, image } = x;
        return `
        
          <div class="col bg-dark text-light border border-light hover" data-id="${id}" id="console">${name}</div>
          
        
        `;
      })
      .join("");
    $("#listing").html(consolesHtml);
  });

  $("#listing").on("click", "#console", function () {
    const id = $(this).attr("data-id");
    console.log(id);
    const consoleUrl = `http://csc225.mockable.io/consoles/${id}`;
    $("#details").html("loading...");
    const request = axios.get(consoleUrl);
    request
      .then(function (response) {
        const { id, name, price, country, releaseYear, image } = response.data;
        $("#details").html(
          `
        <div class="card" style="width: 18rem">
        <img
          class="card-img-top"
          src="${image}"
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <div class="card-text">
            <ul class="list-style">
              <li>Price: ${price}</li>
              <li>Country: ${country}</li>
              <li>Year released: ${releaseYear}</li>
            </ul>
          </div>
        </div>
      </div>
          `
        );
      })
      .catch(function (error) {
        alert("error");
      });
  });
});
