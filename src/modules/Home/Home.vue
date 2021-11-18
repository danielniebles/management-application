<template>
  <div class="home__container">
    <div class="content">
      <div class="logo__container">
        <v-img src="../../assets/main_atome.svg" max-width="290"></v-img>
      </div>
      <div class="bar__container">
        <p class="text-subtitle-1 bar__title">
          Características de tu candidato
        </p>
        <MainSearchPanel></MainSearchPanel>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import MainSearchPanel from "../Dashboard/components/MainSearchPanel.vue";

@Component({
  components: {
    MainSearchPanel,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.content {
  width: 60%;
}

.logo__container {
  display: flex;
  justify-content: center;
  margin-bottom: 90px;
}

.bar__container {
  position: relative;
}

.bar__title {
  position: relative;
  top: 10px;
}

.home__container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 30%;
}

p {
  margin-bottom: 0 !important;
}

@media screen and (max-width: 600px) {
  .content {
    width: 90%;
  }
}
</style>
