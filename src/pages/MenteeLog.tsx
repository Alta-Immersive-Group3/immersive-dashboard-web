import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import toast from '../utils/toast';
import { data } from '../json/dataStatus.json';

import React, { useEffect, useState } from 'react';
import { Layout, Section } from '../components/Layout';
import { Input, Select, TextArea } from '../components/Input';
import { data as dataStatus } from '../json/dataStatus.json';

import dummy from '../json/dummyLog.json';
import { Modals } from '../components/Modals';
import {
  FaUserAltSlash,
  FaUserEdit,
  FaUserTie,
  FaUserTimes,
} from 'react-icons/fa';
import {
  addClassType,
  addFeedbackType,
  addUserType,
  menteesType,
} from '../utils/type';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const addSchema = Yup.object().shape({
  notes: Yup.string().required('Required'),
  id_user: Yup.number().positive().integer().required('Required'),
  id_mentee: Yup.number().positive().integer().required('Required'),
  id_status: Yup.number().positive().integer().required('Required'),
  proof: Yup.string().required('Required'),
});

const MenteeLog = () => {
  const [handleTime, setHandleTime] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [objModal, setobjModal] = useState<addUserType>();
  const [objLog, setObjLog] = useState<menteesType>();
  const [objClass, setObjClass] = useState<addClassType[]>([]);
  const [objFeedback, setObjFeedback] = useState<addFeedbackType[]>([]);
  const params = useParams();

  const MySwal = withReactContent(swal);
  const MyToast = withReactContent(toast);

  const [cookie] = useCookies(['id', 'role', 'token', 'full_name']);
  const ckToken = cookie.token;
  const ckId = cookie.id;
  const ckRole = cookie.role;
  const ckName = cookie.full_name;
  const { mentee_id } = params;

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

  const fetchGetAllClass = async () => {
    await api
      .getClassAll(ckToken)
      .then((response) => {
        const { data } = response.data;
        setObjClass(data);
      })
      .catch((error) => {
        MySwal.fire({
          icon: 'error',
          title: 'Failed',
          text: `error :  ${error.message}`,
          showCancelButton: false,
        });
      });
  };

  const fetchMenteeByID = async () => {
    await api
      .getMenteeById(ckToken, mentee_id)
      .then((response) => {
        const { data } = response.data;
        setObjLog(data);
      })
      .catch((error) => {
        MySwal.fire({
          icon: 'error',
          title: 'Failed',
          text: `error :  ${error.message}`,
          showCancelButton: false,
        });
      });
  };

  const fetchLogByID = async () => {
    await api
      .getFeedbackById(ckToken, mentee_id)
      .then((response) => {
        const { data } = response.data;

        setObjFeedback(data.feedbacks);
      })
      .catch((error) => {
        MySwal.fire({
          icon: 'error',
          title: 'Failed',
          text: `error :  ${error.message}`,
          showCancelButton: false,
        });
      });
  };

  const addNotes = async (datad: object) => {
    await api
      .postFeedback(ckToken, datad)
      .then((response) => {
        const { message } = response.data;
        fetchLogByID();
        formikAdd.resetForm();
        formikAdd.setFieldValue('id_user', parseInt(ckId));
        formikAdd.setFieldValue('id_mentee', Number(mentee_id));

        MyToast.fire({
          icon: 'success',
          title: message,
        });
      })
      .catch((error) => {
        MySwal.fire({
          icon: 'error',
          title: 'Failed',
          text: `error :  ${error.message}`,
          showCancelButton: false,
        });
      });
  };

  const formikAdd = useFormik({
    initialValues: {
      notes: '',
      id_user: '',
      id_mentee: '',
      id_status: '',
      proof: '',
    },
    validationSchema: addSchema,
    onSubmit: (values) => {
      addNotes(values);
    },
  });

  const getClassName = (id_class?: number) => {
    const dataItem = objClass.find((item) => item.id === id_class);
    return dataItem?.name;
  };

  const getDataName = (id?: number): string | undefined => {
    const dataItem = dataStatus.find((item) => item.id === id);
    return dataItem?.name;
  };

  const handleIdStatusChange = (value: string) => {
    formikAdd.setFieldValue('id_status', parseInt(value, 10));
  };

  const dedicatedFetch = async () => {
    timeGreeting();
    await fetchGetAllClass();
    await fetchMenteeByID();
    await fetchLogByID();
    await formikAdd.setFieldValue('id_user', parseInt(ckId));
    await formikAdd.setFieldValue('id_mentee', Number(mentee_id));
  };

  useEffect(() => {
    dedicatedFetch();
  }, []);

  return (
    <Layout>
      <Modals id="modal-add">
        <form
          onSubmit={formikAdd.handleSubmit}
          className="flex flex-col gap-5 items-center"
        >
          <p className="text-secondary font-medium tracking-wide text-2xl mb-3">
            Add Log
          </p>
          <Select
            id="id_status"
            name="id_status"
            label="Status"
            value={formikAdd.values.id_status.toString()}
            onChangeSelect={(e) => handleIdStatusChange(e.target.value)}
            onBlur={formikAdd.handleBlur}
            error={formikAdd.errors.id_status}
            touch={formikAdd.touched.id_status}
          >
            {data.map((opt) => (
              <option
                key={opt.id}
                value={opt.id}
              >
                {opt.name}
              </option>
            ))}
          </Select>

          <TextArea
            id="notes"
            name="notes"
            label="Notes"
            value={formikAdd.values.notes}
            onChange={formikAdd.handleChange}
            onBlur={formikAdd.handleBlur}
            error={formikAdd.errors.notes}
            touch={formikAdd.touched.notes}
          />

          <Input
            id="proof"
            name="proof"
            label="Proofing"
            type="text"
            value={formikAdd.values.proof}
            onChange={formikAdd.handleChange}
            onBlur={formikAdd.handleBlur}
            error={formikAdd.errors.proof}
            touch={formikAdd.touched.proof}
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
        </form>
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
                {objLog?.full_name}{' '}
                <span className="tracking-normal capitalize font-normal text-lg">
                  {'{'}
                  {objLog?.nick_name}
                  {'}'}
                </span>
              </p>
              <p className="text-secondary tracking-wide text-base">
                {getClassName(objLog?.id_class)}
              </p>
              <p className="text-secondary tracking-wide text-base">
                {objLog?.institution}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-secondary tracking-wide font-semibold text-base">
                Phone:{' '}
                <span className="tracking-normal font-normal text-base">
                  {objLog?.phone}
                </span>
              </p>
              <p className="text-secondary tracking-wide font-semibold text-base">
                Telegram:{' '}
                <span className="tracking-normal font-normal text-base">
                  {objLog?.telegram}
                </span>
              </p>
              <p className="text-secondary tracking-wide font-semibold text-base">
                Email:{' '}
                <span className="tracking-normal font-normal text-base">
                  {objLog?.email}
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
            {objFeedback?.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="w-full bg-base-200 p-2 rounded-lg"
                >
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-1 text-neutral">
                      <p className=" ">
                        Status:{' '}
                        <span className="font-medium">
                          {getDataName(item.id_status)}
                        </span>
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
