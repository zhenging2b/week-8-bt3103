import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            
            datasets: [
              { 
                label:"west",
                data: [],
                backgroundColor:"red",
                borderColor:"red",
                fill: false
              },
              { 
                label:"national",
                data: [],
                backgroundColor:"blue",
                borderColor:"blue",
                fill: false
              },
              { 
                label:"east",
                data: [],
                backgroundColor:"aqua",
                borderColor:"aqua",
                fill: false
              },
              { 
                label:"central",
                data: [],
                backgroundColor:"green",
                borderColor:"green",
                fill: false
              },
              { 
                label:"south",
                data: [],
                backgroundColor:"yellow",
                borderColor:"yellow",
                fill: false
              },
              { 
                label:"north",
                data: [],
                backgroundColor:"pink",
                borderColor:"pink",
                fill: false
              }
            ]
        },
        options: {
            legend: { display: true},
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            var currentItems = response.data.items
            for (var item in currentItems) {
              this.datacollection.labels.push(currentItems[item]["timestamp"])
              //console.log(currentItems[item])
              //console.log(currentItems)
              var psiDict = currentItems[item]["readings"]["psi_twenty_four_hourly"]
              //console.log(psiDict)
              this.datacollection.datasets[0].data.push(psiDict['west'])
              this.datacollection.datasets[1].data.push(psiDict['national'])
              this.datacollection.datasets[2].data.push(psiDict['east'])
              this.datacollection.datasets[3].data.push(psiDict['central'])
              this.datacollection.datasets[4].data.push(psiDict['south'])
              this.datacollection.datasets[5].data.push(psiDict['north'])
            }
              
            /*
                this.datacollection.labels.push(data[0])
                this.datacollection.datasets[0].data.push(data[1])
            })
            */
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}
