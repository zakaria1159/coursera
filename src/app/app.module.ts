import { ProcessHttpmsgService } from './services/process-httpmsg.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule }  from '@angular/flex-layout';
import { MatListModule, MatInputModule, MatSlideToggleModule, MatOptionModule, MatSelectModule, MatSpinner } from '@angular/material';
import { MatGridListModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule } from '@angular/forms'; 
import { MatDialogModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';
import { HttpModule } from '@angular/http';







import 'hammerjs';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { DishService } from './services/dish.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { LoginComponent } from './login/login.component';
import { baseURL } from './shared/baseurl';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent
  ],

  entryComponents: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatGridListModule,
    FlexLayoutModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatOptionModule,
    LayoutModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    HttpModule
    
    
    

  
  ],
  providers: [DishService,PromotionService,LeaderService,{provide: 'BaseURL', useValue: baseURL}, ProcessHttpmsgService],
  bootstrap: [AppComponent]
})
export class AppModule { }
