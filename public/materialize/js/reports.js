$(document).ready(function (e) {
    getsaccoData();
    getCasesData();
});

function  getsaccoData() {
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
}


function getCasesData() {
    $.ajax({
        url: "http://localhost:3000/reports",
        type: 'post',
        async: false,
        data: {data: 'data'},
        success: function (response) {
            //console.log(response);
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var arrayData = [["Month", "Number of cases", { role: "style" }]];
            for (var i=0; i<months.length; i++) {
                arrayData.push([
                    months[i], countCases(response, i+1), "#b87333"
                ]);
            }
            console.log(arrayData);

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
                    title: "Number of cases per month",
                    width: 600,
                    height: 400,
                    bar: {groupWidth: "95%"},
                    legend: { position: "none" },
                };
                var chart = new google.visualization.ColumnChart(document.getElementById("months"));
                chart.draw(view, options);
            }
            
        }, 
        error: function (error) {
            console.log(error);
        }
        
    })

}

function countCases(data, month) {
    var cases = 0;
    for (var i=0; i<data.length; i++ ) {
        var $case = data[i].date;
        var $month = parseInt($case.split('-')[1]);
        if ($month == month ) {
            cases++;
        }
    }
    return cases;
}








