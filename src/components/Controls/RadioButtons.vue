<template>
    <div class="flex items-center" :style="flexDirection">
        <label v-for="item in items" class="block relative pl-[28px] cursor-pointer select-none" :style="itemStyle">
            {{item.title}}
            <input
                type="radio"
                :name="id"
                :checked="item.checked"
                :value="item.value"
                @input="$emit('update:modelValue', $event.target.value)"
                class="absolute cursor-pointer opacity-0">
                <span class=" absolute top-[3px] left-0 h-5 w-5 rounded-full
                after:absolute after:block after:content-['']  after:top-[3px] after:left-[3px] after:w-[14px] after:h-[14px] after:rounded-full"
                :class="item.value == modelValue ? getColor(true, item.colors): getColor(false, item.colors)"></span>
        </label>
    </div>
</template>

<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import type  { RadioItem } from '@/interfaces/NOTypes.ts'

export default defineComponent ({
    setup() {
    },
    props: {
        items: Object as PropType<RadioItem[]>,
        modelValue: String,
        id: String,
        direction: String,
    },
    emits: ['update:modelValue'], // emit event so that the parent knows the value has been updated
    data: () => ({
    }),
    methods: {
        getColor(checked:boolean, col:string[]|undefined):string {
            let color = 'bg-blue';
            if (col && col.length == 1) {
                color = 'bg-' + col;
            } else if (col && col.length == 2) {
                color = 'bg-gradient-to-br from-' + col[0] + ' from-40% to-' + col[1] + ' to-65%';
            } else if (col && col.length == 3) {
                color = 'bg-gradient-to-br from-' + col[0] + ' from-20% via-' + col[1] + ' to-' + col[2] + ' to-80%';
            }
            // include some valid classes to make sure they are compiled
            // to-gray-100 from-gray-400 to-blue-400 from-orange-400 via-gray-200
            let bgColor = 'after:bg-gray';
            if (checked && col && col.length > 1) {
                bgColor = 'after:' + 'bg-gradient-to-br after:from-' + col[0] + ' after:to-' + col[1];
            } else if (checked) {
                bgColor = 'after:' + color;
            }

            return color + ' ' + bgColor;
        }
    },
    computed: {
        flexDirection():string {
            return this.direction == 'row' ? 'flex-direction: row;' : 'flex-direction: column;';
        },
        itemStyle():string {
            return this.direction == 'row' ? 'margin-left: 10px;' : 'margin-bottom: 10px;';
        }
    },
    watch: {
    },
    mounted () {
    }
  })

</script>

