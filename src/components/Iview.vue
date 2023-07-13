<script setup>
import TT from "./TT.vue";
import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";
const resu = useRoute();
const result = ref("");
const resultt = ref("");
const con = ref(0);
const inp = ref({});
const inpv = ref({});
const payload = ref({});
const mod = () => {
  con.value++;
  inp.value[con] = "";
  inpv.value[con] = "";
};
const des = async () => {
  await axios
    .get(`http://localhost:5000/view/des/${resu.params.tname}`)
    .then((res) => {
      result.value = res.data.Table.KeySchema;
      console.log(res.data.Table.KeySchema);
      for (const b in result.value) {
        payload.value[result.value[b].AttributeName] = "";
      }
    })
    .catch((err) => {
      console.log(err);
      result.value = "Fail";
    });
};
des();
const ins = async () => {
  console.log(inp.value, inpv.value);
  for (const j in inp.value) {
    if (inp.value[j] != "") {
      payload.value[inp.value[j]] = inpv.value[j];
    }
  }
  console.log(payload.value);
  await axios
    .post(`http://localhost:5000/insert/${resu.params.tname}`, payload.value)
    .then((res) => {
      resultt.value = "Success";
    })
    .catch((err) => {
      console.log(err);
      resultt.value = "Fail";
    });
};
</script>
<template>
  <v-responsive
    class="fill-height d-flex flex-row flex-wrap align-center text-center fill-height"
  >
    <div class="text-body-4 font-weight-light mb-n1">
      {{ resu.params.tname }} table
    </div>
    <br />
    <div class="py-14"></div>
    <v-row class="d-flex flex-row align-center justify-center">
      <v-col class="border" cols="10" v-for="ob in result">
        <v-text-field
          v-model="payload[ob.AttributeName]"
          :label="`Enter the ${ob.AttributeName}`"
          :name="`${ob.AttributeName}`"
        ></v-text-field>
      </v-col>
      <v-col class="border" cols="10" v-for="v in con">
        <v-text-field
          v-model="inp[v]"
          @change=""
          label="Enter the Attribute Name"
        ></v-text-field>
        <v-text-field
          v-model="inpv[v]"
          label="Enter the Attribute Value"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn
      color="primary"
      @click="mod"
      min-width="228"
      size="x-large"
      variant="flat"
    >
      +
    </v-btn>

    <div class="py-14">
      <v-btn
        color="primary"
        :to="{ name: 'Table', params: { tname: resu.params.tname } }"
        @click="ins"
        min-width="228"
        size="x-large"
        variant="flat"
      >
        Insert
      </v-btn>
    </div>

    <h1>{{ resultt }}</h1>
  </v-responsive>
</template>
