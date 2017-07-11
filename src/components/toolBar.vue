<template>
<el-row>  
  <el-col :span="8" class="_toolbar_pad_right" style="padding-left:3px;">
    <el-date-picker
      style="width:100%"
      v-model="searchTime"
      size="mini"
      type="datetimerange"
      :picker-options="pickerOptions2"
      placeholder="选择时间范围"
      align="left">
    </el-date-picker>
  </el-col> 
  <el-col :span="(actionGroup && retransmissionGroup)?6:3" class="_toolbar_pad_right">
    <!-- <el-radio-group size="large" v-model="action" v-if="actionGroup">
      <el-radio :label="0">复归</el-radio>
      <el-radio :label="1">报警</el-radio>
    </el-radio-group> -->
    
    <!-- <el-radio-group size="small" v-model="retransmission" v-if="retransmissionGroup">
      <el-radio :label="0">未转发</el-radio>
      <el-radio :label="1">转发成功</el-radio>
      <el-radio :label="2">转发失败</el-radio>
    </el-radio-group> -->
    <el-row>
      <el-col :span="(actionGroup && retransmissionGroup)?12:24">
        <el-select  v-model="selectedRetrans" v-if="retransmissionGroup" 
          placeholder="转发状态" size="mini">
          <el-option label="未转发" :value="0"></el-option>
          <el-option label="转发成功" :value="1"></el-option>
          <el-option label="转发失败" :value="2"></el-option>
          <el-option label="全部" :value="-1"></el-option>
        </el-select>
      </el-col>
      <el-col :span="(actionGroup && retransmissionGroup)?12:24">
        <el-select  v-model="selectedAction" v-if="actionGroup" 
          placeholder="报警动作" size="mini" >
          <el-option label="复归" :value="0"></el-option>
          <el-option label="动作" :value="1"></el-option>
          <el-option label="全部" :value="-1"></el-option>
        </el-select>
      </el-col>
    </el-row>
  </el-col>  
  
	<el-col :span="(actionGroup && retransmissionGroup)?8:11" class="_toolbar_pad_right">
    <el-input placeholder="请输入内容" v-model="searchContent" size="mini">      
      <el-select  style="width:95px" v-model="selectedSiteType" slot="append" placeholder="类型" >
        <el-option label="站点名称" :value="0"></el-option>
        <el-option label="站点编号" :value="1"></el-option>
      </el-select>
    </el-input>
  </el-col>
  <el-col :span="1" class="_toolbar_pad_right">
    <el-button icon="search" size="mini" @click.native="handleSearch">搜索</el-button>
  </el-col>
</el-row>
</template>
<script>
export default {
  props: {
    actionGroup:{
      type: Boolean,
      default: true
    },
    retransmissionGroup: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      // value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      // action: "",
      // retransmission: 1,
      searchTime: '',
      selectedAction: "",
      selectedRetrans: "",
      searchContent: "",
      selectedSiteType: 0,
    };
  },
  methods: {
    handleSearch() {
      let searchBean = {}
      if(this.searchTime) {
        searchBean.startTime = this.searchTime[0].getTime()
        searchBean.endTime = this.searchTime[1].getTime()
      }
      if(this.actionGroup && (this.selectedAction != -1) && (this.selectedAction !== "")){
        searchBean.action = this.selectedAction
      }
      if(this.retransmissionGroup && (this.selectedRetrans != -1) && (this.selectedRetrans !== "")){
        searchBean.retransmission = this.selectedRetrans
      }
      if(this.searchContent){
        const t = ["siteName", "siteNumber"]
        searchBean[t[this.selectedSiteType]] = this.searchContent
      }
      this.$emit("query", searchBean)
    },
    clearFilter() {
      this.searchTime = ""
      this.selectedAction = ""
      this.selectedRetrans = ""
      this.searchContent = ""
      this.selectedSiteType = ""
    }
  }
};
</script>
<style type="text/css">
._toolbar_pad_right {
  padding-right: 2px;
}
</style>

