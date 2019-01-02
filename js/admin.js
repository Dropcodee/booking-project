$(() => {
  // CHECK LOCALSTORAGE
  if (localStorage.getItem("reg_no") != null) {
    localStorage.removeItem("reg_no");
  }
  // CATEGORY A
  $("#a").on("click", e => {
    var href = $("#a").attr("href");
    axios
      .get(`http://localhost:8080/revo/server/public/booked/${href}`)
      .then(result => {
        var data = result.data,
          outputA = "";
        if (data.error) {
          outputA += `
          <tr>     
            <td>0</td>
            <td>No image</td>
            <td>John Doe</td>
            <td>No registration number</td>
            <td>No matriculation number</td>
            <td>No offense</td>
          </tr>`;
          $("#show__a").html(outputA);
        } else {
          data.forEach((catA, key) => {
            let id = key,
              reg_no = catA.reg_no,
              offense = catA.offense;
            axios
              .get(
                `http://localhost:8080/revo/server/public/students/${reg_no}`
              )
              .then(result => {
                var data = result.data;

                data.forEach(student => {
                  let name = student.name,
                    matric = student.matric,
                    hall = student.hall,
                    room_no = student.room;
                  outputA += `<tr id="${reg_no}" style="cursor:pointer">     
                  <td>${1 + id}</td>
                  <td><img src="http://localhost:8080/revo/faces/${reg_no}.JPG" alt="" id="avatar__img"/></td>
                  <td>${name}</td>
                  <td>${reg_no}</td>
                  <td>${matric}</td>
                  <td>${offense}</td>
              </tr>`;
                });

                $(document).on("click", `#${reg_no}`, e => {
                  e.preventDefault();
                  console.log(reg_no);
                  if (localStorage.getItem("reg_no") == null) {
                    localStorage.setItem("reg_no", reg_no);
                    location.href = "user.php";
                  } else if (localStorage.getItem("reg_no") != null) {
                    localStorage.removeItem("reg_no");
                    localStorage.setItem("reg_no", reg_no);
                    location.href = "user.php";
                  }
                });
                $("#show__a").html(outputA);
              })
              .catch(err => {
                console.log(err);
              });
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
  // END OF CATEGORY A

  // CATEGORY B
  $("#b").on("click", e => {
    var href = $("#b").attr("href");
    axios
      .get(`http://localhost:8080/revo/server/public/booked/${href}`)
      .then(result => {
        var data = result.data,
          outputB = "";
        if (data.error) {
          outputB += `
          <tr>     
            <td>0</td>
            <td>No image</td>
            <td>John Doe</td>
            <td>No registration number</td>
            <td>No matriculation number</td>
            <td>No offense</td>
          </tr>`;
          $("#show__b").html(outputB);
        } else {
          data.forEach((catB, key) => {
            let id = key,
              reg_no = catB.reg_no,
              offense = catB.offense;
            axios
              .get(
                `http://localhost:8080/revo/server/public/students/${reg_no}`
              )
              .then(result => {
                var data = result.data;

                data.forEach(student => {
                  let name = student.name,
                    matric = student.matric,
                    hall = student.hall,
                    room_no = student.room;
                  outputB += `<tr id="${reg_no}" style="cursor:pointer">     
                  <td>${1 + id}</td>
                  <td><img src="http://localhost:8080/revo/faces/${reg_no}.JPG" alt="" id="avatar__img" /></td>
                  <td>${name}</td>
                  <td>${reg_no}</td>
                  <td>${matric}</td>
                  <td>${offense}</td>
              </tr>`;
                });

                $(document).on("click", `#${reg_no}`, e => {
                  e.preventDefault();
                  console.log(reg_no);
                  if (localStorage.getItem("reg_no") == null) {
                    localStorage.setItem("reg_no", reg_no);
                    location.href = "user.php";
                  } else if (localStorage.getItem("reg_no") != null) {
                    localStorage.removeItem("reg_no");
                    localStorage.setItem("reg_no", reg_no);
                    location.href = "user.php";
                  }
                });
                $("#show__b").html(outputB);
              })
              .catch(err => {
                console.log(err);
              });
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
  // END OF CATEGORY B

  // CATEGORY C
  $("#c").on("click", e => {
    var href = $("#c").attr("href");
    axios
      .get(`http://localhost:8080/revo/server/public/booked/${href}`)
      .then(result => {
        var data = result.data,
          outputC = "";
        if (data.error) {
          outputC += `
          <tr>     
            <td>0</td>
            <td>No image</td>
            <td>John Doe</td>
            <td>No registration number</td>
            <td>No matriculation number</td>
            <td>No offense</td>
          </tr>`;
          $("#show__c").html(outputC);
        } else {
          data.forEach((catC, key) => {
            let id = key,
              reg_no = catC.reg_no,
              offense = catC.offense;
            axios
              .get(
                `http://localhost:8080/revo/server/public/students/${reg_no}`
              )
              .then(result => {
                var data = result.data;

                data.forEach(student => {
                  let name = student.name,
                    matric = student.matric,
                    hall = student.hall,
                    room_no = student.room;
                  outputC += `
                  <tr id="${reg_no}" style="cursor:pointer">     
                    <td>${1 + id}</td>
                    <td><img src="http://localhost:8080/revo/faces/${reg_no}.JPG" alt="" id="avatar__img" /></td>
                    <td>${name}</td>
                    <td>${reg_no}</td>
                    <td>${matric}</td>
                    <td>${offense}</td>
                  </tr>`;
                });

                $(document).on("click", `#${reg_no}`, e => {
                  e.preventDefault();
                  console.log(reg_no);
                  if (localStorage.getItem("reg_no") == null) {
                    localStorage.setItem("reg_no", reg_no);
                    location.href = "user.php";
                  } else if (localStorage.getItem("reg_no") != null) {
                    localStorage.removeItem("reg_no");
                    localStorage.setItem("reg_no", reg_no);
                    location.href = "user.php";
                  }
                });
                $("#show__c").html(outputC);
              })
              .catch(err => {
                console.log(err);
              });
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
  // END OF CATEGORY C

  // CATEGORY D
  $("#d").on("click", e => {
    var href = $("#d").attr("href");
    axios
      .get(`http://localhost:8080/revo/server/public/booked/${href}`)
      .then(result => {
        var data = result.data,
          outputD = "";
        if (data.error) {
          outputD += `
          <tr>     
            <td>0</td>
            <td>No image</td>
            <td>John Doe</td>
            <td>No registration number</td>
            <td>No matriculation number</td>
            <td>No offense</td>
          </tr>`;
          $("#show__d").html(outputD);
        } else {
          data.forEach((catD, key) => {
            let id = key,
              reg_no = catD.reg_no,
              offense = catD.offense;
            axios
              .get(
                `http://localhost:8080/revo/server/public/students/${reg_no}`
              )
              .then(result => {
                var data = result.data;

                data.forEach(student => {
                  let name = student.name,
                    matric = student.matric,
                    hall = student.hall,
                    room_no = student.room;
                  outputD += `
                  <tr id="${reg_no}" style="cursor:pointer">     
                    <td>${1 + id}</td>
                    <td><img src="http://localhost:8080/revo/faces/${reg_no}.JPG" alt="" /></td>
                    <td>${name}</td>
                    <td>${reg_no}</td>
                    <td>${matric}</td>
                    <td>${hall}</td>
                    <td>${room_no}</td>
                    <td>${offense}</td>
                  </tr>`;
                });

                $(document).on("click", `#${reg_no}`, e => {
                  e.preventDefault();
                  console.log(reg_no);
                  if (localStorage.getItem("reg_no") == null) {
                    localStorage.setItem("reg_no", reg_no);
                    location.href = "user.php";
                  } else if (localStorage.getItem("reg_no") != null) {
                    localStorage.removeItem("reg_no");
                    localStorage.setItem("reg_no", reg_no);
                    location.href = "user.php";
                  }
                });
                $("#show__d").html(outputD);
              })
              .catch(err => {
                console.log(err);
              });
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
});
// END OF CATEGORY D

// DEFAULT
axios
  .get(`http://localhost:8080/revo/server/public/booked/a`)
  .then(result => {
    var data = result.data,
      outputA = "";
    if (data.error) {
      outputA += `
          <tr>     
            <td>0</td>
            <td>No image</td>
            <td>John Doe</td>
            <td>No registration number</td>
            <td>No matriculation number</td>
            <td>No offense</td>
          </tr>`;
      $("#show__a").html(outputA);
    } else {
      data.forEach((catA, key) => {
        let id = key,
          reg_no = catA.reg_no,
          offense = catA.offense;
        axios
          .get(`http://localhost:8080/revo/server/public/students/${reg_no}`)
          .then(result => {
            var data = result.data;

            data.forEach(student => {
              let name = student.name,
                matric = student.matric,
                hall = student.hall,
                room_no = student.room;
              outputA += `<tr id="${reg_no}" style="cursor:pointer">     
                  <td>${1 + id}</td>
                  <td><img src="http://localhost:8080/revo/faces/${reg_no}.JPG" alt="" id="avatar__img"/></td>
                  <td>${name}</td>
                  <td>${reg_no}</td>
                  <td>${matric}</td>
                  <td>${offense}</td>
              </tr>`;
            });

            $(document).on("click", `#${reg_no}`, e => {
              e.preventDefault();
              if (localStorage.getItem("reg_no") == null) {
                localStorage.setItem("reg_no", reg_no);
                location.href = "user.php";
              } else if (localStorage.getItem("reg_no") != null) {
                localStorage.removeItem("reg_no");
                localStorage.setItem("reg_no", reg_no);
                location.href = "user.php";
              }
            });
            $("#show__a").html(outputA);
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  })
  .catch(err => {
    console.log(err);
  });
