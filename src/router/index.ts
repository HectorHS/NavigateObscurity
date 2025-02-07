import { createRouter, createWebHistory } from 'vue-router'
import pinia from "@/store/store.ts";
import { useAppStore } from "@/store/appStore";
import { getMetaData } from "@/helpers/commonFunctions";

// lazy loading for all routes
const Error = () => import('@/views/Error.vue')
const Home = () => import('@/views/Home.vue')
const About = () => import('@/views/About.vue')
const Colors = () => import('@/views/Colors.vue')
const Biodiversity = () => import('@/views/Data/Biodiversity.vue')
const Sustainability = () => import('@/views/Data/Sustainability.vue')
const Migration = () => import('@/views/Data/Migration.vue')
const Death = () => import('@/views/Data/Death.vue')
const Energy = () => import('@/views/Data/Energy.vue')
const Covid19 = () => import('@/views/Data/Covid19.vue')
const CclabGloSum = () => import('@/views/CCLAB/GlobalSummary.vue')
const CclabUsSum = () => import('@/views/CCLAB/UsSummary.vue')
const CclabUsLookup = () => import('@/views/CCLAB/UsLookup.vue')
const CclabGlobalLookup = () => import('@/views/CCLAB/GlobalLookup.vue')
const CclabGlobalComparison = () => import('@/views/CCLAB/GlobalComparison.vue')
const CclabUsComparison = () => import('@/views/CCLAB/UsComparison.vue')
const HeadStrong = () => import('@/views/Nodes/HeadStrong.vue')
const Elastic = () => import('@/views/Nodes/Elastic.vue')
const GGS = () => import('@/views/Nodes/GGS.vue')
const Emotions = () => import('@/views/Nodes/Emotions.vue')
const GOTM = () => import('@/views/Malazan/GOTM.vue')
const DG = () => import('@/views/Malazan/DG.vue')

const appStore  = useAppStore(pinia)
let allPages = [
  { title: 'Home', component: Home, path: "/", type: 'home', social: '/images/header-social.jpg', abstract: "Life is full of obscurities. Don't demystify life.Navigate it." },
  { title: 'About', component: About, path: "/about", type: 'home', social: '/images/header-social.jpg', abstract: "Navigate obscurity about page." },
  { title: 'Colors', component: Colors, path: "/colors", type: 'home', social: '/images/header-social.jpg', abstract: "Navigate obscurity colors page." },
  { title: 'Death', component: Death, path: "/data/death", icon: 'skull', bg: 1, social: '/images/death - social.jpg', type: 'data',abstract: 'Which are the leading causes of death and how do they differ according to age, sex, geography and income? I still can’t believe that almost a third of all deaths in South Africa are due to HIV or that about 1 in 10 deaths in Greenland is a suicide.'},
  { title: 'Biodiversity', component: Biodiversity, path: "/data/biodiversity", icon: 'earthLeaf', bg: 2, type: 'data', abstract: 'We humans have had this peculiar conception that we are the masters of the Earth. And as a result we are doing our best to change everything around us to fit our needs. Even a lot of environmentalism is actually around making Earth more habitable for humans. But how much of life do humans make up on Earth. And how much do we impact other life?'},
  { title: 'Sustainability', component: Sustainability, path: "/data/sustainability", icon: 'earth', bg: 3, type: 'data', abstract: 'Is our way of living sustainable by Earth’s resources? Think of this question this way. If I invite my friends over for a party, will my house return to its normal state next day? Next week? What if the party itself lasts a week? How much partying can my house take before it becomes inhabitable?'},
  { title: 'Migration', component: Migration, path: "/data/migration", icon: 'traveler', bg: 4, type: 'data', abstract: 'Migration has been a part of human life for millennia, even if we sometimes act like it’ something new. But how many people are choosing – or are forced – to migrate today? Where are they going, and where are they coming from? It was very interesting to note how common it is for a country to have both immigrants and emigrants - in the most part in similar percentages of their population.'},
  { title: 'COVID-19', component: Covid19, path: "/data/covid19", icon: 'virus', bg: 5, type: 'data', abstract: 'Remember when pandemics were just in history books and dystopian movies? Welcome to Earth 2020.'},
  { title: 'Energy', component: Energy, path: "/data/energy", icon: 'atom', bg: 1, type: 'data', abstract: 'The pinnacle of human civilisation – Netflix and chill – relies on energy every step of the way. The online services facilitating the occasion, the one-person two-way transportation, the perfect home temperature, and the availability of key items for the night (furniture, devices, clothing, food if you are truly civilised), all require significant amounts of energy to run smoothly. Where does all this energy come from and how do we use it?'},
  { title: 'Head Strong', component: HeadStrong, path: "/notes/head-strong", type: 'node', image: 'https://m.media-amazon.com/images/I/51Ku+j+A8SL._SY445_SX342_.jpg', abstract: 'Everything we do, from breathing to exercising and daydreaming requires energy. All energy is produced at the cellular level, and is produced on demand – it cannot be stored. Therefore, everything you do always antagonises this limited resource of energy. Higher level functions such as creativity and rational thinking are not essential for surviving – at least not like breathing, moving and digestion are - and as a result, they score lower in the energy priority list. At the same time, such higher level functions require a lot of energy. So how do you achieve and maintain peak mental performance and clarity of thought? By boosting your energy production and minimising the energy expenditure of other functions.' },
  { title: 'Elastic', component: Elastic, path: "/notes/elastic", type: 'node', image: 'https://m.media-amazon.com/images/I/61bSJ4u3GwL._SY466_.jpg', abstract: "Are you interested in becoming more creative or imaginative? Better at dealing with ambiguity, contradictions, and more able to adapt to change? Ready to challenge some of your well-rooted assumptions while you are at it? Turns out there is a coherent way of thinking that can help you with all that. It’s called elastic thinking." },
  { title: 'Guns, germs, and steel', component: GGS, path: "/notes/guns-germs-and-steel", type: 'node', image: 'https://m.media-amazon.com/images/I/81r52EwyncL._SY466_.jpg', abstract: "Why did societies develop in different ways and how did certain societies manage to dominate over others throughout the years? The advantages of the dominators are usually down to guns, germs and steel, but why were not those things equally available across societies? Jared Diamond argues that such inequalities are not caused by qualitative differences amongst the people themselves, but are instead dictated by their environments. From the availability of wild animals and plants for the development of food production that allowed the rise of populations, to the particular geography of a society’s environment that allowed or inhibited contact with others and the transfer of goods, ideas, and diseases, it is these external environmental factors that resulted in the wild societal inequalities we ended up with in the last few centuries." },
  { title: 'Emotions', component: Emotions, path: "/notes/emotions", type: 'node', image: 'https://assets-global.website-files.com/64416928859cbdd1716d79ce/647f6794ce621c88dd5f0984_huberman-logo-footer.png', abstract: "In a series of 4 podcasts dedicated to emotions, Andrew Huberman, takes a deep dive into stress, nutrition, motivation, and relationships, discussing how each of these impacts our mood and emotions. Through this discussion Huberman provides valuable concepts we can use to better understand and communicate our own emotions and explains the various tools we can use to influence and change them, ranging from the things we consume to the various behaviours we can implement for results both in the short and the long term." },
  { title: 'Gardens of the moon', component: GOTM, path: "/malazan/gardens-of-the-moon", type: 'malazan', image: 'https://static.wikia.nocookie.net/malazan/images/6/67/GoTM_UK_AR.jpg', abstract: "In the fantasy world of Wu, the Malazan Empire is ever expanding. After arriving in the continent of Genabackis, the Empire has quickly conquered most of the free cities on the North. Two remain: Pale and Darujhistan. While Pale has been under siege for three years, the Empire is already setting its gaze to Darujhistan. As tensions are rising within the Malazan ranks, the Empire will attempt a series of desperate gambits to bring the last free cities under the fold. Gods will step into the fray, ancient beings will be summoned and things will get complicated." },
  { title: 'Deadhouse Gates', component: DG, path: "/malazan/deadhouse-gates", type: 'malazan', image: 'https://static.wikia.nocookie.net/malazan/images/4/41/DG%2BUS%2BTor%2BMMPB.jpg', abstract: "In the Seven Cities continent, a rebellion is brewing with a prophecy, an obscure goddess, high mages, local warlords, and ex-Malazan militants all playing a role. The Malazan Empire will try to suppress it strengthening its presence in the area with a newly appointed Fist and his forces. Two bridgeburners embark on a quest across the same continent with a hidden agenda. A noble, a historian and a thug form an unlikely partnership as they are enslaved and sent on what promises to be a transformative journey. An ancient warrior is on a mission to uncover his past while his companion is deliberately keeping it obscure. A horde of shapeshifters converge on a path fighting for ascension. Paths will be crossed, ankles will be broken, prophecies will be fulfilled, innocents will be crucified, assassins will be unleashed, soldiers will be betrayed, and children will die. This is the second instalment of the Malazan Book of the Fallen." },
  { title: 'Cooperation & Conflict Lab - Global Summary', component: CclabGloSum, path: "/cooperation-conflict-lab/global-summary", type: 'cclab', social: '/images/cooperation-conflict-lab.jpg', abstract: "How do we navigate the fundamental tensions between cooperation and conflict that are inherent to social living? The Cooperation and Conflict Lab investigates these process across a variety of systems, from humans food sharing to cooperation in multicellularity and cancer." },
  { title: 'Cooperation & Conflict Lab - US Summary', component: CclabUsSum, path: "/cooperation-conflict-lab/us-summary", type: 'cclab', social: '/images/cooperation-conflict-lab.jpg', abstract: "How do we navigate the fundamental tensions between cooperation and conflict that are inherent to social living? The Cooperation and Conflict Lab investigates these process across a variety of systems, from humans food sharing to cooperation in multicellularity and cancer." },
  { title: 'Cooperation & Conflict Lab - US Variable Lookup', component: CclabUsLookup, path: "/cooperation-conflict-lab/us-variable-lookup", type: 'cclab', social: '/images/cooperation-conflict-lab.jpg', abstract: "How do we navigate the fundamental tensions between cooperation and conflict that are inherent to social living? The Cooperation and Conflict Lab investigates these process across a variety of systems, from humans food sharing to cooperation in multicellularity and cancer." },
  { title: 'Cooperation & Conflict Lab - Global Variable Lookup', component: CclabGlobalLookup, path: "/cooperation-conflict-lab/global-variable-lookup", type: 'cclab', social: '/images/cooperation-conflict-lab.jpg', abstract: "How do we navigate the fundamental tensions between cooperation and conflict that are inherent to social living? The Cooperation and Conflict Lab investigates these process across a variety of systems, from humans food sharing to cooperation in multicellularity and cancer." },
  { title: 'Cooperation & Conflict Lab - Global Variable Comparison', component: CclabGlobalComparison, path: "/cooperation-conflict-lab/global-variable-comparison", type: 'cclab', social: '/images/cooperation-conflict-lab.jpg', abstract: "How do we navigate the fundamental tensions between cooperation and conflict that are inherent to social living? The Cooperation and Conflict Lab investigates these process across a variety of systems, from humans food sharing to cooperation in multicellularity and cancer." },
  { title: 'Cooperation & Conflict Lab - US Variable Comparison', component: CclabUsComparison, path: "/cooperation-conflict-lab/us-variable-comparison", type: 'cclab', social: '/images/cooperation-conflict-lab.jpg', abstract: "How do we navigate the fundamental tensions between cooperation and conflict that are inherent to social living? The Cooperation and Conflict Lab investigates these process across a variety of systems, from humans food sharing to cooperation in multicellularity and cancer." },
  { title: 'Error', component: Error, path: "/:pathMatch(.*)*", type: 'hidden', social: '/images/header-social.jpg', abstract: "Navigate obscurity error page." },
];

const mappedRoutes:any[] = [];
const pages:any[] = [];
for (let page of allPages) {
  mappedRoutes.push({ path: page.path, component: page.component, name: page.title, meta: getMetaData(page)});
  pages.push({ path: page.path, title: page.title, icon: page.icon, bg: page.bg, type: page.type, abstract: page.abstract, image: page.image});
}
appStore.savePages(pages);
console.log(mappedRoutes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: mappedRoutes
})

// without this, titles and metatags are not properly set
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Navigate Obscurity';
  if (to.meta.hasOwnProperty('metaTags')) {
    for (let x = 0; x < to.meta.metaTags.length; x++) {
      // check if specific meta already exists and remove it
      let oldMeta = document.getElementsByTagName('meta');
      for (let m = 0; m < oldMeta.length; m++) {
        if (oldMeta[m].name == to.meta.metaTags[x].name) {
          oldMeta[m].remove()
        }
      }
      // then add new meta
      let meta = document.createElement('meta')
      if (to.meta.metaTags[x] && to.meta.metaTags[x].hasOwnProperty('name')) {
        meta.name = to.meta.metaTags[x].name
        meta.content = to.meta.metaTags[x].content
      }
      document.head.appendChild(meta)
    }
  }
  next();
});

export default router
