import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import toast from '../utils/toast';
import { data } from '../json/dataStatus.json';

import React, { useEffect, useState } from 'react';
import { Layout, Section } from '../components/Layout';
import { Input, Select, TextArea } from '../components/Input';
import dummy from '../json/dummyLog.json';
import { Modals } from '../components/Modals';
import {
  FaUserAltSlash,
  FaUserEdit,
  FaUserTie,
  FaUserTimes,
} from 'react-icons/fa';
import { addUserType } from '../utils/type';
import { useCookies } from 'react-cookie';

const MenteeLog = () => {
  const [handleTime, setHandleTime] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [objModal, setobjModal] = useState<addUserType>();

  const MySwal = withReactContent(swal);
  const MyToast = withReactContent(toast);

  const [cookie] = useCookies(['id', 'role', 'token', 'full_name']);
  const ckToken = cookie.token;
  const ckId = cookie.id;
  const ckRole = cookie.role;
  const ckName = cookie.full_name;

  const timeGreeting = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (currentHour < 12) {
      setHandleTime('Good Morning,');
    } else if (currentHour >= 12 && currentHour < 17) {
      setHandleTime('Good Aternoon,');
    } else if (currentHour >= 17 && currentHour < 21) {
      setHandleTime('Good Evening,');
    } else {
      setHandleTime('Good Night,');
    }
  };

  const handleEdit = (props: addUserType) => {
    setobjModal({
      email: props.email,
      full_name: props.full_name,
      id: props.id,
      role: props.role,
      team: props.team,
    });
  };

  useEffect(() => {
    timeGreeting();
  }, []);

  return (
    <Layout>
      <Modals id="modal-add">
        <div className="flex flex-col gap-5 items-center">
          <p className="text-secondary font-medium tracking-wide text-2xl mb-3">
            Add Log
          </p>

          <TextArea
            id="notes"
            name="notes"
            label="notes"
          />

          <div className="w-full flex justify-end gap-3">
            <div className="modal-action mt-0 ">
              <label
                htmlFor="modal-add"
                className="btn btn-ghost"
              >
                Close
              </label>
            </div>
            <button className="btn btn-secondary w-32">Submit</button>
          </div>
        </div>
      </Modals>

      <Section
        id="section-dashboard"
        addClass="flex flex-col items-center p-3 justify-between"
      >
        <div
          id="header"
          className="w-full h-[15%] p-5 flex justify-between"
        >
          <div className="flex flex-col gap-3">
            <p className="text-secondary tracking-wide font-semibold text-3xl">
              {handleTime} {ckName}!
            </p>
            <p className="text-secondary tracking-wide text-xl">Mentee Log</p>
          </div>
          <p className="text-secondary tracking-wide text-xl">User {ckRole}</p>
        </div>

        <div className="w-full min-h-[83%] bg-base-300 rounded-xl flex flex-col gap-5 p-6 ">
          <div className="w-full h-[18%]  flex justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-secondary uppercase tracking-wide font-semibold text-xl">
                {dummy.data.full_name}{' '}
                <span className="tracking-normal capitalize font-normal text-lg">
                  {'{'}
                  {dummy.data.nick_name}
                  {'}'}
                </span>
              </p>
              <p className="text-secondary tracking-wide text-base">
                {dummy.data.class}
              </p>
              <p className="text-secondary tracking-wide text-base">
                {dummy.data.institution}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-secondary tracking-wide font-semibold text-base">
                Phone:{' '}
                <span className="tracking-normal font-normal text-base">
                  {dummy.data.phone}
                </span>
              </p>
              <p className="text-secondary tracking-wide font-semibold text-base">
                Telegram:{' '}
                <span className="tracking-normal font-normal text-base">
                  {dummy.data.telegram}
                </span>
              </p>
              <p className="text-secondary tracking-wide font-semibold text-base">
                Email:{' '}
                <span className="tracking-normal font-normal text-base">
                  {dummy.data.email}
                </span>
              </p>
            </div>
          </div>

          <div className="w-full flex justify-end">
            <label
              htmlFor="modal-add"
              className="btn btn-secondary w-32"
            >
              Add Log
            </label>
          </div>

          <div className="w-full rounded-xl grid grid-cols-1 gap-5">
            {dummy.data.feedback.map((item) => {
              return (
                <div className="w-full bg-base-200 p-2 rounded-lg">
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-1 text-neutral">
                      <p className=" ">
                        Status:{' '}
                        <span className="font-medium">{item.status}</span>
                      </p>
                      <p>
                        PIC: <span className="font-medium">{item.users}</span>
                      </p>
                    </div>
                    <div className="w-[60%]">
                      {' '}
                      <span className="font-medium">notes: </span>
                      {item.notes}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default MenteeLog;
