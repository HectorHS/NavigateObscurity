<template>
    <div>
        <IconBase icon="down" height="10" class="fill-blue inline"></IconBase>
        <span class="text-blue pl-2 text-xs">{{ text }}</span>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import IconBase from '@/components/IconBase.vue';
    export default defineComponent ({
        setup() {
        },
        components: {
            IconBase,
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
    })

</script>