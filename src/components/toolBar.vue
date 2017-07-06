<template>
<el-row>
  <el-col :span="5" style="margin-left:2%">
		<el-radio-group v-model="action">
	    <el-radio :label="0">复归</el-radio>
	    <el-radio :label="1">报警</el-radio>
	  </el-radio-group>
		<el-radio-group v-model="retransmission">
	    <el-radio :label="0">未转发</el-radio>
	    <el-radio :label="1">已转发</el-radio>
	  </el-radio-group>
	</el-col>
	<el-col :span="6" :offset="7">
  	<el-input placeholder="请输入内容" v-model="searchContent" size="mini">
	    <el-button slot="prepend" icon="search" size="mini">搜索</el-button>
	    <el-select  style="width:95px" v-model="searchType" slot="append" placeholder="类型" >
	      <el-option label="站点名称" value="0"></el-option>
	      <el-option label="站点编号" value="1"></el-option>
	      <el-option label="区域" value="2"></el-option>
	    </el-select>
	  </el-input>
  </el-col>
	<el-col :span="5" >
		<el-date-picker
			style="width:100%"
	    v-model="searchTime"
	    size="mini"
	    type="datetimerange"
	    :picker-options="pickerOptions2"
	    placeholder="选择时间范围"
	    align="right">
	  </el-date-picker>
	</el-col>
	
</el-row>
</template>
<script>
export default {
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
      searchTime: '',
      action: "",
      retransmission: 1,
      searchType: "0",
      searchContent: "",
    };
  }
};
</script>