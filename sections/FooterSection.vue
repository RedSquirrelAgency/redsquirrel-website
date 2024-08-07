<template>
  <section class="d-flex justify-center">
    <GlassSheet
      class="sheet"
      :fill="0.3"
      :border="mdAndUp ? '3vw' : '6.25vw'"
    >
      <div
        class="d-flex justify-center"
        :class="mdAndUp ? 'v-row' : ''"
      >
        <div class="heading">
          REDSQUIRREL
        </div>
      </div>
      <div :class="mdAndUp ? 'v-row' : ''">
        <div
          class="navigation-links"
          :class="mdAndUp ? 'v-col' : ''"
        >
          <a
            v-for="(link, index) in navigationLinks"
            :key="index"
            :href="link.to"
            class="text-link"
          >
            {{ $t(link.title) }}
          </a>
        </div>
        <CompanyInfo
          class="company-info"
          :class="mdAndUp ? 'v-col' : ''"
        />
        <SocialLinks
          class="social-links"
          :class="mdAndUp ? 'v-col' : ''"
          highlight
        />
      </div>
      <CopyRight
        class="copyright"
        :class="mdAndUp ? 'v-row' : ''"
      />
    </GlassSheet>
  </section>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()

const navigationLinks = [
  { title: 'Home', to: '/' },
  { title: 'Cases', to: '#cases' },
  { title: 'Reviews', to: '#reviews' },
  { title: 'FAQ', to: '/' },
  { title: 'Contacts', to: '/' },
  { title: 'Impressum', to: '/' },
  { title: 'Privacy Policy', to: '/' }
]
</script>

<style scoped lang="scss">
@import "styles/variables";
@import "vuetify/settings";

@media #{map-get($display-breakpoints, 'md-and-up')} {
  section {
    padding: 5vw 8vw 0.8vw;
  }

  .sheet {
    padding: 2vw;
    font-size: 1.25vw;
    line-height: 1.875vw;

    .v-row {
      margin: 0;
    }

    .v-col {
      padding: 0;
    }

    .heading {
      font-size: 12.8vw;
      line-height: 11vw;
      margin-bottom: 3vw;
    }

    .copyright {
      margin-top: 3.47vw;
      font-size: 1vw;
      line-height: 1.5vw;

      display: inline-grid;
      grid-template-columns: calc(100% / 3 * 2) auto;
      width: 100%;
    }
  }
}

@media #{map-get($display-breakpoints, 'sm-and-down')} {
  section {
    padding: 1.56vw;
  }

  .sheet {
    padding: 3.125vw;
    font-size: 4.68vw;
    line-height: 7vw;

    .heading {
      font-size: 14.68vw;
      line-height: 22vw;
    }

    .navigation-links {
      margin-bottom: 6.25vw;
    }

    .company-info {
      margin-bottom: 6.25vw;
    }

    .social-links {
      margin-bottom: 6.25vw;
    }

    .copyright {
      display: flex;
      justify-content: space-between;
      font-size: 3.75vw;
      line-height: 5.625vw;
    }
  }
}

.sheet {
  text-transform: uppercase;
  color: $redsquirrel-chocolate-m1;
  width: 100%;
  font-weight: 300;

  .heading {
    font-weight: 400;
    color: $redsquirrel-cream-p1;
    text-align: center;
    text-shadow: 0 20px 30px #D3835B1A;
  }

  .company-info :first-child {
    color: $redsquirrel-chocolate
  }
}
</style>
