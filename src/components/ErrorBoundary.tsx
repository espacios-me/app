/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary component to catch and display React errors gracefully.
 * Prevents the entire app from crashing when a component throws an error.
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-editorial-100 flex items-center justify-center p-6">
          <div className="max-w-2xl w-full bg-white rounded-[2.5rem] p-12 shadow-2xl border border-red-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-red-50 rounded-2xl text-red-600">
                <AlertTriangle size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-serif text-editorial-900 mb-2">Something went wrong</h1>
                <p className="text-stone-600">The application encountered an unexpected error.</p>
              </div>
            </div>

            {this.state.error && (
              <div className="bg-stone-50 rounded-2xl p-6 mb-6 space-y-4">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Error Message</h2>
                  <p className="text-sm font-mono text-red-600">{this.state.error.message}</p>
                </div>

                {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Stack Trace</h2>
                    <pre className="text-xs text-stone-600 overflow-auto max-h-48 bg-white rounded-xl p-4">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={this.handleReset}
                className="flex-1 bg-editorial-900 text-white py-4 px-6 rounded-2xl font-bold hover:bg-stone-800 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <RefreshCw size={20} />
                Try Again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 bg-stone-100 text-editorial-900 py-4 px-6 rounded-2xl font-bold hover:bg-stone-200 transition-all"
              >
                Go Home
              </button>
            </div>

            <p className="text-xs text-stone-400 text-center mt-6">
              If this problem persists, please contact support at strategy@espacios.agency
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
