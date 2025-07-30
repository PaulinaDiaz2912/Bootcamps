//Configuracion de Supabase
const SUPABASE_URL = 'https://pepmpdpjhiieakmrplug.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlcG1wZHBqaGlpZWFrbXJwbHVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4OTA0MzMsImV4cCI6MjA2OTQ2NjQzM30.WVMIJyGGW397PoaV1CN6z_J7JfS0OODV0g6pUHl-6BY';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', async function () {
    //Autenticación Anónima
    await supabase.auth.signInAnonymously();

    //Ejecutar todas las funciones
    fetchTop20Paises();
    fetchTopRegiones();
    fetchColombiaVsSuramerica();


    //Gráfico de Barras de Top 20 de países con mayor producción de energía renovable
    async function fetchTop20Paises() {
        const { data, error } = await supabase
            .from('top_20_paises')
            .select('*')
            .order('promedio_renovables', { ascending: false })
            .limit(20);

        if (error) throw error;

        createBarChart('graficoBarrasPaises', data, 'pais', 'promedio_renovables', 'Porcentaje de Energia Renovable', 'rgba(54, 162, 235, 0.6)')
    }

    //Grafico de Barras de Producción de Energía Renovable por Regiones
    async function fetchTopRegiones() {
        const { data, error } = await supabase
            .from('top_regiones')
            .select('*')
            .order('promedio_renovables', { ascending: false });

        if (error) throw error;

        createBarChart('graficoBarrasRegiones', data, 'region', 'promedio_renovables', 'Porcentaje de Energia Renovable por Region', 'rgba(128, 196, 252, 0.6)')
    }

    //Funcion para crear gráficos de barras
    function createBarChart(canvasId, data, labelField, dataField, label, backgroundColor) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(item => item[labelField]),
                datasets: [{
                    label: label,
                    data: data.map(item => item[dataField]),
                    backgroundColor: backgroundColor,
                    borderColor: backgroundColor.replace('0.6', '1'),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        titule: {
                            display: true,
                            text: 'Porcentaje(%)'
                        }
                    },
                    x: {
                        titule: {
                            display: true,
                            text: canvasId.includes('Paises') ? 'Paises' : 'Regiones'
                        }
                    }
                }
            }
        })
    }

    //Gráfico Comparativo de Líneas
    async function fetchColombiaVsSuramerica() {
        const { data, error } = await supabase
            .from('colombia_suramerica')
            .select('*')
            .lte('anno', 2021)
            .order('anno', { ascending: true });

        if (error) throw error;
        //Procesar los datos que vienen de la Consulta
        const colombiaData = data.filter(item => item.region === 'Colombia');
        const suramericaData = data.filter(item => item.region === 'South America');
        const years =  [...new Set(data.map(item => item.anno))] ;
        console.log(years)


        const ctx = document.getElementById('graficoLineasComparativa').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [
                    {
                        label: 'Colombia',
                        data: colombiaData.map(item => item.renovables),
                        borderColor: '#fbb7eb',
                        backgroundColor: '#fbb7eb',
                        fill: false,
                        borderWidth: 1,
                        tension: 0.1
                    },
                    {
                        label: 'South America',
                        data: suramericaData.map(item => item.renovables),
                        borderColor: 'rgba(54, 162, 235, 0.6)',
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        fill: false,
                        borderWidth: 1,
                        tension: 0.1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Producción de Energía Renovable (&)'
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
        })

    }


});