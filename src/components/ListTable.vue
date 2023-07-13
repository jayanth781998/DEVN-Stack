<script setup>
import axios from "axios";
import { ref } from "vue";
const resu = ref("");
const list = async () => {
  await axios
    .get(`http://localhost:5000/view`)
    .then((res) => {
      console.log(res.data);
      {
        resu.value = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
list();
</script>
<template>
  <v-container class="fill-height">
    <v-responsive
      class="d-flex flex-row flex-wrap align-center text-center fill-height"
    >
      <div class="text-body-4 font-weight-light mb-n1">Your tables</div>
      <br />
      <v-row>
        <v-col
          class="d-flex flex-wrap flex-row text-body-2 text-h2 justify-center space around"
          v-for="key in resu.TableNames"
        >
          <v-btn
            color="primary"
            :to="{ name: 'Table', params: { tname: key } }"
            min-width="228"
            size="x-large"
            variant="flat"
          >
            {{ key }}
          </v-btn></v-col
        >
      </v-row>
      <div class="py-14"></div>

      <v-row class="d-flex align-center justify-center"> </v-row>
    </v-responsive>
  </v-container>
</template>
