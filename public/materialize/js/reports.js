$(document).ready(function (e) {

    $.ajax({
        url: "http://localhost:3000/reports",
        type: 'post',
        data: {data: 'cases'},
        success: function (response) {
            console.log(response);
            var arrayData = [];
            arrayData.push(["Sacco Name", "Number of cases", { role: "style" } ]);
            for (var i=0; i<response.length; i++) {
                arrayData.push([
                    response[i].sacco,
                    response[i].cases,
                    "#b87333"
                ]);
            }

            google.charts.load("current", {packages:['corechart']});
            google.charts.setOnLoadCallback(drawChart);
            function drawChart() {
                var data = google.visualization.arrayToDataTable(arrayData);

                var view = new google.visualization.DataView(data);
                view.setColumns([0, 1,
                    { calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation" },
                    2]);

                var options = {
                    title: "Number of cases per sacco",
                    width: 600,
                    height: 400,
                    bar: {groupWidth: "95%"},
                    legend: { position: "none" },
                };
                var chart = new google.visualization.ColumnChart(document.getElementById("cases"));
                chart.draw(view, options);
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
});





