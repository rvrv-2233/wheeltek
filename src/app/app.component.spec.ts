import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router, RouterLink } from '@angular/router';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('shows the branch name in the side menu', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const brand = fixture.nativeElement.querySelector('.menu-brand h2');
    expect(brand.textContent).toContain('Wheeltek Kawasaki');
  });

  it('has a side-menu link for every section', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    // ion-label slot content is relocated asynchronously, so wait for hydration first.
    await fixture.whenStable();

    // ion-label is a scoped Stencil component; its text is kept in innerHTML, not textContent.
    const labels = Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('ion-item ion-label')).map((el) =>
      el.innerHTML
        .replace(/<!--.*?-->/g, '')
        .replace('&amp;', '&')
        .trim(),
    );
    expect(labels).toEqual(['Home', 'Motorcycles', 'Accessories', 'Service Packages', 'Financing', 'About & Contact']);

    // Check the routerLink bindings directly (Ionic sets the rendered href asynchronously).
    const router = TestBed.inject(Router);
    const urls = fixture.debugElement
      .queryAll(By.directive(RouterLink))
      .map((el) => router.serializeUrl(el.injector.get(RouterLink).urlTree!));
    expect(urls).toEqual([
      '/tabs/home',
      '/tabs/motorcycles',
      '/tabs/accessories',
      '/tabs/services',
      '/tabs/financing',
      '/tabs/contact',
    ]);
  });
});
