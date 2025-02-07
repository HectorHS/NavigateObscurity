<template>
  <div :id="compId" style="z-index:99;" class="cursor-pointer">
    <div class="flex relative h-[34px] overflow-hidden border border-solid border-textColor hover:border-blue peer-hover/expand:border-blue rounded mr-3" @click="showDropdown">
      <div class="pl-2 my-auto">{{label}}</div>
      <IconBase icon="down" height="12" class="absolute top-[10px] right-2 fill-textColor inline"></IconBase>
    </div>
    <div class="absolute peer/expand" v-if="show" style="width:inherit">
      <ul class="bg-gray bg-opacity-90 shadow-xl border border-solid border-textColor mr-3 p-1 rounded">
        <li v-for="(item) in items" :key="item" class="w-full hover:bg-blue">
          <label class="block relative pl-8 py-1 cursor-pointer select-none">
            {{ item }}
            <!-- hide the actual checkpox -->
            <input type="checkbox" class="absolute opacity-0 cursor-pointer h-0 w-0 peer" :value="item" @change='toggleItem' :checked="modelValue.includes(item)">
            <span class="checkmark absolute top-2 left-1 h-[18px] w-[18px] border-2 border-solid border-textColor rounded peer-checked:bg-textColor"></span>
            <IconBase icon="check" height="16" class="stroke-gray absolute top-[9px] left-[5px] hidden peer-checked:block"></IconBase>
          </label>
        </li>
      </ul>
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
      modelValue: Array<String>,
      compId: String // we need an id to target click events outside the element
    },
    emits: ['update:modelValue'], // emit event so that the parent knows the value has been updated
    data: () => ({
      show: false,
    }),
    methods: {
      showDropdown() {
        this.show = !this.show
      },
      toggleItem(this,event) {
        let value = event.srcElement.value;
        let checked = event.srcElement.checked;
        if (checked && !this.modelValue.includes(value)) {
          this.modelValue.push(value);
        } else if (!checked && this.modelValue.includes(value)) {
          let index = this.modelValue.indexOf(value);
          if (index !== -1) {
            this.modelValue.splice(index, 1);
          }
        }
        this.$emit('update:modelValue', this.modelValue)
      }
    },
    computed: {
      label():string {
        let txt = '';
        if (this.modelValue.length == 0) {
          txt = "Select income";
        } else if (this.modelValue.length == 1) {
          txt = this.modelValue[0];
        } else {
          txt = "(" + this.modelValue.length + " selections)";
        }
        return txt;
      }
    },
    mounted () {
      let thisComp = this;
      window.addEventListener('click', function (event) {
        // if the click happened outside the componenet, colapse the dropdown
        if (!Boolean(event.target.closest('#' + thisComp.compId))) {
          thisComp.show = false;
        }
      });
    }
  })
</script>

