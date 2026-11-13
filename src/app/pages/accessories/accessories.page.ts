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
  // Stand-in product photos from Wikimedia Commons (replace with branch photos when available).
  // CC BY / CC BY-SA licenses require crediting the author.
  protected readonly photoCredits = [
    {
      author: 'Ashley Pomeroy',
      license: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Full-Face_Helmet_9274.jpg',
    },
    {
      author: 'kallerna',
      license: 'CC BY-SA 3.0',
      source: 'https://commons.wikimedia.org/wiki/File:Open-face_helmet.JPG',
    },
    {
      author: 'W.carter',
      license: 'CC0',
      source: 'https://commons.wikimedia.org/wiki/File:Black_worn_leather_jacket_detail_1.jpg',
    },
    {
      author: 'Thermos',
      license: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:MotorcycleRacingGlove.jpg',
    },
    {
      author: 'Alpha from Melbourne, Australia',
      license: 'CC BY-SA 2.0',
      source: 'https://commons.wikimedia.org/wiki/File:Raincoat_for_Cyclists_(1649092784).jpg',
    },
    { author: 'Jeff dean', license: 'CC BY-SA 2.5', source: 'https://commons.wikimedia.org/wiki/File:Top-case.jpg' },
    {
      author: 'SimonWaldherr',
      license: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Sprocket.jpg',
    },
    {
      author: 'Interiot (retouched)',
      license: 'Public domain',
      source: 'https://commons.wikimedia.org/wiki/File:Motor_oil.JPG',
    },
    {
      author: 'Alextredz',
      license: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Greasing_bicycle_chain.jpg',
    },
  ];

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
