import { Component, effect, inject, input } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonInput, IonSelect, IonSelectOption, IonTextarea, IonButton, IonIcon } from '@ionic/angular';

import { CatalogService } from '../../services/catalog.service';
import type { Inquiry, InquiryType } from '../../services/inquiry.service';
import { InquiryService, PH_MOBILE_PATTERN } from '../../services/inquiry.service';

/**
 * Inquiry / test-ride booking form.
 * On submit it opens the phone's SMS or email app with the message already written.
 */
@Component({
  selector: 'app-inquiry-form',
  templateUrl: './inquiry-form.component.html',
  styleUrls: ['./inquiry-form.component.scss'],
  imports: [ReactiveFormsModule, IonInput, IonSelect, IonSelectOption, IonTextarea, IonButton, IonIcon],
})
export class InquiryFormComponent {
  private readonly catalog = inject(CatalogService);
  protected readonly inquiries = inject(InquiryService);

  /** Values passed in from the URL, e.g. ?type=test-ride&bike=ninja-500 */
  readonly initialType = input<string | undefined>(undefined);
  readonly initialBikeId = input<string | undefined>(undefined);

  protected readonly bikes = this.catalog.getMotorcycles();

  protected readonly form = inject(NonNullableFormBuilder).group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    mobile: ['', [Validators.required, Validators.pattern(PH_MOBILE_PATTERN)]],
    type: ['general' as InquiryType, Validators.required],
    bikeId: [''],
    preferredDate: [''],
    message: ['', Validators.maxLength(500)],
  });

  /** Today's date as yyyy-mm-dd, so past dates can't be picked. */
  protected readonly today = toIsoDate(new Date());

  constructor() {
    effect(() => {
      const type = this.initialType();
      if (this.inquiries.isInquiryType(type)) {
        this.form.controls.type.setValue(type);
      }
      const bikeId = this.initialBikeId();
      if (bikeId && this.catalog.getMotorcycle(bikeId)) {
        this.form.controls.bikeId.setValue(bikeId);
      }
    });
  }

  /** A preferred date only makes sense for test rides and service bookings. */
  protected showDate(): boolean {
    const type = this.form.controls.type.value;
    return type === 'test-ride' || type === 'service';
  }

  send(channel: 'sms' | 'email'): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    const inquiry: Inquiry = {
      ...value,
      preferredDate: this.showDate() ? value.preferredDate : null,
    };
    const link = channel === 'sms' ? this.inquiries.smsLink(inquiry) : this.inquiries.emailLink(inquiry);
    this.openLink(link);
  }

  /** Separate method so tests can check the link without leaving the page. */
  protected openLink(link: string): void {
    window.location.href = link;
  }
}

function toIsoDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
