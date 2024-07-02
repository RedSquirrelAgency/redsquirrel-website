<template>
  <a
    href="https://www.facebook.com/domozhirovaalena"
    target="_blank"
    class="facebook-rating"
  >
    {{ $t("5/5 rating on Facebook") }}
  </a>
</template>

<style scoped lang="scss">
@import "styles/variables";

.facebook-rating {
  text-transform: uppercase;
  color: $redsquirrel-cream-m1;
  font-size: 15px;
  line-height: 22.5px;
  text-underline-offset: 5px;
}
</style>
