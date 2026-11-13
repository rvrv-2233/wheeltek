import { TestBed } from '@angular/core/testing';

import { CatalogService } from './catalog.service';

describe('CatalogService', () => {
  let service: CatalogService;

  beforeEach(() => {
    service = TestBed.inject(CatalogService);
  });

  it('has a full motorcycle lineup with unique ids', () => {
    const bikes = service.getMotorcycles();
    const ids = bikes.map((bike) => bike.id);

    expect(bikes.length).toBeGreaterThan(10);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('only uses known categories, and every category has at least one bike', () => {
    const bikes = service.getMotorcycles();

    for (const bike of bikes) {
      expect(service.categories).toContain(bike.category);
    }
    for (const category of service.categories) {
      expect(bikes.some((bike) => bike.category === category)).toBe(true);
    }
  });

  it('has a positive price, colors and highlights for every bike', () => {
    for (const bike of service.getMotorcycles()) {
      expect(bike.price).toBeGreaterThan(0);
      expect(bike.colors.length).toBeGreaterThan(0);
      expect(bike.highlights.length).toBeGreaterThan(0);
    }
  });

  it('returns only featured bikes from getFeatured()', () => {
    const featured = service.getFeatured();

    expect(featured.length).toBeGreaterThan(0);
    expect(featured.every((bike) => bike.featured)).toBe(true);
  });

  it('finds a bike by id, and returns undefined for an unknown id', () => {
    expect(service.getMotorcycle('ninja-500')?.name).toBe('Kawasaki Ninja 500');
    expect(service.getMotorcycle('does-not-exist')).toBeUndefined();
  });

  it('has accessories and service packages with unique ids', () => {
    const accessoryIds = service.getAccessories().map((a) => a.id);
    const packageIds = service.getServicePackages().map((p) => p.id);

    expect(new Set(accessoryIds).size).toBe(accessoryIds.length);
    expect(new Set(packageIds).size).toBe(packageIds.length);
  });
});
