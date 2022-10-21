import {
    ActivatedRouteSnapshot,
    CanDeactivate,
    RouterStateSnapshot
  } from '@angular/router';
  import { BehaviorSubject, Observable } from 'rxjs';
  export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
  }
  export class CanDeactivateGuard
    implements CanDeactivate<CanComponentDeactivate>
  {
    nextRoute: any = new BehaviorSubject(null);
    
    canDeactivate(
      component: CanComponentDeactivate,
      currentRoute: ActivatedRouteSnapshot,
      currentState: RouterStateSnapshot,
      nextState?: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
      // Detecting Away & Inside Route
      this.nextRoute.next(nextState?.url);
      return component.canDeactivate();
    }
  }