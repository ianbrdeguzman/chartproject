// data taken from https://data.giss.nasa.gov/gistemp/
// Zonal annual means from 1880 to present

const xAxisLabel = [];
const yAxisLabel = [];

// call getData function
getData();

async function getData() {

    // fetch data and assign to response
    const response = await fetch('ZonAnn.Ts+dSST.csv')

    // transform data into text
    const data = await response.text();

    // split data into new lines and slice the headers
    const table = data.split('\n').slice(1);

    // loop over each row
    table.forEach( (row) => {
        
        // for each row split the data on comma delimiter
        const column = row.split(',');

        // assign first column to year
        const year = column[0];

        // push current years to xAxisLabel array
        xAxisLabel.push(year);
        
        // assign second column to temp
        const temp = column[1];

        // push current temperature to xAxisLabel array
        yAxisLabel.push(temp);
        
    })
};

// chartjs
const ctx = document.getElementById('chart').getContext('2d');

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: xAxisLabel,
        datasets: [{
            label: 'Global Average Temperature',
            data: yAxisLabel,
            backgroundColor: [
                // TODO add random color
            ],
            borderColor: [
                // TODO add random color
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


// const rgbArray = [];
// const rgb = [];
// const randomColor = (year) => {
//     for (let i = 0; i < 3; i++) {
//         const randomNum = Math.floor(Math.random() * 255);
//         rgb.push(randomNum);   
//     }
//     for (let i = 0; i < rgb.length; i++) {
//         const a = rgb[i];
//     }
//     rgbArray.push(`rgb(${rgb})`)
//     console.log(rgbArray);
// }

// randomColor();