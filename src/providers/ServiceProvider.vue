<template>
  <div class="provider__container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from "vue-property-decorator";
import { DashboardService } from "../modules/Dashboard/DashboardService";
import { SegmentService } from "../modules/shared/services/SegmentService";

@Component({
  name: "ServiceProvider",
})
export default class ServiceProvider extends Vue {
  @Provide() dashboardService: DashboardService = new DashboardService();
  @Provide() segmentService: SegmentService = new SegmentService();
}
</script>

<style lang="scss" scoped>
.provider__container {
  height: 100%;
}
</style>
