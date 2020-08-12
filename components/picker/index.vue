<template>
  <div>
    <MZOverlay></MZOverlay>
    <transition name="mz-popup-slide-bottom">
      <div class="mz-picker">
        <div v-if="showToolbar" class="mz-picker__toolbar">
          <button type="button" class="mz-picker__cancel" @click="cancel">{{ cancelButtonText }}</button>
          <div class="mz-ellipsis mz-picker__title">标题</div>
          <button type="button" class="mz-picker__confirm" @click="confirm">{{ confirmButtonText }}</button>
        </div>
        <div
          class="mz-picker__columns"
          :style="{ height: `${wrapHeight}px`}"
          @onTouchmove="preventDefault"
        >
            <PickerColumn
                v-for="(item, columnIndex) in formattedColumns"
                :key="columnIndex"
                :value-key="valueKey"
                :allow-html="allowHtml"
                :class-name="item.className"
                :item-height="itemPxHeight"
                :default-index="item.defaultIndex?item.defaultIndex:defaultIndex"
                :swipe-duration="swipeDuration"
                :visible-item-count="visibleItemCount"
                :initial-options="item.values"
                @change="onChange(columnIndex)"
            />    
          <div
            class="mz-picker__mask"
            :style="{backgroundSize: `100% ${(wrapHeight - itemPxHeight) / 2}px`}"
          />
          <div class="mz-hairline-unset--top-bottom mz-picker__frame" :style="{ height: `${itemPxHeight}px` }" />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import PickerColumn from './PickerColumn.vue'
import { unitToPx } from '../utils/unit'
import { preventDefault } from '../utils/event'
const DEFAULT_ITEM_HEIGHT = 44
export default {
  name: 'MZPicker',
  props: {
    show: Boolean,
    title: String,
    loading: Boolean,
    itemHeight: {
      type: [Number, String],
      default: 40
    },
    showToolbar: Boolean,
    cancelButtonText: {
        type:String,
        default: '取消'
    },
    confirmButtonText: {
        type:String,
        default: '确定'
    },
    allowHtml: {
      type: Boolean,
      default: true
    },
    visibleItemCount: {
      type: [Number, String],
      default: 5
    },
    swipeDuration: {
      type: [Number, String],
      default: 1000
    },
    defaultIndex: {
      type: [Number, String],
      default: 0
    },
    columns: {
      type: Array,
      default: function _default() {
        return []
      }
    },
    toolbarPosition: {
      type: String,
      default: 'top'
    },
    valueKey: {
      type: String,
      default: 'text'
    }
  },
  components: {
    PickerColumn
  },
  data() {
    return {
        preventDefault: preventDefault,
        children: [],
        formattedColumns: [{defaultIndex:0}]
    }
  },
  computed: {
    itemPxHeight() {
      return this.itemHeight ? unitToPx(this.itemHeight) : DEFAULT_ITEM_HEIGHT
    },
    wrapHeight(){
        return this.itemPxHeight * this.visibleItemCount
    },
    dataType() {
      const { columns } = this
      const firstColumn = columns[0] || {}

      if (firstColumn.children) {
        return 'cascade'
      }

      if (firstColumn.values) {
        return 'object'
      }

      return 'text'
    }
  },
  watch: {
    columns: {
      handler: 'format',
      immediate: true
    }
  },
  mounted() {},
  methods: {
    format() {
      const { columns, dataType } = this
        console.log('llll',dataType)
      if (dataType === 'text') {
        this.formattedColumns = [{ values: columns }]
      } else if (dataType === 'cascade') {
        this.formatCascade()
      } else {
        this.formattedColumns = columns
      }
    },

    formatCascade() {
      const formatted = []

      let cursor = { children: this.columns }

      while (cursor && cursor.children) {
        const defaultIndex = cursor.defaultIndex !== undefined && cursor.defaultIndex !== null
          ? cursor.defaultIndex
          : +this.defaultIndex

        formatted.push({
          values: cursor.children,
          className: cursor.className,
          defaultIndex
        })

        cursor = cursor.children[defaultIndex]
      }

      this.formattedColumns = formatted
      console.log(this.formattedColumns)
    },

    emit(event) {
      if (this.dataType === 'text') {
        this.$emit(event, this.getColumnValue(0), this.getColumnIndex(0))
      } else {
        let values = this.getValues()
        console.log('values',values)
        // compatible with old version of wrong parameters
        // should be removed in next major version
        // see: https://github.com/youzan/vant/issues/5905
        if (this.dataType === 'cascade') {
          values = values.map(item => item[this.valueKey])
        }

        this.$emit(event, values, this.getIndexes())
      }
    },

    onCascadeChange(columnIndex) {
      let cursor = { children: this.columns }
      const indexes = this.getIndexes()

      for (let i = 0; i <= columnIndex; i++) {
        cursor = cursor.children[indexes[i]]
      }

      while (cursor && cursor.children) {
        columnIndex++
        this.setColumnValues(columnIndex, cursor.children)
        cursor = cursor.children[cursor.defaultIndex || 0]
      }
    },

    onChange(columnIndex) {
      if (this.dataType === 'cascade') {
        this.onCascadeChange(columnIndex)
      }

      if (this.dataType === 'text') {
        this.$emit(
          'change',
          this,
          this.getColumnValue(0),
          this.getColumnIndex(0)
        )
      } else {
        let values = this.getValues()

        // compatible with old version of wrong parameters
        // should be removed in next major version
        // see: https://github.com/youzan/vant/issues/5905
        if (this.dataType === 'cascade') {
          values = values.map(item => item[this.valueKey])
        }

        this.$emit('change', this, values, columnIndex)
      }
    },

    // get column instance by index
    getColumn(index) {
      return this.children[index]
    },

    // @exposed-api
    // get column value by index
    getColumnValue(index) {
      const column = this.getColumn(index)
      return column && column.getValue()
    },

    // @exposed-api
    // set column value by index
    setColumnValue(index, value) {
      const column = this.getColumn(index)

      if (column) {
        column.setValue(value)

        if (this.dataType === 'cascade') {
          this.onCascadeChange(index)
        }
      }
    },

    // @exposed-api
    // get column option index by column index
    getColumnIndex(columnIndex) {
      return (this.getColumn(columnIndex) || {}).currentIndex
    },

    // @exposed-api
    // set column option index by column index
    setColumnIndex(columnIndex, optionIndex) {
      const column = this.getColumn(columnIndex)

      if (column) {
        column.setIndex(optionIndex)

        if (this.dataType === 'cascade') {
          this.onCascadeChange(columnIndex)
        }
      }
    },

    // @exposed-api
    // get options of column by index
    getColumnValues(index) {
      return (this.children[index] || {}).options
    },

    // @exposed-api
    // set options of column by index
    setColumnValues(index, options) {
      const column = this.children[index]

      if (column) {
        column.setOptions(options)
      }
    },

    // @exposed-api
    // get values of all columns
    getValues() {
      return this.children.map(child => child.getValue())
    },

    // @exposed-api
    // set values of all columns
    setValues(values) {
      values.forEach((value, index) => {
        this.setColumnValue(index, value)
      })
    },

    // @exposed-api
    // get indexes of all columns
    getIndexes() {
      return this.children.map(child => child.currentIndex)
    },

    // @exposed-api
    // set indexes of all columns
    setIndexes(indexes) {
      indexes.forEach((optionIndex, columnIndex) => {
        this.setColumnIndex(columnIndex, optionIndex)
      })
    },

    // @exposed-api
    confirm() {
      this.children.forEach(child => child.stopMomentum())
      this.emit('confirm')
    },

    cancel() {
      this.emit('cancel')
    }
  }
}
</script>
