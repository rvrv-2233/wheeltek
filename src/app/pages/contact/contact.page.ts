import { Component, inject, input } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
} from '@ionic/angular';

import { InquiryFormComponent } from '../../components/inquiry-form/inquiry-form.component';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  imports: [
    InquiryFormComponent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonButton,
  ],
})
export class ContactPage {
  // Optional ?type= and ?bike= in the URL pre-fill the inquiry form.
  readonly type = input<string | undefined>(undefined);
  readonly bike = input<string | undefined>(undefined);

  protected readonly branch = inject(CatalogService).branch;

  // Removes spaces so the number works in a "tel:" link.
  protected readonly phoneLink = 'tel:' + this.branch.phone.replace(/\s/g, '');

  protected readonly reasons = [
    { icon: 'storefront', title: 'Authorized Dealer', text: 'Official Kawasaki units with complete papers.' },
    { icon: 'construct', title: 'Service Center', text: 'Trained mechanics and genuine Kawasaki parts.' },
    {
      icon: 'star',
      title: 'Trusted Brand',
      text: 'Wheeltek is one of the biggest motorcycle dealers in the Philippines.',
    },
  ];
}
