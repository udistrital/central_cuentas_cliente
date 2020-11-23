import { NgModule } from '@angular/core';
import { NbMenuModule, NbSpinnerModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ConfiguracionService } from '../@core/data/configuracion.service';
import { MenuService } from '../@core/data/menu.service';
import { SharedModule } from '../shared/shared.module';
import { NbIconModule } from '@nebular/theme';
import { TableComponent } from './components/table/table.component';




@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbIconModule,
    SharedModule,
    NbSpinnerModule,
  ],
  declarations: [
    PagesComponent,
    TableComponent,
  ],
  providers: [
    ConfiguracionService,
    MenuService,
  ],
})
export class PagesModule {
}
