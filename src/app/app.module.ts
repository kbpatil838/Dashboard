import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { TableListComponent } from './table-list/table-list.component';
import { PassComponent } from './pass/pass.component';
import { FailComponent } from './fail/fail.component';
import {AgmCoreModule} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    ChartsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
