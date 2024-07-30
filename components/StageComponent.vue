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

.item {
  width: 100%;
  height: 100%;
  padding: 2.08vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .index {
    color: $redsquirrel-cream-p1;
    font-size: 4.86vw;
    line-height: 7.29vw;
    font-weight: 200;
    font-style: italic;
    margin-bottom: auto;
  }

  .content {
    color: $redsquirrel-chocolate;
    font-weight: 300;

    .title {
      font-size: 1.94vw;
      line-height: 2.91vw;
      margin-bottom: 0.69vw;
    }

    .subtitle {
      font-size: 1.04vw;
      line-height: 1.56vw;

      ul {
        margin-left: 0.69vw;

        li::marker {
          color: $redsquirrel-peach-p1;
        }
      }
    }
  }
}
</style>
