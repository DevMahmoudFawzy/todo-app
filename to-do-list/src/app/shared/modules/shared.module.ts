import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ModalComponent } from '../components/modal/modal.component';


@NgModule({
    declarations: [
        ModalComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        ModalComponent,
        FormsModule,
        CommonModule
    ],
    providers: []
})
export class SharedModule { }
