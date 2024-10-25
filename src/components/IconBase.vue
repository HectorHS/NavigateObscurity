<template>
    <svg
        :viewBox=viewbox
        xmlns="http://www.w3.org/2000/svg"
        :height=heightCalc
        >
        <MyIcon></MyIcon>
    </svg>
</template>

<!-- TODO this should be changed to options API for consistency -->
<script setup lang="ts">
import { defineAsyncComponent, computed } from "vue";

const props = defineProps({
    icon: {type: String, required: true},
    height: String,});
const MyIcon = defineAsyncComponent(function () {
  return import(`@/components/Icons/${props.icon}.vue`);
});

const viewbox = computed(() =>{
    // default value
    let v = "0 0 256 256";

    // icons with a 512x512 viewbox
    let v512 = ['skull','earth', 'virus'];
    let v32 = ['earthLeaf', 'atom'];
    let v24 = ['down', 'check', 'refresh', 'play', 'stop', 'info'];

    if (v512.includes(props.icon)) {
        v = "0 0 512 512";
    } else if (v32.includes(props.icon)) {
        v = "0 0 32 32";
    } else if (v24.includes(props.icon)) {
        v = "0 0 24 24";
    }
    return v;
})
const heightCalc = computed(() => {
    let h = props.height? props.height : '24';
    return h;
})
</script>
