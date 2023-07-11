<script setup>
defineProps({cols:{
    type:Object,
},keys:{
    type:Boolean,
}})
defineEmits(["del"])
</script>
<template>
        <v-table >
            <thead>
                <th v-for="v in Object.keys(cols)">{{ v }}</th>
            </thead>
            <tbody>
                <tr><td v-for="x in Object.values(cols)">{{ x.S }}</td>
                <td><v-btn color="primary" @click="$emit('del',Object.keys(cols),Object.values(cols))">Delete</v-btn></td></tr>
            </tbody>
        </v-table>
</template>



<style lang="scss" scoped>

</style>