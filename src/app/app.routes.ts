import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'login',
        pathMatch: 'full',
        loadComponent: () =>  {
            return import('./login/login.component').then((m) => m.LoginComponent);
        },
    },

    {
        path: 'register',
        pathMatch: 'full',
        loadComponent: () =>  {
            return import('./register/register.component').then((m) => m.RegisterComponent);
        },
    },

    {
        path: 'add-post',
        pathMatch: 'full',
        loadComponent: () =>  {
            return import('./add-post/add-post.component').then((m) => m.AddPostComponent);
        },
    },

    {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>  {
            return import('./main-page/main-page.component').then((m) => m.MainPageComponent);
        },
    },
    {
        path: 'profile',
        pathMatch: 'full',
        loadComponent: () =>  {
            return import('./profile/profile.component').then((m) => m.ProfileComponent);
        },
    },

    {
        path: 'saved',
        pathMatch: 'full',
        loadComponent: () =>  {
        return import('./saved/saved.component').then((m) => m.SavedComponent);
        },
    },

    {
        path: 'plan',
        pathMatch: 'full',
        loadComponent: () =>  {
        return import('./plan/plan.component').then((m) => m.PlanComponent);
        },
    },
    
    {
        path: 'card',
        pathMatch: 'full',
        loadComponent: () =>  {
        return import('./components/card/card.component').then((m) => m.CardComponent);
        },
    },

    {
        path: 'show',
        pathMatch: 'full',
        loadComponent: () =>  {
        return import('./show-plan/show-plan.component').then((m) => m.ShowPlanComponent);
        },
    },
];