import { Injectable, inject } from '@angular/core';

import { CatalogService } from './catalog.service';

export type InquiryType = 'general' | 'test-ride' | 'financing' | 'service';

/** What the customer filled in on the inquiry form. */
export interface Inquiry {
  name: string;
  mobile: string;
  type: InquiryType;
  bikeId?: string | null;
  preferredDate?: string | null; // yyyy-mm-dd from the date input
  message?: string | null;
}

/** Philippine mobile number: 09XXXXXXXXX or +639XXXXXXXXX (spaces and dashes allowed). */
export const PH_MOBILE_PATTERN = /^(09|\+639)\d{2}[\s-]?\d{3}[\s-]?\d{4}$/;

/**
 * InquiryService turns a filled-in inquiry form into a message the customer
 * sends to the branch by SMS or email. The app has no server, so the customer's
 * own phone sends the message. Nothing is stored by the app.
 */
@Injectable({ providedIn: 'root' })
export class InquiryService {
  private readonly catalog = inject(CatalogService);

  readonly types: { value: InquiryType; label: string }[] = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'test-ride', label: 'Test Ride' },
    { value: 'financing', label: 'Financing / Installment' },
    { value: 'service', label: 'Service Booking' },
  ];

  isInquiryType(value: unknown): value is InquiryType {
    return this.types.some((type) => type.value === value);
  }

  typeLabel(type: InquiryType): string {
    return this.types.find((t) => t.value === type)?.label ?? 'Inquiry';
  }

  /** Short subject line, used for the email subject. */
  buildSubject(inquiry: Inquiry): string {
    const bike = this.bikeName(inquiry.bikeId);
    return `${this.typeLabel(inquiry.type)}${bike ? ` – ${bike}` : ''} (Wheeltek App)`;
  }

  /** The full message text sent to the branch. */
  buildMessage(inquiry: Inquiry): string {
    const lines = [`Hi Wheeltek Kawasaki Bitas! ${this.typeLabel(inquiry.type)} request.`, ''];
    lines.push(`Name: ${inquiry.name.trim()}`);
    lines.push(`Mobile: ${inquiry.mobile.trim()}`);

    const bike = this.bikeName(inquiry.bikeId);
    if (bike) {
      lines.push(`Motorcycle: ${bike}`);
    }
    if (inquiry.preferredDate) {
      lines.push(`Preferred date: ${this.formatDate(inquiry.preferredDate)}`);
    }
    if (inquiry.message?.trim()) {
      lines.push('', inquiry.message.trim());
    }
    return lines.join('\n');
  }

  smsLink(inquiry: Inquiry): string {
    const phone = this.catalog.branch.phone.replace(/\s/g, '');
    return `sms:${phone}?body=${encodeURIComponent(this.buildMessage(inquiry))}`;
  }

  emailLink(inquiry: Inquiry): string {
    const subject = encodeURIComponent(this.buildSubject(inquiry));
    const body = encodeURIComponent(this.buildMessage(inquiry));
    return `mailto:${this.catalog.branch.email}?subject=${subject}&body=${body}`;
  }

  private bikeName(bikeId?: string | null): string | undefined {
    return bikeId ? this.catalog.getMotorcycle(bikeId)?.name : undefined;
  }

  /** "2026-12-05" -> "Dec 5, 2026" (parsed as a local date, not UTC). */
  private formatDate(isoDate: string): string {
    const [year, month, day] = isoDate.split('-').map(Number);
    if (!year || !month || !day) {
      return isoDate;
    }
    return new Date(year, month - 1, day).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
}
