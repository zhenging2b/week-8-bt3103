<template>
  <div>
      <button v-on:click = decrement()>-</button>
      <a> {{counter}} </a>
      <button v-on:click = increment()>+</button>
    
  </div>
</template>

<script>


export default {
    data(){
        return{
            counter:0,
            
        }
    },
    props: {
        item:{
                type:Object
            }
    },
    methods: {
        increment: function() {
            if (this.counter == 10) {
                alert("You cannot buy more than 10 items.")
            }
            else {
                this.counter++;
            }
            this.$emit('counter', this.item, this.counter)
        },
        decrement: function(){
            if (this.counter !=0) {
                this.counter--;
            }
            this.$emit('counter', this.item, this.counter)
        }
    }
}

</script>

<style>

</style>