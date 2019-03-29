import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactComponent } from './contact';
import { ShareModule } from '../../../share/share.module'
@NgModule({
  declarations: [
      ContactComponent
  ],
  imports: [
    IonicPageModule.forChild(ContactComponent),
    ShareModule
  ],
})
export class ContactPageModule {}
