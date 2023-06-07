import React, { useEffect, useState } from 'react';
import { Layout, Section } from '../components/Layout';
import { Input, Select } from '../components/Input';
import dummy from '../json/dummyClass.json';
import { Modals } from '../components/Modals';
import { FaUsersCog, FaUsersSlash } from 'react-icons/fa';
import { addClassType } from '../utils/type';

const Classlist = () => {
  const [handleTime, setHandleTime] = useState<string>('');
  const [objModal, setobjModal] = useState<addClassType>();

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

  const handleEdit = (props: any) => {
    setobjModal({
      class_name: props.name,
      PIC: props.pic,
      id_class: props.id,
      start_date: props.date_start,
      end_date: props.graduate_date,
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
            Add Class
          </p>
          <Input
            id="classname"
            name="classname"
            label="Class Name"
            type="text"
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
      <Modals id="modal-edit">
        <div className="flex flex-col gap-5 items-center">
          <p className="text-secondary font-medium tracking-wide text-2xl mb-3">
            Edit Class {objModal?.PIC}
          </p>
          <Input
            id="classname"
            name="classname"
            label="Class Name"
            type="text"
          />
          <Input
            id="PIC"
            name="PIC"
            label="Person in Charge"
            type="text"
          />
          <Input
            id="start_date"
            name="start_date"
            label="Start Date"
            type="date"
          />
          <Input
            id="graduete_date"
            name="graduete_date"
            label="Graduete Date"
            type="date"
          />

          <div className="w-full flex justify-end gap-3">
            <div className="modal-action mt-0 ">
              <label
                htmlFor="modal-edit"
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
              {handleTime} Jhon Doe!
            </p>
            <p className="text-secondary tracking-wide text-xl">Classlist</p>
          </div>
          <p className="text-secondary tracking-wide text-xl">User Default</p>
        </div>

        <div className="w-full min-h-[83%] bg-base-300 rounded-xl flex flex-col gap-5 p-8 items-center">
          <div className="w-full flex justify-end">
            <label
              htmlFor="modal-add"
              className="btn btn-secondary w-32"
            >
              Add Class
            </label>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="table bg-base-200">
              <thead>
                <tr>
                  <th></th>
                  <th>Class Name</th>
                  <th>PIC</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {dummy.map((prop: any, idx) => {
                  return (
                    <tr>
                      <th>{idx + 1}</th>
                      <td>{prop.name}</td>
                      <td>{prop.pic}</td>
                      <td>{prop.date_start}</td>
                      <td>{prop.graduate_date}</td>
                      <td>
                        <label
                          onClick={() => handleEdit(prop)}
                          className="btn p-0 min-h-0 h-0 p text-base"
                          htmlFor="modal-edit"
                        >
                          <FaUsersCog />
                        </label>
                      </td>
                      <td>
                        <button className="btn p-0 min-h-0 h-0 p text-base">
                          <FaUsersSlash />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Classlist;
