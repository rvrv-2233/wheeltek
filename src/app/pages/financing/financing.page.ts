import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonIcon,
  IonButton,
} from '@ionic/angular';

@Component({
  selector: 'app-financing',
  templateUrl: './financing.page.html',
  styleUrls: ['./financing.page.scss'],
  imports: [RouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonIcon, IonButton],
})
export class FinancingPage {
  // Ways to pay for a new motorcycle.
  protected readonly paymentOptions = [
    {
      title: 'Cash Purchase',
      icon: 'cash',
      description: 'Pay the full amount and drive home your bike right away. Ask about cash discounts and freebies.',
    },
    {
      title: 'In-House Installment',
      icon: 'card',
      description: 'Low down payment with flexible monthly terms of 12, 18, 24 or 36 months.',
    },
  ];

  // Steps to apply for installment.
  protected readonly steps = [
    'Choose your Kawasaki model',
    'Submit the requirements at the branch',
    'Wait for credit approval (usually 1–3 days)',
    'Pay the down payment and sign the contract',
    'Release of your brand-new motorcycle',
  ];

  // Documents needed for installment.
  protected readonly requirements = [
    '2 valid government-issued IDs',
    'Proof of billing (electric or water bill)',
    'Proof of income (payslip, ITR or business permit)',
    '2 pcs. 2x2 ID pictures',
    'Co-maker (if required)',
  ];

  protected readonly terms = ['12 months', '18 months', '24 months', '36 months'];
}
