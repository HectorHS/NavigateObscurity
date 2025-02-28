<template>
    <section>
          <h2>Where did they come from, where did they go?</h2>
          <div class="mb-6">It's hard to be accurate here, so treat the points below as educated guesses.</div>
        <div class="flex flex-col lg:flex-row justify-center">
            <div class="map-container">
                <img class="main-map w-full" :src="'/images/malazan/' + filePrefix + 'map.jpg'">
                <img v-for="item of items" :id="item.id" class="map-overlay" :src="'/images/malazan/' + filePrefix + item.id + '.png'">
            </div>
            <div class="pl-12 flex flex-row justify-center flex-wrap lg:flex-col lg:w-[350px] mt-4">
                <div v-for="item of items" class="flex cursor-pointer lg:pb-4"  @mouseover="mapLegendHover(item.id)" @mouseout="mapLegendHoverOut" @click="mapLegendClick(item.id)">
                    <div class="legend-dot" :class="'bg-' + item.color"></div>
                    <div class="my-auto">{{item.title}}</div>
                </div>
            </div>
        </div>
    </section>
</template>
  
<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import {getTailwindHexColor,getRadialGradient,getLinearGradient} from '@/helpers/commonFunctions';
  import * as NOTypes from '@/interfaces/NOTypes';
  
  export default defineComponent ({
    components: {
    },
    setup() {
    },
    props: {
      filePrefix: { 
          type: String,
          required: true
      },
      items: { 
          type: Object as PropType<NOTypes.MalazanMapItem[]>,
          required: true
      },
      },
    data: () => ({
      mapSelected: false,
    }),
    computed: {
    },
    methods: {
    mapLegendHover(name:string):void {
      document.querySelectorAll('.map-overlay').forEach(function (e) {
        if (name != e.id) {
            e.classList.add("unhovered");
        }
      });
    },
    mapLegendHoverOut():void {
      document.querySelectorAll('.map-overlay').forEach(function (e) {
            e.classList.remove("unhovered");
      });
    },
    mapLegendClick(name:string):void {
      if (this.mapSelected) {
        this.mapSelected = false;
          document.querySelectorAll('.map-overlay').forEach(function (e) {
              e.classList.remove("unselected");
          });
      } else {
        this.mapSelected = true;
          document.querySelectorAll('.map-overlay').forEach(function (e) {
              if (name != e.id) {
                  e.classList.add("unselected");
              }
          });
      }
  },
        getTailwindHexColor,
        getRadialGradient,
        getLinearGradient
      },
    })
</script>

<style lang="scss" scoped>
  .map-container {
    position: relative;
    width: clamp(50px, 100%, 1000px);
  }

  .map-overlay {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .unhovered, .unselected {
    opacity: 0.4;
  }
</style>