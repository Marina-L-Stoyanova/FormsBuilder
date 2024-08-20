import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  IgxButtonModule,
	IgxDialogModule,
  IgxGridModule,
  IgxInputGroupModule
} from '@infragistics/igniteui-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterViewComponent } from './master-view/master-view.component';
import { NorthwindService } from './services/northwind.service';

@NgModule({
  declarations: [
    AppComponent,
    MasterViewComponent
  ],
  imports: [
    BrowserModule,
    HammerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IgxButtonModule,
    IgxDialogModule,
    IgxGridModule,
    IgxInputGroupModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [NorthwindService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
