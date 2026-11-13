import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/angular';

import { ProductPhotoComponent } from '../../components/product-photo/product-photo.component';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.page.html',
  styleUrls: ['./accessories.page.scss'],
  imports: [
    ProductPhotoComponent,
    CurrencyPipe,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
  ],
})
export class AccessoriesPage {
  private readonly catalog = inject(CatalogService);

  protected readonly types = ['All', 'Helmet', 'Riding Gear', 'Parts', 'Care'];
  protected readonly selectedType = signal('All');

  // Only show accessories that belong to the selected tab.
  protected readonly accessories = computed(() => {
    const type = this.selectedType();
    return this.catalog.getAccessories().filter((item) => type === 'All' || item.type === type);
  });

  onTypeChange(event: CustomEvent): void {
    this.selectedType.set(String(event.detail.value));
  }
}
