import { Component, OnInit } from '@angular/core';
import {ContactService} from '../contact.service';
import {Contact} from './contact';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers : [ContactService]
})
export class ContactsComponent implements OnInit {

  contacts : Contact[];
  contact : Contact[];
  firstName: string;
  lastName: string;
  phoneNumber: string;

  constructor(private contactService : ContactService) { }

  addContact(){
    const newContact ={
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber
    }
    console.log("Reached Mount Everest");
    this.contactService.addContact(newContact)
      .subscribe(contact => {
       this.contacts.push(contact);
       this.contactService.getContacts()
       .subscribe(contacts => this.contacts = contacts); 
      });


  }

  deleteContact(id: any) {
    var contacts = this.contacts;
    this.contactService.deleteContact(id)
      .subscribe(data => {
        if (data.n == 1){
          for (var i=0; i < contacts.length; i++){
            if (contacts[i]._id == id){
              contacts.splice(i,1);
            }
          }
        }
      });
  }

  filter1(filteredContacts: Contact[], search: RegExp): Contact[] {
    return this.contacts.filter(element => {
       element.firstName.search(search) != -1
      })
    };
   
    filter(filteredContacts: Contact[], search: RegExp): Contact[] {
      var result: Contact [];
      return this.contacts.filter(element => element.firstName.search(search) != -1) ;

      };

  ngOnInit() {
    this.contactService.getContacts()
      .subscribe(contacts => this.contacts = contacts); 
    }

}
