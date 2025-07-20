import { db, ref, onValue } from "./config.js";

const resultRef = ref(db, "votes");

// Global chart instance (biar bisa update data realtime)
let voteChart;

onValue(resultRef, (snapshot) => {
  const data = snapshot.val();
  if (!data) return;

  const votA = data.A || 0;
  const votB = data.B || 0;
  const votC = data.C || 0;

  // Hitung total suara
  const totalVotes = votA + votB + votC;

  // Hitung suara terbanyak
  let maxCandidate = null;
  let maxVotes = -1;
  for (const [name, votes] of Object.entries(data)) {
    if (votes > maxVotes) {
      maxVotes = votes;
      maxCandidate = name;
    }
  }

  // Hitung persentase
  const totalSuaraTersedia = 600; // ubah sesuai kebutuhan
  const persen = ((totalVotes / totalSuaraTersedia) * 100).toFixed();
  const persenA = ((votA / totalVotes) * 100).toFixed();
  const persenB = ((votB / totalVotes) * 100).toFixed();
  const persenC = ((votC / totalVotes) * 100).toFixed();

  // Tampilkan info
  document.getElementById("totalSuara").textContent = totalVotes;
  document.getElementById(
    "totalPemilih"
  ).textContent = `${persen}% dari ${totalVotes} suara`;
  document.getElementById(
    "pemenangSuara"
  ).textContent = `${maxVotes} suara (${persen}%)`;
  document.getElementById("pemenang").textContent = `Kandidat ${maxCandidate}`;

  // Bikin atau update chart
  if (!voteChart) {
    const ctx = document.getElementById("voteChart").getContext("2d");
    voteChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Kandidat A", "Kandidat B", "Kandidat C"],
        datasets: [
          {
            label: "Jumlah Suara",
            data: [votA, votB, votC],
            backgroundColor: [
              "rgba(156, 163, 175, 0.7)",
              "rgba(234, 179, 8, 0.7)",
              "rgba(217, 119, 6, 0.7)",
            ],
            borderColor: [
              "rgb(156, 163, 175)",
              "rgb(234, 179, 8)",
              "rgb(217, 119, 6)",
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 20 },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const percent = ((ctx.parsed.y / totalVotes) * 100).toFixed(1);
                return `${ctx.parsed.y} suara (${percent}%)`;
              },
            },
          },
        },
      },
    });
  } else {
    voteChart.data.datasets[0].data = [votA, votB, votC];
    voteChart.update();
  }

  // progress bar
  document.getElementById(
    "progress1"
  ).textContent = `${votA} suara (${persen})`;
  document.getElementById(
    "progress2"
  ).textContent = `${votB} suara (${persen})`;
  document.getElementById(
    "progress3"
  ).textContent = `${votC} suara (${persen})`;
  document.getElementById("garis1").style.width = persenA + "%";
  document.getElementById("garis2").style.width = persenB + "%";
  document.getElementById("garis3").style.width = persenC + "%";
  // profile
  document.getElementById(
    "profile1"
  ).textContent = `${votA} suara (${persenA}%)`;
  document.getElementById(
    "profile2"
  ).textContent = `${votB} suara (${persenB}%)`;
  document.getElementById(
    "profile3"
  ).textContent = `${votC} suara (${persenC}%)`;
});

function updateJamWIB() {
  const options = {
    timeZone: "Asia/Jakarta",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formatter = new Intl.DateTimeFormat("id-ID", options);
  const waktu = formatter.format(new Date());
  document.getElementById("jam").textContent = waktu;
}

// Update tiap 1 detik
setInterval(updateJamWIB, 1000);
updateJamWIB();
