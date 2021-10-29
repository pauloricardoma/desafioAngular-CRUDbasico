import { Component } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css'],
})
export class ContactCreateComponent {
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) {}

  createContact(): void {
    this.contactsService
      .createContact(this.contactForm.value)
      .subscribe((contact) => {
        this.router.navigate(['/contacts']);
      });
  }
}
