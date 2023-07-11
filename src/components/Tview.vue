<script setup>
import TT from "./TT.vue"
import axios from "axios"
import { ref } from "vue";
import { useRoute } from "vue-router";
const resu=useRoute()
const result=ref([])
const result2=ref("")
const result3=ref("")
const objects=[]
const Cols=[]
const x=ref([])
const payload=ref({})
const key=ref(true)
const des=async()=>{
    await axios.get(`http://localhost:5000/view/des/${resu.params.tname}`).then((res)=>{
        result3.value=res.data.Table.KeySchema
        for (const b in result3.value){
            x.value.push(result3.value[b].AttributeName)
        }
        console.log(payload.value);
     }).catch((err)=>{console.log(err);
    result.value="Fail"})
}
des()
  const list=async()=>{
     //const payload={Sname:"New2",Saddr:"HSR"}
     //await axios.post(`http://localhost:5000/insert/${resu.params.tname}`,payload).then(()=>{}).catch(()=>{})
    await axios.get(`http://localhost:5000/view/${resu.params.tname}`).then((res)=>{
        console.log(res.data)
        result.value=res.data
        for(const i in result.value){
            objects.push(result.value[i])
        }
        console.log(objects)

    }
    ).catch((err)=>{console.log(err);})
  }
  list()
  const deleter=async(ls,ds)=>{
    for(const i in x.value){
        console.log(x.value[i]);
        if (ls[i] == x.value[i]){
        payload.value[ls[i]]=ds[i].S}
    }
    console.log(payload.value)
    await axios.post(`http://localhost:5000/del/${resu.params.tname}`,payload.value).then((res)=>{
        console.log(res.data)
        result2.value="deleted"
        list()

    }).catch((err)=>{console.log(err);
    result2.value="failed to delete"})
  }
</script>
<template>
  <v-responsive class="fill-height d-flex flex-row flex-wrap align-center text-center fill-height">

      <div class=" text-body-4 font-weight-light mb-n1">{{ resu.params.tname }} table</div>
      <br>
      <v-row class="d-flex flex-row align-center justify-center" v-for="ob in result">
        <v-col class="border" cols="10">
      <TT :cols="ob" :key="key" @del="deleter"></TT>
    </v-col>
</v-row>

      <div class="py-14" >
       <v-btn color="primary"
            :to="{name:'Insert',params:{tname :resu.params.tname }}"
            min-width="228"
            size="x-large"
            variant="flat">
        Insert
       </v-btn>
      </div>

     
  </v-responsive>
</template>


