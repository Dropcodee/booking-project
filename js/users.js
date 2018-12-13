$(() => {
  $("#display__users").html("<h4>Loading....</h4>");
  axios
    .get("http://localhost:8080/revo/server/public/users")
    .then(result => {
      var result = result.data;
      if (result.error) {
        $("#display__users").html("<h4><center>No user found</center></h4>");
      } else {
        let output = "",
          modal = "";
        result.forEach((user, key) => {
          let id = key + 1,
            username = user.username,
            user_id = user.user_id,
            position = user.position,
            name = user.name,
            webmail = user.webmail;
          output += `
            <tr>
              <td>${id}</td>
              <td>Avatar</td>
              <td>${name}</td>
              <td>${username}</td>
              <td>${position}</td>
              <td>${webmail}</td>
              <td>
                <a href="#edit_${user_id}" uk-toggle>
                  <span uk-icon="file-edit" id="icon__success"></span>
                </a>
              </td>
              <td>
                <a href="#delete_${user_id}" uk-toggle>
                  <span uk-icon="trash" id="icon__danger"></span>
                </a>
              </td>
            </tr>
            `;
          modal += `<!-- MODALS FOR EDITING NEW MEMBERS OR DELETING EXISTING MEMBERS -->
            <div id="edit_${user_id}" uk-modal>
              <div class="uk-modal-dialog uk-modal-body">
                <div class="uk-card uk-card-body uk-flex-center">
                  <img class="uk-card-title avatar" src="../img/avatar-edit.png" />
                  <form method="POST" autocomplete="off">
                    <div class="uk-margin">
                      <div class="uk-inline">
                        <span
                          class="uk-form-icon uk-form-icon-flip"
                          uk-icon="icon: user"
                        ></span>
                        <input
                          class="uk-input error__input"
                          type="text"
                          id="username__${user_id}"
                          placeholder="Edit ${username} username"
                        />
                      </div>
                    </div>
                    <div class="uk-margin">
                      <div class="uk-inline">
                        <select class="uk-select uk-form-large" id="position_${user_id}">
                          <option value="Member">Member</option>
                          <option value="Commander">Commander</option>
                          <option value="Commandant">Commandant</option>
                          <option value="Secetary">Secetary</option>
                        </select>
                      </div>
                    </div>
                    <div class="uk-margin">
                      <div class="uk-inline">
                        <span
                          class="uk-form-icon uk-form-icon-flip"
                          uk-icon="icon: lock"
                        ></span>
                        <input
                          class="uk-input"
                          type="password"
                          id="password_${user_id}"
                          placeholder="Password"
                        />
                      </div>
                    </div>
                    <div class="uk-margin">
                      <div class="uk-inline">
                        <span
                          class="uk-form-icon uk-form-icon-flip"
                          uk-icon="icon: lock"
                        ></span>
                        <input
                          class="uk-input error__input"
                          type="password"
                          id="confirmPassword_${user_id}"
                          placeholder="Re-Enter Password"
                        />
                      </div>
                    </div>
                    <button
                      class="uk-button uk-button lmu__btn__success rounded"
                      uk-icon="icon: pencil"
                      id="edit__${user_id}"
                    >
                      Edit
                    </button>
                  </form>
                </div>
                <button
                  class="uk-button uk-button-default uk-modal-close uk-align-right"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
        
            <div id="delete_${user_id}" uk-modal>
              <div class="uk-modal-dialog uk-modal-body">
                <h2 class="uk-modal-title">DELETE MEMBER</h2>
                <p>ARE YOU SURE YOU SHOULD BE DOING THIS !!!</p>
                <p class="uk-text-right">
                  <button
                    class="uk-button uk-button-default uk-modal-close"
                    type="button"
                    uk-icon="icon: cancel"
                  >
                    Cancel
                  </button>
                  <button
                    class="uk-button uk-button lmu__btn__delete"
                    type="button"
                    uk-icon="icon: trash"
                    id="delete__${user_id}"
                  >
                    Delete
                  </button>
                </p>
              </div>
            </div>
            <!-- MODALS FOR EDITING NEW MEMBERS OR DELETING EXISTING MEMBERS -->`;
          // EDIT A MEMBER
          $(document).on("click", `#edit__${user_id}`, e => {
            e.preventDefault();
            console.log(user_id);
            var username = $(`#username__${user_id}`).val();
            console.log(username);
            var password = $("#password_" + user_id).val();
            var confirmPassword = $("#confirmPassword_" + user_id).val();
            var position = $("#position_" + user_id).val();
            if (username == "") {
              console.error("Username needed");
            } else if (username.length < 4) {
              console.error("Username length");
            } else if (password == "") {
              console.error("Password needed");
            } else if (password.length < 7) {
              console.error("Password length");
            } else if (confirmPassword == "") {
              console.error("Confirm needed");
            } else if (password != confirmPassword) {
              console.error("Confirm password");
            } else if (position == "") {
              console.error("Select a position");
            } else {
              var edited = {
                username: username,
                password: confirmPassword,
                position: position
              };
              axios
                .put(
                  `http://localhost:8080/revo/server/public/edit/${user_id}`,
                  {
                    ...edited
                  }
                )
                .then(result => {
                  data = result.data;
                  if (data.error) {
                    UIkit.modal.alert(`Invalid user id`);
                  } else {
                    $(`#username__${user_id}`).val("");
                    $("#password_" + user_id).val("Member");
                    $("#confirmPassword_" + user_id).val("");
                    $("#position_" + user_id).val("");
                    UIkit.modal.alert(`${username} edited successfully`);
                    axios
                      .get("http://localhost:8080/revo/server/public/users")
                      .then(result => {
                        var result = result.data;
                        if (result.error) {
                          $("#display__users").html(
                            "<h4><center>No user found</center></h4>"
                          );
                        } else {
                          let output = "",
                            modal = "";
                          result.forEach((user, key) => {
                            let id = key + 1,
                              username = user.username,
                              user_id = user.user_id,
                              position = user.position,
                              name = user.name,
                              webmail = user.webmail;
                            output += `
            <tr>
              <td>${id}</td>
              <td>Avatar</td>
              <td>${name}</td>
              <td>${username}</td>
              <td>${position}</td>
              <td>${webmail}</td>
              <td>
                <a href="#edit_${user_id}" uk-toggle>
                  <span uk-icon="file-edit" id="icon__success"></span>
                </a>
              </td>
              <td>
                <a href="#delete_${user_id}" uk-toggle>
                  <span uk-icon="trash" id="icon__danger"></span>
                </a>
              </td>
            </tr>
            `;
                            modal += `<!-- MODALS FOR EDITING NEW MEMBERS OR DELETING EXISTING MEMBERS -->
            <div id="edit_${user_id}" uk-modal>
              <div class="uk-modal-dialog uk-modal-body">
                <div class="uk-card uk-card-body uk-flex-center">
                  <img class="uk-card-title avatar" src="../img/avatar-edit.png" />
                  <form method="POST" autocomplete="off">
                    <div class="uk-margin">
                      <div class="uk-inline">
                        <span
                          class="uk-form-icon uk-form-icon-flip"
                          uk-icon="icon: user"
                        ></span>
                        <input
                          class="uk-input error__input"
                          type="text"
                          id="username__${user_id}"
                          placeholder="Edit ${username} username"
                        />
                      </div>
                    </div>
                    <div class="uk-margin">
                      <div class="uk-inline">
                        <select class="uk-select uk-form-large" id="position_${user_id}">
                          <option value="Member">Member</option>
                          <option value="Commander">Commander</option>
                          <option value="Commandant">Commandant</option>
                          <option value="Secetary">Secetary</option>
                        </select>
                      </div>
                    </div>
                    <div class="uk-margin">
                      <div class="uk-inline">
                        <span
                          class="uk-form-icon uk-form-icon-flip"
                          uk-icon="icon: lock"
                        ></span>
                        <input
                          class="uk-input"
                          type="password"
                          id="password_${user_id}"
                          placeholder="Password"
                        />
                      </div>
                    </div>
                    <div class="uk-margin">
                      <div class="uk-inline">
                        <span
                          class="uk-form-icon uk-form-icon-flip"
                          uk-icon="icon: lock"
                        ></span>
                        <input
                          class="uk-input error__input"
                          type="password"
                          id="confirmPassword_${user_id}"
                          placeholder="Re-Enter Password"
                        />
                      </div>
                    </div>
                    <button
                      class="uk-button uk-button lmu__btn__success rounded"
                      uk-icon="icon: pencil"
                      id="edit__${user_id}"
                    >
                      Edit
                    </button>
                  </form>
                </div>
                <button
                  class="uk-button uk-button-default uk-modal-close uk-align-right"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
        
            <div id="delete_${user_id}" uk-modal>
              <div class="uk-modal-dialog uk-modal-body">
                <h2 class="uk-modal-title">DELETE MEMBER</h2>
                <p>ARE YOU SURE YOU SHOULD BE DOING THIS !!!</p>
                <p class="uk-text-right">
                  <button
                    class="uk-button uk-button-default uk-modal-close"
                    type="button"
                    uk-icon="icon: cancel"
                  >
                    Cancel
                  </button>
                  <button
                    class="uk-button uk-button lmu__btn__delete"
                    type="button"
                    uk-icon="icon: trash"
                    id="delete__${user_id}"
                  >
                    Delete
                  </button>
                </p>
              </div>
            </div>
            <!-- MODALS FOR EDITING NEW MEMBERS OR DELETING EXISTING MEMBERS -->`;
                          });
                          $("#display__users").html(output);
                          $("#show__modal").html(modal);
                        }
                      })
                      .catch(() => {
                        console.log("Error");
                      });
                  }
                })
                .catch(err => {
                  console.error(err);
                });
            }
          });

          // DELETE A MEMBER
          $(document).on("click", `#delete__${user_id}`, e => {
            e.preventDefault();
            axios
              .delete(
                `http://localhost:8080/revo/server/public/delete/${user_id}`
              )
              .then(result => {
                data = result.data;
                if (data.error) {
                  UIkit.modal.alert(`Invalid user id`);
                } else {
                  UIkit.modal.alert(`${username} deleted successfully`);
                  axios
                    .get("http://localhost:8080/revo/server/public/users")
                    .then(result => {
                      var result = result.data;
                      if (result.error) {
                        $("#display__users").html(
                          "<h4><center>No user found</center></h4>"
                        );
                      } else {
                        let output = "",
                          modal = "";
                        result.forEach((user, key) => {
                          let id = key + 1,
                            username = user.username,
                            user_id = user.user_id,
                            position = user.position,
                            name = user.name,
                            webmail = user.webmail;
                          output += `
                            <tr>
                              <td>${id}</td>
                              <td>Avatar</td>
                              <td>${name}</td>
                              <td>${username}</td>
                              <td>${position}</td>
                              <td>${webmail}</td>
                              <td>
                                <a href="#edit_${user_id}" uk-toggle>
                                  <span uk-icon="file-edit" id="icon__success"></span>
                                </a>
                              </td>
                              <td>
                                <a href="#delete_${user_id}" uk-toggle>
                                  <span uk-icon="trash" id="icon__danger"></span>
                                </a>
                              </td>
                            </tr>
                          `;
                          modal += `
                          <!-- MODALS FOR EDITING NEW MEMBERS OR DELETING EXISTING MEMBERS -->
                          <div id="edit_${user_id}" uk-modal>
                            <div class="uk-modal-dialog uk-modal-body">
                              <div class="uk-card uk-card-body uk-flex-center">
                                <img class="uk-card-title avatar" src="../img/avatar-edit.png" />
                                <form method="POST" autocomplete="off">
                                  <div class="uk-margin">
                                    <div class="uk-inline">
                                      <span
                                        class="uk-form-icon uk-form-icon-flip"
                                        uk-icon="icon: user"
                                      ></span>
                                      <input
                                        class="uk-input error__input"
                                        type="text"
                                        id="username__${user_id}"
                                        placeholder="Edit ${username} username"
                                      />
                                    </div>
                                  </div>
                                  <div class="uk-margin">
                                    <div class="uk-inline">
                                      <select class="uk-select uk-form-large" id="position_${user_id}">
                                        <option value="Member">Member</option>
                                        <option value="Commander">Commander</option>
                                        <option value="Commandant">Commandant</option>
                                        <option value="Secetary">Secetary</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div class="uk-margin">
                                    <div class="uk-inline">
                                      <span
                                        class="uk-form-icon uk-form-icon-flip"
                                        uk-icon="icon: lock"
                                      ></span>
                                      <input
                                        class="uk-input"
                                        type="password"
                                        id="password_${user_id}"
                                        placeholder="Password"
                                      />
                                    </div>
                                  </div>
                                  <div class="uk-margin">
                                    <div class="uk-inline">
                                      <span
                                        class="uk-form-icon uk-form-icon-flip"
                                        uk-icon="icon: lock"
                                      ></span>
                                      <input
                                        class="uk-input error__input"
                                        type="password"
                                        id="confirmPassword_${user_id}"
                                        placeholder="Re-Enter Password"
                                      />
                                    </div>
                                  </div>
                                  <button
                                    class="uk-button uk-button lmu__btn__success rounded"
                                    uk-icon="icon: pencil"
                                    id="edit__${user_id}"
                                  >
                                    Edit
                                  </button>
                                </form>
                              </div>
                              <button
                                class="uk-button uk-button-default uk-modal-close uk-align-right"
                                type="button"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                      
                          <div id="delete_${user_id}" uk-modal>
                            <div class="uk-modal-dialog uk-modal-body">
                              <h2 class="uk-modal-title">DELETE MEMBER</h2>
                              <p>ARE YOU SURE YOU SHOULD BE DOING THIS !!!</p>
                              <p class="uk-text-right">
                                <button
                                  class="uk-button uk-button-default uk-modal-close"
                                  type="button"
                                  uk-icon="icon: cancel"
                                >
                                  Cancel
                                </button>
                                <button
                                  class="uk-button uk-button lmu__btn__delete"
                                  type="button"
                                  uk-icon="icon: trash"
                                  id="delete__${user_id}"
                                >
                                  Delete
                                </button>
                              </p>
                            </div>
                          </div>
                          <!-- MODALS FOR EDITING NEW MEMBERS OR DELETING EXISTING MEMBERS -->
                        `;
                        });
                        $("#display__users").html(output);
                        $("#show__modal").html(modal);
                      }
                    })
                    .catch(() => {
                      console.log("Error");
                    });
                }
              })
              .catch(err => {
                console.error(err);
              });
          });
        });

        $("#display__users").html(output);
        $("#show__modal").html(modal);
      }
    })
    .catch(err => {
      console.log(err);
    });

  // Add NEW Member
  $("#addUser").on("click", e => {
    e.preventDefault();
    let username = $("#username").val(),
      position = $("#position").val(),
      name = $("#name").val(),
      webmail = $("#webmail").val(),
      password = $("#password").val(),
      confirmPassword = $("#confirmPassword").val();
    if (username == "") {
      console.error("Username needed");
    } else if (username.length < 4) {
      console.error("Username length");
    } else if (password == "") {
      console.error("Password needed");
    } else if (password.length < 7) {
      console.error("Password length");
    } else if (confirmPassword == "") {
      console.error("Confirm needed");
    } else if (password != confirmPassword) {
      console.error("Confirm password");
    } else if (position == "") {
      console.error("Select a position");
    } else {
      var newUser = {
        username: username,
        password: confirmPassword,
        position: position,
        name: name,
        webmail: webmail
      };
      axios
        .post(`http://localhost:8080/revo/server/public/add`, {
          ...newUser
        })
        .then(result => {
          data = result.data;
          if (data.error) {
            UIkit.modal.alert(data.error.err_text);
          } else {
            UIkit.modal.alert(`${username} added successfully`);
            axios
              .get("http://localhost:8080/revo/server/public/users")
              .then(result => {
                var result = result.data;
                if (result.error) {
                  $("#display__users").html(
                    "<h4><center>No user found</center></h4>"
                  );
                } else {
                  let output = "",
                    modal = "";
                  result.forEach((user, key) => {
                    let id = key + 1,
                      username = user.username,
                      user_id = user.user_id,
                      position = user.position,
                      name = user.name,
                      webmail = user.webmail;
                    output += `
                            <tr>
                              <td>${id}</td>
                              <td>Avatar</td>
                              <td>${name}</td>
                              <td>${username}</td>
                              <td>${position}</td>
                              <td>${webmail}</td>
                              <td>
                                <a href="#edit_${user_id}" uk-toggle>
                                  <span uk-icon="file-edit" id="icon__success"></span>
                                </a>
                              </td>
                              <td>
                                <a href="#delete_${user_id}" uk-toggle>
                                  <span uk-icon="trash" id="icon__danger"></span>
                                </a>
                              </td>
                            </tr>
                          `;
                    modal += `
                          <!-- MODALS FOR EDITING NEW MEMBERS OR DELETING EXISTING MEMBERS -->
                          <div id="edit_${user_id}" uk-modal>
                            <div class="uk-modal-dialog uk-modal-body">
                              <div class="uk-card uk-card-body uk-flex-center">
                                <img class="uk-card-title avatar" src="../img/avatar-edit.png" />
                                <form method="POST" autocomplete="off">
                                  <div class="uk-margin">
                                    <div class="uk-inline">
                                      <span
                                        class="uk-form-icon uk-form-icon-flip"
                                        uk-icon="icon: user"
                                      ></span>
                                      <input
                                        class="uk-input error__input"
                                        type="text"
                                        id="username__${user_id}"
                                        placeholder="Edit ${username} username"
                                      />
                                    </div>
                                  </div>
                                  <div class="uk-margin">
                                    <div class="uk-inline">
                                      <select class="uk-select uk-form-large" id="position_${user_id}">
                                        <option value="Member">Member</option>
                                        <option value="Commander">Commander</option>
                                        <option value="Commandant">Commandant</option>
                                        <option value="Secetary">Secetary</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div class="uk-margin">
                                    <div class="uk-inline">
                                      <span
                                        class="uk-form-icon uk-form-icon-flip"
                                        uk-icon="icon: lock"
                                      ></span>
                                      <input
                                        class="uk-input"
                                        type="password"
                                        id="password_${user_id}"
                                        placeholder="Password"
                                      />
                                    </div>
                                  </div>
                                  <div class="uk-margin">
                                    <div class="uk-inline">
                                      <span
                                        class="uk-form-icon uk-form-icon-flip"
                                        uk-icon="icon: lock"
                                      ></span>
                                      <input
                                        class="uk-input error__input"
                                        type="password"
                                        id="confirmPassword_${user_id}"
                                        placeholder="Re-Enter Password"
                                      />
                                    </div>
                                  </div>
                                  <button
                                    class="uk-button uk-button lmu__btn__success rounded"
                                    uk-icon="icon: pencil"
                                    id="edit__${user_id}"
                                  >
                                    Edit
                                  </button>
                                </form>
                              </div>
                              <button
                                class="uk-button uk-button-default uk-modal-close uk-align-right"
                                type="button"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                      
                          <div id="delete_${user_id}" uk-modal>
                            <div class="uk-modal-dialog uk-modal-body">
                              <h2 class="uk-modal-title">DELETE MEMBER</h2>
                              <p>ARE YOU SURE YOU SHOULD BE DOING THIS !!!</p>
                              <p class="uk-text-right">
                                <button
                                  class="uk-button uk-button-default uk-modal-close"
                                  type="button"
                                  uk-icon="icon: cancel"
                                >
                                  Cancel
                                </button>
                                <button
                                  class="uk-button uk-button lmu__btn__delete"
                                  type="button"
                                  uk-icon="icon: trash"
                                  id="delete__${user_id}"
                                >
                                  Delete
                                </button>
                              </p>
                            </div>
                          </div>
                          <!-- MODALS FOR EDITING NEW MEMBERS OR DELETING EXISTING MEMBERS -->
                        `;
                  });
                  $("#display__users").html(output);
                  $("#show__modal").html(modal);
                }
              })
              .catch(() => {
                console.log("Error");
              });
            $("#username").val("");
            $("#name").val("");
            $("#webmail").val("");
            $("#position").val("");
            $("#password").val("");
            $("#confirmPassword").val("");
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  });
});

// axios
//   .get("http://localhost:8080/revo/server/public/users")
//   .then(r => {
//     //create Tabulator on DOM element with id "example-table"
//     var table = new Tabulator("#example-table", {
//       height: 205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
//       data: r.data, //assign data to table
//       responsiveLayout: true, //fit columns to width of table (optional)
//       columns: [
//         //Define Table Columns
//         { title: "S/N", field: "id" },
//         { title: "Fullname", field: "name", width: 150 },
//         { title: "Username", field: "username" },
//         { title: "Position", field: "position" },
//         { title: "Webmail", field: "webmail" },
//         {
//           title: "Example",
//           field: "example",
//           formatter: "lookup",
//           formatterParams: {
//             small: "Cute",
//             medium: "Fine",
//             big: "Scary"
//           }
//         }
//       ],
//       rowClick: function(e, row) {
//         //trigger an alert message when the row is clicked
//         // alert("Row " + row.getData().id + " Clicked!!!!");
//         console.log(row);
//       }
//     });
//     var rows = table.searchRows("name", ">", 12);
//   })
//   .catch(e => {
//     console.log(e);
//   });
