import { TestBed } from '@angular/core/testing';

import { InquiryFormComponent } from './inquiry-form.component';

describe('InquiryFormComponent', () => {
  function setup(inputs: { type?: string; bike?: string } = {}) {
    const fixture = TestBed.createComponent(InquiryFormComponent);
    if (inputs.type) fixture.componentRef.setInput('initialType', inputs.type);
    if (inputs.bike) fixture.componentRef.setInput('initialBikeId', inputs.bike);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    // Capture the link instead of navigating away.
    const opened: string[] = [];
    (component as unknown as { openLink: (link: string) => void }).openLink = (link) => opened.push(link);
    const form = (component as unknown as { form: InquiryFormComponent['form'] }).form;
    return { fixture, component, form, opened };
  }

  it('pre-fills the type and bike from the URL', () => {
    const { form } = setup({ type: 'test-ride', bike: 'z500' });
    expect(form.controls.type.value).toBe('test-ride');
    expect(form.controls.bikeId.value).toBe('z500');
  });

  it('ignores an invalid type or unknown bike from the URL', () => {
    const { form } = setup({ type: 'bogus', bike: 'nope' });
    expect(form.controls.type.value).toBe('general');
    expect(form.controls.bikeId.value).toBe('');
  });

  it('does not send when required fields are missing, and shows errors', () => {
    const { component, form, opened } = setup();
    component.send('sms');

    expect(opened).toEqual([]);
    expect(form.controls.name.touched).toBe(true);
    expect(form.controls.mobile.invalid).toBe(true);
  });

  it('rejects an invalid mobile number', () => {
    const { component, form, opened } = setup();
    form.patchValue({ name: 'Juan', mobile: '12345' });
    component.send('sms');
    expect(opened).toEqual([]);
  });

  it('opens an SMS to the branch when the form is valid', () => {
    const { component, form, opened } = setup({ type: 'test-ride', bike: 'ninja-500' });
    form.patchValue({ name: 'Juan', mobile: '0917 123 4567', preferredDate: '2026-12-05' });
    component.send('sms');

    expect(opened.length).toBe(1);
    expect(opened[0].startsWith('sms:09175385702?body=')).toBe(true);
    const body = decodeURIComponent(opened[0].split('body=')[1]);
    expect(body).toContain('Motorcycle: Kawasaki Ninja 500');
    expect(body).toContain('Preferred date: Dec 5, 2026');
  });

  it('drops the preferred date for a general inquiry', () => {
    const { component, form, opened } = setup();
    form.patchValue({ name: 'Juan', mobile: '09171234567', preferredDate: '2026-12-05' });
    component.send('email');

    expect(opened[0].startsWith('mailto:')).toBe(true);
    expect(decodeURIComponent(opened[0])).not.toContain('Preferred date');
  });
});
