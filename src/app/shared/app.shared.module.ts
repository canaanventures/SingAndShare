import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
/* [ Custom Pipe ] */
import { TruncatePipe, PhonePrefixPlusPipe } from './app.pipe';
/* [ Shared Plugins ] */
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SlideshowModule } from 'ng-simple-slideshow';
import { MatGridListModule } from '@angular/material/grid-list';
/* [ shared Module ] */
import {
  DecimalNumberOnlyDirective,
  NumberOnlyDirective,
  CompareValidatorDirective,
  NoWhitespaceDirective,
  IBMPhoneDirective,
  NumberZeroGreaterDirective
} from './app.directive';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';

@NgModule({
  imports: [
    SlickCarouselModule,
    SlideshowModule,
    MatGridListModule,
    CommonModule,
    RouterModule,
  ],
  declarations: [
    DecimalNumberOnlyDirective,
    NumberOnlyDirective,
    CompareValidatorDirective,
    NoWhitespaceDirective,
    TruncatePipe,
    PhonePrefixPlusPipe,
    IBMPhoneDirective,
    NumberZeroGreaterDirective,
    HeaderComponent,
    FooterComponent
  ],
  providers: [
  ],
  bootstrap: [],
  exports: [
    DecimalNumberOnlyDirective,
    NumberOnlyDirective,
    CompareValidatorDirective,
    NoWhitespaceDirective,
    TruncatePipe,
    PhonePrefixPlusPipe,
    IBMPhoneDirective,
    NumberZeroGreaterDirective,
    SlickCarouselModule,
    MatGridListModule,
    SlideshowModule,
    HeaderComponent,
    FooterComponent
  ],
  // schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppSharedModule { }
