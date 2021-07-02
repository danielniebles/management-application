<template>
  <div>
      <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from "vue-property-decorator";
import { DashboardService } from '../modules/Dashboard/DashboardService'

@Component({
  name: "ServiceProvider"
})
export default class ServiceProvider extends Vue {
    @Provide()
    dashboardService: DashboardService = new DashboardService();
}
</script>

<style>

</style>