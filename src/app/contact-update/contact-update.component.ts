import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css'],
})
export class ContactUpdateComponent implements OnInit {
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });
  id: number = 0;

  constructor(
    private contactsService: ContactsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.id = Number(paramMap.get('id'));

      this.contactsService.retrieveContact(this.id).subscribe((contact) => {
        // limpa status que o angular vai guardando por mudanças no formulario, sendo sempre carregado do zero, não modificado
        this.contactForm.reset(contact);
      });
    });
  }

  updateContact() {
    this.contactsService
      .updateContact({ id: this.id, ...this.contactForm.value })
      .subscribe((contact) => {
        this.contactForm.reset(contact);
      });
  }
}
