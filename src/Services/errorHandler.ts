import {Alert} from 'react-native';

export interface ErrorInfo {
  message: string;
  code?: string;
  stack?: string;
  timestamp: Date;
}

class ErrorHandler {
  private static instance: ErrorHandler;
  private errorLog: ErrorInfo[] = [];

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  handleError(error: Error | string, showAlert: boolean = true): void {
    const errorInfo: ErrorInfo = {
      message: typeof error === 'string' ? error : error.message,
      code:
        typeof error === 'object' && 'code' in error
          ? String(error.code)
          : undefined,
      stack: typeof error === 'object' ? error.stack : undefined,
      timestamp: new Date(),
    };

    // Log error
    this.logError(errorInfo);

    // Show alert if needed
    if (showAlert) {
      this.showErrorAlert(errorInfo.message);
    }

    // Send to analytics/crash reporting service
    this.sendToAnalytics(errorInfo);
  }

  private logError(errorInfo: ErrorInfo): void {
    this.errorLog.push(errorInfo);
    console.error('Error occurred:', errorInfo);

    // Keep only last 100 errors
    if (this.errorLog.length > 100) {
      this.errorLog = this.errorLog.slice(-100);
    }
  }

  private showErrorAlert(message: string): void {
    Alert.alert('Error', message, [{text: 'OK'}]);
  }

  private sendToAnalytics(_errorInfo: ErrorInfo): void {
    // TODO: Integrate with crash reporting service like Sentry, Crashlytics
    // Example:
    // Sentry.captureException(errorInfo);
  }

  getErrorLog(): ErrorInfo[] {
    return [...this.errorLog];
  }

  clearErrorLog(): void {
    this.errorLog = [];
  }
}

export default ErrorHandler.getInstance();
