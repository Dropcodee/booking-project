function dateConvert(date) {
  var date_new = new Date(date).toLocaleString();
  return date_new;
}

function timeago(date) {
  var seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (Math.round(seconds / (60 * 60 * 24 * 365.25)) >= 2)
    return Math.round(seconds / (60 * 60 * 24 * 365.25)) + " years ago";
  else if (Math.round(seconds / (60 * 60 * 24 * 365.25)) >= 1)
    return "1 year ago";
  else if (Math.round(seconds / (60 * 60 * 24 * 30.4)) >= 2)
    return Math.round(seconds / (60 * 60 * 24 * 30.4)) + " months ago";
  else if (Math.round(seconds / (60 * 60 * 24 * 30.4)) >= 1)
    return "1 month ago";
  else if (Math.round(seconds / (60 * 60 * 24 * 7)) >= 2)
    return Math.round(seconds / (60 * 60 * 24 * 7)) + " weeks ago";
  else if (Math.round(seconds / (60 * 60 * 24 * 7)) >= 1) return "1 week ago";
  else if (Math.round(seconds / (60 * 60 * 24)) >= 2)
    return Math.round(seconds / (60 * 60 * 24)) + " days ago";
  else if (Math.round(seconds / (60 * 60 * 24)) >= 1) return "1 day ago";
  else if (Math.round(seconds / (60 * 60)) >= 2)
    return Math.round(seconds / (60 * 60)) + " hours ago";
  else if (Math.round(seconds / (60 * 60)) >= 1) return "1 hour ago";
  else if (Math.round(seconds / 60) >= 2)
    return Math.round(seconds / 60) + " minutes ago";
  else if (Math.round(seconds / 60) >= 1) return "1 minute ago";
  else if (seconds >= 2) return seconds + " seconds ago";
  else return seconds + "1 second ago";
} /*]]>*/
$(() => {
  $("#loading").hide();
  $("#search").keyup(e => {
    e.preventDefault();
    let search = $("#search").val();
    if (search !== "") {
      if (search.length > 2) {
        if (
          e.keyCode !== 13 &&
          e.keyCode !== 16 &&
          e.keyCode !== 17 &&
          e.keyCode !== 18 &&
          e.keyCode !== 20 &&
          e.keyCode !== 33 &&
          e.keyCode !== 34 &&
          e.keyCode !== 35 &&
          e.keyCode !== 36 &&
          e.keyCode !== 37 &&
          e.keyCode !== 38 &&
          e.keyCode !== 39 &&
          e.keyCode !== 112 &&
          e.keyCode !== 113 &&
          e.keyCode !== 114 &&
          e.keyCode !== 115 &&
          e.keyCode !== 116 &&
          e.keyCode !== 117 &&
          e.keyCode !== 118 &&
          e.keyCode !== 119 &&
          e.keyCode !== 120 &&
          e.keyCode !== 121 &&
          e.keyCode !== 122 &&
          e.keyCode !== 123 &&
          e.keyCode !== 144
        ) {
          $("#loading").show();
          $("#student__info").hide();
          $.ajax({
            method: "GET",
            url: `http://localhost:8080/revo/server/public/students/search/${search}`,
            cache: false,
            success: response => {
              $("#loading").hide();
              $("#student__info").show();
              var searchResult = JSON.parse(response);
              var finalResult = "";
              if (searchResult.error) {
                $("#student__info").html(`
                <div>
                  <div class="uk-card uk-card-default uk-card-hover uk-card-body card__user">
                    <h3 class="uk-card-title">
                      <img src="../img/avatar-gold.png" alt="" />
                    </h3>
                    <p>
                      <span uk-icon="icon: user" id="details__text"></span> USERNAME:
                      <span>${searchResult.error.err_text}</span>
                    </p>
                  </div>
                </div>
              `);
              } else {
                searchResult.forEach(searchResult => {
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
                    <div class="uk-card uk-card-default uk-card-hover uk-card-body card__user">
                      <h3 class="uk-card-title">
                        <img src="http://localhost:8080/revo/faces/${reg_no}.JPG" alt="" width="100" class=""/>
                      </h3>
                      <p>
                        <span uk-icon="icon: user" id="details__text"></span> Name:
                        <span>${name}</span>
                      </p>
                      <p>
                      <span uk-icon="icon: database" id="details__text"></span> Reg No:
                      <span>${reg_no}</span>
                      </p>
                      <p>
                        <span uk-icon="icon: database" id="details__text"></span> Matric
                        No: <span>${matric}</span>
                      </p>
                      <p>
                        <span uk-icon="icon: database" id="details__text"></span> Department:
                        <span>${dept}</span>
                      </p>
                      <button
                        id="${reg_no}"
                        class="uk-button uk-button-danger rounded"
                        uk-toggle="target: #book__now"
                      >
                        Book Student
                      </button>
                    </div>
                  </div>
                `;
                  $(document).on("click", `#${reg_no}`, e => {
                    e.preventDefault();
                    $(`#${reg_no}`).html("<div uk-spinner></div>");
                    $.ajax({
                      method: "GET",
                      url: `http://localhost:8080/revo/server/public/offense/${reg_no}`,
                      cache: false,
                      success: data => {
                        $(`#${reg_no}`).html("Book Student");
                        var data = JSON.parse(data);
                        var offenseOutput = `
                        <div class="uk-modal-dialog">
                          <button class="uk-modal-close-full uk-close-large" type="button" uk-close></button>
                          <div class="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle" uk-grid uk-overflow-auto>
                            <div class="uk-background-cover" uk-height-viewport uk-overflow-auto>
                              <div class="uk-card-default card__hover uk-card-body">
                                <div class="avatar__wrapper uk-flex-center">
                                  <img src="http://localhost:8080/revo/faces/${reg_no}.JPG" alt="" />
                                </div>
                                <header>
                                  <div class="">
                                  <a href="#" id="profile__${reg_no}">View Profile</a>
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
                                    <span id="details__text">REG NO:</span>${reg_no}
                                  </div>
                                  <div class="user__data">
                                    <span uk-icon="icon: database" id="details__text"></span>
                                    <span id="details__text">MATRIC NO:</span>
                                    <span>${matric}</span>
                                  </div>
                                  <div class="user__data">
                                    <span uk-icon="icon: database" id="details__text"></span>
                                    <span id="details__text">DEPARTMENT:</span>${dept}
                                  </div>
                                </div>
                                <header id="offence__header">
                                  <h1 class="uk-flex-center uk-heading-bullet">
                                    <span uk-icon="icon: user" id="details__text"></span>
                                    Student's Offences.
                                  </h1>
                                  <hr id="custom__divider" />
                                </header>
                        `;
                        $(document).on("click", `#profile__${reg_no}`, () => {
                          if (localStorage.getItem("reg_no") == null) {
                            localStorage.setItem("reg_no", reg_no);
                            location.href = "user.php";
                          } else if (localStorage.getItem("reg_no") != null) {
                            localStorage.removeItem("reg_no");
                            localStorage.setItem("reg_no", reg_no);
                            location.href = "user.php";
                          }
                        });
                        if (data.error) {
                          offenseOutput += `
                            <div class="user__info uk-flex-center" uk-grid>
                            <div class="user__data">
                              <span uk-icon="icon: history" id="details__text"></span>
                              <span class="" id="details__text">OFFENSE</span>
                              <span> ${data.error.err_text}</span>
                            </div>
                          </div>
                        `;
                          $("#book__now").html(offenseOutput);
                        } else {
                          data.forEach((offenseResult, key) => {
                            var offense = offenseResult.offense,
                              punishment = offenseResult.punishment,
                              category = offenseResult.category,
                              status = offenseResult.status,
                              created = offenseResult.created;
                            offenseOutput += `
                            <div class="user__info uk-flex-center" uk-grid>
                              <div class="user__data">
                              <strong>${key}</strong>
                                <span class="" id="details__text">OFFENSE:</span>
                                <span> ${offense}</span>
                              </div>
                              <div class="user__data">
                                <span id="details__text">PUNISHMENT:</span>
                                <span>${
                                  punishment == ""
                                    ? "No punishment yet"
                                    : punishment
                                }</span>
                              </div>
                              <div class="user__data">
                                <span uk-icon="icon: list" id="details__text"></span>
                                <span id="details__text">CATEGORY:</span>${category}
                              </div>
                              <div class="user__data">
                                <span uk-icon="icon: bolt" id="details__text"></span>
                                <span id="details__text">STATUS:</span><span title="It hasn't been processed" uk-tooltip>${status}</span>
                              </div>
                              <div class="user__data">
                                <span uk-icon="icon: calendar" id="details__text"></span>
                                <span id="details__text">DATE:</span><span title="${timeago(
                                  created
                                )}" uk-tooltip>${dateConvert(created)}</span>
                              </div>
                            </div>
                          `;
                          });
                        }
                        offenseOutput += `    
                        </div>
                      </div>
                      <div class="uk-padding-large">
                      <span>
                        <h2 class="uk-heading-divider" style="color:#fff">OFFENCE FORM...</h2>
                          <div class="uk-margin">
                            <div class="uk-inline uk-width-1-1">
                              <label class="uk-form-label" for="newOffense" style="color:#fff">Offenses</label>
                              <div class="uk-form-controls">
                                <select class="uk-select uk-form-width-large" id="newOffense">
                                  <option value="">Select type of Offense</option>
                                  <option value="Pairing">Pairing</option>
                                  <option value="Stealing">Stealing</option>
                                  <option value="Drug Abuse">Drug Abuse</option>
                                  <option value="Chapel Voliation">Chapel Voliation</option>
                                  <option value="Dress Code Voliation">Dress Code Voliation</option>
                                </select>
                              </div>
                            </div>
                          </div>
  
                          <div class="uk-margin ">
                            <div class="uk-inline uk-width-1-1">
                              <label class="uk-form-label" for="newCategory" style="color:#fff">Category</label>
                              <div class="uk-form-controls">
                                <select class="uk-select uk-form-width-large" id="newCategory">
                                  <option value="">Select Category</option>
                                  <option value="A">A</option>
                                  <option value="B">B</option>
                                  <option value="C">C</option>
                                  <option value="D">D</option>
                                </select>
                              </div>
                            </div>
                          </div>
  
                          <div class="uk-margin ">
                            <div class="uk-inline uk-width-1-1">
                              <label class="uk-form-label" for="newCategory" style="color:#fff">Member report</label>
                              <div class="uk-form-controls">
                               <textarea class="uk-textarea" id="report" max-length="250"></textarea>
                              </div>
                            </div>
                          </div>
                          <button class="uk-button rounded" id="bookStudent" style="background-color:#2E7D32 !important; color:#fff">
                            Submit Form
                          </button>
                          </span>
                      </div>
                      `;
                        $("#book__now").html(offenseOutput);
                        $("#bookStudent").click(() => {
                          var newOffense = $("#newOffense").val();
                          var newCategory = $("#newCategory").val();
                          var report = $("#report").val();
                          if (newCategory !== "" && newOffense !== "") {
                            UIkit.modal
                              .confirm(`Are you sure you want to book ${name}?`)
                              .then(
                                () => {
                                  $(`#${reg_no}`).html(
                                    "<div uk-spinner></div>"
                                  );
                                  $.ajax({
                                    method: "POST",
                                    url:
                                      "http://localhost:8080/revo/server/public/book",
                                    data: {
                                      reg_no: reg_no,
                                      offense: newOffense,
                                      category: newCategory,
                                      member_report: report
                                    },
                                    cache: false,
                                    success: result => {
                                      result = JSON.parse(result);
                                      $(`#${reg_no}`).html("Book Student");
                                      if (result.error) {
                                        UIkit.modal.alert(
                                          result.error.err_text
                                        );
                                      } else {
                                        UIkit.modal.alert(
                                          `${name} has been booked successfully`
                                        );
                                      }
                                    },
                                    error: () => {
                                      $(`#${reg_no}`).html("Book Student");
                                      UIkit.modal.alert(
                                        "Couldn't connect to server"
                                      );
                                    }
                                  });
                                },
                                () => {
                                  $(`#${reg_no}`).html("Book Student");
                                }
                              );
                          } else {
                            UIkit.notification({
                              message: "All Fields Required!",
                              status: "danger",
                              pos: "top-center",
                              timeout: 5000
                            });
                            $("#bookStudent").addClass("uk-animation-shake");
                          }
                        });
                      },
                      error: () => {
                        $(`#${reg_no}`).html("Book Student");
                        UIkit.notification({
                          message: "Sorry we couldn't connect to server",
                          status: "warning",
                          pos: "top-right",
                          timeout: 5000
                        });
                      }
                    });
                  });
                });
                $("#student__info").html(finalResult);
              }
            },
            error: () => {
              $("#loading").hide();
              $("#student__info").show();
              UIkit.notification({
                message: "Sorry we couldn't connect to server",
                status: "warning",
                pos: "top-right",
                timeout: 5000
              });
            }
          });
        }
      }
    } else {
      $("#student__info").show();
    }
  });
});
