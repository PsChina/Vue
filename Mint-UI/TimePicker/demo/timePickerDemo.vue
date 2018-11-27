<template>
    <div class="report-sales">
        <pickder-view  
          v-show="showTimePicker"
          :years="timeList[0]"
          :months="timeList[1]"
          :days="days"
          @change="valueChange"></pickder-view>     
    </div>
</template>

<script>
import pickderView from '../TimePikcer'
export default {
  data() {
    const years = {
      flex: 1,
      values: [],
      defaultIndex: 20,
      className: 'years',
      textAlign: 'center'
    }
    const fullYear = new Date().getFullYear()
    for (let i = fullYear - 20; i <= fullYear; i++) {
      years.values.push(`${i}年`)
    }
    const month = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    const daysVal = []
    const maxDay = this.getDaysByYearAndMonth(Number.parseInt(years.values[0]), 1)
    for (let i = 1; i <= maxDay; i++) {
      daysVal.push(`${i}日`)
    }
    const timeList = [years, {flex: 1, values: month, className: 'months', textAlign: 'center'}]
    return {
      showTimePicker: false,
      timeList,
      current: {
        year: new Date().getFullYear(),
        month: 1
      },
      days: {
        flex: 1,
        values: daysVal,
        className: 'datas',
        textAlign: 'center'
      }
    }
  },
  methods: {
    toggleTimePicker() {
      this.showTimePicker = !this.showTimePicker
    },
    valueChange(vNode, values) {
      if (this.current.year !== values[0] || this.current.month !== values[1]) {
        const dayNum = this.getDaysByYearAndMonth(Number.parseInt(values[0]), Number.parseInt(values[1]))
        let dayNumArr = []
        for (let i = 1; i <= dayNum; i++) {
          dayNumArr.push(`${i}日`)
        }
        this.days.values = dayNumArr
        this.current.year = values[0]
        this.current.month = values[1]
      }
      const selectDay = `${Number.parseInt(values[0])}/${Number.parseInt(values[1])}/${Number.parseInt(values[2])}`
    },
    getDaysByYearAndMonth(year, month) {
      let isLeapYear = false
      if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
        isLeapYear = true
      }
      let dayNum = 30
      switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          dayNum = 31;
          break
        case 2:
          if (isLeapYear) {
            dayNum = 29
          } else {
            dayNum = 28
          }
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          dayNum = 30;
          break;
        default:
          break
      }
      return dayNum
    }
  },
  components: {
    pickderView
  }
}
</script>

<style lang="scss">
    .report-sales {
        width: 100%;
        height: 100%;
        background: white;
        color: black;
    }
    .report-time{
      text-align: center;
      font-size: .16rem;
      height: .5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      border-bottom: 1px solid #D4D4D4
    }
    .years, .months, .datas {
      font-size: 16px;
    }
</style>
