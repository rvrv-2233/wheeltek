import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonChip,
  IonIcon,
} from '@ionic/angular';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-motorcycles',
  templateUrl: './motorcycles.page.html',
  imports: [CurrencyPipe, RouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonSearchbar, IonChip, IonIcon],
})
export class MotorcyclesPage {
  private readonly catalog = inject(CatalogService);

  protected readonly categories = ['All', ...this.catalog.categories];

  // What the user typed and which category chip is selected.
  protected readonly searchText = signal('');
  protected readonly selectedCategory = signal('All');

  // The list updates automatically whenever the search or category changes.
  protected readonly bikes = computed(() => {
    const text = this.searchText().toLowerCase().trim();
    const category = this.selectedCategory();

    return this.catalog.getMotorcycles().filter((bike) => {
      const matchesCategory = category === 'All' || bike.category === category;
      const matchesText = bike.name.toLowerCase().includes(text);
      return matchesCategory && matchesText;
    });
  });

  onSearch(event: CustomEvent): void {
    this.searchText.set(event.detail.value ?? '');
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }
}
