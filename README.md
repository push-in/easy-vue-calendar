# easy-vue-calendar

## Project setup
```
npm i --save easy-vue-calendar
```

### Example to use
```
<template>
    <EasyCalendar 
      :items="items"
      @dayClicked="dayClicked"
      @itemClicked="itemClicked"
      @prevMonthClicked="prevMonthClicked"
      @nextMonthClicked="nextMonthClicked"
    />
</template>

<script>
    import EasyCalendar from 'easy-vue-calendar'
    export default {
        components: {
            EasyCalendar
        }
        data () {
            return {
                items: [
                    {
                        title: 'test',
                        day: '2020-06-10',
                        background: '#000',
                        color: '#FFF',
                        // Other data...
                    }
                ]
            }
        },
        methods: {
            dayClicked ($event) {
                console.log($event)
            },

            itemClicked ($event) {
                console.log($event)
            },

            prevMonthClicked($event) {
                console.log($event)
            },

            nextMonthClicked ($event) {
                console.log($event)
            }
        },
    }
</script>
```

Items are the events that can be passed to the calendar. It is an array type and can be passed any data (To be retrieved later), however some data needs to have its particularities.


### Data that needs to be respected
| Name | Description |
| --- | --- |
| title | The title that will appear on the label |
| data | The day the label will fit |
| color | The font color of the label|
| background | The background color of the label |


## Language support

```
<template>
    <EasyCalendar 
      :items="items"
      @dayClicked="dayClicked"
      @itemClicked="itemClicked"
      @prevMonthClicked="prevMonthClicked"
      @nextMonthClicked="nextMonthClicked"
      :showButtonsHeader="true"
      textButtonNext="Next"    <--- Add
      textButtonPrev="Prev"    <--- Add
      :weeks="weeks"           <--- Add
      :months="months"         <--- Add
    />
</template>

<script>
    import EasyCalendar from 'easy-vue-calendar'
    export default {
        name: 'App',
        components: {
            EasyCalendar
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
                months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            }
        }
    }
</script>
```