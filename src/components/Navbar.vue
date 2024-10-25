<template>
     <section class="fixed w-full px-base bg-gray-900/90 flex flex-wrap justify-between h-10 z-20">
        <div class="logo w-auto z-10 ">
            <a href="/">
                <img class="h-auto max-w-xs w-9" src="@/assets/svg/logo.svg" alt="Navigate Obscurity logo" />
            </a>
        </div>
        <nav role="navigation" class="hidden sm:block">
            <ul class="nav-list flex h-full">
                <li v-for="item in navItems" :key="item.to" class=" content-center group">
                  <a :href="item.to" class="block p-2 px-10  hover:bg-blue ">
                    <span  class="inline text-textColor">{{ item.title }}</span>
                    <IconBase v-if="item.children" icon="down" height="12" class="pl-2 fill-textColor inline"></IconBase>
                  </a>
                  <ul v-if="item.children" class="absolute bg-gray-800/90 text-center invisible group-hover:visible">
                    <li v-for="child of item.children" class="border-t border-textColor hover:bg-blue">
                      <a :href="child.to" class="p-4 text-textColor block">{{ child.title }}</a>
                    </li>
                  </ul>
                </li>
            </ul>
        </nav>
        <nav role="navigation" class=" sm:hidden  w-full ">
            <!-- Toggle menu mobile icon -->
            <div class="ml-auto -mt-2 absolute top-6 right-base mr-base pr-5" @click="menu = !menu">
                <a id="nav_hamburger" href="#!" class="cursor-pointer absolute" :class="menu ? 'active' : ''">
                    <span class="bg-textColor absolute block transition-all h-[5px] w-9 rounded
                                before:bg-textColor before:absolute before:block before:transition-all before:h-[5px] before:w-9 before:-top-3 before:rounded
                                after:bg-textColor after:absolute after:block after:transition-all after:h-[5px] after:w-9 after:-bottom-3 after:rounded">
                    </span>
                </a>
            </div>
            <ul v-show="menu == true" class="  h-full mt-1 bg-gray-800 bg-opacity-90">
                <li v-for="item in navItems" :key="item.to" class=" p-2">
                  <div v-if="item.children" class="block p-2 px-10" @click="expandMobileNavItems(item)">
                    <span class="inline text-textColor">{{ item.title }}</span>
                    <IconBase v-if="item.children" icon="down" height="12" class="pl-2 fill-textColor inline"></IconBase>
                    <ul v-show="showChildren(item)">
                      <li v-for="child of item.children" class="pl-12">
                        <a :href="child.to" class="p-4 text-textColor block">{{ child.title }}</a>
                      </li>
                    </ul>
                  </div>
                  <a v-else :href="item.to" class="text-textColor p-2 px-10 block">{{ item.title }}</a>
                </li>
            </ul>
        </nav>
    </section>
  </template>

  <script lang="ts">
  import { useAppStore } from '@/store/appStore';
  import { defineComponent } from 'vue';
  import IconBase from '@/components/IconBase.vue';
  export default defineComponent ({
    components: {
      IconBase
    },
    setup() {
      // setup the store
      const appStore = useAppStore();
      return { appStore };
    },
    data: () => ({
      navItems: [
          { title: 'Home', to: '/'},
          { title: 'Data', to: '/data', children: [
            { title: 'Death', to: '/data/death' },
            { title: 'Biodiversity', to: '/data/biodiversity' },
            { title: 'Sustainability', to: '/data/sustainability' },
            { title: 'Migration', to: '/data/migration' },
            { title: 'Energy', to: '/data/energy' },
            { title: 'COVID-19', to: '/data/covid19' }
          ]},
          { title: 'Notes', to: '/notes'},
          { title: 'About', to: '/about'},
        ],
        menu: false,
        showData: false,
        showNotes: false
    }),
    methods: {
      expandMobileNavItems(item:any):void {
        if (item.title =="Data") {
          this.showData = !this.showData;
        } else if (item.title == "Notes") {
          this.showNotes = !this.showNotes;
        }
      },
      showChildren(item:any):boolean{
        let show = false;
        if (item.title == 'Data') {
          show = this.showData;
        } else if (item.title == 'Notes') {
          show = this.showNotes;
        }
        return show;
      },
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
//Mobile menu hamburger
#nav_hamburger.active span {
  background-color: transparent;
  &:before {
    top: 0;
    transform: (rotate(45deg));
  }
  &:after {
    top: 0;
    transform: (rotate(-45deg));
  }
}
</style>