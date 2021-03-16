<template>
    <div>
        
        <ul>
            <li v-for="(qty,food,index) in datapacket" :key="index">
                {{food}} : {{qty}}
                <br>
                <input v-bind:id=index placeholder="0" type ="number" min = "0" max = "10">
                <br>
            </li>
        </ul>
        <button v-on:click = "updateOrder" >Update Order</button>
    </div>
</template>


<script>
import database from "../firebase.js"
export default {
    props:{
        id: {
            type:String,
            
        }
    },

    data(){
        return{
            datapacket: {},

            }
        }
    ,
    methods: {
    fetchItems:function(){
        database.collection('orders').doc(this.id).get().then((querySnapShot)=>{
            this.datapacket = querySnapShot.data()
            this.dataname.push(querySnapShot.data()[0])
        })
    },
    updateOrder:function() {
        var newOrder = {}
        for (var order in this.datapacket) {
                newOrder[order] = order.value
            }
            var index = 0;
            for (var dish in newOrder) {
                var newCount = document.getElementById(index).value
                if (newCount == '') {
                    newOrder[dish] = 0
                } else {
                    newOrder[dish] = parseInt(newCount)
                }
                index++;
            }
            database.collection('orders').doc(this.id).update(newOrder).then(() =>this.$router.push("orders"))
        }
    },
    
    created(){
        this.fetchItems();
            
    }

}

</script>


<style scoped>
ul {
  

  list-style-type: none;
  padding: 0;
}


button {
  width: 15%;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}

</style>