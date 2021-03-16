import { Bar } from 'vue-chartjs'
import database from '../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Number of order",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "aqua"],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of each dish'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true 
                    }
                }]
            }
              
        }
    }
  },
  methods: {
    fetchItems: function () {
        var dictItem = {}
        /*
        database.collection('menu').get().then(querySnapShot => {
            querySnapShot.forEach(doc => {
                this.datacollection.labels.push(doc.data().name)
                dictItem[doc.data().name] = 0
            })
        });
        */
      database.collection('orders').get().then(querySnapShot => {
        querySnapShot.forEach(doc => { 
            var currentOrder = doc.data()
            for (var key in currentOrder) {
                if (!(key in dictItem)) {
                    dictItem[key] = currentOrder[key]
                } else {
                    dictItem[key] += currentOrder[key]
                }
            }
        
            
        })
        console.log(dictItem)
        for (var foodName in dictItem) {
            this.datacollection.labels.push(foodName)
            this.datacollection.datasets[0].data.push(dictItem[foodName])
        }

        this.renderChart(this.datacollection, this.options)
      })
    }
  },
  created () {
    this.fetchItems()
  },
  mounted () {
    this.renderChart(this.datacollection, this.options)
  }
}