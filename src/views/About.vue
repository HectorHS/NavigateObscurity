<template>
    <Header title="About"></Header>
    <section class="p-base w-mainText">
        <p>This is a personal website. All views expressed are strictly my own.</p>
        <p>The purpose of the website is to allow me to explore various ideas and themes both in a conceptual and in a technical manner.</p>
        <p>If you want to contact me for any reason, please email me at hector@navigateobscurity.com. Feedback is very welcome.</p>
    </section>
    <section class="p-base w-mainText">
        <h3 class="pb-5">Credits</h3>
        <p>Credit for the data sources is given on a per visualisation basis.</p>
        <p>All visualisations under Data are done using <a href="https://www.highcharts.com/"
                target="_blank">highcharts.js</a>.</p>
        <p>All visualisations under Notes are done using <a href="http://sigmajs.org/" target="_blank">sigma.js</a>. The
            concept and functionality has been heavily influenced by the excellent work done in <a href="https://noduslabs.com/infranodus/"
                target="_blank">infranodus</a>.</p>
        <p>The colour palette I am using for the data visualisations is based and developed from the <a
                href="https://clrs.cc/" target="_blank">clrs.cc</a> palette.</p>
        <p>Icons are provided by <a href="https://www.svgrepo.com" target="_blank">SVG repo</a>.</p>
        <p>Please let me know if any of the attributions are not to your liking.</p>
    </section>
</template>

<script lang="ts">
  import Header from '@/components/Header.vue';
  import { defineComponent } from 'vue';

  export default defineComponent ({
    components: {
      Header
    },
    setup() {

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

<style lang="scss" scoped>


</style>