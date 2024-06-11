import React from 'react'

const ModalContent = ({ styles, closeModal, handleChange1, handleSubmit, formData, color }) => (
    <div className={styles.container}>
      <span>
        <button
          className={styles.closeButton}
          onClick={() => closeModal(false)}
        >
          X
        </button>
      </span>
      <h2 className={styles.title}>Create New Group</h2>
      <label className={styles.group_name}>Group Name</label>
      <input
        type="text"
        className={styles.input}
        name="grpName"
        placeholder="Enter your group name"
        onChange={handleChange1}
      />
      <label className={styles.modal_color}>Choose Colour</label>
      <div>
        {color.map((color, index) => (
          <button
            className={`${styles.btn_color} ${
              formData.color === color ? "selected" : ""
            }`}
            name="color"
            color={color}
            key={index}
            id={color}
            style={{
              background: color,
              border: formData.color === color ? '2px solid black' : 'none',
            }}
            onClick={handleChange1}
          ></button>
        ))}
      </div>
      <button className={styles.createButton} onClick={handleSubmit}>
        Create
      </button>
    </div>
  );

export default ModalContent