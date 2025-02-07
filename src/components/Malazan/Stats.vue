<template>
    <section>
    <div class="relative flex justify-around flex-wrap px-base">
        <div v-for="stat of stats" class="p-3 flex-1">
        <div class="flex min-w-40 justify-center">
            <IconBase :icon="stat.icon" height="40" class="inline my-auto mr-3 drop-shadow-md-dark" :class="stat.color"></IconBase>
            <div class="large-text drop-shadow-md-dark font-semibold">{{ stat.value }}</div>
        </div>
        <div class="text-center drop-shadow">{{stat.title}}</div>
        </div>
    </div>
    </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import IconBase from '@/components/IconBase.vue';

  interface malazanStat {
    title: string,
    value: string,
    icon: string,
    color: string,
  }
  export default defineComponent ({
    setup() {
    },
    components: {
      IconBase
    },
    props: {
        book: {
        type: String,
        required: true
      },
    },
    data: () => ({
        words: undefined as string | undefined,
        audio: undefined as string | undefined,
        characters: undefined as string | undefined,
        deathRate: undefined as string | undefined,
    }),
    methods: {
        loadData():void {
            if (this.book == 'gotm') {
                this.words = '212,090';
                this.audio = '26:04:10';
                this.characters = '92';
                this.deathRate = '20%';
            } else if (this.book == 'dg') {
                this.words = '276,056';
                this.audio = '34:06:03';
                this.characters = '86';
                this.deathRate = '26%';
            }
        }
    },
    computed: {
        stats():malazanStat[] {
            let stats:malazanStat[] = [];
            if (this.words) {
                stats.push({ title: 'written words', value: this.words, icon: 'text', color: 'fill-blue' });
                stats.push({ title: 'long audio', value: this.audio!, icon: 'audio', color: 'fill-green' });
                stats.push({ title: 'characters', value: this.characters!, icon: 'warrior', color: 'fill-orange' });
                stats.push({ title: 'death rate', value: this.deathRate!, icon: 'skull', color: 'fill-red' });
            }
            return stats;
        }
    },
    mounted() {
        this.loadData();
    }
  })

</script>

<style lang="scss" scoped>
</style>