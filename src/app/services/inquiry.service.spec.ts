import { TestBed } from '@angular/core/testing';

import type { Inquiry } from './inquiry.service';
import { InquiryService, PH_MOBILE_PATTERN } from './inquiry.service';

describe('InquiryService', () => {
  let service: InquiryService;

  const testRide: Inquiry = {
    name: '  Juan Dela Cruz ',
    mobile: '0917 123 4567',
    type: 'test-ride',
    bikeId: 'ninja-500',
    preferredDate: '2026-12-05',
    message: 'Weekend po sana.',
  };

  beforeEach(() => {
    service = TestBed.inject(InquiryService);
  });

  it('writes a readable message with all the details', () => {
    const message = service.buildMessage(testRide);

    expect(message).toContain('Test Ride request');
    expect(message).toContain('Name: Juan Dela Cruz\n');
    expect(message).toContain('Mobile: 0917 123 4567');
    expect(message).toContain('Motorcycle: Kawasaki Ninja 500');
    expect(message).toContain('Preferred date: Dec 5, 2026');
    expect(message.endsWith('Weekend po sana.')).toBe(true);
  });

  it('leaves out empty optional fields', () => {
    const message = service.buildMessage({ name: 'Ana', mobile: '09171234567', type: 'general' });

    expect(message).not.toContain('Motorcycle:');
    expect(message).not.toContain('Preferred date:');
  });

  it('ignores an unknown bike id', () => {
    const message = service.buildMessage({ ...testRide, bikeId: 'nope' });
    expect(message).not.toContain('Motorcycle:');
  });

  it('builds an SMS link to the branch number with an encoded body', () => {
    const link = service.smsLink(testRide);

    expect(link.startsWith('sms:09175385702?body=')).toBe(true);
    expect(decodeURIComponent(link.split('body=')[1])).toBe(service.buildMessage(testRide));
  });

  it('builds a mailto link with subject and body', () => {
    const link = service.emailLink(testRide);
    const params = new URLSearchParams(link.split('?')[1]);

    expect(link.startsWith('mailto:customerservice@wheeltek.com.ph?')).toBe(true);
    expect(params.get('subject')).toBe('Test Ride – Kawasaki Ninja 500 (Wheeltek App)');
    expect(params.get('body')).toBe(service.buildMessage(testRide));
  });

  it('recognises valid inquiry types only', () => {
    expect(service.isInquiryType('service')).toBe(true);
    expect(service.isInquiryType('hacker')).toBe(false);
    expect(service.isInquiryType(undefined)).toBe(false);
  });

  it('accepts PH mobile numbers and rejects others', () => {
    for (const ok of ['09171234567', '0917 123 4567', '0917-123-4567', '+639171234567']) {
      expect(PH_MOBILE_PATTERN.test(ok)).toBe(true);
    }
    for (const bad of ['1234567', '0817 123 4567', '0917 123 456', 'abc']) {
      expect(PH_MOBILE_PATTERN.test(bad)).toBe(false);
    }
  });
});
