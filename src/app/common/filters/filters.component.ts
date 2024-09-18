import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
// import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {

   constructor(){

   }

   search(){

   }

   @Input() selectedEmployees: { id: number, isChecked: boolean }[] = [];

   searchValue : string = "";
   isEditForm:boolean = false;


   showEdit(){

   }

   delete(){

   }

   create(){
      console.log(this.selectedEmployees)
   }

}
