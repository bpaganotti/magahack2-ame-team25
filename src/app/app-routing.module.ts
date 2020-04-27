import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OptionAComponent } from "./pages/option-a/option-a.component";
import { OptionBComponent } from "./pages/option-b/option-b.component";
import { OptionCComponent } from "./pages/option-c/option-c.component";
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: "option-a",
    component: OptionAComponent,
    data: { state: "option-a" },
  },
  {
    path: "option-b",
    component: OptionBComponent,
    data: { state: "option-b" },
  },
  {
    path: "option-c",
    component: OptionCComponent,
    data: { state: "option-c" },
  },
  {
    path: "home",
    component: HomeComponent,
    data: { state: "home" },
  },
  { 
    path: '**', 
    component: HomeComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
