<template>
  <div id="app">
    <pre>{{ example }}</pre>
    <button class="test-button" @click="add">Add test item</button>
    <Calendar 
      :items="items"
      @dayClicked="dayClicked"
      @itemClicked="itemClicked"
      @prevMonthClicked="prevMonthClicked"
      @nextMonthClicked="nextMonthClicked"
      :showButtonsHeader="true"
      textButtonNext="Next"
      textButtonPrev="Prev"
      :weeks="weeks"
      :months="months"
    />
  </div>
</template>

<script>
import moment from 'moment'
import Calendar from './components/Calendar.vue'

export default {
  name: 'App',
  components: {
    Calendar
  },
  data () {
    return {
      items: [
        {
          title: 'teste',
          day: '2020-06-10'
        }
      ],
      weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      example: {}
    }
  },
  methods: {
    add () {
      this.items.push({
        title: "Test",
        day: moment().set('date', 20).format('YYYY-MM-DD')
      })
    },
    dayClicked ($event) {
      this.example = {}
      this.example.title = 'Day Clicked'
      this.example.event = $event
    },
    itemClicked ($event) {
      this.example = {}
      this.example.title = 'Item Clicked'
      this.example.event = $event
    },
    prevMonthClicked($event) {
      this.example = {}
      this.example.title = 'Prev month Clicked'
      this.example.event = $event
    },
    nextMonthClicked ($event) {
      this.example = {}
      this.example.title = 'Next month Clicked'
      this.example.event = $event
    }
  }
}
</script>

<style>
.test-button{
  width: 100%;
  margin-bottom: 50px;
  padding: 20px;
  box-sizing: border-box;
  background-color: #2196f3;
  border: 0px;
  color: #FFF;
  cursor: pointer;
}

pre{
  font-size: 20px;
  border: 2px solid #2196f3;
  width: 450px;
  border-left: 12px solid #2196f3;
  border-radius: 5px;
  padding: 14px;
  
  /* Fixed line height */
  line-height: 24px;
  
  /* Use linear-gradient for background image */
  background-image: linear-gradient(180deg, #eee 50%, #fff 50%);
  
  /* Size background so that the height is 2x line-height */
  background-size: 100% 48px;
  
  /* Offset the background along the y-axis by top padding */
  background-position: 0 14px;
}
</style>
