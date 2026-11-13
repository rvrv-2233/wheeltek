import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonChip,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular';

import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-motorcycle-detail',
  templateUrl: './motorcycle-detail.page.html',
  styleUrls: ['./motorcycle-detail.page.scss'],
  imports: [
    CurrencyPipe,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonChip,
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class MotorcycleDetailPage {
  private readonly catalog = inject(CatalogService);

  // The ":id" part of the URL (e.g. /tabs/motorcycles/ninja-500) is passed in here.
  readonly id = input.required<string>();

  // Look up the motorcycle that matches the id in the URL.
  protected readonly bike = computed(() => this.catalog.getMotorcycle(this.id()));
}
