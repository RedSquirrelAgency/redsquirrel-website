<template>
  <div class="container d-flex justify-center">
    <GlassSheet class="footer">
      <v-row>
        <div class="heading">
          Redsquirrel
        </div>
      </v-row>
      <v-row>
        <v-col>
          <div>Home</div>
          <div>Cases</div>
          <div>Reviews</div>
          <div>FAQ</div>
          <div>Contacts</div>
          <div>Impressum</div>
          <div>Privacy Policy</div>
        </v-col>
        <v-col>
          <div>Munich, 81927 Germany</div>
          <div>144/202/21135</div>
          <div>DE362321598</div>
        </v-col>
        <v-col>
          <div>Telegram</div>
          <div>Whatsapp</div>
          <div>Facebook</div>
          <div>Instagram</div>
          <div>Email</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div>© 2024 RedSquirrel</div>
        </v-col>
        <v-col>
          <div>By RedSquirrel</div>
        </v-col>
      </v-row>
    </GlassSheet>
  </div>
</template>

<script setup lang="ts">
import { navigationEmits, useSectionNavigation } from '~/composables/sectionNavigation'
import { useScrollAnimation } from '~/composables/scrollAnimation'

const emit = defineEmits([...navigationEmits])
const { next, back } = useSectionNavigation(emit)

const containerStyle = ref({})
useScrollAnimation({
  valueFrom: 0,
  valueTo: -300,
  onChange: (value: number) => {
    containerStyle.value = {
      top: `${value}px`
    }
  },
  onScrollUpOverflow: back,
  onScrollDownOverflow: next
})
</script>

<style scoped lang="scss">
@import "styles/variables";

.container {
  padding: 100px 120px 10px;
}

.footer {
  text-transform: uppercase;
  color: $redsquirrel-chocolate-m1;
  font-size: 18px;
  font-weight: 300;
  line-height: 27px;
  padding: 0 120px 10px;
}

.heading {
  line-height: 190px;
  font-size: 181px;
  font-weight: 400;
  color: $redsquirrel-cream-p1;
}
</style>
