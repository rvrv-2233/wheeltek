import { Component, input, signal } from '@angular/core';
import { IonIcon } from '@ionic/angular';

/**
 * Product photo that falls back to a "No picture available" placeholder
 * when the image file is missing. This lets the branch add photos just by
 * dropping files into src/assets — no code changes needed.
 */
@Component({
  selector: 'app-product-photo',
  imports: [IonIcon],
  template: `
    @if (!failed()) {
      <img [src]="src()" [alt]="alt()" loading="lazy" (error)="failed.set(true)" />
    } @else {
      <div class="no-photo" role="img" [attr.aria-label]="'No picture available for ' + alt()">
        <ion-icon name="image-outline" aria-hidden="true"></ion-icon>
        <span>No picture available</span>
      </div>
    }
  `,
  styles: `
    :host {
      display: grid;
      place-items: center;
      overflow: hidden;
      border-radius: var(--kawi-radius-sm);
      background: var(--kawi-subtle);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .no-photo {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-1);
      padding: var(--space-2);
      color: var(--ion-color-medium);
      font-size: 12px;
      font-weight: 600;
      line-height: 1.2;
      text-align: center;

      ion-icon {
        font-size: 24px;
      }
    }
  `,
})
export class ProductPhotoComponent {
  readonly src = input.required<string>();
  readonly alt = input.required<string>();

  protected readonly failed = signal(false);
}
