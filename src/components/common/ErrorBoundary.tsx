import React from 'react';

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error?: Error };

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('App Error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, color: '#fff', background: '#111', minHeight: '100vh' }}>
          <h2>Something went wrong.</h2>
          {import.meta.env.DEV && (
            <pre style={{ whiteSpace: 'pre-wrap' }}>
              {String(this.state.error?.stack || this.state.error?.message)}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
