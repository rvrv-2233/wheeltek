import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonIcon,
  IonBadge,
  IonButton,
} from '@ionic/angular';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
  imports: [CurrencyPipe, RouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonIcon, IonBadge, IonButton],
})
export class ServicesPage {
  private readonly catalog = inject(CatalogService);

  protected readonly packages = this.catalog.getServicePackages();

  // Recommended maintenance schedule shown at the bottom of the page.
  protected readonly schedule = [
    { km: '1,000 km', task: '1st free check-up + change oil' },
    { km: '4,000 km', task: '2nd free check-up' },
    { km: 'Every 3,000 km', task: 'Change oil' },
    { km: 'Every 6,000 km', task: 'Preventive maintenance (PMS)' },
    { km: 'Every 12,000 km', task: 'General tune-up' },
  ];
}
