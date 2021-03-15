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
      v-model="daySelected"
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
                ],
                daySelected: '2020-03-15'
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

## Props

| Name | Type | Default | Example
| --- | --- | --- | --- |
| items | array | [] |
| showButtonsHeader | boolean | true |
| showButtonAdd | boolean | true |
| weeks | array | ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] |
| months | array | ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] |
| minimalist | boolean | false |
| disabledDays | array | [] | ["2021-03-20", "2021-03-10"] |


## Events

| Name | Return |
| --- | --- |
| dayClicked | an object as long as the day clicked |
| itemClicked | an object containing the title and day of the item clicked |
| prevMonthClicked | a json object with the start date and end date shown on the calendar |
| nextMonthClicked | a json object with the start date and end date shown on the calendar |

## API

```
<template>
    <EasyCalendar 
      ...
      ref="calendar"
    />


</template>

<script>
    import EasyCalendar from 'easy-vue-calendar'
    export default {
        name: 'App',
        components: {
            EasyCalendar
        },
        ...

        methods: {
            nextMonth () {
                this.$refs.calendar.nextMonth() // <--- change next month
            },
            prevMonth () {
                this.$refs.calendar.prevMonth() // <--- change prev month
            }
        }
    }
</script>
```