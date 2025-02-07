<template>
    <section id="NO-footer">
        <div class="bg-cover bg-top bg-no-repeat flex h-[40vh] sm:h-[50vh] lg:h-screen items-end bg-footer" title="inverted mountains">
            <h1 class="relative left-base border-gray text-gray bottom-[5vh] w-95ch">Always looking for themes to explore. <br />
                Have an idea? <br />
                Get in touch at hector@navigateobscurity.com</h1>
        </div>
        <div class="text-center bg-gray-800">
            <p class="text-sm pb-1">Navigate Obscurity {{ year }} </p>
        </div>
    </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
export default defineComponent ({
    setup() {
    },
    data: () => ({
    }),
    methods: {
    },
    computed: {
        year():string {
            return new Date().getFullYear().toString();
        }
    },
  })

</script>

<style lang="scss" scoped>
</style>