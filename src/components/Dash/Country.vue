<template>
    <div class="flex w-full justify-end text-blue text-xl">
        <p class="m-0 border-solid rounded-tr-2xl rounded-bl-2xl border-2 border-blue pb-1 px-5 -mr-4 -mt-2">{{ text }}</p>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent ({
        setup() {
        },
        components: {
        },
        props: {
            text: String
        },
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