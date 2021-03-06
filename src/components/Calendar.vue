<template>
  <div class="container">
    <div class="header-calendar">
      <div class="control-calendar left" v-if="showButtonsHeader"><button class="calendar-button ripple calendar-btn-primary" @click="prevMonth()">{{ textButtonPrev }}</button></div>
      <div class="control-calendar center"> {{ getNameMonth() }} {{ dataSerach.split('-')[0] }} </div>
      <div class="control-calendar right" v-if="showButtonsHeader"><button class="calendar-button ripple calendar-btn-primary" @click="nextMonth()">{{ textButtonNext }}</button></div>
    </div>
    <div class="calendar">
      <div class="container-calendar">
        <div class="header-week">
            <div class="col-week-name" v-for="(week, i) in weeks" :key="i">
              {{ week }}
            </div>
        </div>
        <div class="row-week" v-for="(week, index) in days" :key="index">
          <div
            :class="`col-day ${parseInt(day) < 0 ? 'dazzledDay' : ''} ${checkDisabled(day) ? 'disabledDay' : ''}`"
            v-for="(day, indexDay) in week" :key="indexDay"
          >
            <div :class="`container-day`" v-if="parseInt(day) > 0">
                <span
                  :class="`${getFullDay(day) == value ? 'toDay' : ''} day`"
                  @click="dayClick(day)"
                >
                  {{ pad_with_zeroes(day, 2) }}
                </span>
                <button
                  class="calendar-btn-plus calendar-btn-primary"
                  v-if="parseInt(day) > 0 && showButtonAdd && !checkDisabled(day) && !minimalist"
                  @click="dayClick(day)"
                >
                  +
                </button>
            </div>
            <div class="item-container">
              <div
                v-for="(item, indexItem) in getItemsInDay(day)"
                :key="indexItem"
                class="chipItem"
                @click="itemClicked(item)"
                :style="`
                  ${item.background ? 'background-color: ' + item.background + ';' : ''}
                  ${item.color ? 'color: ' + item.color + ';' : ''}
                `"
              >
                {{ item.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import * as getAllDays from './../helpers/getAllDays'
export default {
  name: 'EasyVueCalendar',
  props: {
    value: {
      default: dayjs().format('YYYY-MM-DD')
    },
    items: {
      default: () => [],
      type: Array
    },
    weeks: {
      type: Array,
      default: () => (['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
    },
    months: {
      type: Array,
      default: () => (['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])
    },
    textButtonPrev: {
      default: 'Prev',
      type: String
    },
    textButtonNext: {
      default: 'Next',
      type: String
    },
    showButtonsHeader: {
      type: Boolean,
      default: true
    },
    showButtonAdd: {
      type: Boolean,
      default: true
    },

    disabledDays: {
      type: Array,
      default: () => []
    },

    minimalist: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      days: [],
      toDay: dayjs(),
      dataSerach: dayjs().format('YYYY-MM-DD'),
      menu: false,
      errors: {},
    }
  },
  methods: {
    getRangeDates () {
      const initDay = this.days[0][0]
      let rangeDate = {}
      if (parseInt(initDay) < 0) {
        rangeDate.dateStart = dayjs(this.dataSerach).add(-1, 'M').set('date', Math.abs(initDay)).format('YYYY-MM-DD')
      } else {
        rangeDate.dateStart = dayjs(this.dataSerach).set('date', Math.abs(initDay)).format('YYYY-MM-DD')
      }

      const dateEnd = this.days[this.days.length - 1][this.days[this.days.length - 1].length - 1]

      if (dateEnd < 0) {
        rangeDate.dateEnd = dayjs(this.dataSerach).add(1, 'M').set('date', Math.abs(dateEnd)).format('YYYY-MM-DD')
      } else {
        rangeDate.dateEnd = dayjs(this.dataSerach).set('date', Math.abs(dateEnd)).format('YYYY-MM-DD')
      }
      return rangeDate
    },
    getMonth () {
      this.days = getAllDays(dayjs(this.dataSerach).format('YYYY'), dayjs(this.dataSerach).format('MM'))
    },
    getNameMonth () {
      return this.months[parseInt(dayjs(this.dataSerach).format('MM')) - 1]
    },
    async prevMonth () {
      this.dataSerach =  dayjs(this.dataSerach).add(-1, 'M').format('YYYY-MM-DD')
      this.getMonth()
      this.$emit('prevMonthClicked', this.getRangeDates())
      this.getRangeDates()
    },
    async nextMonth () {
      this.dataSerach =  dayjs(this.dataSerach).add(1, 'M').format('YYYY-MM-DD')
      this.getMonth()
      this.$emit('nextMonthClicked', this.getRangeDates())
    },
    dayClick (day) {
      if (this.checkDisabled(day)) return

      this.$emit('dayClicked', this.getFullDay(day))
      this.$emit('input',this.getFullDay(day))
    },

    getFullDay (day) {
      return `${this.dataSerach.split('-')[0]}-${this.dataSerach.split('-')[1]}-${this.pad_with_zeroes(Math.abs(day), 2)}`
    },

    itemClicked(item) {
      this.$emit('itemClicked', item)
    },
    pad_with_zeroes(number, length) {
      let my_string = '' + number;
      while (my_string.length < length) {
          my_string = '0' + my_string;
      }
      return my_string
    },
    getItemsInDay (day) {
      return this.items.filter(i => dayjs(i.day).format('YYYY-MM-DD') == dayjs(this.dataSerach).set('date', day).format('YYYY-MM-DD'))
    },

    checkDisabled (day) {
      return this.disabledDays.includes(this.getFullDay(day))
    }
  },
  mounted() {
    this.getMonth()
  },
}
</script>

<style scoped>
  .container {
    width: 100%;
  }

  .calendar {
    width: 100%;
    overflow-x: auto
  }

  .container-calendar {
    min-width: 650px
  }

  .row-week{
    display: flex;
    border-left: #e0e0e0 1px solid;
    border-bottom: #e0e0e0 1px solid;
    width: 100%;
    box-sizing: border-box;
  }

  .header-week {
    display: flex;
    border-left: #e0e0e0 1px solid;
    width: 100%;
    box-sizing: border-box;
  }

  .col-day, .col-week{
    flex: 1;
    padding: 5px;
    border-right: #e0e0e0 1px solid;
    overflow: hidden;
    min-height: 100px;
  }

  .dazzledDay {
    background-color: #fcf3f3;
    color: #666;
  }

  .disabledDay {
    background-color: #fcf3f3;
    color: #666;
  }

  .day:hover {
    cursor: pointer;
  }

  .col-week-name{
    flex: 1;
    padding: 5px;
    border-right: #e0e0e0 1px solid;
  }

  .container-day {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .item-container{
    width: 100%;
  }

  .header-calendar{
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 10px 0px;
    box-sizing: border-box;
  }

  .control-calendar {
    flex: 1
  }

  .center {
    text-align: center
  }

  .right {
    text-align: right
  }

  .left {
    text-align: left
  }

  .toDay {
    border: 1px solid #000;
    padding: 8px;
    border-radius: 50%;
    cursor: pointer;
  }

  .chipItem {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    color: #fff;
    max-width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    position: static;
    background-color: #2196f3;
  }

  .ripple {
    background-position: center;
    transition: background 0.8s;
  }

  .ripple:hover {
    background: #47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%) center/15000%;
  }

  .ripple:active {
    background-color: #6eb9f7;
    background-size: 100%;
    transition: background 0s;
  }

  .calendar-btn-primary {
    background-color: #2196f3;
    color: white;
  }

  .calendar-btn-primary:focus {
    outline: 0px;
    cursor: pointer;
  }

  .calendar-button {
    border: none;
    border-radius: 2px;
    padding: 12px 18px;
    font-size: 16px;
    text-transform: uppercase;
    outline: none;
  }

  .calendar-btn-plus {
    height: 25px !important;
    width: 25px !important;
    border: 1px solid rgb(212, 212, 212);
    border-radius: 25px;
  }

</style>