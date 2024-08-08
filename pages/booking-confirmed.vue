<template>
  <div>
    <h2 class="gradient-1">
      <HeadingText
        :text="$t('Booking confirmed')"
        :font-replacements="[[0, 2], [1, 0]]"
      />
    </h2>
    <div class="section-subtitle">
      {{ $t('While you wait for the meeting, we suggest taking another look at our projects and getting better acquainted with our approach') }}
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
