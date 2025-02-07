<template>
    <Header title="Colors"></Header>
    <div class="flex mx-5 mt-20">
      <h4 class="my-auto text-right" style="width:150px;">Chart colors</h4>
      <div v-for="color of colorNames" :class="color" class="w-16 h-16 m-2"></div>
    </div>
    <div class="flex mx-5 mt-10">
      <h4 class="my-auto text-right" style="width:150px;">Blue</h4>
      <div v-for="color of blue" :class="color" class="w-16 h-16 m-2"></div>
    </div>
    <div class="flex mx-5">
      <h4 class="my-auto text-right" style="width:150px;">Purple</h4>
      <div v-for="color of purple" :class="color" class="w-16 h-16 m-2"></div>
    </div>
    <div class="flex mx-5">
      <h4 class="my-auto text-right" style="width:150px;">Violet</h4>
      <div v-for="color of violet" :class="color" class="w-16 h-16 m-2"></div>
    </div>
    <div class="flex mx-5">
      <h4 class="my-auto text-right" style="width:150px;">Red</h4>
      <div v-for="color of red" :class="color" class="w-16 h-16 m-2"></div>
    </div>
    <div class="flex mx-5">
      <h4 class="my-auto text-right" style="width:150px;">Orange</h4>
      <div v-for="color of orange" :class="color" class="w-16 h-16 m-2"></div>
    </div>
    <div class="flex mx-5">
      <h4 class="my-auto text-right" style="width:150px;">Yellow</h4>
      <div v-for="color of yellow" :class="color" class="w-16 h-16 m-2"></div>
    </div>
    <div class="flex mx-5">
      <h4 class="my-auto text-right" style="width:150px;">Green</h4>
      <div v-for="color of green" :class="color" class="w-16 h-16 m-2"></div>
    </div>
    <div class="flex mx-5">
      <h4 class="my-auto text-right" style="width:150px;">Emerald</h4>
      <div v-for="color of emerald" :class="color" class="w-16 h-16 m-2"></div>
    </div>
    <div class="flex mx-5">
      <h4 class="my-auto text-right" style="width:150px;">Cyan</h4>
      <div v-for="color of cyan" :class="color" class="w-16 h-16 m-2"></div>
    </div>
    <div class="flex mx-5">
      <h4 class="my-auto text-right" style="width:150px;">Blue</h4>
      <div v-for="color of blue" :class="color" class="w-16 h-16 m-2"></div>
    </div>
    <div class="flex mx-5">
      <h4 class="my-auto text-right" style="width:150px;">Gray</h4>
      <div v-for="color of gray" :class="color" class="w-16 h-16 m-2"></div>
    </div>

    <!-- <div class="p-5 mt-6 bg-white">
      <highcharts :options="sankeyOptions"></highcharts>
    </div> -->
</template>

<script lang="ts">
  import Header from '@/components/Header.vue';
import { getTailwindHexColor } from '@/helpers/commonFunctions';
  import { defineComponent } from 'vue';
  import Highcharts from 'highcharts';
  import sankeyInit from 'highcharts/modules/sankey'
  sankeyInit(Highcharts)
  import '@/styles/highcharts.scss';

  export default defineComponent ({
    components: {
      Header
    },
    setup() {

    },
    data: () => ({
      // by having all these here we are also forcing tailwind to include all these styles. be careful if you delete these.
      colorNames: ['bg-blue', 'bg-purple-300', 'bg-violet-400', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400','bg-emerald-400','bg-cyan-400', 'bg-blue-400'],
      blue: ['bg-blue-100','bg-blue-200','bg-blue-300','bg-blue-400','bg-blue-500','bg-blue-600','bg-blue-700', 'bg-blue-800','bg-blue-900'],
      violet: ['bg-violet-100','bg-violet-200','bg-violet-300','bg-violet-400','bg-violet-500','bg-violet-600','bg-violet-700', 'bg-violet-800','bg-violet-900'],
      red: ['bg-red-100','bg-red-200','bg-red-300','bg-red-400','bg-red-500','bg-red-600','bg-red-700', 'bg-red-800','bg-red-900'],
      orange: ['bg-orange-100','bg-orange-200','bg-orange-300','bg-orange-400','bg-orange-500','bg-orange-600','bg-orange-700', 'bg-orange-800','bg-orange-900'],
      emerald: ['bg-emerald-100','bg-emerald-200','bg-emerald-300','bg-emerald-400','bg-emerald-500','bg-emerald-600','bg-emerald-700', 'bg-emerald-800','bg-emerald-900'],
      yellow: ['bg-yellow-100','bg-yellow-200','bg-yellow-300','bg-yellow-400','bg-yellow-500','bg-yellow-600','bg-yellow-700', 'bg-yellow-800','bg-yellow-900'],
      purple: ['bg-purple-100','bg-purple-200','bg-purple-300','bg-purple-400','bg-purple-500','bg-purple-600','bg-purple-700', 'bg-purple-800','bg-purple-900'],
      green: ['bg-green-100','bg-green-200','bg-green-300','bg-green-400','bg-green-500','bg-green-600','bg-green-700', 'bg-green-800','bg-green-900'],
      cyan: ['bg-cyan-100','bg-cyan-200','bg-cyan-300','bg-cyan-400','bg-cyan-500','bg-cyan-600','bg-cyan-700', 'bg-cyan-800','bg-cyan-900'],
      gray: ['bg-gray-100','bg-gray-200','bg-gray-300','bg-gray-400','bg-gray-500','bg-gray-600','bg-gray-700', 'bg-gray-800','bg-gray-900'],
    }),
    methods: {
      getColor(parent:string):string {
        let color = '#fff';
        if (parent == 'DataAnalyst') {
          color = getTailwindHexColor('green-500');
        } else  if (parent == 'Developer') {
          color = getTailwindHexColor('emerald-400');
        } else  if (parent == 'Visualisations') {
          color = getTailwindHexColor('cyan-400');
        } else  if (parent == 'FullStack') {
          color = getTailwindHexColor('blue-500');
        } else  if (parent == 'Inforder') {
          color = getTailwindHexColor('purple-400');
        }
        return color;
      }

    },
    computed: {
      sankeyOptions() {
        let options: any =     {
          chart: {
                inverted: true,
                height:420,
                backgroundColor: '#fff'
            },
            accessibility: {
                point: {
                    valueDescriptionFormat: '{index}. {point.from} to {point.to}, {point.weight}.'
                }
            },
            series: [{
                keys: ['from', 'to', 'weight', 'color'],
                data: [

                    ['DataAnalyst', 'Project management', 20, this.getColor('DataAnalyst')],
                    ['DataAnalyst', 'Testing', 10, this.getColor('DataAnalyst')],
                    ['DataAnalyst', 'Software development', 20, this.getColor('DataAnalyst')],
                    ['DataAnalyst', 'Data analysis', 15, this.getColor('DataAnalyst')],
                    ['Developer', 'Testing', 20, this.getColor('Developer')],
                    ['Developer', 'Software development', 30, this.getColor('Developer')],
                    ['Developer', 'Frontend development', 10, this.getColor('Developer')],
                    ['Visualisations', 'Data analysis', 100, this.getColor('Visualisations')],
                    ['Visualisations', 'Frontend development', 80, this.getColor('Visualisations')],
                    ['FullStack', 'Project management', 30, this.getColor('FullStack')],
                    ['FullStack', 'Data analysis', 100, this.getColor('FullStack')],
                    ['FullStack', 'Frontend development', 150, this.getColor('FullStack')],
                    ['Inforder', 'Project management', 15, this.getColor('Inforder')],
                    ['Inforder', 'Data analysis', 20, this.getColor('Inforder')],
                    ['Inforder', 'Frontend development', 75, this.getColor('Inforder')],

                    ['Project management', undefined, 10, '#fff'],
                    ['Project management', 'Agile', 10, this.getColor('DataAnalyst')],

                    ['Testing', 'JUnit', 10, this.getColor('DataAnalyst')],
                    ['Software development', 'C#', 20, this.getColor('DataAnalyst')],
                    ['Data analysis', undefined, 15, '#fff'],

                    ['Software development', 'C#', 10, this.getColor('Developer')],
                    ['Testing', 'JUnit', 5, this.getColor('Developer')],
                    ['Testing', 'Selenium', 15, this.getColor('Developer')],
                    ['Software development', 'Java', 20, this.getColor('Developer')],

                    ['Data analysis', 'Tableau', 30, this.getColor('Visualisations')],
                    ['Data analysis', 'Highcharts', 25, this.getColor('Visualisations')],
                    ['Data analysis', 'Python', 25, this.getColor('Visualisations')],
                    ['Data analysis', undefined, 20, '#fff'],
                    ['Data analysis', 'Tableau', 25, this.getColor('FullStack')],
                    ['Data analysis', 'Highcharts', 30, this.getColor('FullStack')],
                    ['Data analysis', 'Python', 25, this.getColor('FullStack')],
                    ['Data analysis', 'Sigma', 10, this.getColor('FullStack')],
                    ['Data analysis', 'Plotly', 10, this.getColor('FullStack')],
                    ['Data analysis', 'Python', 10, this.getColor('Inforder')],
                    ['Data analysis', 'Apexcharts', 10, this.getColor('Inforder')],

                    ['Frontend development', 'Javascript', 5, this.getColor('Developer')],
                    ['Frontend development', 'HTML', 5, this.getColor('Developer')],

                    ['Frontend development', 'HTML', 15, this.getColor('Visualisations')],
                    ['Frontend development', 'Typescript', 50, this.getColor('Visualisations')],
                    ['Frontend development', 'SASS', 15, this.getColor('Visualisations')],

                    ['Frontend development', 'Javascript', 10, this.getColor('FullStack')],
                    ['Frontend development', 'HTML', 10, this.getColor('FullStack')],
                    ['Frontend development', 'Typescript', 30, this.getColor('FullStack')],
                    ['Frontend development', 'SASS', 15, this.getColor('FullStack')],
                    ['Frontend development', 'Wordpress', 30, this.getColor('FullStack')],

                    ['Frontend development', 'Bootstrap', 10, this.getColor('FullStack')],
                    ['Frontend development', 'Angular', 20, this.getColor('FullStack')],
                    ['Frontend development', 'Django', 10, this.getColor('FullStack')],
                    ['Frontend development', 'Tailwind', 15, this.getColor('FullStack')],

                    ['Project management', 'Agile', 10, this.getColor('FullStack')],

                    ['Frontend development', 'Javascript', 10, this.getColor('Inforder')],
                    ['Frontend development', 'HTML', 5, this.getColor('Inforder')],
                    ['Frontend development', 'Typescript', 10, this.getColor('Inforder')],

                    ['Frontend development', 'SASS', 5, this.getColor('Inforder')],
                    ['Frontend development', 'Vue', 25, this.getColor('Inforder')],
                    ['Frontend development', 'Vuetify', 20, this.getColor('Inforder')],




                ],
                nodes: [
                  {
                    id: 'DataAnalyst',
                    color: this.getColor('DataAnalyst')
                  }, {
                    id: 'Developer',
                    color: this.getColor('Developer')
                  }, {
                    id: 'FullStack',
                    color: this.getColor('FullStack')
                  }, {
                    id: 'Visualisations',
                    color: this.getColor('Visualisations')
                  }, {
                    id: 'Inforder',
                    color: this.getColor('Inforder')
                  }, {
                    id: 'Project management',
                    color: getTailwindHexColor('gray-300')
                  }, {
                    id: 'Agile',
                    color: getTailwindHexColor('gray-200')
                  },{
                    id: 'Testing',
                    color: getTailwindHexColor('yellow-300')
                  }, {
                    id: 'JUnit',
                    color: getTailwindHexColor('yellow-200')
                  },{
                    id: 'Selenium',
                    color: getTailwindHexColor('yellow-300')
                  }, {
                    id: 'Software development',
                    color: getTailwindHexColor('orange-300')
                  },{
                    id: 'C#',
                    color: getTailwindHexColor('orange-200')
                  },{
                    id: 'Java',
                    color: getTailwindHexColor('orange-400')
                  },{
                    id: 'Data analysis',
                    color: getTailwindHexColor('red-500')
                     }, {
                    id: 'Tableau',
                    color: getTailwindHexColor('red-200')
                      }, {
                    id: 'Highcharts',
                    color: getTailwindHexColor('red-300')
                  }, {
                    id: 'Python',
                    color: getTailwindHexColor('red-400')
                  }, {
                    id: 'Sigma',
                    color: getTailwindHexColor('red-500')
                  }, {
                    id: 'Plotly',
                    color: getTailwindHexColor('red-600')
                  },{
                    id: 'Apexcharts',
                    color: getTailwindHexColor('red-700')
                  },{
                    id: 'Frontend development',
                    color: getTailwindHexColor('violet-400')
                  }, {
                    id: 'Javascript',
                    color: getTailwindHexColor('violet-200')
                  }, {
                    id: 'HTML',
                    color: getTailwindHexColor('violet-300')
                  }, {
                    id: 'Typescript',
                    color: getTailwindHexColor('violet-400')
                  }, {
                    id: 'SASS',
                    color: getTailwindHexColor('violet-500')
                  }, {
                    id: 'Wordpress',
                    color: getTailwindHexColor('violet-600')
                  }, {
                    id: 'Bootstrap',
                    color: getTailwindHexColor('violet-700')
                  }, {
                    id: 'Angular',
                    color: getTailwindHexColor('violet-800')
                  }, {
                    id: 'Django',
                    color: getTailwindHexColor('violet-200')
                     },{
                    id: 'Tailwind',
                    color: getTailwindHexColor('violet-300')
                  },{
                    id: 'Vue',
                    color: getTailwindHexColor('violet-400')
                  },{
                    id: 'Vuetify',
                    color: getTailwindHexColor('violet-500')
                }],
                type: 'sankey',
                name: 'Sankey demo series',
                dataLabels:{
                    // enabled: false
                }
            }]
          };
          return options;
      }
    },
  })

</script>

<style lang="scss" scoped>


</style>