$(() => {
  var id = localStorage.getItem("oId");
  axios
    .get(`http://localhost:8080/revo/server/public/offense/${id}`)
    .then(result => {
      var data = result.data;
      if (data == false) {
        location.href = "user.php";
      } else {
        var output = "",
          student = "";
        data.forEach(off => {
          var reg_no = off.reg_no,
            offense = off.offense,
            report = off.snr_report;
          output += offense;
          $("#img").html(
            `<img src="http://localhost:8080/revo/faces/${reg_no}.JPG" alt="" />`
          );
          axios
            .get(`http://localhost:8080/revo/server/public/students/${reg_no}`)
            .then(result => {
              var data = result.data;
              if (data == false) {
                location.href = "user.php";
              } else {
                data.forEach(std => {
                  var name = std.name,
                    webmail = std.webmail,
                    matric = std.matric,
                    dept = std.dept,
                    face = std.face;
                  student += `
                  <div>
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
                </div>
                <!-- End of first column -->
      
                <!-- SECOND COLUMN FOR THE PROFILE DETAILS -->
      
                <div class="">
                  <!-- column 2 content -->
      
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
                  </div>
                  `;
                });
                $(".student").html(student);
              }
              $("#report").html(report);
            })
            .catch(err => {});
        });
        $("#offense").html(output);
      }
    })
    .catch(err => {});
});
