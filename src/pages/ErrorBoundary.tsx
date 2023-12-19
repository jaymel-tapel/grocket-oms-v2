import React, { ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode | string;
  fallback?: ReactNode | string;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(error);
    console.log(info);
  }

  render() {
    if (this.state.hasError) this.props.fallback;
    return this.props.children;
  }
}

export default ErrorBoundary;
