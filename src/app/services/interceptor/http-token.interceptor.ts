import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token/token.service';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('HTTP Interceptor triggered');
  const tokenService = inject(TokenService);
  const token = tokenService.token;
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};

