export class SegmentService {
  private analytics: any;
  constructor() {
    this.analytics = (window as any).analytics;
  }

  trackPage(page: string) {
    this.analytics.page(page);
  }

  trackEvent(eventName: string, event: any) {
    this.analytics.track(eventName, event);
  }
}
