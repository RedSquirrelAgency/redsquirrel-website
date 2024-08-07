<template>
  <section ref="containerRef">
    <div class="header">
      <AnimatedText>
        <h2 class="gradient-1">
          <HeadingText
            :text="$t('Stages transparency')"
            :font-replacements="[[0, 2], [1, 4], [1, 10]]"
            :line-breaks="mdAndUp ? [] : [0]"
            :line-spacers="mdAndUp ? {} : { 0: '0.5em' }"
          />
        </h2>
      </AnimatedText>
      <AnimatedText>
        <p class="section-subtitle">
          <HeadingText
            :text="$t('Thanks to aligning important stages and safeguarding our decisions, we can manage to fully meet your expectations')"
            :line-breaks="mdAndUp ? [8] : []"
          />
        </p>
      </AnimatedText>
    </div>
    <div class="stages">
      <GlassSheet
        v-for="(stage, index) in stages"
        :key="index"
        :style="calculateStageSheetPosition(index)"
        class="stage-sheet"
        :fill="0.3"
        :blur="mdAndUp ? 12 : 24"
        :border="mdAndUp ? '3vw' : '6.25vw'"
      >
        <StageComponent
          :index="index"
          :title="$t(stage.title)"
          :subtitle="translateSubtitle(stage.subtitle)"
        />
      </GlassSheet>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { $gsap } = useNuxtApp()
const { t } = useI18n()
const { mdAndUp } = useDisplay()

const containerRef = ref()

function calculateStageSheetPosition(index: number) {
  if (mdAndUp.value) {
    const left = index % 2 === 0 && '8.33vw'
    const right = index % 2 !== 0 && '8.33vw'
    const top = `${34.02 * index}vw`
    return { left, right, top }
  }
  else {
    const top = `${10 * index}vw`
    return { top }
  }
}

function translateSubtitle(subtitle: string | string[]) {
  if (Array.isArray(subtitle)) {
    return subtitle.map(item => t(item))
  }
  return t(subtitle)
}

onMounted(() => {
  const container = containerRef.value
  if (mdAndUp.value) {
    $gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${stages.length * 500}px`,
        scrub: true,
        pin: true
      },
      defaults: { ease: 'none' }
    })
      .fromTo(container.querySelector('.stages'),
        { yPercent: 0 },
        { yPercent: -420 }
      )
  }
  else {
    const stageSheets = container.querySelectorAll('.stage-sheet')
    const stageSheetsArray = $gsap.utils.toArray(stageSheets) as HTMLElement[]

    const tl = $gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${stages.length * 1000}px`,
        scrub: true,
        pin: true
      },
      defaults: { ease: 'none' }
    })

    for (const stageSheet of stageSheetsArray) {
      tl.fromTo(stageSheet,
        { yPercent: 200 },
        { yPercent: 0 }
      )
    }
  }
})

const stages = [
  {
    title: 'Free Consultation',
    subtitle: 'We introduce ourselves, delve into your task, ask crucial questions, provide a price proposal (up to 3 working days), and sign the contract'
  },
  {
    title: 'Analytics',
    subtitle: [
      'Briefing in the format of an online meeting (usually up to 2 hours)',
      'Market and Competitor Analysis',
      'Audience research and creation of audience personas'
    ]
  },
  {
    title: 'Prototyping',
    subtitle: [
      'Writing understandable texts',
      'Prototype development + approval'
    ]
  },
  {
    title: 'Design',
    subtitle: [
      'Selection of design references',
      'Preparation of mood board + approval',
      'Drawing up design concept + approval',
      'Drawing up the mobile version and UI kit'
    ]
  },
  {
    title: 'Development',
    subtitle: [
      'Website layout and animation implementation',
      'Integration with CMS WordPress + approval',
      'Website hosting and domain linking',
      'Integration of additional solutions'
    ]
  },
  {
    title: 'Testing and Delivery',
    subtitle: [
      'Checking website functionality on different devices and browsers',
      'Basic SEO optimization',
      'Preparation of website management instructions',
      'Handover of all source files',
      '30-day free support'
    ]
  }
]
</script>

<style scoped lang="scss">
@import "styles/variables";
@import "vuetify/settings";

@media #{map-get($display-breakpoints, 'md-and-up')} {
  .header {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .stages {
    height: 100%;
  }

  .stage-sheet {
    width: 33.12vw;
    height: 34.02vw;
  }
}

@media #{map-get($display-breakpoints, 'sm-and-down')} {
  section {
    height: 100vh;
    padding: $section-padding-x-mobile $section-padding-y-mobile 0;
  }

  h2 {
    margin-bottom: 3.125vw;
  }

  .stages {
    position: relative;
    top: -45%;
    display: flex;
    justify-content: center;
  }

  .stage-sheet {
    width: 93.75vw;
    height: 93.75vw;
  }
}

.stages {
  position: relative;
  width: 100%;

  .stage-sheet {
    position: absolute;
  }
}
</style>
