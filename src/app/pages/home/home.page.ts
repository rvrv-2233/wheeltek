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

import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CurrencyPipe,
    RouterLink,
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

  protected readonly branch = this.catalog.branch;
  protected readonly featured = this.catalog.getFeatured();
  protected readonly promos = this.catalog.promos;

  // Shortcut buttons shown under the banner.
  protected readonly shortcuts = [
    { label: 'Motorcycles', icon: 'bicycle', url: '/tabs/motorcycles' },
    { label: 'Accessories', icon: 'bag-handle-outline', url: '/tabs/accessories' },
    { label: 'Services', icon: 'construct', url: '/tabs/services' },
    { label: 'Financing', icon: 'card', url: '/tabs/financing' },
  ];
}
