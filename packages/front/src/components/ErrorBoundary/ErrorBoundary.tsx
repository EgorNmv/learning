import React, { ErrorInfo } from "react";
import "./error-boundary.css";
import LogoSvg from "../../static/img/logo_rcr.svg";
import { Button } from "antd";

export class ErrorBoundary extends React.Component {
  public state = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error) {
    // Чтобы Окно ошибки не вылазило при авторизации, так как в браузере FIREFOX идёт NetworkError
    if (window.location.pathname !== "/implicit/callback") {
      // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
      return { hasError: true };
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  private goToMainPageAndRefresh = () => {
    window.location.replace("/");
  };

  public render() {
    if (this.state.hasError) {
      // Можно отрендерить запасной UI произвольного вида
      return (
        <section className="error-page">
          <div className="error-container">
            <h1>Упс...</h1>
            <p>
              Что-то пошло не так <span className="error-smile">:-(</span>
            </p>
            <p>
              Скорее всего, наша команда уже занимается решением этой проблемы.
            </p>
            <p>
              В ближайшее время мы устраним данную неполадку и приведём систему
              в рабочее состояние.
            </p>
            <Button type="primary" onClick={this.goToMainPageAndRefresh}>
              Вернуться на главную страницу
            </Button>
            <div className="error-logo">
              <img src={LogoSvg} alt="Лого" />
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
