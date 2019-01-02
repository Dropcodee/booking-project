var reg_no = localStorage.getItem("reg_no"),
  oId = localStorage.getItem("oId");
if (oId != null) localStorage.removeItem("oId");
if (reg_no) {
  axios
    .get(`http://localhost:8080/revo/server/public/students/${reg_no}`)
    .then(result => {
      var data = result.data;
      if (data.error) {
        window.location.href = "admin.php";
      } else {
        $("#avatar").html(
          `<img src="http://localhost:8080/revo/faces/${reg_no}.JPG" alt="" />`
        );
        var studentDetailsOutput1 = "",
          studentDetailsOutput2 = "";
        data.forEach(studentDetails => {
          var name = studentDetails.name,
            webmail = studentDetails.webmail,
            matric = studentDetails.matric,
            hall = studentDetails.hall,
            room = studentDetails.room,
            dept = studentDetails.dept;
          studentDetailsOutput1 += `
          <!-- card for each content -->
                <div class="uk-card uk-card-default uk-card-body card__details">
                  <span>
                    <span uk-icon="icon: user"></span> Full Name:
                    <span>${name}</span>
                  </span>
                </div>
                <!-- End of this card -->

                <!-- card for each content -->
                <div class="uk-card uk-card-default uk-card-body card__details">
                  <span>
                    <span uk-icon="icon: home"></span> Department:
                    <span>${dept}</span>
                  </span>
                </div>
                <!-- End of this card -->
          `;
          studentDetailsOutput2 += `
          <!-- card for each content -->
          <div class="uk-card uk-card-default uk-card-body card__details">
            <span>
              <span uk-icon="icon: file-edit"></span> Matric No:
              <span>${matric}</span>
            </span>
          </div>
          <!-- End of this card -->

          <!-- card for each content -->
          <div class="uk-card uk-card-default uk-card-body card__details">
            <span>
              <span uk-icon="icon: file-edit"></span> Reg No:
              <span>${reg_no}</span>
            </span>
          </div>
          <!-- End of this card -->
          `;
        });
        $("#card__details1").html(studentDetailsOutput1);
        $("#card__details2").html(studentDetailsOutput2);

        // GET STUDENT OFFENSE
        axios
          .get(`http://localhost:8080/revo/server/public/offense/${reg_no}`)
          .then(result => {
            var data = result.data,
              processed = "",
              pending = "",
              pend = null,
              proc = null;
            data.forEach(studentOffense => {
              var status = studentOffense.status,
                offense = studentOffense.offense,
                id = studentOffense.id,
                date = studentOffense.created,
                report = studentOffense.member_report;
              if (status == "Processed") {
                proc = status;
                processed += `
                <div class="uk-card uk-card-default uk-card-body card__details" style="cursor:pointer" id="processed__${id}">
                <span title="${timeago(date)}" uk-tooltip>${offense}</span>
                </div>
                `;
                $(document).on("click", `#processed__${id}`, () => {
                  localStorage.setItem("oId", id);
                  location.href = "sdc.php";
                });
              } else if (status == "Pending") {
                pend = status;
                pending += `
                <div>
                  <div class="uk-card uk-card-default uk-card-body card__details">
                    <span title="${timeago(date)}" uk-tooltip>${offense}</span>
                    <a href="#offence-delete_${id}" uk-toggle><span uk-icon="icon: trash"></span></a>
                    <a href="#offence-process_${id}" uk-toggle><span uk-icon="icon: file-edit"></span></a>
                  </div>
                </div>
                <!-- MODALS FOR BOTH DELETE OFFENCE OR PROCESS OFFENCES -->

                <!-- MODAL FOR PROCESSING OFFENCE -->
                <div id="offence-process_${id}" uk-modal>
                  <div class="uk-modal-dialog uk-modal-body">
                    <h2 class="uk-modal-title">PROCESS OFFENCE</h2>
                    <div class="uk-flex-center">
                        <section class="uk-section uk-section-dark section">
                          <p>MEMBER REPORT ON OFFENCE</p>
                          <p>
                            ${report}
                          </p>
                        </section>
                        <div class="uk-margin revo__report">
                          <textarea
                            class="uk-textarea"
                            rows="5"
                            placeholder="Commander / Commandant's Report on the offence for final report"
                            id="commander_report_${id}"
                          ></textarea>
                        </div>
                      </div>

                      <p class="uk-text-right">
                        <button
                          class="uk-button uk-button uk-modal-close lmu__btn__gold"
                          type="button"
                          uk-icon="icon: close"
                        >
                          Cancel
                        </button>
                          <button
                            class="uk-button lmu__btn__success"
                            type="button"
                            uk-icon="icon: check"
                            id="update__offense__${id}"
                          >
                            Proceed
                          </button>
                      </p>
                  </div>
                </div>
                <!-- MODAL FOR PROCESSING OFFENCE -->

                <!-- MODAL FOR DELETEING OFFENCES -->
                <div id="offence-delete_${id}" uk-modal>
                  <div class="uk-modal-dialog uk-modal-body">
                    <h2 class="uk-modal-title">DELETE OFFENCE</h2>
                    <p>ARE YOU SURE YOU SHOULD BE DOING THIS !!!</p>
                    <p class="uk-text-right">
                      <button
                        class="uk-button uk-button uk-modal-close lmu__btn__gold"
                        type="button"
                        uk-icon="icon: close"
                      >
                        Cancel
                      </button>
                      <button
                        class="uk-button lmu__btn__success"
                        type="button"
                        uk-icon="icon: trash"
                        id="delete__offense__${id}"
                      >
                        Delete
                      </button>
                    </p>
                  </div>
                </div>
                <!-- MODAL FOR DELETEING OFFENCES -->
                <!-- MODALS FOR BOTH DELETE OFFENCE OR PROCESS OFFENCES -->
                `;

                // Offense Delete
                $(document).on("click", `#delete__offense__${id}`, e => {
                  axios
                    .delete(
                      `http://localhost:8080/revo/server/public/delete_offense/${id}`
                    )
                    .then(result => {
                      var data = result.data;
                      if (data != false) {
                        UIkit.modal.alert("Offense succesfully deleted");
                        setTimeout(() => {
                          location.reload();
                        }, 3000);
                      }
                    })
                    .catch(err => {
                      UIkit.modal.alert("Couldn't connect to server");
                    });
                });

                // Process Offense
                $(document).on("click", `#update__offense__${id}`, e => {
                  e.preventDefault();
                  var report = $("#commander_report_" + id).val();
                  console.log(report);
                  if (report != "") {
                    if (report.length > 9) {
                      axios
                        .put(
                          `http://localhost:8080/revo/server/public/update_offense/${id}`,
                          { snr_report: report }
                        )
                        .then(result => {
                          var data = result.data;
                          if (data != false) {
                            UIkit.modal.alert("Offense succesfully update");
                            localStorage.setItem("oId", id);
                            setTimeout(() => {
                              location.href = "sdc.php";
                            }, 3000);
                          }
                        })
                        .catch(err => {
                          UIkit.modal.alert("Couldn't connect to server");
                        });
                    }
                  }
                });
              }
            });
            pending +=
              pend == null
                ? `
                <div>
                  <div class="uk-card uk-card-default uk-card-body card__details">
                    Item
                    <a><span uk-icon="icon: trash"></span></a>
                    <a><span uk-icon="icon: file-edit"></span></a>
                  </div>
                </div>
                <div>
                  <div class="uk-card uk-card-default uk-card-body card__details">
                    Item
                    <a><span uk-icon="icon: trash"></span></a>
                    <a><span uk-icon="icon: file-edit"></span></a>
                  </div>
                </div>`
                : "";
            processed +=
              proc == null
                ? `
                <div>
                  <div class="uk-card uk-card-default uk-card-body card__details">
                    Item
                  </div>
                </div>
                <div>
                  <div class="uk-card uk-card-default uk-card-body card__details">
                    Item
                  </div>
                </div>`
                : "";
            $(".pending").html(pending);
            $(".processed").html(processed);
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => {
      window.location.href = "admin.php";
    });
} else {
  window.location.href = "admin.php";
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
}
