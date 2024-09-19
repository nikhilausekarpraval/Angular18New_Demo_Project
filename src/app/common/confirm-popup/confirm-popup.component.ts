import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-popup.component.html',
  styleUrl: './confirm-popup.component.scss'
})

export class ConfirmPopupComponent {

  @Output() delete = new EventEmitter();
  @Output() clearPopup = new EventEmitter();
  @Input() isShowDelete:boolean = false ;//if value comes true from parent want to execute openModal fucntion how to do
  @Input() modalTemplate!: TemplateRef<void>; // Template passed from the parent
  @ViewChild('confirmDeleteTemplate') confirmDeleteTemplate!: TemplateRef<void>;
  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {

  }

  // Detect changes in the `isShowDelete` property
    ngOnChanges(changes: SimpleChanges) {
      if (changes['isShowDelete'] && this.isShowDelete) {
        this.openModal(); // Automatically open the modal when `isShowDelete` is true
        console.log("executed")
      }
    }
 
  openModal() {

   this.modalRef = this.modalService.show(this.confirmDeleteTemplate); // Use saved template if no template passed
   console.log(this.confirmDeleteTemplate)// here i am getting undefined why
  }

  deleteRecord(){
    this.delete.emit();// in parent not executing function 
    this.clearPopup.emit();
    this.modalRef?.hide();
  }

  cancel(){
    this.clearPopup.emit();
    this.modalRef?.hide();
  }
}
