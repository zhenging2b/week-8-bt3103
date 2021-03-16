<template>
  <div>
    <ul>
        <li v-for="item in items" v-bind:key="item.name">

            <h2>{{item.name}}</h2>
            <img v-bind:src="item.imageURL">
            <qCount v-bind:item=item v-on:counter="onCounter"></qCount>
                
            
        </li>
    </ul>
    <basket v-bind:itemsSelected="itemsSelected"></basket>
  </div>
</template>


<script>
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import database from '../firebase.js'
export default {
  
  data(){
    return{
        items: [],
        itemsSelected: []
        }
  },
  components: {
    'qCount': QuantityCounter,
    'basket': Basket
  },
  methods: {
      onCounter: function (item, count) {
     
      if (this.itemsSelected.length === 0 && count > 0) {
        //If there is nothing in items selected, push the ORDER in
        this.itemsSelected.push([item.name, count, item.price]);
      } else {

        // Loop through everything to check what is not in the basket
        var updatedOrNot = false
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];
          // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
          if (item.name == item_name && count>0) {
              //this.itemsSelected[i] = ([item.name,count,item.price]);
              this.itemsSelected.splice(i,1,[curr_item[0],count,curr_item[2]]);
              updatedOrNot = true;
          } 
          // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected. 
          else if (item.name == item_name && count ===0) {
              this.itemsSelected.splice(i,1);
              updatedOrNot = true;
          }

          // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected

          // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
        }
        // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
        if (!updatedOrNot && count >0) {
          
            this.itemsSelected.push([item.name, count, item.price]);
        }
      }
    },
    fetchItems:function(){
      database.collection('menu').get().then((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            item=doc.data()
            item.show=false
            item.id=doc.id
            this.items.push(item) 
            })      })  
    },
  },
  created() {
      this.fetchItems()
    }
}
</script>

<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  float:left;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  width: 85%
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>