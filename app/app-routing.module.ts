import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ButtonsComponent } from './home/buttons/buttons.component';
import { TableComponent } from './home/table/table.component';
import { FormComponent } from './home/form/form.component';
import { CardsComponent } from './home/cards/cards.component';
import { SimpleTableComponent } from './home/simple-table/simple-table.component';
import { UploadComponent } from './home/upload/upload.component';
import { PanelComponent } from './home/panel/panel.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { StepsComponent } from './home/steps/steps.component';
import { ProgressComponent } from './home/progress/progress.component';
import { MentionComponent } from './home/mention/mention.component';
import { AntvComponent } from './home/antv/antv.component';
import { ApplicationComponent } from './home/application/application.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { UserManagementComponent } from './home/user-management/user-management.component';
import { RoleManagementComponent } from './home/role-management/role-management.component';
import { ProcessManagementComponent } from './home/process-management/process-management.component';
import { TaskMonitoringComponent } from './home/task-monitoring/task-monitoring.component';
import { BasicDataComponent } from './home/basic-data/basic-data.component';
import { SpaceDataComponent } from './home/space-data/space-data.component';
import { ReferenceMapComponent } from './home/reference-map/reference-map.component';
import { ResultsDataComponent } from './home/results-data/results-data.component'

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'buttons', component: ButtonsComponent },
      { path: 'application', component: ApplicationComponent },
      { path: 'homePage', component: HomePageComponent },
      { path: 'table', component: TableComponent },
      { path: 'form', component: FormComponent },
      { path: 'card', component: CardsComponent },
      { path: 'simple-table', component: SimpleTableComponent },
      { path: 'upload', component: UploadComponent },
      { path: 'panel', component: PanelComponent },
      { path: 'carousel', component: CarouselComponent },
      { path: 'steps', component: StepsComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'mention', component: MentionComponent },
      { path: 'antv', component: AntvComponent },
      { path: 'userManagement', component: UserManagementComponent },
      { path: 'roleManagement', component: RoleManagementComponent },
      { path: 'processManagement', component: ProcessManagementComponent },
      { path: 'taskMonitoring', component: TaskMonitoringComponent },
      { path: 'basicData', component: BasicDataComponent },
      { path: 'spaceData', component: SpaceDataComponent },
      { path: 'referenceMap', component: ReferenceMapComponent },
      { path: 'resultsData', component: ResultsDataComponent },
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
