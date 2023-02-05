import Ajax from "./ajax.js";
// const path = require('path');
google.charts.load('current', { 'packages': ['line'] });

// Helper functions - to ease coding
function id(id) {
    return document.getElementById(id);
}

function qsa(selector) {
    return document.querySelectorAll(selector);
}

let params = new URLSearchParams(window.location.search);

let userid = params.get("id");

console.log("id: ", userid);


google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Day');
    data.addColumn('number', 'Guardians of the Galaxy');
    data.addColumn('number', 'The Avengers');
    data.addColumn('number', 'Transformers: Age of Extinction');

    data.addRows([
        [1, 37.8, 80.8, 41.8],
        [2, 30.9, 69.5, 32.4],
        [3, 25.4, 57, 25.7],
        [4, 11.7, 18.8, 10.5],
        [5, 11.9, 17.6, 10.4],
        [6, 8.8, 13.6, 7.7],
        [7, 7.6, 12.3, 9.6],
        [8, 12.3, 29.2, 10.6],
        [9, 16.9, 42.9, 14.8],
        [10, 12.8, 30.9, 11.6],
        [11, 5.3, 7.9, 4.7],
        [12, 6.6, 8.4, 5.2],
        [13, 4.8, 6.3, 3.6],
        [14, 4.2, 6.2, 3.4]
    ]);

    var options = {
        chart: {
            title: 'Box Office Earnings in First Two Weeks of Opening',
            subtitle: 'in millions of dollars (USD)'
        },
        width: 900,
        height: 500,
        axes: {
            x: {
                0: { side: 'top' }
            }
        }
    };

    var chart = new google.charts.Line(document.getElementById('line_top_x'));

    chart.draw(data, google.charts.Line.convertOptions(options));
}

// using the user id information. need to build out the profile of the person.
// need a boiler plate user dashboard page. what information to include, and then
// chagne that dynamically using the userid. and the associaed data file.(user-1)

/** Dashborad
 * Incoming insights to carying degrees of speficicity
 *      how specific 
 *      there should be more questions here
 * Filter
 * Prvacy selector settings
 * How are the different insights filtered? grouped together?
 * Blocking insihgts from certain companies?
 * Crypto area. Maybe do a tabbed kindof thing where I can see the crypto information?
 *      Or maybe more specific in the tab, less specific in the dashboard - yes
 * typical ads?
 *      an example of an ad that advertisers have selected to also display the ad
 *      selection process. 
 * 
 * 
 */
