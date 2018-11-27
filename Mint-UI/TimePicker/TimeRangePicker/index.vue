<template>
    <div class="time-picker">
      <div class="operation">
        <div class="cancel" @touchstart="onCancel" v-text="cancelText"></div>
        <div class="confirm" @touchstart="onOk" v-text="okText"></div>
      </div>
      <div class="time-range">
        <div class="range-item" :class="startActive" @touchstart="selectItem('start')">
          <div class="text" v-text="startText"></div>
          <div v-text="startTime"></div>
        </div>
        <div class="range-item" :class="endActive" @touchstart="selectItem('end')">
          <div class="text" v-text="endText"></div>
          <div v-text="endTime"></div>
        </div>
      </div>
      <div class="picker-view">
      <mt-picker class="picker-item" :slots="[years_]" @change="yearChange"></mt-picker>  
      <mt-picker class="picker-item" :slots="[months_]" @change="monthChange"></mt-picker>     
      <mt-picker class="picker-item" :slots="[dates_]" @change="dayChange"></mt-picker>
      </div>      
    </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  props: {
    startYear: {
      type: [Number, String],
      defaults: new Date().getFullYear() - 20
    },
    endYear: {
      type: [Number, String],
      defaults: new Date().getFullYear() + 20
    },
    startText: {
      type: String,
      default: '开始时间'
    },
    endText: {
      type: String,
      default: '结束时间'
    },
    okText: {
      type: String,
      default: '确认'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    toast: {
      type: String,
      default: '结束时间不能早于开始时间'
    },
    dateUnits: {
      type: Array,
      default() {
        return ['', '', '']
      }
    }
  },
  data() {
    const values = [20, 1, 1]
    const thisYear = new Date().getFullYear()
    return {
      values,
      startTime: this.formatTime(new Date(), 'yyyy-MM-dd'),
      endTime: this.formatTime(new Date(), 'yyyy-MM-dd'),
      startActive: 'active',
      endActive: '',
      currentEdit: 'start',
      years_: {
        flex: 1,
        values: [],
        defaultIndex: 20,
        className: 'years',
        textAlign: 'center'
      },
      months_: {
        flex: 1,
        values: [],
        className: 'months',
        textAlign: 'center'
      },
      dates_: {
        flex: 1,
        values: [],
        className: 'datas',
        textAlign: 'center'
      },
      current: {
        year: thisYear,
        month: 1
      }
    }
  },
  created() {
    for (let i = this.startYear; i <= this.endYear; i++) {
      this.years_.values.push(`${i}${this.dateUnits[0]}`)
    }
    for (let i = 1; i <= 12; i++) {
      this.months_.values.push(`${i}${this.dateUnits[1]}`)
    }
    const maxDay = this.getDaysByYearAndMonth(Number.parseInt(this.years_.values[0]), 1)
    for (let i = 1; i <= maxDay; i++) {
      this.dates_.values.push(`${i}${this.dateUnits[2]}`)
    }
  },
  methods: {
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
    },
    updataDates() {
      const values = this.values
      if (this.current.year !== values[0] || this.current.month !== values[1]) {
        const dayNum = this.getDaysByYearAndMonth(Number.parseInt(values[0]), Number.parseInt(values[1]))
        let dayNumArr = []
        for (let i = 1; i <= dayNum; i++) {
          dayNumArr.push(`${i}${this.dateUnits[2]}`)
        }
        this.dates_.values = dayNumArr
        this.current.year = values[0]
        this.current.month = values[1]
      }
    },
    yearChange(vNode, values) {
      this.values[0] = values[0]
      this.updataTime()
      this.updataDates()
    },
    monthChange(vNode, values) {
      this.values[1] = values[0]
      this.updataTime()
      this.updataDates()
    },
    dayChange(vNode, values) {
      this.values[2] = values[0]
      this.updataTime()
      this.updataDates()
    },
    formatTime(time, rule, isCn) {
      return this.easyFilter.date(time, rule, isCn)
    },
    selectItem(type) {
      switch (type) {
        case 'start':
          this.startActive = 'active'
          this.endActive = ''
          this.currentEdit = 'start'
          break
        case 'end':
          this.startActive = ''
          this.endActive = 'active'
          this.currentEdit = 'end'
          break
        default:
          break
      }
    },
    updataTime() {
      let year = Number.parseInt(this.values[0])
      let month = Number.parseInt(this.values[1])
      let day = Number.parseInt(this.values[2])
      month = month > 9 ? month : `0${month}`
      day = day > 9 ? day : `0${day}`
      const time = `${year}/${month}/${day}`
      if (this.currentEdit === 'start') {
        this.startTime = time
      } else {
        this.endTime = time
      }
    },
    onOk() {
      if (this.endTime < this.startTime) {
        Toast(this.toast)
        return
      }
      this.$emit('ok', [this.startTime, this.endTime])
    },
    onCancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
    .time-picker{
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        .picker-view{
            width: 100%;
            display: flex;
            .picker-item{
              flex: 1;
              height: 2rem;
            }
        }
        .operation, .time-range{
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
          border-bottom: 1px solid #D4D4D4;
        }
        .operation {
          height: .42rem;
          padding: 0 .2rem;
          .cancel{
            color: #808080;
            font-size: .16rem;
          }
          .confirm {
            color: #2386EE;
            font-size: .16rem;
          }
        }
        .time-range {
          height: .66rem;
          padding: 0 .35rem;
          font-size: .14rem;
          .range-item {
            height: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .text {
            text-align: center;
            color: #808080;
            font-size: .16rem;
          }
        }
    }
    .active{
      border-bottom: #2386EE .03rem solid
    }
</style>