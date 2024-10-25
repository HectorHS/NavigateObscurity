<template>
    <div class="flex">
        <input type="range" :min="min" :max="max" :value="modelValue" @input="$emit('update:modelValue', ($event.target! as any).value)" class="slider">
        <div class="border border-solid border-transparent border-r-gray-200 w-3 h-3 m-auto" style="border-width:7px"></div>
        <div class="text-textColor text-center rounded border border-solid border-gray-200 py-1 px-3 " style="line-height: 20px;">{{ modelValue }}%</div>
    </div>
</template>

<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
    export default defineComponent ({
        setup() {
        },
        components: {
        },
        props: {
            modelValue: String,
            min: Number,
            max: Number
        },
        emits: ['update:modelValue'], // emit event so that the parent knows the value has been updated
        data: () => ({
        }),
        methods: {
        },
        computed: {
        },
        watch: {
        },
        mounted () {
        }
    })

</script>

<style lang="scss" scoped>
.slider {
  @apply appearance-none h-1 bg-gray-200 rounded outline-none transition-all m-auto;
  &::-webkit-slider-thumb {
    @apply bg-gray cursor-pointer appearance-none w-6 h-6 border-2 border-gray-200 border-solid rounded-full hover:bg-blue hover:border-blue;
  }
  &::-moz-range-thumb {
    @apply bg-gray cursor-pointer appearance-none w-6 h-6 border-2 border-gray-200 border-solid rounded-full hover:bg-blue hover:border-blue;
  }
}
</style>

