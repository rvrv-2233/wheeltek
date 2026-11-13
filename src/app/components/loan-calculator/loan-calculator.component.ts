import { CurrencyPipe } from '@angular/common';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonSelect,
  IonSelectOption,
  IonRange,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonButton,
  IonIcon,
} from '@ionic/angular';

import { CatalogService } from '../../services/catalog.service';
import { FinancingService } from '../../services/financing.service';

/**
 * Lets the customer pick a bike, a down payment and a term,
 * and shows the estimated monthly payment right away.
 */
@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.scss'],
  imports: [
    CurrencyPipe,
    RouterLink,
    IonSelect,
    IonSelectOption,
    IonRange,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonButton,
    IonIcon,
  ],
})
export class LoanCalculatorComponent {
  private readonly catalog = inject(CatalogService);
  protected readonly financing = inject(FinancingService);

  /** Bike to pre-select, e.g. when opened from a bike's detail page. */
  readonly initialBikeId = input<string | undefined>(undefined);

  protected readonly bikes = this.catalog.getMotorcycles();

  protected readonly bikeId = signal(this.catalog.getFeatured()[0]?.id ?? this.bikes[0].id);
  protected readonly downPercent = signal(20);
  protected readonly months = signal(24);

  protected readonly bike = computed(() => this.catalog.getMotorcycle(this.bikeId()) ?? this.bikes[0]);

  protected readonly quote = computed(() => {
    const price = this.bike().price;
    const down = this.financing.downPaymentFor(price, this.downPercent());
    return this.financing.quote(price, down, this.months());
  });

  constructor() {
    // Switch to the bike passed in from the URL, if it exists.
    effect(() => {
      const id = this.initialBikeId();
      if (id && this.catalog.getMotorcycle(id)) {
        this.bikeId.set(id);
      }
    });
  }

  onBikeChange(event: CustomEvent): void {
    this.bikeId.set(event.detail.value);
  }

  onDownChange(event: CustomEvent): void {
    this.downPercent.set(Number(event.detail.value));
  }

  onTermChange(event: CustomEvent): void {
    this.months.set(Number(event.detail.value));
  }
}
