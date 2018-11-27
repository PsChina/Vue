<template>
    <div class="time-picker">
     <mt-picker class="picker-item" :slots="[years]" @change="yearChange"></mt-picker>  
     <mt-picker class="picker-item" :slots="[months]" @change="monthChange"></mt-picker>     
     <mt-picker class="picker-item" :slots="[days]" @change="dayChange"></mt-picker>
    </div>
</template>

<script>
export default {
  props: {
    years: {
      type: Object
    },
    months: {
      type: Object
    },
    days: {
      type: Object
    }
  },
  data() {
    const values = []
    if (this.years) {
      values[0] = this.years[ this.years.defaultIndex || 0 ]
    }
    if (this.months) {
      values[1] = this.years[ this.years.defaultIndex || 0 ]
    }
    if (this.days) {
      values[2] = this.years[ this.years.defaultIndex || 0 ]
    }
    return {
      values
    }
  },
  methods: {
    yearChange(vNode, values) {
      this.values[0] = values[0]
      this.$emit('change', vNode, this.values)
    },
    monthChange(vNode, values) {
      this.values[1] = values[0]
      this.$emit('change', vNode, this.values)
    },
    dayChange(vNode, values) {
      this.values[2] = values[0]
      this.$emit('change', vNode, this.values)
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
        display: flex;
        .picker-item{
          flex: 1;
          height: 2rem;
        }
    }
</style>
