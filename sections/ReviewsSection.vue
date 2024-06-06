<template>
  <div class="container d-flex justify-center">
    <v-card
      v-for="(review, index) in reviews"
      :key="index"
      :style="{ position: 'absolute', ...review.position }"
      class="review-card glass"
      min-width="190"
      max-width="190"
      height="204"
    >
      <v-container
        class="d-flex h-100 justify-center align-center"
        style="flex-direction: column"
      >
        <v-avatar
          class="avatar"
          size="100"
        >
          <v-img
            alt="John"
            src="https://cdn.vuetifyjs.com/images/john.jpg"
          />
        </v-avatar>
        <div class="name">
          {{ review.name }}
        </div>
        <div class="company">
          {{ review.company }}
        </div>
      </v-container>
    </v-card>
    <div class="header">
      <FacebookRating class="facebook-rating text-center" />
      <h3 class="text-center">
        <span class="line"><span class="style-script">W</span>e are ch<span class="style-script">o</span>sen for our</span>
        <span class="line">high le<span class="style-script">v</span>el of exp<span class="style-script">e</span>rtise</span>
        <span class="line">and <span class="style-script">s</span>ervice</span>
      </h3>
      <h4 class="text-center">
        <span class="line">Photos and voices are generated</span>
        <span class="line">by AI due to the confidentiality of</span>
        <span class="line">our clients</span>
      </h4>
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigationEmits, useSectionNavigation } from '~/composables/sectionNavigation'
import { useScrollAnimation } from '~/composables/scrollAnimation'

const emit = defineEmits([...navigationEmits])
const { next, back } = useSectionNavigation(emit)

useScrollAnimation({
  valueFrom: 0,
  valueTo: 20,
  onChange: (value: number) => {
  },
  onScrollUpOverflow: back
})

const reviews = [
  {
    name: 'Name Surname',
    company: 'Business',
    avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
    position: { top: '100px', left: '488px' }
  },
  {
    name: 'Name Surname',
    company: 'Business',
    avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
    position: { top: '100px', right: '488px' }
  },
  {
    name: 'Name Surname',
    company: 'Business',
    avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
    position: { top: '120px', left: '215px' }
  },
  {
    name: 'Name Surname',
    company: 'Business',
    avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
    position: { top: '180px', right: '215px' }
  },
  {
    name: 'Name Surname',
    company: 'Business',
    avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
    position: { top: '404px', left: '120px' }
  },
  {
    name: 'Name Surname',
    company: 'Business',
    avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
    position: { top: '464px', right: '120px' }
  },
  {
    name: 'Name Surname',
    company: 'Business',
    avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
    position: { top: '688px', left: '215px' }
  },
  {
    name: 'Name Surname',
    company: 'Business',
    avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
    position: { top: '728px', right: '215px' }
  }
]
</script>

<style scoped lang="scss">
@import "styles/variables";

.glass {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.header {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .facebook-rating {
    color: $redsquirrel-cream;
  }

  h3 {
    margin: 20px 0;
  }
}

.review-card {
  border: 1px solid rgba(255, 255, 255, 0.7);

  .avatar {
    margin-bottom: 20px;
    border: 1px solid rgba(255, 255, 255, 0.7);
  }

  .name {
    text-transform: uppercase;
    font-size: 16px;
    line-height: 24px;
    color: $redsquirrel-cream-m1;
  }

  .company {
    font-size: 15px;
    line-height: 15px;
    color: $redsquirrel-cream-p1;
  }
}
</style>
