<template>
    <div class="group relative inline-block -mb-1">
        <IconBase icon="info" height="18" class="fill-gray-200 hover:fill-blue-400"></IconBase>
        <div class="invisible w-max bg-gray-700/90 rounded px-4 py-2 border border-solid border-blue absolute z-10 group-hover:visible" :class="orientClass">
            <slot></slot>
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
            orientation: String
        },
        data: () => ({
        }),
        methods: {
        
        },
        computed: {
            orientClass():string {
                return this.orientation === 'left'? 'right-5' : 'left-5';
            }
        },
        watch: {
        },
        mounted () {
        }
    })

</script>

<style lang="scss" scoped>

</style>