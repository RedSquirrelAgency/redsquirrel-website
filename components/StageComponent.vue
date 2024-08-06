<template>
  <div class="item">
    <div class="index">
      {{ formatIndex(props.index) }}
    </div>
    <div class="content">
      <div class="title">
        {{ props.title }}
      </div>
      <div class="subtitle">
        <ul v-if="Array.isArray(props.subtitle)">
          <li
            v-for="(bullet, bulletIndex) in props.subtitle"
            :key="bulletIndex"
          >
            {{ bullet }}
          </li>
        </ul>
        <span v-else>
          {{ props.subtitle }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(
  {
    index: Number,
    title: String,
    subtitle: { type: [String, Array] }
  })

function formatIndex(index: number | undefined) {
  if (index === undefined) return ''
  return `${(index + 1).toString().padStart(2, '0')}`
}
</script>

<style scoped lang="scss">
@import "styles/variables";
@import "vuetify/settings";

@media #{map-get($display-breakpoints, 'md-and-up')} {
  .item {
    padding: 2.08vw;
  }

  .index {
    font-size: 4.86vw;
    line-height: 7.29vw;
  }

  .title {
    font-size: 1.94vw;
    line-height: 2.91vw;
    margin-bottom: 0.69vw;
  }

  ul {
    li + li {
      margin-top: 0.69vw;
    }
  }
}

@media #{map-get($display-breakpoints, 'sm-and-down')} {
  .item {
    padding: 3.125vw;
  }

  .index {
    font-size: 9.375vw;
    line-height: 14.06vw;
  }

  .title {
    font-size: 4.68vw;
    line-height: 7vw;
    margin-bottom: 3.125vw;
  }

  ul {
    margin-left: 4vw;

    li::before {
      font-size: 2.6em;
      width: 0.5em;
      margin-left: -0.5em;
    }

    li + li {
      margin-top: 3.125vw;
    }
  }
}

.item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .index {
    color: $redsquirrel-cream-p1;
    font-weight: 200;
    font-style: italic;
    margin-bottom: auto;
  }

  .content {
    color: $redsquirrel-chocolate;
    font-weight: 300;

    ul {
      list-style: none;
      margin-left: 1.2em;

      li::before {
        content: "•";
        display: inline-block;
        vertical-align: text-bottom;
        color: $redsquirrel-peach;
        font-size: 2.6em;
        width: 0.5em;
        margin-left: -0.5em;
      }
    }
  }
}
</style>
