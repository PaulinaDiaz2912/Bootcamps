document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('medellinChart').getContext('2d');
  const medellinChart = new Chart(ctx, {
    type: 'bar', // Cambiado de 'line' a 'bar'
    data: {
      labels: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
      datasets: [
        {
          label: 'Solar (Medellín - Estimado)',
          data: [0, 0.5, 1, 2, 5, 10, 20, 26, 26],
          backgroundColor: 'rgba(255, 215, 0, 0.7)', // dorado
          borderColor: 'gold',
          borderWidth: 1
        },
        {
          label: 'Eólica (Medellín - Jepírachi)',
          data: [19.5, 19.5, 19.5, 19.5, 19.5, 19.5, 19.5, 19.5, 0],
          backgroundColor: 'rgba(0, 128, 128, 0.7)', // teal
          borderColor: 'teal',
          borderWidth: 1
        },
    
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Energía Renovable en Medellín-Antíoquia (2015–2023)'
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