export interface AnalyticsEvent {
  event: string;
  category: string;
  label?: string;
  value?: number;
  timestamp: string;
  page: string;
  userAgent: string;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.loadEventsFromStorage();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private loadEventsFromStorage() {
    try {
      const stored = localStorage.getItem('analytics_events');
      if (stored) {
        this.events = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load analytics events:', error);
    }
  }

  private saveEventsToStorage() {
    try {
      localStorage.setItem('analytics_events', JSON.stringify(this.events));
    } catch (error) {
      console.error('Failed to save analytics events:', error);
    }
  }

  track(event: string, category: string, label?: string, value?: number) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      category,
      label,
      value,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      userAgent: navigator.userAgent,
    };

    this.events.push(analyticsEvent);
    this.saveEventsToStorage();

    console.log('[Analytics]', analyticsEvent);
  }

  trackPageView(page: string) {
    this.track('page_view', 'navigation', page);
  }

  trackClick(element: string, label?: string) {
    this.track('click', 'engagement', label || element);
  }

  trackBooking(method: string) {
    this.track('booking_initiated', 'conversion', method, 1);
  }

  trackPhoneClick() {
    this.track('phone_click', 'conversion', 'phone_number', 1);
  }

  trackWhatsAppClick() {
    this.track('whatsapp_click', 'conversion', 'messenger', 1);
  }

  trackServiceView(serviceName: string) {
    this.track('service_view', 'engagement', serviceName);
  }

  trackPortfolioView() {
    this.track('portfolio_view', 'engagement', 'gallery');
  }

  trackReviewsView() {
    this.track('reviews_view', 'engagement', 'testimonials');
  }

  trackFormSubmit(formName: string) {
    this.track('form_submit', 'conversion', formName, 1);
  }

  trackAddToCart(productId: string, productName: string, price: number) {
    this.track('add_to_cart', 'ecommerce', productName, price);
  }

  trackRemoveFromCart(productId: string, productName: string) {
    this.track('remove_from_cart', 'ecommerce', productName);
  }

  trackPurchaseIntent() {
    this.track('purchase_intent', 'ecommerce', 'checkout_started', 1);
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  getEventsByCategory(category: string): AnalyticsEvent[] {
    return this.events.filter(e => e.category === category);
  }

  getConversionEvents(): AnalyticsEvent[] {
    return this.getEventsByCategory('conversion');
  }

  clearEvents() {
    this.events = [];
    localStorage.removeItem('analytics_events');
  }

  exportData(): string {
    return JSON.stringify({
      sessionId: this.sessionId,
      events: this.events,
      exportedAt: new Date().toISOString(),
    }, null, 2);
  }
}

export const analytics = new Analytics();
