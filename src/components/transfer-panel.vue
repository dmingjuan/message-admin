<template>
  <div class="el-transfer-panel" :class="{custom_height: customQuery}">
    <p class="el-transfer-panel__header">{{ title }}</p>
    
    <div class="el-transfer-panel__body">     
        <el-input
        class="el-transfer-panel__filter"
        v-model="search"
        size="small"
        :placeholder="placeholder"
        style="padding-right:5%"
        v-if="customQuery&&filterable&&(!original)">
        <el-button slot="append" icon="search" type="primary" @click="doSearch"></el-button>
        </el-input>
        <el-input
        class="el-transfer-panel__filter"
        v-model="query"
        size="small"
        :placeholder="placeholder"
        @mouseenter.native="inputHover = true"
        @mouseleave.native="inputHover = false"
        @click="clearQuery"
        v-else></el-input>
      <el-checkbox-group
        v-model="checked"
        v-show="!hasNoMatch && data.length > 0"
        :class="{ 'is-filterable': filterable }"
        class="el-transfer-panel__list" :style="customgroupHeight">
        <el-checkbox
          class="el-transfer-panel__item"
          :label="item[keyProp]"
          :disabled="item[disabledProp]"
          :key="item[keyProp]"
          v-for="item in filteredData">
          <option-content :option="item"></option-content>
        </el-checkbox>
      </el-checkbox-group>
      <p
        class="el-transfer-panel__empty"
        v-show="hasNoMatch">{{ t('el.transfer.noMatch') }}</p>
      <p
        class="el-transfer-panel__empty"
        v-show="data.length === 0 && !hasNoMatch">{{ t('el.transfer.noData') }}</p>
    </div>
    
    <p class="el-transfer-panel__footer" style="height:50px">
      <el-checkbox
        v-model="allChecked"
        @change="handleAllCheckedChange"
        :indeterminate="isIndeterminate">{{ checkedSummary }}</el-checkbox>
      <slot></slot>
    </p>
  </div>
</template>

<script>
  import ElCheckboxGroup from 'element-ui/packages/checkbox-group';
  import ElCheckbox from 'element-ui/packages/checkbox';
  import ElInput from 'element-ui/packages/input';
  import Locale from 'element-ui/src/mixins/locale';

  export default {
    mixins: [Locale],

    name: 'ElTransferPanel',

    componentName: 'ElTransferPanel',

    components: {
      ElCheckboxGroup,
      ElCheckbox,
      ElInput,
      OptionContent: {
        props: {
          option: Object
        },
        render(h) {
          const getParent = vm => {
            if (vm.$options.componentName === 'ElTransferPanel') {
              return vm;
            } else if (vm.$parent) {
              return getParent(vm.$parent);
            } else {
              return vm;
            }
          };
          const parent = getParent(this);
          return parent.renderContent
            ? parent.renderContent(h, this.option)
            : h("span", this.option[parent.labelProp] || this.option[parent.keyProp])
        }
      }
    },

    props: {
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      renderContent: Function,
      placeholder: String,
      title: String,
      filterable: Boolean,
      footerFormat: Object,
      filterMethod: Function,
      defaultChecked: Array,
      props: Object,
      customQuery: {
        type: Boolean,
        default: false
      },
      searchFunction: Function,
      original: {
        type: Boolean,
        default: true
      }

    },

    data() {
      return {
        checked: [],
        allChecked: false,
        query: '',
        inputHover: false,
        search: "",
      };
    },

    watch: {
      checked(val) {
        this.updateAllChecked();
        this.$emit('checked-change', val);
      },

      data() {
        const checked = [];
        const filteredDataKeys = this.filteredData.map(item => item[this.keyProp]);
        this.checked.forEach(item => {
          if (filteredDataKeys.indexOf(item) > -1) {
            checked.push(item);
          }
        });
        this.checked = checked;
      },

      checkableData() {
        this.updateAllChecked();
      },

      defaultChecked: {
        immediate: true,
        handler(val, oldVal) {
          if (oldVal && val.length === oldVal.length &&
            val.every(item => oldVal.indexOf(item) > -1)) return;
          const checked = [];
          const checkableDataKeys = this.checkableData.map(item => item[this.keyProp]);
          val.forEach(item => {
            if (checkableDataKeys.indexOf(item) > -1) {
              checked.push(item);
            }
          });
          this.checked = checked;
        }
      }
    },

    computed: {
      customgroupHeight() {
        return this.customQuery?{'height': '300px'}:{}
      },
      filteredData() {
        return this.data.filter(item => {
          if (typeof this.filterMethod === 'function') {
            return this.filterMethod(this.query, item);
          } else {
            const label = item[this.labelProp] || item[this.keyProp].toString();
            return label.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
          }
        });
      },

      checkableData() {
        return this.filteredData.filter(item => !item[this.disabledProp]);
      },

      checkedSummary() {
        const checkedLength = this.checked.length;
        const dataLength = this.data.length;
        const { noChecked, hasChecked } = this.footerFormat;
        if (noChecked && hasChecked) {
          return checkedLength > 0
            ? hasChecked.replace(/\${checked}/g, checkedLength).replace(/\${total}/g, dataLength)
            : noChecked.replace(/\${total}/g, dataLength);
        } else {
          return checkedLength > 0
            ? this.t('el.transfer.hasCheckedFormat', { total: dataLength, checked: checkedLength })
            : this.t('el.transfer.noCheckedFormat', { total: dataLength });
        }
      },

      isIndeterminate() {
        const checkedLength = this.checked.length;
        return checkedLength > 0 && checkedLength < this.checkableData.length;
      },

      hasNoMatch() {
        return this.query.length > 0 && this.filteredData.length === 0;
      },

      inputIcon() {
        return this.query.length > 0 && this.inputHover
          ? 'circle-close'
          : 'search';
      },

      labelProp() {
        return this.props.label || 'label';
      },

      keyProp() {
        return this.props.key || 'key';
      },

      disabledProp() {
        return this.props.disabled || 'disabled';
      }
    },

    methods: {
      updateAllChecked() {
        const checkableDataKeys = this.checkableData.map(item => item[this.keyProp]);
        this.allChecked = checkableDataKeys.length > 0 &&
          checkableDataKeys.every(item => this.checked.indexOf(item) > -1);
      },

      handleAllCheckedChange(value) {
        this.checked = value.target.checked
          ? this.checkableData.map(item => item[this.keyProp])
          : [];
      },

      clearQuery() {
        if (this.inputIcon === 'circle-close') {
          this.query = '';
        }
      },
      doSearch() {
        console.log(this.search)
        if(this.search !== "" && this.searchFunction){
          this.searchFunction(this.search)
        }
      }
    }
  };
</script>
<style type="text/css">
.custom_height {
  height:400px;
  width: 250px
}
</style>
