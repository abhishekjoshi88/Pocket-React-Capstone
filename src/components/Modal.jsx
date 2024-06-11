import React, { useState, useEffect } from 'react';
import styles from './Modal.module.css';
import { color, getScreenSize } from '../utils';
import ModalContent from './ModalContent';

const Modal = ({closeModal,setGroups,groups}) => {
  
  const [currScreenSize, setCurrScreenSize] = useState(getScreenSize());
  const [formData, setFormData] = useState({ grpName: '', color: '' });

  useEffect(() => {
    const Screen = () => {
      setCurrScreenSize(getScreenSize());
    };
    window.addEventListener('resize', Screen);
  }, []);



  const handleChange1 = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const color = e.target.getAttribute('color');
    
    setFormData({
      ...formData,
      [name]: color ? color : value,
    });
  
    console.log(color ? formData.color : formData.grpName);
  };

  const handleSubmit = (e) => {
    if (formData.grpName === '' || formData.color === '') {
      alert('Please fill all details');
      return;
    }
    let newGroupItem = [
      ...groups,
      {
        id: groups.length,
        groupName: formData.grpName,
        color: formData.color,
        notes: [],
      },
    ];
    setGroups(newGroupItem);
    localStorage.setItem('groups', JSON.stringify(newGroupItem));
    closeModal(false);
  };

  return (
    <>
    {currScreenSize.width < 989 ? (
      <div className={styles.bg_mob}>
        <ModalContent
          styles={{
            container: styles.container_mob,
            closeButton: styles.close_btn_mob,
            title: styles.title,
            group_name: styles.group_name,
            input: styles.txt_mob,
            modal_color: styles.modal_color,
            btn_color: styles.btn_color,
            createButton: styles.modal_create_mob,
          }}
          closeModal={closeModal}
          handleChange1={handleChange1}
          handleSubmit={handleSubmit}
          formData={formData}
          color={color}
        />
      </div>
    ) : (
      <div className={styles.modalBackground}>
        <ModalContent
          styles={{
            container: styles.container,
            closeButton: styles.closeButton,
            title: styles.title,
            group_name: styles.group_name,
            input: styles.modal_txt,
            modal_color: styles.modal_color,
            btn_color: styles.btn_color,
            createButton: styles.modalCreate,
          }}
          closeModal={closeModal}
          handleChange1={handleChange1}
          handleSubmit={handleSubmit}
          formData={formData}
          color={color}
        />
      </div>
    )}
  </>
  );
};

export default Modal;
