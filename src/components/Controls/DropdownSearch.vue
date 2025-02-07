<template>
  <div class="flex relative overflow-hidden h-[34px] rounded border border-solid border-textColor block z-10 text-textColor overflow-hidden self-end mb-2.5 hover:border-blue">
    <input
      list="nodes-datalist"
      autoComplete="on"
      v-model="search"
      :placeholder="placeholder"
      class="text-textColor border-none h-9 relative py-o px-2.5 block bg-gray/80 w-[calc(100% - 20px)] -top-0.5 pl-4 pr-10 rounded appearance-none overflow-hidden text-ellipsis"
    >
    <IconBase icon="search" height="22" class="absolute top-[6px] right-2 fill-textColor text-textColor inline"></IconBase>
    <datalist id="nodes-datalist">
      <option v-for="item in items" :value="item"></option>
    </datalist>
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
          items: {
            type: Array<String>,
            required: true
          },
          modelValue: {
            type: String,
            required: true
          },
          placeholder: {
            type: String,
            required: true
          }
        },
        emits: ['update:modelValue'], // emit event so that the parent knows the value has been updated
        data: () => ({
          search: ''
        }),
        methods: {
        },
        computed: {
        },
        watch: {
          search : function () {
          // only update value if its valid
          if (this.items.includes(this.search)) {
            this.$emit('update:modelValue', this.search)
          }
        },
      },
    })

</script>