<template>
    <section>
        <div class="flex flex-col md:flex-row">
            <div class="flex flex-row md:flex-col border-blue border-b-4 md:border-b-0 md:border-r-4 md:w-[130px]">
                <div class="tab-button" :class="{'tab-active': selected =='q'}" @click="selected='q'">Questions</div>
                <div class="tab-button" :class="{'tab-active': selected =='o'}" @click="selected='o'">Obscurity</div>
                <div class="tab-button" :class="{'tab-active': selected =='n'}" @click="selected='n'">Navigation</div>
            </div>
            <div class="py-5 px-qon bg-gradient-to-br from-blue/50 to-gray from-1% to-30%">
                <div v-show="selected == 'q'">
                    <p class="mt-0">
                        Half of the following statements are false. Find out which by interacting with the
                        visualisation dashboard below.
                    </p>
                    <div v-for="question of questions" class="flex my-2">
                        <div class="inline-block bg-textColor w-2 min-w-2 h-2 my-auto mr-3 rounded-full"></div>
                        <div  class="inline-block" v-html="question"></div>
                    </div>
                </div>
                <div v-show="selected == 'o'">
                    <p v-for="obscurity of obscurities" class="first:mt-0">{{ obscurity }}</p>
                </div>
                <div v-show="selected == 'n'">
                    <p v-for="navigation of navigations" class="first:mt-0">{{ navigation }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent ({
        setup() {
        },
        props: {
            questions: Array<String>,
            navigations: Array<String>,
            obscurities: Array<String>
        },
        data: () => ({
            selected: 'q'
        }),
        methods: {
        },
        computed: {
        },
    })
</script>

<style lang="scss" scoped>
    .tab-button {
        @apply z-10 transition-all duration-300 p-2.5 pl-3.5 mb-1 mr-1 cursor-pointer relative rounded-t-3xl md:rounded-none md:rounded-l-3xl
        bg-gradient-to-tr bg-size-200 from-blue/30 via-gray-600 to-orange bg-pos-100-r md:hover:bg-pos-0-r;

    }
    .tab-active {
        @apply  text-gray md:hover:text-textColor font-semibold mb-0 md:mb-1 md:mr-0
        bg-gradient-to-tr bg-size-200 to-blue to-90% via-gray-700 from-orange bg-pos-0-r md:hover:bg-pos-100-r;
    }
</style>