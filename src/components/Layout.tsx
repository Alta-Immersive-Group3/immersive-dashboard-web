import React, { FC } from 'react';
import Sidebar from './Sidebar';

interface Props {
  children?: React.ReactNode;
  id?: string;
  addClass?: string;
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Sidebar>
        <div className="w-full min-h-screen flex flex-col">
          <div className="h-full w-full flex flex-col items-center justify-center">
            {children}
          </div>
        </div>
      </Sidebar>
    </>
  );
};
export const Section: FC<Props> = ({ children, id, addClass }) => {
  return (
    <section
      id={id}
      className={`w-full min-h-screen ${addClass}`}
    >
      {children}
    </section>
  );
};
