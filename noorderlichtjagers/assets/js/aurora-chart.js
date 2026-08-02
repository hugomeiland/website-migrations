(function () {
  var canvas = document.getElementById("kp-chart");
  if (!canvas || typeof Chart === "undefined") return;

  var base = canvas.getAttribute("data-base") || "";

  function poolColors(values) {
    return values.map(function (v) {
      var n = Number(v);
      if (n <= 3) return "#00ff00";
      if (n === 4) return "#ffcc00";
      if (n > 4) return "#ff0000";
      return "#999999";
    });
  }

  function parseCsv(text) {
    return text
      .trim()
      .split(/\r?\n/)
      .slice(1)
      .filter(Boolean)
      .map(function (line) {
        var parts = line.split(",");
        return { Datum: parts[0], Kp: parts[1] };
      });
  }

  Promise.all([
    fetch(base + "/data/27.csv").then(function (r) { return r.text(); }),
    fetch(base + "/data/45.csv").then(function (r) { return r.text(); })
  ]).then(function (texts) {
    var d27 = parseCsv(texts[0]);
    var d45 = parseCsv(texts[1]);
    var labels = d45.map(function (d) { return d.Datum; });
    var kp27 = d27.map(function (d) { return d.Kp; });
    var kp45 = d45.map(function (d) { return d.Kp; });

    new Chart(canvas.getContext("2d"), {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Kp (27 dagen)",
            data: kp27,
            backgroundColor: poolColors(kp27)
          },
          {
            label: "Kp (45 dagen)",
            data: kp45,
            borderColor: "#666666",
            borderWidth: 1,
            backgroundColor: "#f7f7f7"
          }
        ]
      },
      options: {
        aspectRatio: 5,
        scales: {
          y: { beginAtZero: true, max: 10, ticks: { stepSize: 1 } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }).catch(function (err) {
    console.warn("Kp chart data kon niet geladen worden", err);
  });
})();
