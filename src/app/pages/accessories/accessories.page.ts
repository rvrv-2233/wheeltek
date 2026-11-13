import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
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
  IonIcon,
} from '@ionic/angular';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.page.html',
  styleUrls: ['./accessories.page.scss'],
  imports: [CurrencyPipe, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel, IonIcon],
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
