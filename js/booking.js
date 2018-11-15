$(() => {
  $("#loading").hide();
  $("#search").keyup(e => {
    e.preventDefault();
    let search = $("#search").val();
    if (search !== "") {
      if (search.length > 2) {
        $("#loading").show();
        $.ajax({
          method: "GET",
          url: `http://localhost:8080/revo/server/public/students/search/${search}`,
          cache: false,
          success: response => {
            $("#loading").hide();
            var searchResult = JSON.parse(response);
            var finalResult = "";
            if (searchResult.error) {
              $("#student__info").html(`
                <div>
                <div
                  class="uk-card uk-card-default uk-card-hover uk-card-body card__user"
                >
                  <h3 class="uk-card-title">
                    <img src="../img/avatar-gold.png" alt="" />
                  </h3>
                  <p>
                    <span uk-icon="icon: user" id="details__text"></span> USERNAME:
                    <span>${searchResult.error.err_text}</span>
                  </p>
                </div>
              </div>`);
              console.log(searchResult.error.err_text);
            } else {
              searchResult.forEach((searchResult, key) => {
                let name = searchResult.name,
                  reg_no = searchResult.reg_no,
                  matric = searchResult.matric,
                  face = searchResult.face,
                  webmail = searchResult.webmail,
                  dept = searchResult.dept,
                  hall = searchResult.hall,
                  room = searchResult.room;
                finalResult += `
              <div>
              <div
                class="uk-card uk-card-default uk-card-hover uk-card-body card__user"
              >
                <h3 class="uk-card-title">
                  <img src="${face}" alt="" width="100"/>
                </h3>
                <p>
                  <span uk-icon="icon: user" id="details__text"></span> Name:
                  <span>${name}</span>
                </p>
                <p>
                  <span uk-icon="icon: database" id="details__text"></span> Matric
                  No: <span>${matric}</span>
                </p>
                <p>
                  <span uk-icon="icon: database" id="details__text"></span> Reg No:
                  <span>${reg_no}</span>
                </p>
                <button
                  class="uk-button uk-button-danger rounded"
                  uk-toggle="target: #book__now"
                >
                  Book Student
                </button>
              </div>
            </div>
            <!-- STUDENT BOOKING MODAL PAGE -->
            <div id="book__now" class="uk-modal-full" uk-modal>
              <div class="uk-modal-dialog">
                <button
                  class="uk-modal-close-full uk-close-large"
                  type="button"
                  uk-close
                ></button>
                <div
                  class="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle"
                  uk-grid
                  uk-overflow-auto
                >
              <div class="uk-background-cover" uk-height-viewport>
                <div class="uk-card-default card__hover uk-card-body">
                  <div class="avatar__wrapper uk-flex-center">
                    <img src="../img/avatar-gold.png" alt="" />
                  </div>
                  <header>
                    <div class="">
                      <h1 class="uk-flex-center uk-heading-bullet">
                        <span uk-icon="icon: user" id="details__text"></span>
                        Student's Bio Data.
                      </h1>
                      <hr id="custom__divider" />
                    </div>
                  </header>
                  <div class="user__info uk-flex-center" uk-grid>
                    <div class="user__data">
                      <span uk-icon="icon: user" id="details__text"></span>
                      <span class="" id="details__text">FULL NAME:</span>
                      <span>${name}</span>
                    </div>
                    <div class="user__data">
                      <span uk-icon="icon: database" id="details__text"></span>
                      <span id="details__text">MATRIC NO:</span>
                      <span>${matric}</span>
                    </div>
                    <div class="user__data">
                      <span uk-icon="icon: database" id="details__text"></span>
                      <span id="details__text">REG NO:</span>${reg_no}
                    </div>
                    <div class="user__data">
                      <span uk-icon="icon: database" id="details__text"></span>
                      <span id="details__text">HALL OF RESIDENCE:</span>${hall} ${room}
                    </div>
                  </div>

                  <header id="offence__header">
                    <div class="">
                      <h1 class="uk-flex-center uk-heading-bullet">
                        <span uk-icon="icon: user" id="details__text"></span>
                        Student's Offences.
                      </h1>
                      <hr id="custom__divider" />
                    </div>
                  </header>
                  ${
                    searchResult.offense !== null
                      ? `<div class="user__info uk-flex-center" uk-grid>
                  <div class="user__data">
                    <span uk-icon="icon: user" id="details__text"></span>
                    <span class="" id="details__text">FULL NAME:</span>
                    <span> ${name}</span>
                  </div>
                  <div class="user__data">
                    <span uk-icon="icon: database" id="details__text"></span>
                    <span id="details__text">MATRIC NO:</span>
                    <span>${matric}</span>
                  </div>
                  <div class="user__data">
                    <span uk-icon="icon: database" id="details__text"></span>
                    <span id="details__text">REG NO:</span>${reg_no}
                  </div>
                  <div class="user__data">
                    <span uk-icon="icon: database" id="details__text"></span>
                    <span id="details__text">HALL OF RESIDENCE:</span>${hall} ${room}
                  </div>
                </div>`
                      : "No offense yet"
                  }
                  
                </div>
              </div>
              <div class="uk-padding-large">
                <h2 class="uk-heading-divider ">OFFENCE FORM...</h2>
                <form>
                  <div class="uk-margin">
                    <div class="uk-inline uk-width-1-1">
                      <span
                        class="uk-form-icon uk-form-icon-flip"
                        uk-icon="icon: user"
                      ></span>
                      <input
                        class="uk-input"
                        type="text"
                        placeholder="Enter Username"
                      />
                    </div>
                  </div>

                  <div class="uk-margin ">
                    <div class="uk-inline uk-width-1-1">
                      <span
                        class="uk-form-icon uk-form-icon-flip"
                        uk-icon="icon: lock"
                      ></span>
                      <input
                        class="uk-input"
                        type="text"
                        placeholder="Enter Password"
                      />
                    </div>
                  </div>
                  <button class="uk-button uk-button-danger rounded">
                    Submit Form
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      <!-- STUDENT BOOKING MODAL PAGE -->`;
              });
              $("#student__info").html(finalResult);
            }
          },
          error: () => {
            $("#loading").hide();
            UIkit.notification({
              message: "Sorry we couldn't connect to server",
              status: "warning",
              pos: "top-right",
              timeout: 5000
            });
          }
        });
      }
    } else {
      $("#student__info").html(`
      <div>
      <div
        class="uk-card uk-card-default uk-card-hover uk-card-body card__user"
      >
        <h3 class="uk-card-title">
          <img src="../img/avatar-gold.png" alt="" />
        </h3>
        <p>
          <span uk-icon="icon: user" id="details__text"></span> USERNAME:
          <span>John Doe</span>
        </p>
        <p>
          <span uk-icon="icon: database" id="details__text"></span> Matric
          No: <span>15AC009899</span>
        </p>
        <p>
          <span uk-icon="icon: database" id="details__text"></span> Reg No:
          <span>1500324</span>
        </p>
        <button
          class="uk-button uk-button-danger rounded"
          uk-toggle="target: #book__now"
        >
          Book Student
        </button>
      </div>
    </div>
      <div>
      <div
        class="uk-card uk-card-default uk-card-hover uk-card-body card__user"
      >
        <h3 class="uk-card-title">
          <img src="../img/avatar-gold.png" alt="" />
        </h3>
        <p>
          <span uk-icon="icon: user" id="details__text"></span> USERNAME:
          <span>John Doe</span>
        </p>
        <p>
          <span uk-icon="icon: database" id="details__text"></span> Matric
          No: <span>15AC009899</span>
        </p>
        <p>
          <span uk-icon="icon: database" id="details__text"></span> Reg No:
          <span>1500324</span>
        </p>
        <button
          class="uk-button uk-button-danger rounded"
          uk-toggle="target: #book__now"
        >
          Book Student
        </button>
      </div>
    </div>
      <div>
      <div
        class="uk-card uk-card-default uk-card-hover uk-card-body card__user"
      >
        <h3 class="uk-card-title">
          <img src="../img/avatar-gold.png" alt="" />
        </h3>
        <p>
          <span uk-icon="icon: user" id="details__text"></span> USERNAME:
          <span>John Doe</span>
        </p>
        <p>
          <span uk-icon="icon: database" id="details__text"></span> Matric
          No: <span>15AC009899</span>
        </p>
        <p>
          <span uk-icon="icon: database" id="details__text"></span> Reg No:
          <span>1500324</span>
        </p>
        <button
          class="uk-button uk-button-danger rounded"
          uk-toggle="target: #book__now"
        >
          Book Student
        </button>
      </div>
    </div>
      <div>
      <div
        class="uk-card uk-card-default uk-card-hover uk-card-body card__user"
      >
        <h3 class="uk-card-title">
          <img src="../img/avatar-gold.png" alt="" />
        </h3>
        <p>
          <span uk-icon="icon: user" id="details__text"></span> USERNAME:
          <span>John Doe</span>
        </p>
        <p>
          <span uk-icon="icon: database" id="details__text"></span> Matric
          No: <span>15AC009899</span>
        </p>
        <p>
          <span uk-icon="icon: database" id="details__text"></span> Reg No:
          <span>1500324</span>
        </p>
        <button
          class="uk-button uk-button-danger rounded"
          uk-toggle="target: #book__now"
        >
          Book Student
        </button>
      </div>
    </div>
    `);
    }
  });
});
