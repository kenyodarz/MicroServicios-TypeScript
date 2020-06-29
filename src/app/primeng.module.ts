// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// PrimeNG
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

const myModule = [
  ToolbarModule,
  SplitButtonModule,
  ConfirmDialogModule,
  MessagesModule,
  MessageModule,
  PanelModule,
  TableModule,
  MenubarModule,
  ToastModule,
  DialogModule,
];



@NgModule({
  declarations: [],
  imports: [CommonModule, myModule],
  exports: [myModule],
  providers: [],
})
export class PrimengModule { }
