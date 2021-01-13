import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
import * as fromShared from './reducers/shared.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SharedEffects } from './effects/shared.effects';
import { GeneralTableComponent } from './components/general-table/general-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterTablePipe } from './pipes/filter-table.pipe';
import { CustomTablePipe } from './pipes/custom-table.pipe';
import { MouseOverDirective } from './directives/mouse-over.directive';
import { ArbolRubroComponent } from './components/arbol-rubro/arbol-rubro.component';
import { NbTreeGridModule } from '@nebular/theme';
import { SelectedRowDirective } from './directives/selected-row.directive';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MultiPipePipe } from './pipes/multi-pipe.pipe';
import { RechazarComponent } from './components/rechazar/rechazar.component';
import { TableComponent } from './components/table/table.component';
import { FileUploadDirective } from './directives/file-upload.directive';
@NgModule({
  exports: [
    TranslateModule,
    GeneralTableComponent,
    MouseOverDirective,
    ArbolRubroComponent,
    SelectedRowDirective,
    RechazarComponent,
    TableComponent,
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbTreeGridModule,
    StoreModule.forFeature(fromShared.sharedFeatureKey, fromShared.reducer),
    EffectsModule.forFeature([SharedEffects])
  ],
  declarations: [
    GeneralTableComponent,
    FilterTablePipe,
    CustomTablePipe,
    MouseOverDirective,
    ArbolRubroComponent,
    SelectedRowDirective,
    FileUploadComponent,
    MultiPipePipe,
    RechazarComponent,
    TableComponent,
    FileUploadDirective
  ],
  providers: [
    CustomTablePipe,
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    PercentPipe
  ]
})

export class SharedModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

