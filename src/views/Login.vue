<template>
  <div style="display:flex;">
    <!-- blob background from codepen: https://codepen.io/tahazsh/details/gOqNZyw -->
    <div class="bouncing-blobs-container">
      <div class="bouncing-blobs-glass"></div>
      <div class="bouncing-blobs">
        <div class="bouncing-blob bouncing-blob--blue"></div>
        <div class="bouncing-blob bouncing-blob--blue"></div>
        <div class="bouncing-blob bouncing-blob--blue"></div>
        <div class="bouncing-blob bouncing-blob--white"></div>
        <div class="bouncing-blob bouncing-blob--purple"></div>
        <div class="bouncing-blob bouncing-blob--purple"></div>
        <div class="bouncing-blob bouncing-blob--pink"></div>
        <div class="bouncing-blob bouncing-blob--white-2"></div>
      </div>
    </div>
    <div class="login-container">
      <v-card width="500" title="Login">
        <v-form @submit.prevent="login()" class="pa-5 pt-0">
          <v-text-field v-model="username" prepend-inner-icon="mdi-account" label="Username" hide-details class="py-5"></v-text-field>
          <v-text-field v-model="password" prepend-inner-icon="mdi-lock" type="password" label="Password" hide-details class="py-5"></v-text-field>
          <span class="py-5 text-error" :hidden="!invalidLogin">Invalid username or password, please try again.</span>
          <v-btn type="submit" size="large" block :loading="loginPending" class="mt-5"> Login </v-btn>
        </v-form>
      </v-card>
    </div>
</div>
</template>


<script lang="ts">
import { useAppStore } from '@/store/appStore'
import { defineComponent } from 'vue';

// const store = useStore()
const MIN_SPEED = 1.2
const MAX_SPEED = 2.5

function randomNumber(min:number, max:number):number {
  return Math.random() * (max - min) + min
}

class Blob {
  el:HTMLElement;
  size:number;
  initialX:number;
  initialY:number;
  vx:number;
  vy:number;
  x:number;
  y:number;

  constructor(el) {
    this.el = el
    const boundingRect = this.el.getBoundingClientRect()
    this.size = boundingRect.width
    this.initialX = randomNumber(0, window.innerWidth - this.size)
    this.initialY = randomNumber(0, window.innerHeight - this.size)
    this.el.style.top = `${this.initialY}px`
    this.el.style.left = `${this.initialX}px`
    this.vx =
      randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1)
    this.vy =
      randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1)
    this.x = this.initialX
    this.y = this.initialY
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    if (this.x >= window.innerWidth - this.size) {
      this.x = window.innerWidth - this.size
      this.vx *= -1
    }
    if (this.y >= window.innerHeight - this.size) {
      this.y = window.innerHeight - this.size
      this.vy *= -1
    }
    if (this.x <= 0) {
      this.x = 0
      this.vx *= -1
    }
    if (this.y <= 0) {
      this.y = 0
      this.vy *= -1
    }
  }

  move() {
    this.el.style.transform = `translate(${this.x - this.initialX}px, ${
      this.y - this.initialY
    }px)`
  }
}

export default defineComponent ({
  name: "Login",
  setup() {
    // setup the store
    const appStore = useAppStore()
    return { appStore }
  },
  data: () => ({
    username: "",
    password: "",
    loginRequestPending: false,
  }),
  methods: {
    login () {
      if (this.username !== '' && this.password !== '') {
        this.loginRequestPending = true;
        // store.login();
        this.appStore.login(this.username, this.password);
      }
    },
    initBlobs() {
      const blobEls = document.querySelectorAll('.bouncing-blob')
      const blobs = Array.from(blobEls).map((blobEl) => new Blob(blobEl))

      function update() {
        requestAnimationFrame(update)
        blobs.forEach((blob) => {
          blob.update()
          blob.move()
        })
      }

      requestAnimationFrame(update)
    }
  },
  computed: {
    loginPending () {
      return this.appStore.loginPending;
    },
    invalidLogin () {
      return this.appStore.invalidLogin;
    },
    loggedIn () {
      return this.appStore.loggedIn;
    }
  },
  watch: {
    loggedIn : function () {
      if (this.loggedIn) {
        this.$router.replace({name: "machines"})
      }
    }
  },
  mounted() {
    this.initBlobs();
  },
})
</script>


<style lang="scss">
.login-container .v-card {
  background: hsla(175, 80%, 1%, 50%);
}

// moving blobs background
.bouncing-blob {
  width: 32vw;
  aspect-ratio: 1;
  border-radius: 50%;
  will-change: transform;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  transform-origin: left top;
}
.bouncing-blob--blue {
  background: hsl(190, 100%, 10%);
}
.bouncing-blob--white {
  background: hsl(185, 100%, 38%);
  z-index: 2;
  width: 15vw;
}
.bouncing-blob--white-2 {
  background: hsl(185, 100%, 41%);
  z-index: 2;
  width: 8vw;
}
.bouncing-blob--purple {
  background: hsl(180, 55%, 25%);
}
.bouncing-blob--pink {
  background: hsl(185, 75%, 22%);
}
.bouncing-blobs-container {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.bouncing-blobs-glass {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(140px);
  -webkit-backdrop-filter: blur(140px);
  pointer-events: none;
}
.bouncing-blobs {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.login-container {
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 10;

  .v-icon {
    padding-right: 8px;
  }
}

@media (max-width: 1200px) {
  .bouncing-blobs-glass {
    backdrop-filter: blur(120px);
    -webkit-backdrop-filter: blur(120px);
  }
}
@media (max-width: 500px) {
  .bouncing-blob {
    width: 60vw;
  }
  .bouncing-blob--white {
    width: 30vw;
  }
  .bouncing-blobs-glass {
    backdrop-filter: blur(90px);
    -webkit-backdrop-filter: blur(90px);
  }
 }
</style>