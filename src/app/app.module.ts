// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CommaSeparatorPipe } from './pipe/commaseperator.pipe';

@NgModule({
  declarations:
    [
      AppComponent,
      ProductComponent,
      ProductFormComponent,
      CommaSeparatorPipe
    ],
  imports:
    [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
