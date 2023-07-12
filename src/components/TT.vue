<script setup>
import {ref} from "vue"
defineProps({cols:{
    type:Object,
},keys:{
    type:Boolean,
}})
const emit=defineEmits(["del","update"])
const vals=ref({})
const edit=ref(false)
var z={}
const fnc=()=>{
    edit.value=!edit.value
    //emit('update',Object.keys(cols),Object.values(cols))
}
const fnc2=(cols)=>{
    const x=Object.keys(z)
    for (const i of Object.keys(cols)){
        
        if(i in z ==false){
            z[i]=cols[i]
        }
}
console.log(z);
emit('update',z)
edit.value=!edit.value
}
// const set=()=>{
//     for(const i of Object.keys(this.cols)){
//     z[i]=this.cols[i]}
// console.log(z)
// }
// set()
const sett=(e,x)=>{
    z[x]={S:e}
}
</script>
<template>
        <v-table >
            <thead class="border">
                <th v-for="v in Object.keys(cols)">{{ v }}</th>
                <th >DELETE</th>
                <th >EDIT</th>
            </thead>
            <tbody>
                <tr class="border"><td v-for="x in Object.keys(cols)">
                    <input class="border" v-if="edit" type="text" :value="cols[x].S" @input="sett($event.target.value,x)"/>
                    <span v-else>{{ cols[x].S }}</span></td>
                <td><v-btn color="primary" @click="$emit('del',Object.keys(cols),Object.values(cols))">Delete</v-btn></td>
                <td><v-btn v-if="!edit" color="primary" @click="fnc">Edit</v-btn>
                    <v-btn v-else color="primary" @click="fnc2(cols)">Submit</v-btn></td></tr>
            </tbody>
        </v-table>
        <br>
</template>



<style lang="scss" scoped>

</style>