import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // 여기에 에러 로깅 로직을 추가할 수 있습니다
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-red-600 mb-4">오류가 발생했습니다</h1>
            <p className="text-gray-600 mb-4">
              죄송합니다. 예기치 않은 오류가 발생했습니다. 페이지를 새로고침하거나 다시 시도해주세요.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              페이지 새로고침
            </button>
            {import.meta.env.DEV && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <p className="text-sm font-mono text-gray-700">
                  {this.state.error && this.state.error.toString()}
                </p>
                <pre className="mt-2 text-xs font-mono text-gray-600 overflow-auto">
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 