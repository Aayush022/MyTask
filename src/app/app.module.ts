import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatMenuModule, MatCheckboxModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatDialogModule, MatRadioModule, MatSnackBarModule, MatInputModule } from '@angular/material';
import { MatCardModule} from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './table/table.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { SelectCityPipe } from './Custom Pipes/selectCity.pipe';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestService } from './services/request.service';
import { CachingInterceptorService } from './services/caching-interface.service';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    BankDetailsComponent,
    SelectCityPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  providers: [RequestService,
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptorService, multi: true }],
  bootstrap: [AppComponent],
  exports: [SelectCityPipe]
})
export class AppModule { }
