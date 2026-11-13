import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
} from '@ionic/angular';

import { BikePhotoComponent } from '../../components/bike-photo/bike-photo.component';
import { CatalogService } from '../../services/catalog.service';
import { FinancingService } from '../../services/financing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CurrencyPipe,
    RouterLink,
    BikePhotoComponent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
  ],
})
export class HomePage {
  private readonly catalog = inject(CatalogService);
  private readonly financing = inject(FinancingService);

  protected readonly branch = this.catalog.branch;
  protected readonly phoneLink = 'tel:' + this.branch.phone.replace(/\s/g, '');
  protected readonly featured = this.catalog.getFeatured();
  protected readonly promos = this.catalog.promos;

  /** The bike shown big in the hero banner. */
  protected readonly heroBike = this.catalog.getMotorcycle('ninja-500');

  /** One card per category, pictured with the first bike in it. */
  protected readonly categories = this.catalog.categories.map((name) => {
    const bikes = this.catalog.getMotorcycles().filter((bike) => bike.category === name);
    return { name, count: bikes.length, bike: bikes.find((bike) => bike.image) ?? bikes[0] };
  });

  protected readonly trust = [
    { icon: 'shield-checkmark', text: 'Authorized Kawasaki dealer' },
    { icon: 'construct', text: 'Free 1st PMS on new units' },
    { icon: 'card', text: 'In-house installment' },
  ];

  /** Estimated monthly payment with 20% down over 36 months (the lowest standard monthly). */
  protected monthlyFrom(price: number): number {
    return this.financing.quote(price, this.financing.downPaymentFor(price, 20), 36).monthlyAmortization;
  }
}
