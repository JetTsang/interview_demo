<template>
  <div class="counter">
    <div class="counter-delete" @click="deleteSid">
      <el-icon><Close /></el-icon>
    </div>
    <div class="counter-header">
      <div class="counter-header--wrapper">
        <span>NAME:{{props.sid}}</span>
        <span>COUNT:{{count}}</span>
      </div>
    </div>
    <div class="counter-btn">
      <el-button :disabled="disabled" v-for="item in btnListOnshow" :key="item.label" @click="clickBtn(item.msg)" class="add-counter-btn">{{item.label}}</el-button>
    </div>
    <el-button class="add-counter-btn" @click="addCalcBtn"
      >新增计数按钮</el-button
    >
    <el-dialog v-model="dialogFormVisible" title="添加按钮" destroy-on-close @close="handleClose">
        <el-form :model="btnType">
            <el-form-item label="运算" :label-width="140">
                <el-select v-model="btnType.type" placeholder="Please select a zone">
                <el-option label="+" value="+" />
                <el-option label="-" value="-" />
                </el-select>
            </el-form-item>
            <el-form-item label="数字" :label-width="140">
                <el-input v-model="btnType.num" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="cancelDialog">Cancel</el-button>
                <el-button type="primary" @click="confirmDialog">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive,ref,computed,defineEmits,defineProps,onMounted } from "vue";
import { throttle } from '../utils'
import { getSid, setSid } from '../mock/counterMock'
const dialogFormVisible = ref(false)
const disabled = ref(false)
const calcQueue = []
const emit = defineEmits(['deleteSid'])
const props = defineProps({sid:String})
onMounted(()=>{
    getCountState(deleteSid)
})

const getCountState = (errCB)=>{
    let retry = 0 
    const retryTimes = 3
    disabled.value = true
    getSid(props.sid).then(res=>{
        count.value  = res.value
        disabled.value = false
    },()=>{
        if(retry > retryTimes){
            errCB()
            disabled.value = false
        }else{
            retry++ 
            getCountState(errCB)
        }
    })
}

const btnType = reactive({
    type:'+',
    num:1
})
const btnList = reactive([]);
const count = ref(0)
const btnListOnshow = computed(()=>{
    return btnList.map(i=>{
        return {
            label:`${i.type} ${i.num}`,
            msg:{
                ...i
            }
        }

    })
})

const addCalcBtn = () => {
  dialogFormVisible.value  = !dialogFormVisible.value
};
const confirmDialog = () => {
  btnList.push({...btnType});
  dialogFormVisible.value  = !dialogFormVisible.value
};
const cancelDialog = () => {
  dialogFormVisible.value  = !dialogFormVisible.value
};
const handleClose = ()=>{
    btnType.num = 1
    btnType.type = '+'
}
const clickBtn = (msg)=>{
    calcQueue.push(msg)
    postCountAndRefreshState()
}

// 合并队列并请求
const postCountAndRefreshState = throttle(()=>{
    disabled.value = true
    let str = count.value
    calcQueue.forEach(i=>{
        str  =  str + i.type + i.num
    })
    const res = eval(str)
    let value = res - count.value
    let action = 'plus'
    if(value < 0) {
        action  = 'minus'
        value  = Math.abs(value)
    }
    count.value = res
    setSid({sid:props.sid,action,value}).then(res=>{
        console.log(res);
        // 这里建议：最好是POST /api/v1/scaler接口返回最新状态
    }).catch(err=>{
        console.log(err);
        getCountState()
    }).finally(()=>{
        calcQueue.length = 0 
        disabled.value = false
    })
},200)


const deleteSid = ()=>{
    emit('deleteSid',props.sid)
}
</script>

<style lang="less" scoped>
.counter {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 4px;
  box-sizing: border-box;
  .counter-header {
    height: 200px;
    width: 100%;
    padding: 16px 8px 0px 8px;
    box-sizing: border-box;
    .counter-header--wrapper {
      border: 1px dashed black;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      & :nth-child(1) {
        margin-bottom: 16px;
      }
    }
  }
  .counter-btn {
    height: 150px;
    width: 100%;
    padding-top: 16px;
  }
  .counter-delete {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
    .el-icon {
      // border: 1px solid black;
      // border-radius: 50%;
    }
  }
}
</style>