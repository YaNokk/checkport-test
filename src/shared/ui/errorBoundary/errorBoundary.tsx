import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundarypProps {
  children: ReactNode;
  fallback: (error: Error) => ReactNode;
}

export class ErrorBoundary extends Component<
  ErrorBoundarypProps,
  { error?: any }
> {
  constructor(props: ErrorBoundarypProps) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: any) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return this.props.fallback(
        this.state.error instanceof Error
          ? this.state.error
          : new Error("Неизвестная ошибка"),
      );
    }

    return this.props.children;
  }
}
