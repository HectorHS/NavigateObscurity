import { createRouter, createWebHistory } from 'vue-router'
// lazy loading for all routes
const Error = () => import('@/views/Error.vue')
const Home = () => import('@/views/Home.vue')
const DataIndex = () => import('@/views/Data/Index.vue')
const NodesIndex = () => import('@/views/Nodes/Index.vue')
const About = () => import('@/views/About.vue')
const Colors = () => import('@/views/Colors.vue')
const Biodiversity = () => import('@/views/Data/Biodiversity.vue')
const Sustainability = () => import('@/views/Data/Sustainability.vue')
const Migration = () => import('@/views/Data/Migration.vue')
const Death = () => import('@/views/Data/Death.vue')
const Energy = () => import('@/views/Data/Energy.vue')
const Covid19 = () => import('@/views/Data/Covid19.vue')
const Cclab = () => import('@/views/cclab/Index.vue')
//TODO get decriptions from appstore
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        publicRoute: true,
        title: 'Home - Navigate Obscurity',
        metaTags: [
         {
           name: 'description',
           content: "Life is full of obscurities. Don't demystify life. Navigate it."
         },{
          property:"og:image",
          content: "/images/header-social.jpg"
        },{
          property: "og:title",
          content:"Home - Navigate Obscurity"
        },{
          property: "og:url",
          content: "https://www.navigateobscurity.com/"
        },{
          name: "twitter:card",
          content: "summary"
        },{
          name: "twitter:url",
          content: "https://www.navigateobscurity.com/"
        },{
          name: "twitter:title",
          content: "Home - Navigate Obscurity"
        },{
          name:"twitter:description",
          content:"Life is full of obscurities. Don't demystify life. Navigate it."
        },{
          name: "twitter:image",
          content:"/images/header-social.jpg"
        }]
      }
    },

    {
      path: '/data',
      name: 'data',
      component: DataIndex,
      meta: {
        publicRoute: true,
        title: 'Data - Navigate Obscurity',
        metaTags: [{
           name: 'description',
           content: "Too often, I realise how little I know about this world. I am not talking about details, I am talking about the big picture. The kind of things you would expect to cover on an Earth 101 course in an alien university. So, I look for reasonably well sourced data and visualise them hoping to aid my perspective on life on Earth."
         },{
          property:"og:image",
          content:"/images/header-social.jpg"
         },{
          property:"og:title",
          content:"Data - Navigate Obscurity"
         }, {
          property:"og:url",
          content:"https://www.navigateobscurity.com/data"
         },{
          name:"twitter:card",
          content:"summary"
         },{
          name:"twitter:url",
          content:"https://www.navigateobscurity.com/data"
         },{
          name:"twitter:title",
          content:"Data - Navigate Obscurity"
         },{
          name:"twitter:description",
          content:"Too often, I realise how little I know about this world. I am not talking about details, I am talking about the big picture. The kind of things you would expect to cover on an Earth 101 course in an alien university. So, I look for reasonably well sourced data and visualise them hoping to aid my perspective on life on Earth."
         },{
          name:"twitter:image",
          content:"/images/header-social.jpg"
         }]
      }
    },
    {
      path: '/notes',
      name: 'notes',
      component: NodesIndex,
      meta: {
        publicRoute: true,
        title: 'Notes - Navigate Obscurity',
        metaTags: [{
           name: 'description',
           content: "I read books and then I forget about them. So I take notes. But then I never go through the notes again. So I am trying to find nicer ways to revisit notes and themes from books in a more engaging and non linear way. The notes are complimentary, and in no way a substitute of the books. Therefore reading the original material first is highly recommended.  Click on the book covers to explore them."
         },{
          property:"og:image",
          content:"https://www.navigateobscurity.com/static/main/images/header-social.jpg"
         },{
          property:"og:title",
          content:"Notes - Navigate Obscurity"
         },{
          property:"og:url",
          content:"https://www.navigateobscurity.com/notes"
         },{
          name:"twitter:card",
          content:"summary"
         },{
          name:"twitter:url",
          content:"https://www.navigateobscurity.com/notes"
         },{
          name:"twitter:title",
          content:"Notes - Navigate Obscurity"
         },{
          name:"twitter:description",
          content:"I read books and then I forget about them. So I take notes. But then I never go through the notes again. So I am trying to find nicer ways to revisit notes and themes from books in a more engaging and non linear way. The notes are complimentary, and in no way a substitute of the books. Therefore reading the original material first is highly recommended.  Click on the book covers to explore them."
         },{
          name:"twitter:image",
          content:"https://www.navigateobscurity.com/static/main/images/header-social.jpg"
         }]
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        publicRoute: true,
        title: 'About - Navigate Obscurity',
        metaTags: [{
           name: 'description',
           content: "Navigate obscurity about page."
         },{
          property:"og:image",
          content:"https://www.navigateobscurity.com/static/main/images/header-social.jpg"
         },{
          property:"og:title",
          content:"About - Navigate Obscurity"
         },{
          property:"og:url",
          content:"https://www.navigateobscurity.com/about"
         },{
          name:"twitter:card",
          content:"summary"
         },{
          name:"twitter:url",
          content:"https://www.navigateobscurity.com/about"
         },{
          name:"twitter:title",
          content:"About - Navigate Obscurity"
         },{
          name:"twitter:description",
          content:"Navigate obscurity about page."
         },{
          name:"twitter:image",
          content:"https://www.navigateobscurity.com/static/main/images/header-social.jpg"
         }]
      }
    },
    {
      path: '/colors',
      name:"colors",
      component: Colors
    },
    {
      path: '/data/biodiversity',
      name: 'biodiversity',
      component: Biodiversity,
      meta: {
        publicRoute: true,
        title: 'Biodiversity - Navigate Obscurity',
        metaTags: [{
           name: 'description',
           content: "We humans have had this peculiar conception that we are the masters of the Earth. And as a result we are doing our best to change everything around us to fit our needs. Even a lot of environmentalism is actually around making Earth more habitable for humans. But how much of life do humans make up on Earth. And how much do we impact other life?"
         },{
          property:"og:image",
          content:"/images/biodiversity-social.jpg"
         },{
          property:"og:title",
          content:"Biodiversity - Navigate Obscurity"
         },{
          property:"og:url",
          content:"https://www.navigateobscurity.com/data/biodiversity"
         },{
          name:"twitter:card",
          content:"summary"
         },{
          name:"twitter:url",
          content:"https://www.navigateobscurity.com/data/biodiversity"
         },{
          name:"twitter:title",
          content:"Biodiversity - Navigate Obscurity"
         },{
          name:"twitter:description",
          content:"We humans have had this peculiar conception that we are the masters of the Earth. And as a result we are doing our best to change everything around us to fit our needs. Even a lot of environmentalism is actually around making Earth more habitable for humans. But how much of life do humans make up on Earth. And how much do we impact other life?"
         },{
          name:"twitter:image",
          content:"/images/biodiversity-social.jpg"
         }]
      }
    },
    {
      path: '/data/sustainability',
      name: 'sustainability',
      component: Sustainability,
      meta: {
        publicRoute: true,
        title: 'Sustainability - Navigate Obscurity',
        metaTags: [{
           name: 'description',
           content: "Is our way of living sustainable by Earth’s resources? Think of this question this way. If I invite my friends over for a party, will my house return to its normal state next day? Next week? What if the party itself lasts a week? How much partying can my house take before it becomes inhabitable?"
         },{
          property:"og:image",
          content:"/images/sustainability-social.jpg"
         },{
          property:"og:title",
          content:"Sustainability - Navigate Obscurity"
         },{
          property:"og:url",
          content:"https://www.navigateobscurity.com/data/sustainability"
         },{
          name:"twitter:card",
          content:"summary"
         },{
          name:"twitter:url",
          content:"https://www.navigateobscurity.com/data/sustainability"
         },{
          name:"twitter:title",
          content:"Sustainability - Navigate Obscurity"
         },{
          name:"twitter:description",
          content:"Is our way of living sustainable by Earth’s resources? Think of this question this way. If I invite my friends over for a party, will my house return to its normal state next day? Next week? What if the party itself lasts a week? How much partying can my house take before it becomes inhabitable?"
         },{
          name:"twitter:image",
          content:"/images/sustainability-social.jpg"
         }]
      }
    },
    {
      path: '/data/migration',
      name: 'migration',
      component: Migration,
      meta: {
        publicRoute: true,
        title: 'Migration - Navigate Obscurity',
        metaTags: [{
          name: 'description',
          content: "Migration has been a part of human life for millennia, even if we sometimes act like it’ something new. But how many people are choosing – or are forced – to migrate today? Where are they going, and where are they coming from? It was very interesting to note how common it is for a country to have both immigrants and emigrants - in the most part in similar percentages of their population."
        }, {
          property: "og:image",
          content: "/images/migration-social.jpg"
        }, {
          property: "og:title",
          content: "Migration - Navigate Obscurity"
        }, {
          property: "og:url",
          content: "https://www.navigateobscurity.com/data/migration"
        }, {
          name: "twitter:card",
          content: "summary"
        }, {
          name: "twitter:url",
          content: "https://www.navigateobscurity.com/data/migration"
        }, {
          name: "twitter:title",
          content: "Migration - Navigate Obscurity"
        }, {
          name: "twitter:description",
          content: "Migration has been a part of human life for millennia, even if we sometimes act like it’ something new. But how many people are choosing – or are forced – to migrate today? Where are they going, and where are they coming from? It was very interesting to note how common it is for a country to have both immigrants and emigrants - in the most part in similar percentages of their population."
        }, {
          name: "twitter:image",
          content: "/images/migration-social.jpg"
        }]
      }
    },
    {
      path: '/data/death',
      name: 'death',
      component: Death,
      meta: {
        publicRoute: true,
        title: 'Death - Navigate Obscurity',
        metaTags: [{
          name: 'description',
          content: "Which are the leading causes of death and how do they differ according to age, sex, geography and income? I still can’t believe that almost a third of all deaths in South Africa are due to HIV or that about 1 in 10 deaths in Greenland is a suicide."
        }, {
          property: "og:image",
          content: "/images/death-social.jpg"
        }, {
          property: "og:title",
          content: "Death - Navigate Obscurity"
        }, {
          property: "og:url",
          content: "https://www.navigateobscurity.com/data/death"
        }, {
          name: "twitter:card",
          content: "summary"
        }, {
          name: "twitter:url",
          content: "https://www.navigateobscurity.com/data/death"
        }, {
          name: "twitter:title",
          content: "Death - Navigate Obscurity"
        }, {
          name: "twitter:description",
          content: "Which are the leading causes of death and how do they differ according to age, sex, geography and income? I still can’t believe that almost a third of all deaths in South Africa are due to HIV or that about 1 in 10 deaths in Greenland is a suicide."
        }, {
          name: "twitter:image",
          content: "/images/death-social.jpg"
        }]
      }
    },
    {
      path: '/data/energy',
      name: 'energy',
      component: Energy,
      meta: {
        publicRoute: true,
        title: 'Energy - Navigate Obscurity',
        metaTags: [{
          name: 'description',
          content: "The pinnacle of human civilisation – Netflix and chill – relies on energy every step of the way. The online services facilitating the occasion, the one-person two-way transportation, the perfect home temperature, and the availability of key items for the night (furniture, devices, clothing, food if you are truly civilised), all require significant amounts of energy to run smoothly. Where does all this energy come from and how do we use it?"
        }, {
          property: "og:image",
          content: "/images/energy-social.jpg"
        }, {
          property: "og:title",
          content: "Energy - Navigate Obscurity"
        }, {
          property: "og:url",
          content: "https://www.navigateobscurity.com/data/energy"
        }, {
          name: "twitter:card",
          content: "summary"
        }, {
          name: "twitter:url",
          content: "https://www.navigateobscurity.com/data/energy"
        }, {
          name: "twitter:title",
          content: "Energy - Navigate Obscurity"
        }, {
          name: "twitter:description",
          content: "The pinnacle of human civilisation – Netflix and chill – relies on energy every step of the way. The online services facilitating the occasion, the one-person two-way transportation, the perfect home temperature, and the availability of key items for the night (furniture, devices, clothing, food if you are truly civilised), all require significant amounts of energy to run smoothly. Where does all this energy come from and how do we use it?"
        }, {
          name: "twitter:image",
          content: "/images/energy-social.jpg"
        }]
      }
    },
    {
      path: '/data/covid19',
      name: 'COVID19',
      component: Covid19,
      meta: {
        publicRoute: true,
        title: 'COVID19 - Navigate Obscurity',
        metaTags: [{
          name: 'description',
          content: "Remember when pandemics were just in history books and dystopian movies? Welcome to Earth 2020."
        }, {
          property: "og:image",
          content: "/images/covid19-social.jpg"
        }, {
          property: "og:title",
          content: "COVID19 - Navigate Obscurity"
        }, {
          property: "og:url",
          content: "https://www.navigateobscurity.com/data/covid19"
        }, {
          name: "twitter:card",
          content: "summary"
        }, {
          name: "twitter:url",
          content: "https://www.navigateobscurity.com/data/covid19"
        }, {
          name: "twitter:title",
          content: "COVID19 - Navigate Obscurity"
        }, {
          name: "twitter:description",
          content: "Remember when pandemics were just in history books and dystopian movies? Welcome to Earth 2020."
        }, {
          name: "twitter:image",
          content: "/images/covid19-social.jpg"
        }]
      }
    },
    {
      path: '/cooperation-conflict-lab',
      name: 'cooperation-conflict-lab',
      component: Cclab,
      meta: {
        publicRoute: true,
        title: 'Cooperation & Conflict Lab - Navigate Obscurity',
        metaTags: [{
          name: 'description',
          content: "How do we navigate the fundamental tensions between cooperation and conflict that are inherent to social living? The Cooperation and Conflict Lab investigates these process across a variety of systems, from humans food sharing to cooperation in multicellularity and cancer."
        }, {
          property: "og:image",
          content: "/images/cooperation-conflict-lab.jpg"
        }, {
          property: "og:title",
          content: "Cooperation & Conflict Lab"
        }, {
          property: "og:url",
          content: "https://www.navigateobscurity.com/data/covid19"
        }, {
          name: "twitter:card",
          content: "summary"
        }, {
          name: "twitter:url",
          content: "https://www.navigateobscurity.com/data/covid19"
        }, {
          name: "twitter:title",
          content: "Cooperation & Conflict Lab"
        }, {
          name: "twitter:description",
          content: "How do we navigate the fundamental tensions between cooperation and conflict that are inherent to social living? The Cooperation and Conflict Lab investigates these process across a variety of systems, from humans food sharing to cooperation in multicellularity and cancer."
        }, {
          name: "twitter:image",
          content: "/images/cooperation-conflict-lab.jpg"
        }]
      }
    },
    {
      path: "/:pathMatch(.*)*",
      name: 'Error',
      component: Error,
    },

  ]
})

export default router
