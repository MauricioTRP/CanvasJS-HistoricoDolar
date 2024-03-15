window.onload = function() {
  $(document).ready(function(){
    var dataPoints = [];

    var options =  {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Precio Historico del Dolar"
      },
      axisX: {
        valueFormatString: "DD MMM YYYY",
      },
      axisY: {
        title: "USD",
        titleFontSize: 24
      },
      data: [{
        type: "spline", 
        yValueFormatString: "$#,###.##",
        dataPoints: dataPoints
      }]
    };
    
    $.ajax({
      type: "GET",
      url: "https://mindicador.cl/api/dolar",
      dataType: "json",
      success: function(data){
        data.serie.forEach(precioHistorico => {
          dataPoints.push({
            x: new Date(precioHistorico.fecha), // fecha
            y: precioHistorico.valor
          })
        });

        const chart = new CanvasJS.Chart("chartContainer",options)

        chart.render();
      },
      error: function(error){
        console.log(error);
      }
    });
  })
}

