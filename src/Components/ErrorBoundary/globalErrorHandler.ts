import React from 'react';

import logger from '@/Utils/logger';

type ErrorCallback = (error: Error, context?: string) => void;

class GlobalErrorHandler {
  private static instance: GlobalErrorHandler;
  private errorCallbacks: Set<ErrorCallback> = new Set();

  static getInstance(): GlobalErrorHandler {
    if (!GlobalErrorHandler.instance) {
      GlobalErrorHandler.instance = new GlobalErrorHandler();
    }
    return GlobalErrorHandler.instance;
  }

  /**
   * Đăng ký callback để nhận lỗi từ async operations
   * @param callback Function sẽ được gọi khi có lỗi
   * @returns Function để hủy đăng ký
   */
  onError(callback: ErrorCallback): () => void {
    this.errorCallbacks.add(callback);

    // Return unsubscribe function
    return () => {
      this.errorCallbacks.delete(callback);
    };
  }

  /**
   * Báo lỗi cho tất cả listeners đã đăng ký
   * @param error Lỗi cần báo
   * @param context Context/ngữ cảnh xảy ra lỗi
   */
  reportError(error: Error, context?: string): void {
    logger.error('Global Error:', {
      error: error.message,
      stack: error.stack,
      context,
    });

    // Thông báo cho tất cả callbacks
    this.errorCallbacks.forEach(callback => {
      try {
        callback(error, context);
      } catch (callbackError) {
        logger.error('Error in error callback:', callbackError);
      }
    });
  }

  /**
   * Wrapper cho async functions để tự động catch lỗi
   * @param asyncFn Async function cần wrap
   * @param context Context/ngữ cảnh
   * @returns Result hoặc null nếu có lỗi
   */
  async wrapAsync<T>(
    asyncFn: () => Promise<T>,
    context?: string,
  ): Promise<T | null> {
    try {
      return await asyncFn();
    } catch (error) {
      this.reportError(error as Error, context);
      return null;
    }
  }

  /**
   * Clear tất cả error callbacks (dùng khi cleanup)
   */
  clearAllCallbacks(): void {
    this.errorCallbacks.clear();
  }
}

export const globalErrorHandler = GlobalErrorHandler.getInstance();

/**
 * HOC để tự động catch lỗi cho components
 * @param Component Component cần wrap
 * @param context Context để identify component
 * @returns Wrapped component
 */
export function withErrorHandler<P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
  context?: string,
): React.ComponentType<P> {
  return function WrappedComponent(props: P) {
    React.useEffect(() => {
      const unsubscribe = globalErrorHandler.onError((error, errorContext) => {
        logger.error(`Error in ${context || 'Unknown Component'}:`, {
          error: error.message,
          context: errorContext,
        });
      });

      return unsubscribe;
    }, []);

    return React.createElement(Component, props);
  };
}
