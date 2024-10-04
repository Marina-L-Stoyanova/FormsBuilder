import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterViewComponent } from './master-view/master-view.component';
import { IgxInputGroupModule, IgxButtonModule, IgxRippleModule, IgxSnackbarModule, IgxToggleModule } from '@infragistics/igniteui-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    IgxInputGroupModule,
    IgxButtonModule,
    IgxRippleModule,
    IgxSnackbarModule,
    IgxToggleModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
