<template>

    <div class="storage-counter-view-wrapper">
        <div class="storage-counter-view-container">
            <StorageCounter v-for="sid in counterList" :key="sid" :sid="sid" @deleteSid='handleDelete' />
            <div class="counter" >
                <div class="plus" @click="addCounter">
                    <Plus style="width: 32px; height: 32px;" />
                </div>
            </div>
            
        </div>
    </div>
</template>
<script setup>
import { reactive } from 'vue';
    const counterList = reactive([])
    let thisSid = 1
    const addCounter = (e)=>{
        counterList.push(`00${thisSid}`)
        thisSid++
    }
    const handleDelete = (e)=>{
        const index = counterList.findIndex(i=>i==e)
        counterList.splice(index,1)
    }
    
</script>
<script>
import StorageCounter from '../components/StorageCounter.vue'
export default {
    components:[StorageCounter]
}
</script>

<style scoped lang='less'>
.storage-counter-view-wrapper {
    padding-left: 16px;
    .storage-counter-view-container {
        display: flex;
        flex-wrap: wrap;
        .counter {
            height: 400px;
            width: 180px;
            border: 1px dashed black;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 16px;
            margin-bottom: 16px;
            .plus {
                border: 1px dashed black;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }
        }
    }
}
</style>
