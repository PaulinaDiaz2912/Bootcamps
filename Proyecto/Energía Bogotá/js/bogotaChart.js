document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('bogotaChart').getContext('2d');
  const bogotaChart = new Chart(ctx, {
    type: 'bar', // Cambiado de 'line' a 'bar'
    data: {
      labels: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
      datasets: [
        {
          label: 'Solar (Bogotá - Estimado)',
          data: [1, 1, 2, 3, 5, 10, 15, 20, 25],
          backgroundColor: 'red',
          borderColor: 'red',
          borderWidth: 1
        },
        {
          label: 'Bioenergía (Bogotá - Estimado)',
          data: [0, 1.7, 1.7, 1.7, 1.7 , 1.7, 1.7, 1.7, 1.7],
          backgroundColor: 'pink',
          borderColor: 'pink',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Energía Renovable en Bogotá (2015–2023)'
        },
        legend: {
          position: 'bottom'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'MW (Megavatios)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Año'
          }
        }
      }
    }
  });
});