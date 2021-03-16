<template>
  <div>
    <nav>
      <ul>
        <li v-for="item in itemsSelected" v-bind:key="item[0]">
            {{item[0]}} x {{item[1]}}
        </li>
    </ul>
    <br>
    <button v-on:click= "findTotal(); sendOrder()">Add Order</button>
    <p v-show="show">SubTotal: ${{subTotal}}</p>
    <p v-show="show">Grand Total: ${{grandTotal}}</p>
    </nav>
  </div>
</template>

<script>
import database from '../firebase.js'


export default {
    data(){
        return{
            subTotal: {
                type:Number
            },
            grandTotal:{
                type:Number
            },
            show: false
        }
    },
    props:{
        itemsSelected:{
            type:Array
        }
    },
    methods:{
        findTotal:function() {
            this.show = true;
            var totalAmt = 0;
            for(var item of this.itemsSelected) {
                totalAmt += item[1] * item[2]
            }
            this.subTotal = Math.round((totalAmt + Number.EPSILON) * 100) / 100
            this.grandTotal = Math.round(((totalAmt*1.07) + Number.EPSILON) * 100) / 100
        },
        sendOrder:function() {
            
            var dict = {}
            for (let i = 0; i < this.itemsSelected.length; i++) {
                var curr = this.itemsSelected[i]
                dict[curr[0]] = curr[1]
            }
            
            var listArray = ["Prawn omelette", "Dry Beef Hor Fun", "Sambal KangKung", "Pork Fried Rice", "Mapo Tofu", "Cereal Prawn"]
            for (let i = 0; i < listArray.length; i++) {
                if (!(listArray[i] in dict)) {
                    dict[listArray[i]] = 0
                }
            }
            database.collection('orders').add(dict).then(() => location.reload());

        },


    }
}

</script>

<style>
nav{
    width:15%;
    float:left;
}

</style>