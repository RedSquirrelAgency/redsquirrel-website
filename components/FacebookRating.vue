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
  font-size: 1vw;
  text-underline-offset: 0.4vw;
  text-decoration-thickness: 0.5px;
}
</style>
