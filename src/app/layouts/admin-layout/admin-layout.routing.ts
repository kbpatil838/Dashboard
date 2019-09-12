import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';

import { TableListComponent } from '../../table-list/table-list.component';
import { PassComponent } from '../../pass/pass.component';
import { FailComponent } from '../../fail/fail.component';


export const AdminLayoutRoutes: Routes = [
    
    { path: 'dashboard',      component: DashboardComponent },
    
    { path: 'table-list',     component: TableListComponent },
    { path: 'pass_tests',     component: PassComponent },
    { path: 'fail_tests',     component: FailComponent },
    
];
