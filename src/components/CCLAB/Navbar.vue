<template>
    <section class="cclab-nav-bar h-[60px] lg:h-[80px] w-full fixed top-0 z-30 bg-cclabDark p-2.5 box-border">
        <div class="max-w-[1000px] m-auto -mt-2 sm:mt-0">
            <div class="w-full lg:w-auto flex justify-center lg:w-auto absolute top-0 lg:top-[10px] text-center float-left leading-[80px]">
                <a class="" href="https://www.cooperationintheapocalypse.org/">
                    <img src='/images/cclab/cclab-logo.webp' alt="cooperation and conflict lab logo" class="max-h-[50px] sm:max-h-[60px] sm:-mt-1"/>
                </a>
            </div>
            <nav role="navigation" class="invisible lg:visible block float-right p-0 sm:mt-5 ">
                <ul class=" flex h-full list-none m-0 p-0 pt-0.5">
                    <li v-for="item of items" :key="item.url" class="float-none min-w-[50px] sm:float-right">
                        <a :href="item.url" class="block mx-1.5 text-white font-semibold uppercase text-base tracking-wide leading-none sm:py-0 sm:text-center hover:border-b hover:border-solid hover:border-white">{{ item.name }}</a>
                    </li>
                </ul>
            </nav>
            <nav role="navigation" class="lg:invisible w-full ">

                <!-- Toggle menu mobile icon -->
                <div class="ml-auto -mt-2 fixed top-[35px] left-[60px] mr-base pr-5" @click="menu = !menu">
                    <a id="nav_hamburger" href="#!" class="cursor-pointer absolute" :class="menu ? 'active' : ''">
                        <span class="bg-textColor absolute block transition-all h-[5px] w-9 rounded
                                    before:bg-textColor before:absolute before:block before:transition-all before:h-[5px] before:w-9 before:-top-3 before:rounded
                                    after:bg-textColor after:absolute after:block after:transition-all after:h-[5px] after:w-9 after:-bottom-3 after:rounded">
                        </span>
                    </a>
                </div>
                <ul v-show="menu == true" class="h-full mt-12 bg-white">
                    <li v-for="item in items" :key="item.url" class=" p-2">
                    <a :href="item.url" class="text-gray-500 uppercase p-2 px-10 block border-b border-gray-200">{{ item.name }}</a>
                    </li>
                </ul>
            </nav>
        </div>
    </section>
 </template>

 <script lang="ts">
 import { useAppStore } from '@/store/appStore';
 import { defineComponent } from 'vue';
 import '@/styles/cclab.scss';
 export default defineComponent ({
   components: {
   },
   setup() {
     // setup the store
     const appStore = useAppStore();
     return { appStore };
   },
    data: () => ({
        items: [{url:"https://www.cooperationintheapocalypse.org/", name: 'Home'},
            {url:"https://www.cooperationintheapocalypse.org/#research", name:'Research'},
            {url:"/cooperation-conflict-lab", name:'Data'},
            {url:"https://www.cooperationintheapocalypse.org/#team", name:'Team'},
            {url:"https://www.cooperationintheapocalypse.org/#resources", name:'Resources'},
            {url:"https://www.cooperationintheapocalypse.org/#blog", name:'Blog'},
            {url:"https://www.cooperationintheapocalypse.org/#support", name:'Support'},
            ],
        menu: false,
    }),
    methods: {
    },
    computed: {
    },
 })

</script>
<style lang="scss" scoped>
.cclab-nav-bar {
    font-family: "aldrich", sans-serif;
}
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