import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import EnvConfig from "../services/EnvConfig";
import logo from "../logo.svg";

interface LayoutProps {
  children?: ReactNode;
}

function PublicLayout(props: LayoutProps) {
  return (
    <>
      <div className="usa-overlay"></div>
      <header className="usa-header usa-header--basic">
        <div className="usa-nav-container">
          <div className="usa-navbar navbar-long">
            <div className="usa-logo margin-top-2" id="basic-logo">
              <em className="usa-logo__text display-flex flex-align-center">
                <img src={logo} alt="logo" className="logo" />
                <Link to="/" title="Home" aria-label="Home">
                  {EnvConfig.brandName}
                </Link>
              </em>
            </div>
            <button className="usa-menu-btn">Menu</button>
          </div>
          <nav aria-label="Primary navigation" className="usa-nav">
            <button className="usa-nav__close">
              <FontAwesomeIcon icon={faWindowClose} size="lg" role="img" />
            </button>
            <ul className="usa-nav__primary usa-accordion">
              <li className="usa-nav__primary-item">
                <a
                  href={`mailto:${EnvConfig.contactEmail}?subject=Performance Dashboard Assistance`}
                  className="usa-nav__link"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="padding-y-3">
        <div className="grid-container">{props.children}</div>
      </main>
    </>
  );
}

export const withPublicLayout = (
  component: React.ComponentType
): React.FunctionComponent<{}> => {
  return function () {
    return <PublicLayout>{React.createElement(component)}</PublicLayout>;
  };
};

export default withPublicLayout;
