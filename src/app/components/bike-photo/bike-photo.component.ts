import { Component, input } from '@angular/core';
import { IonIcon } from '@ionic/angular';

import type { Motorcycle } from '../../models/catalog.models';

/**
 * Shows a motorcycle's official photo on a light studio background,
 * or a "No picture available" placeholder when the bike has no photo yet.
 */
@Component({
  selector: 'app-bike-photo',
  imports: [IonIcon],
  template: `
    @if (bike().image; as src) {
      <img [src]="src" [alt]="bike().name" [attr.loading]="eager() ? null : 'lazy'" width="900" height="600" />
    } @else {
      <div class="no-photo" role="img" [attr.aria-label]="'No picture available for ' + bike().name">
        <ion-icon name="image-outline" aria-hidden="true"></ion-icon>
        <span>No picture available</span>
      </div>
    }
  `,
  styles: `
    :host {
      display: grid;
      place-items: center;
      aspect-ratio: 16 / 10;
      overflow: hidden;
      background: radial-gradient(90% 80% at 50% 40%, #ffffff 0%, var(--kawi-subtle) 100%);
    }

    img {
      width: 88%;
      height: 88%;
      object-fit: contain;
      mix-blend-mode: multiply; // blends photos that have a white background
      filter: drop-shadow(0 8px 12px rgba(15, 23, 42, 0.18));
    }

    .no-photo {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-2);
      color: var(--ion-color-medium);
      font-size: 13px;
      font-weight: 600;

      ion-icon {
        font-size: 32px;
      }
    }
  `,
})
export class BikePhotoComponent {
  readonly bike = input.required<Motorcycle>();
  /** Load immediately (for above-the-fold photos) instead of lazily. */
  readonly eager = input(false);
}
