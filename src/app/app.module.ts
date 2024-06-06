import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RecorderListComponent } from './componentes/recorder-list/recorder-list.component';
import { RecorderItemComponent } from './componentes/recorder-item/recorder-item.component';

@NgModule({
  declarations: [
    AppComponent,
    RecorderListComponent,
    RecorderItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
