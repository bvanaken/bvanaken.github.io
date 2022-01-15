let chart;
let growth = 1.2;

let dailyEvents = {
    "5": "Besprechung mit der Kanzlerin",
    "10": "1. Pressekonferenz",
    "20": "Christian Drosten ruft an",
    "40": "Christian Drosten ruft nochmal an"
}

function setupDataCanvas() {
    const canvas = $('#data-canvas')[0].getContext('2d');
    chart = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: ['Fälle', '7-Tages Inzidenz', 'Hospitalisierungen', 'Todesfälle'],
            datasets: [{
                data: [1, 1, 1, 1],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
            legend: {
                display: false
            }
        },
    scales: {

      y: {
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          reverse: false,
          stepSize: 10,
        },
      }
    }
  }
    });
}

function setupDayCounter() {
    setInterval(function() {
        const counter = $('#day-counter');
        const dayCount = parseInt(counter.text()) + 1;
        counter.text(dayCount);

        chart.data.datasets[0].data[0] *= growth * 1.5;

        chart.data.datasets[0].data[1] *= growth * 1.45;

        chart.data.datasets[0].data[2] *= growth * 1.2;

        chart.data.datasets[0].data[3] *= growth * 1.1;

        chart.update();

        if(dayCount in dailyEvents) {
            $('#headline-event').text(dailyEvents[dayCount]);
        } else {
            $('#headline-event').text("");
        }

    }, 3000);
}

function reduceGrowth() {
    growth /= 2;
}

function resetGrowth() {
    growth = 1.2;
}

function start(){
    $('#video-container').fadeIn("slow");
    $('#news-video').get(0).play(); 

    $("video").bind("ended", function() {
       hideVideo();
    });

    $("video").bind("paused", function() {
       hideVideo();
    });
}

function hideVideo() {
        $('#video-container').fadeOut("slow");

    $('#news-video').get(0).pause();
    $('#news-video').get(0).currentTime = 0;

    setupDayCounter();
}

$(document).ready(function () {

    setupDataCanvas();     



});
