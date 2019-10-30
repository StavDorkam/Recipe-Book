import { NgModule } from "@angular/core";
import { AlertComponent } from './alert/alert.component';
import { LoadingIconComponent } from './loading-icon/loading-icon.component';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AlertComponent,
        LoadingIconComponent,
        DropdownDirective
    ],
    imports: [CommonModule],
    exports: [AlertComponent, LoadingIconComponent, DropdownDirective, CommonModule]
})
export class SharedModule {}