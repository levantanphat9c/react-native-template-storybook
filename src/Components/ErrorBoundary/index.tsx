import React, {Component, ErrorInfo, ReactNode} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import logger from '@/Utils/logger';

import {globalErrorHandler} from './globalErrorHandler';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * ⚠️ QUAN TRỌNG: ErrorBoundary PHẢI là Class Component!
 *
 * Lý do tại sao KHÔNG thể dùng Functional Component:
 * 1. React chỉ hỗ trợ Error Boundary với Class Components
 * 2. Functional Components không có lifecycle methods cần thiết
 * 3. getDerivedStateFromError và componentDidCatch chỉ có ở Class Components
 *
 * Chi tiết lifecycle methods:
 * - getDerivedStateFromError: Bắt lỗi và cập nhật state (pure function)
 * - componentDidCatch: Xử lý side effects như logging, analytics
 *
 * 📚 Tham khảo: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 */
class ErrorBoundary extends Component<Props, State> {
  private errorUnsubscribe?: () => void;
  constructor(props: Props) {
    super(props);
    // Khởi tạo state ban đầu - không có lỗi
    this.state = {hasError: false};
  }

  /**
   *  LIFECYCLE METHOD 1: getDerivedStateFromError
   *
   * ⚠️ CHỈ CÓ Ở CLASS COMPONENTS!
   *
   * Khi nào chạy: Khi child component throw error
   * Mục đích: Cập nhật state để hiển thị fallback UI
   * Return: State object mới
   *
   * ❌ KHÔNG THỂ: Gọi API, log error (vì là pure function)
   * ✅ CÓ THỂ: Return state object để update UI
   */
  static getDerivedStateFromError(error: Error): State {
    // Pure function - chỉ update state, không có side effects
    return {hasError: true, error};
  }

  /**
   *  LIFECYCLE METHOD 2: componentDidCatch
   *
   * ⚠️ CHỈ CÓ Ở CLASS COMPONENTS!
   *
   * Khi nào chạy: Sau khi getDerivedStateFromError
   * Mục đích: Side effects (logging, analytics, monitoring)
   *
   * ✅ CÓ THỂ: Gọi API, log error, send to monitoring service
   * ✅ CÓ THỂ: Track analytics, crash reporting
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Side effects - logging, analytics, crash reporting
    logger.error('ErrorBoundary caught an error', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });

    // Có thể thêm:
    // - Sentry.captureException(error);
    // - analytics.trackError(error);
    // - crashReporting.report(error);
  }

  componentDidMount() {
    // Lắng nghe lỗi global
    this.errorUnsubscribe = globalErrorHandler.onError(error => {
      this.setState({
        hasError: true,
        error,
      });
    });
  }

  componentWillUnmount() {
    this.errorUnsubscribe?.();
  }

  /**
   * 🔄 Handle retry - Reset error state
   */
  handleRetry = (): void => {
    this.setState({hasError: false, error: undefined});
  };

  /**
   *  Render method
   *
   * Logic:
   * - Nếu có lỗi: Hiển thị fallback UI hoặc default error screen
   * - Nếu không có lỗi: Render children bình thường
   */
  render(): ReactNode {
    if (this.state.hasError) {
      // Nếu có custom fallback, sử dụng nó
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Oops! Something went wrong</Text>
          <Text style={styles.message}>
            We're sorry, but something unexpected happened. Please try again.
          </Text>
          {/* Chỉ hiển thị error details trong development */}
          {__DEV__ && this.state.error && (
            <Text style={styles.errorText}>{this.state.error.message}</Text>
          )}
          <TouchableOpacity style={styles.button} onPress={this.handleRetry}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // Render children bình thường nếu không có lỗi
    return this.props.children;
  }
}

/**
 *  CÁCH SỬ DỤNG ERROR BOUNDARY:
 *
 * 1. Wrap toàn bộ app:
 *    <ErrorBoundary>
 *      <App />
 *    </ErrorBoundary>
 *
 * 2. Wrap từng screen/route:
 *    <ErrorBoundary>
 *      <HomeScreen />
 *    </ErrorBoundary>
 *
 * 3. Wrap critical components:
 *    <ErrorBoundary>
 *      <PaymentForm />
 *    </ErrorBoundary>
 *
 * 4. Với custom fallback:
 *    <ErrorBoundary fallback={<CustomErrorScreen />}>
 *      <Component />
 *    </ErrorBoundary>
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  errorText: {
    fontSize: 12,
    color: '#ff3b30',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'monospace',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ErrorBoundary;
