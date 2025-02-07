<template>
    <div>
    <div class="flex relative h-[34px] overflow-hidden border-solid border-textColor hover:border-blue border rounded mr-3 ">
        <select
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="relative bg-gray text-textColor -top-px -left-px w-select -mr-1 h-9 pl-2 pr-10 pb-1 rounded border-none appearance-none overflow-hidden text-ellipsis cursor-pointer">
            <option v-for="item of items" class="!hover:bg-blue">{{ item }}</option>
        </select>
        <IconBase icon="down" height="12" class="absolute top-[10px] right-2 fill-textColor inline"></IconBase>
    </div>
    </div>
</template>

<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import IconBase from '@/components/IconBase.vue';

    export default defineComponent ({
        setup() {
        },
        components: {
          IconBase
        },
        props: {
            items: Array<String>,
            modelValue: String,
        },
        emits: ['update:modelValue'], // emit event so that the parent knows the value has been updated
        data: () => ({
        }),
        methods: {
        },
        computed: {
        },
    })

</script>
