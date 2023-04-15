
const sidList = [

]
function updateSid(sid,action,value= 0 ){
    const sidItem = sidList.find(i=>i.sid == sid)
    if(!action){
        if(typeof sidItem == 'object'){
            return sidItem
        }else{
            const item = {
                sid,
                value
            }
            sidList.push(item)
            return item
        }
    }else{
        switch(action){
            case 'minus':{
                sidItem.value = sidItem.value - value
                return sidItem
            }
            case 'plus':{
                sidItem.value = sidItem.value + value
                return sidItem
            }
            default :{
                return sidItem
            }
        }
    }
}



export function getSid(sid){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(Math.random()>0.2){
                resolve({
                    ...updateSid(sid),
                    "code":0,
                    "msg":""
                })         
                console.log(sidList)     
            }else{
                reject({
                    "code": -1, "msg": "something wrong!"
                })
            }
        },1)
    })    
}

export function setSid({sid,action,value}){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(Math.random()>0.2){
                resolve({
                    ...updateSid(sid,action,value),
                    "code":0,
                    "msg":""
                })         
                console.log(sidList)     
            }else{
                reject({
                    "code": -1, "msg": "unknown error!"
                })
            }
        },1)
    })
}