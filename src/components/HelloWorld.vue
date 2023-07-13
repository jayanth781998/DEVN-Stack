<script setup>
import axios from "axios";
import { ref } from "vue";
const inp = ref("");
const inp2 = ref("");
const resu = ref("");
const comp = ref(false);
const add=ref("+")
const inpv = ref("");
const mod = () => {
  comp.value=!comp.value
  if(add.value=="+")
  {
  add.value="-"}
  else{
    add.value="+"
    inpv.value=""
  }
  
};
const create = async () => {
  let payload = { PK: {key :inp2.value, keyT:"HASH" }};
  if(inpv.value !== ""){
    payload.CK={key:inpv.value,keyT:"range"}
  }
  console.log(payload);
  await axios
    .post(`http://localhost:5000/create/${inp.value}`, payload)
    .then((res) => {
      console.log(res.data);
      if (res.data == "Success") {
        resu.value = "SUCCESS";
      } else {
        resu.value = "Fail";
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <div class="text-body-2 font-weight-light mb-n1">Create Your table</div>

      <h1 class="text-h2 font-weight-bold">DB Managers</h1>

      <div class="py-14">
        <v-col  cols="12">
        <v-text-field v-model="inp" label="table name"></v-text-field>
        <v-text-field v-model="inp2" label="Key attribute name"></v-text-field></v-col>
        <v-col  cols="12">
          <v-text-field v-if="comp"
            v-model="inpv"
            label="Composite Attribute Name"
          ></v-text-field
        ></v-col>
        <v-btn
          color="primary"
          @click="mod"
          min-width="228"
          size="x-large"
          variant="flat"
        >
        {{ add }}
        </v-btn>
      </div>

      <v-row class="d-flex flex-wrap align-center justify-center">
        <v-col cols="auto">
          <v-btn
            color="primary"
            @click="create"
            min-width="228"
            size="x-large"
            variant="flat"
          >
            create
          </v-btn>
        </v-col>
        <v-col cols="auto"
          ><v-btn
            color="primary"
            to="List"
            min-width="228"
            size="x-large"
            variant="flat"
          >
            View tables
          </v-btn></v-col
        >
      </v-row>
      <br />
      <h1 class="text-h4 font-weight-bold">{{ resu }}</h1>
      <v-row></v-row>
    </v-responsive>
  </v-container>
</template>
