$(function() {
  function sidebarToggle(toogle) {
    var sidebar = $("#sidebar");
    var padder = $(".content-padder");
    if (toogle) {
      sidebar.css({ display: "block", x: -300 });
      sidebar.transition({ opacity: 1, x: 0 }, 250, "in-out", function() {
        sidebar.css("display", "block");
      });
      if ($(window).width() > 960) {
        padder.transition({ marginLeft: sidebar.css("width") }, 250, "in-out");
      }
    } else {
      sidebar.css({ display: "block", x: "0px" });
      sidebar.transition({ x: -300, opacity: 0 }, 250, "in-out", function() {
        sidebar.css("display", "none");
      });
      padder.transition({ marginLeft: 0 }, 250, "in-out");
    }
  }

  $("#sidebar_toggle").click(function() {
    var sidebar = $("#sidebar");
    var padder = $(".content-padder");
    if (sidebar.css("x") == "-300px" || sidebar.css("display") == "none") {
      sidebarToggle(true);
    } else {
      sidebarToggle(false);
    }
  });

  function resize() {
    var sidebar = $("#sidebar");
    var padder = $(".content-padder");
    padder.removeAttr("style");
    if ($(window).width() < 960 && sidebar.css("display") == "block") {
      sidebarToggle(false);
    } else if ($(window).width() > 960 && sidebar.css("display") == "none") {
      sidebarToggle(true);
    }
  }

  if ($(window).width() < 960) {
    sidebarToggle(false);
  }

  $(window).resize(function() {
    resize();
  });

  $(".content-padder").click(function() {
    if ($(window).width() < 960) {
      sidebarToggle(false);
    }
  });

  //Graficas
  var data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
    datasets: [
      {
        label: "# de Visitantes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
      }
    ]
  };
  var options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  var ctx = document.getElementById("chart1").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: options
  });

  var ctx = document.getElementById("chart2").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: options
  });
});
