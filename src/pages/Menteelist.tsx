import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import toast from '../utils/toast';

import { useEffect, useState } from 'react';
import { Layout, Section } from '../components/Layout';
import { data } from '../json/dataStatus.json';

import { FaUserEdit, FaUserTag, FaUserTimes } from 'react-icons/fa';
import { addClassType, menteesType } from '../utils/type';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import api from '../utils/api';

const Menteelist = () => {
  const [handleTime, setHandleTime] = useState<string>('');
  const [objModal, setobjModal] = useState<menteesType[]>([]);
  const [objClass, setObjClass] = useState<addClassType[]>([]);

  const navigate = useNavigate();
  const MySwal = withReactContent(swal);
  const MyToast = withReactContent(toast);

  const [cookie] = useCookies(['id', 'role', 'token', 'full_name']);
  const ckToken = cookie.token;
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

  const getDataName = (id?: number): string | undefined => {
    const dataItem = data.find((item) => item.id === id);
    return dataItem?.name;
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

  const fetchGetAllMentee = async () => {
    await api
      .getMenteeAll(ckToken)
      .then((response) => {
        const { data } = response.data;
        setobjModal(data);
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

  const delMentee = async (usid?: any) => {
    await api
      .delMenteeById(ckToken, usid)
      .then((response) => {
        const { message } = response.data;
        fetchGetAllMentee();
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

  const handleDelMentee = async (usid?: any) => {
    MySwal.fire({
      icon: 'question',
      title: 'DELETE',
      text: `are you sure delete ?`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        delMentee(usid);
      }
    });
  };

  const getClassName = (id_class?: number) => {
    const dataItem = objClass.find((item) => item.id === id_class);
    return dataItem?.name;
  };

  const dedicatedFetch = async () => {
    timeGreeting();
    await fetchGetAllMentee();
    await fetchGetAllClass();
  };

  useEffect(() => {
    dedicatedFetch();
  }, []);

  return (
    <Layout>
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
            <p className="text-secondary tracking-wide text-xl">Menteelist</p>
          </div>
          <p className="text-secondary tracking-wide text-xl">User {ckRole}</p>
        </div>

        <div className="w-full min-h-[83%] bg-base-300 rounded-xl flex flex-col gap-5 p-8 items-center">
          <div className="w-full flex justify-end">
            <button
              onClick={() => navigate('/mentee/add')}
              className="btn btn-secondary w-32"
            >
              Add Mentee
            </button>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="table bg-base-200">
              <thead>
                <tr>
                  <th></th>
                  <th>Full Name</th>
                  <th>Class</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Gender</th>
                  <th>Log</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {objModal.map((prop, idx) => {
                  return (
                    <tr key={idx}>
                      <th>{idx + 1}</th>
                      <td>{prop.full_name}</td>
                      <td>{getClassName(prop.id_class)}</td>
                      <td>{getDataName(prop.id_status)}</td>
                      <td>{prop.education_type}</td>
                      <td>{prop.gender === 'L' ? 'Male' : 'Female'}</td>
                      <td>
                        <button
                          onClick={() => navigate(`/mentee/${prop.id}/log`)}
                          className="btn p-0 min-h-0 h-0 p text-base"
                        >
                          <FaUserTag />
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => navigate(`/mentee/${prop.id}/edit`)}
                          className="btn p-0 min-h-0 h-0 p text-base"
                        >
                          <FaUserEdit />
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelMentee(prop.id)}
                          className="btn p-0 min-h-0 h-0 p text-base"
                        >
                          <FaUserTimes />
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

export default Menteelist;
