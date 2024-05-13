<template>
  <v-app>
    <v-main>
      <div class="container fill-height">
        <!-- Benefits, consultation and rating -->
        <div class="d-flex justify-end">
          <div class="benefit d-flex align-start flex-column">
            <p>Conducting in-depth research on the target audience and market, crafting modern design solutions, and writing compelling texts to ensure <span class="highlights">the website effectively sells</span> to your audience and achieves business objectives</p>
            <v-btn class="consultation-button"
                   rounded="xl"
                   append-icon="mdi-arrow-right">
              {{ $t("Book a consultation") }}
            </v-btn>
            <div class="facebook-rating">{{ $t("5/5 rating on Facebook") }}</div>
          </div>
        </div>
        <!-- Canvas -->
        <div class="canvas">
          <TresCanvas>
            <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]"/>
            <TresMesh>
              <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
              <TresMeshBasicMaterial color="orange" />
            </TresMesh>
          </TresCanvas>
        </div>
        <!-- Main offer -->
        <h1>
          <div>
            <span>A website with</span>
            <span class="spacer"/>
            <span>a cr<span class="style-script">e</span>ative</span>
          </div>
          <div>d<span class="style-script">e</span>sign and persuasive content</div>
        </h1>
      </div>
    </v-main>
  </v-app>

</template>

<script setup>
</script>

<script>
</script>

<style lang="scss">
  @import "styles/colors";

  .container {
    position: relative;
    margin: 120px 100px;
  }

  .container .canvas, h1 {
    position: absolute;
  }

  .canvas {
    top: 30px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 500px;
    height: 500px;
  }

  h1 {
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    text-align: center;
    font-weight: 300;
    font-size: 72px;
    text-transform: uppercase;
    color: $redsquirrel-cream-p1;

    .style-script {
      font-family: "Style Script", cursive;
      font-weight: 400;
      font-style: normal;
    }

    .spacer {
      margin-left: 250px;
    }
  }

  .facebook-rating {
    margin-top: 135px;
    text-transform: uppercase;
    color: $redsquirrel-cream-p1;
  }

  .benefit {
    width: 372px;

    p {
      font-size: 16px;
      color: $redsquirrel-cream-p2;
    }

    .highlights {
      color: $redsquirrel-cream-p1;
    }

    .consultation-button {
      margin-top: 40px;
    }
  }
</style>
