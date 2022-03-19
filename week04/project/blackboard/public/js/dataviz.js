
//Bar Chart

var chartBar = document.getElementById("chartBar");

new Chart(chartBar, {

    type: 'bar',
    data: {
        labels: ['male', 'female'],
        datasets: [{
            label: "Users by gender",
            data: [$('#chartBar').data('male'), $('#chartBar').data('female')],
            backgroundColor: [
                '#74b9ff',
                '#fd79a8'
            ],
            borderColor: [
                '#0984e3',
                '#e84393'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

//Doughnut Chart

var doughnut = document.getElementById('doughnut')

new Chart(doughnut, {
    type: 'doughnut',
    data: {
        labels: ["read", "unread"],
        datasets: [{
            data: [$("#doughnut").data('read'), $('#doughnut').data('unread')],
            backgroundColor: [
                '#81ecec',
                '#ffeaa7',
            ],
            borderColor: [
                '#00cec9',
                '#fdcb6e',
            ],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

var chartpie = document.getElementById('chartpie')

new Chart(chartpie, {
    type: 'pie',
    data: {
        labels: ["Paid and shipped", "Paid and not shipped"],
        datasets: [{
            data: [$("#chartpie").data('shipped'), $('#chartpie').data('notshipped')],
            backgroundColor: [
                '#55efc4',
                '#ff7675',
            ],
            borderColor: [
                '#00b894',
                '#d63031',
            ],
            borderWidth: 2,
        }],
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


var linechart = document.getElementById("linechart");

var months = ["Jan", "Feb", 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
var sales = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var orders = JSON.parse($("#linechart").data('orders'));

for (var i = 0; i < orders.length; i++) {
    sales.splice(orders[i]._id.month, 1, orders[i].total);
}

console.log(sales);


new Chart(linechart, {

    type: 'line',
    data: {
        labels: months,
        datasets: [{
            label: 'Sales in 2019',
            data: sales,
            backgroundColor: [
                '#74b9ff',
                '#fd79a8'
            ],
            borderColor: [
                '#0984e3',
                '#e84393'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
