import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
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
import { ProgressprogressComponent } from './home/progressprogress/progressprogress.component';
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
import { ResultsDataComponent } from './home/results-data/results-data.component';
import { ProcessMaagementListComponent } from './home/process-maagement-list/process-maagement-list.component';
import { ApplicationManagementComponent } from './home/application/application-management/application-management.component';
import { OrganmanagementComponent } from './home/organmanagement/organmanagement.component';
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ButtonsComponent,
    TableComponent,
    FormComponent,
    CardsComponent,
    SimpleTableComponent,
    UploadComponent,
    PanelComponent,
    CarouselComponent,
    StepsComponent,
    ProgressComponent,
    ProgressprogressComponent,
    MentionComponent,
    AntvComponent,
    ApplicationComponent,
    HomePageComponent,
    UserManagementComponent,
    RoleManagementComponent,
    ProcessManagementComponent,
    TaskMonitoringComponent,
    BasicDataComponent,
    SpaceDataComponent,
    ReferenceMapComponent,
    ResultsDataComponent,
    ProcessMaagementListComponent,
    ApplicationManagementComponent,
    OrganmanagementComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule {}
