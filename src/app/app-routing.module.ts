import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { PokemonSearchComponent } from './pokemon/pokemon-search/pokemon-search.component';
import { PokemonRegisterComponent } from './pokemon/pokemon-register/pokemon-register.component';
import { SimulationComponent } from './simulation/simulation/simulation.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent},
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'sign_up', pathMatch: 'full', component: SignUpComponent },
  { path: 'search', component: PokemonSearchComponent },
  { path: 'pokemon', component: PokemonRegisterComponent},
  { path: 'pokemon/:species_id', component: PokemonRegisterComponent },
  { path: 'pokemon/:pokemon_id/:isEdit', component: PokemonRegisterComponent },
  { path: 'simulation', component: SimulationComponent },
  { path: 'simulation/:id', component: SimulationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
