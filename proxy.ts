// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
//   // Получаем путь страницы
//   const pathname = request.nextUrl.pathname;
  
//   // Создаем новые заголовки
//   const requestHeaders = new Headers(request.headers);
  
//   // Добавляем путь в заголовки
//   requestHeaders.set('x-pathname', pathname);
  
//   // Передаем запрос дальше
//   return NextResponse.next({
//     request: {
//       headers: requestHeaders,
//     },
//   });
// }

// // Опционально: указываем, для каких путей запускать middleware
// export const config = {
//   matcher: '/:path*', // Запускаем для всех путей
};