//Configuracion de Supabase
const SUPABASE_URL = 'https://pepmpdpjhiieakmrplug.supabase.co';
const SUPABASE_ANON_KEY ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlcG1wZHBqaGlpZWFrbXJwbHVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4OTA0MzMsImV4cCI6MjA2OTQ2NjQzM30.WVMIJyGGW397PoaV1CN6z_J7JfS0OODV0g6pUHl-6BY';

const supabase = window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded',asyncfunctio){
    //Autenticación Anónima
    await supabase.auth.signInAnonymously();


    //Gráfico de Barras de Top 20 de países con mayor producción de energía renovable
    fetch('data/top_20_paises.json')
        .then(response => response.json())
        .then(data => {
             const ctx =document.getElementById('graficoBarrasPaises').getContext('2d');
             new Chart(ctx, {
                type:'bar',
                data:{
                    labels: data.map(item => item.pais),
                    datasets:[{
                        label:'Porcentaje de Energía Renovable',
                        data: data.map(item => item['promedio_renovables']),
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWhidth:1
                    }]
                },
                options:{
                    responsive: true,
                    scales: {
                        y:{ 
                            beginAtZero: true,
                            titule:{
                                display: true,
                                text: 'Porcentaje(%)'
                            }
                        },
                        x:{
                            titule:{
                                display: true,
                                text: 'Paises'
                            }
                        }
                    }
                }
             });

        });

        //Grafico de Barras de Producción de Energía Renovable por Regiones
        fetch('data/top_regiones.json')
          .then(response=> response.json())
          .then(data => {
            const ctx =document.getElementById('graficoBarrasRegiones').getContext('2d');
            new Chart(ctx, {
               type:'bar',
               data:{
                   labels: data.map(item => item.region),
                   datasets:[{
                       label:'Porcentaje de Energía Renovable',
                       data: data.map(item => item['promedio_renovables']),
                       backgroundColor: '#fbb7eb',
                       borderColor: 'fbb7eb',
                       borderWhidth:1
                   }]
               },
               options:{
                   responsive: true,
                   scales: {
                       y:{ 
                           beginAtZero: true,
                           titule:{
                               display: true,
                               text: 'Porcentaje(%)'
                           }
                       },
                       x:{
                           titule:{
                               display: true,
                               text: 'Regiones'
                           }
                       }
                   }
               }
            });
        });
    
        //Grafico comparativo
         fetch('data/top_regiones.json')
          .then(response=> response.json())
          .then(data => {
            const ctx =document.getElementById('graficoBarrasRegiones').getContext('2d');
            new Chart(ctx, {
               type:'bar',
               data:{
                   labels: data.map(item => item.region),
                   datasets:[{
                       label:'Porcentaje de Energía Renovable',
                       data: data.map(item => item['promedio_renovables']),
                       backgroundColor: '#fbb7eb',
                       borderColor: 'fbb7eb',
                       borderWhidth:1
                   }]
               },
               options:{
                   responsive: true,
                   scales: {
                       y:{ 
                           beginAtZero: true,
                           titule:{
                               display: true,
                               text: 'Porcentaje(%)'
                           }
                       },
                       x:{
                           titule:{
                               display: true,
                               text: 'Regiones'
                           }
                       }
                   }
               }
            });
        });
    
        //Grafico de Líneas de Comparativa de Producción de Energía Renovable - Colombia vs Suramerica
        fetch('data/colombia_suramerica.json')
           .then(response=> response.json())
           .then(data=> {
               const filteredData = data.filter(item => item.anno <= 2021);
               const ctx = document.getElementById('graficoLineasComparativa').getContext('2d');
               new Chart(ctx, {
                   type:'line',
                   data:{
                    labels: [...new Set(filteredData.map(item => item.anno))],
                    datasets: [
                        {
                            label: 'Colombia',
                            data: filteredData.filter(item => item.region === 'Colombia').map(item => item.renovables),
                            borderColor: '#fbb7eb',
                            backgroundColor: '#fbb7eb',
                            fill: false,
                            borderWidth: 1,
                            tension: 0.1
                        },
                        {
                            label: 'South America',
                            data: filteredData.filter(item => item.region === 'South America').map(item => item.renovables),
                            borderColor: 'rgba(54, 162, 235, 0.6)',
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            fill: false,
                            borderWidth: 1,
                            tension: 0.1
                        },
                    ]
                   }
               })
           });

});