<template>
    <div >
    <div class="my-0 mx-auto pb-[200px] overflow-hidden max-w-xsm" >
        <div class="relative invisible " style="outline:1px solid transparent;">
            <div class="absolute w-full pb-[115.47%] overflow-hidden invisible" style="transform: rotate(-60deg) skewY(30deg); outline:1px solid transparent;">
                <div class="justify-center flex items-center w-full h-full text-center overflow-hidden absolute visible bg-gradient-to-br to-gray-100 from-gray-200" :class="bgClass" style=" transform: skewY(-30deg) rotate(60deg);">
                    <img v-if="image" :src=image :alt=title class="-inset-x-full mx-auto my-0 absolute visible w-full h-auto">
                    <IconBase v-if="icon" :icon="icon" class="-inset-x-full w-auto mx-auto my-0 absolute visible fill-gray h-3/6"></IconBase>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import IconBase from '@/components/IconBase.vue';
export default defineComponent ({
    setup() {
    },
    components: {
      IconBase
    },
    props: {
      image: String,
      title: String,
      background: Number,
      type: String,
      icon: String
    },
    data: () => ({
    }),
    methods: {

    },
    computed: {
        bgClass() {
            return "bg-" + this.background;
        }
    },
    mounted () {
    }
  })

</script>

<style lang="scss" scoped>
.bg-1 {
    @apply bg-gradient-to-br from-amber-300 to-blue;
    // background-image: linear-gradient(to top right, #fbc99d, #539dc6);
}
.bg-2 {
    @apply bg-gradient-to-br from-blue-100 to-blue-300;
    // background-image: linear-gradient(to top right, #fbc99d, #539dc6);
}
.bg-3 {
    @apply bg-gradient-to-br from-blue-200 to-blue;
    // background-image: linear-gradient(to top right, #fbc99d, #539dc6);
}
.bg-4 {
    @apply bg-gradient-to-br from-blue-300 to-blue-600;
    // background-image: linear-gradient(to top right, #fbc99d, #539dc6);
}
.bg-5 {
    @apply bg-gradient-to-br from-blue to-blue-700;
    // background-image: linear-gradient(to top right, #fbc99d, #539dc6);
}
</style>