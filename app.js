// Data taken from https://data.giss.nasa.gov/gistemp/
// Mean taken from https://earthobservatory.nasa.gov/world-of-change/DecadalTemp

// show showChart
showChart();

// chartjs
async function showChart() {

    // await for getData function
    const data = await getData();
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xAxisLabel,
            datasets: [
            {
                label: 'Global Average Temperature',
                data: data.globalTempsArray,
                fill: false,
                backgroundColor: 'rgba(204,0,0,1)',
                borderColor: 'rgba(204,0,0,1)',
                borderWidth: 1
            },
            {
                label: 'Northern Hemisphere Average Temperature',
                data: data.northernTempsArray,
                fill: false,
                backgroundColor: 'rgba(0,204,0,1)',
                borderColor: 'rgba(0,204,0,1)',
                borderWidth: 1
            },
            {
                label: 'Southern Hemisphere Average Temperature',
                data: data.southernTempsArray,
                fill: false,
                backgroundColor: 'rgba(0,0,204,1)',
                borderColor: 'rgba(0,0,204,1)',
                borderWidth: 1
            },
            {
                label: 'Mean Global Temperature',
                fill: false,
                backgroundColor: 'rgb(204,204,0)',
                borderColor: 'rgb(204,204,0)',
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Global and Hemispheric Zonal Annual Means'
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Years'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Temperature'
                    },
                    ticks: {
                        beginAtZero: false,
                        callback: function(value) {
                            return value + '°C';
                        }
                     }
                }],
            },
            annotation: {
                annotations: [
                {
                    type: 'line',
                    mode: 'horizontal',
                    scaleID: 'y-axis-0',
                    value: '14',
                    borderColor: 'rgb(204,204,0)',
                    borderWidth: 2,
                    drawTime: "afterDatasetsDraw",
                }],  
            },
        }
    });
}

async function getData() {

    // fetch data and assign to response
    const response = await fetch('ZonAnn.Ts+dSST.csv')

    // transform data into text
    const data = await response.text();

    // split data into new lines and slice the headers
    const table = data.split('\n').slice(1);

    // create array for x and y temps array
    const xAxisLabel = [];
    const globalTempsArray = [];
    const northernTempsArray = [];
    const southernTempsArray = [];

    // loop over each row of the table
    table.forEach( (row) => {
        
        // for each row split the data on comma delimiter
        const column = row.split(',');

        // assign first column to year
        const years = column[0];

        // push current years to xAxisLabel array
        xAxisLabel.push(years);
        
        // assign columns to arrays
        const globalTemps = column[1];
        const northenTemps = column[2];
        const southernTemps = column[3];
        

        // push current temperature to array
        globalTempsArray.push(parseFloat(globalTemps) + 14); // 14 is global mean
        northernTempsArray.push(parseFloat(northenTemps) + 14); // 14 is global mean
        southernTempsArray.push(parseFloat(southernTemps) + 14); // 14 is global mean
    })

    // returns an object with multiple array
    return { xAxisLabel, globalTempsArray, northernTempsArray, southernTempsArray };
};