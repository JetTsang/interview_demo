<template>

    <div class="storage-counter-view-wrapper">
        <div class="storage-counter-view-container">
            <div class="counter" :class="setPosition(item)" v-for="item in imgListOnshow" :key="item.index"  >
                <div class="counter-img-wrapper">
                    <img   :src="item.contral"/>
                </div>
                <div class="counter-img-wrapper">
                    <img   :src="item.real"/>
                    <span>{{item.index}}</span>
                </div>
            </div>
        </div>
        <div class="controll-container">
            <el-button class="center-btn" @click="centerModel"
            >中心模式</el-button>
            <el-button class="edge-btn" @click="edgeModel"
            >边缘模式</el-button>
            <div class="uni-btn" >
                <el-button  style="display:block;width:100%;margin:0" 
                >统一模式</el-button>
                <el-button  @click="uniModel('上')"
                >上</el-button>
                <el-button  @click="uniModel('右')"
                >右</el-button>
                <el-button  @click="uniModel('下')"
                >下</el-button>
                <el-button  @click="uniModel('左')"
                >左</el-button>
            </div>

        </div>
    </div>
</template>
<script setup>
import { reactive } from 'vue';
import imgList from '../mock/layoutImgMock'
const position = {
    isTop:false,
    isLeft:false,
    isRight:false,
    isBottom:false,
}
const imgListOnshow = reactive(imgList.map(i=>({...position,...i})))
const setPosition  = (item)=>{
    return {
        top: item.isTop,
        right: item.isRight,
        left: item.isLeft,
        bottom: item.isBottom,
    }
}
// 边缘模式 column-reverse   中心模式 column 
// 统一模式 上右下左 flex-direction width height反过来
const centerModel = ()=>{
    // 只按两行计算
    // 1-4  bottom
        // 5-8  top
    for(let i = 0 ;i < imgListOnshow.length;i++){
        if(i >= 4){
            imgListOnshow[i] = {...imgListOnshow[i],...position,isTop:true}
        }else{
            imgListOnshow[i] = {...imgListOnshow[i],...position,isBottom:true}
        }
    }

}
const edgeModel = ()=>{
    // 只按两行计算
    // 1-4  top
    // 5-8  bottom
    for(let i = 0 ;i < imgListOnshow.length;i++){
        if(i >= 4){
            imgListOnshow[i] = {...imgListOnshow[i],...position,isBottom:true}
        }else{
            imgListOnshow[i] = {...imgListOnshow[i],...position,isTop:true}
        }
    }
}
const uniModel = (key)=>{
    switch (key) {
        case '上':
            for(let i = 0 ;i < imgListOnshow.length;i++){
                imgListOnshow[i] = {...imgListOnshow[i],...position,isTop:true}
            }
            break;
        case '下':
            for(let i = 0 ;i < imgListOnshow.length;i++){
                imgListOnshow[i] = {...imgListOnshow[i],...position,isBottom:true}
            }
            break;
        case '左':
            for(let i = 0 ;i < imgListOnshow.length;i++){
                imgListOnshow[i] = {...imgListOnshow[i],...position,isLeft:true}
            }
            break;
        case '右':
            for(let i = 0 ;i < imgListOnshow.length;i++){
                imgListOnshow[i] = {...imgListOnshow[i],...position,isRight:true}
            }
            break;
    
        default:
            break;
    }
}

</script>

<style scoped lang='less'>
@itemHeight:520px;
@itemWidth:276px;
.horizon(@height,@width){
    width: (@height / 2);
    height: (@width / 2);
    margin-right: 32px;
    .counter-img-wrapper {
        width: 50%;
        height: 90%;
    }
}
.storage-counter-view-wrapper {
    padding-left: 16px;
    position: relative;
    .controll-container {
        position: absolute;
        right: 0;
        top: 100px;
        height: 300px;
        width: 200px;
        border: 1px dashed black;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 16px;
        box-sizing: border-box;
        .el-button {
            margin: 0;
        }
        .uni-btn{
            & :nth-child(1){
                margin: 0;
            }
            .el-button {
                margin-left: 16px;
            }
        }
    }
    .storage-counter-view-container {
        display: flex;
        flex-wrap: wrap;
        .counter {
            height: @itemHeight;
            width: @itemWidth;
            border: 1px dashed black;
            display: flex;
            flex-direction: column;
            margin-right: 16px;
            margin-bottom: 16px;
            &.bottom {
                flex-direction: column;
            }
            &.top {
                flex-direction: column-reverse;
            }
            &.left {
                .horizon(@itemHeight,@itemWidth);
                flex-direction: row-reverse;
            }
            &.right {
                .horizon(@itemHeight,@itemWidth);
                flex-direction: row;
            }
            .counter-img-wrapper {
                height: 50%;
                padding: 8px;
                box-sizing: border-box;
                position: relative;
                img {
                    height: 100%;
                }
                span {
                    position:absolute;
                    bottom: 0;
                    left: 0;
                    margin-left: 8px;
                    margin-bottom: 8px;
                }
            }
        }
    }
}
</style>
