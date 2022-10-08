import { Form, Input, Modal } from "antd";
import React, { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppProvider";
import { AuthContext } from "../../contexts/AuthProvider";
import { addDocument } from "../../fireBase/services";

const AddRoomModal = () => {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [form] = Form.useForm();
  const handleOk = () => {
    //handle logic
    //add new room to firestore

    console.log({ formData: form.getFieldValue() });
    addDocument("rooms", { ...form.getFieldValue(), members: [uid] });

    //reset form
    form.resetFields();

    setIsAddRoomVisible(false);
  };

  const handleCancel = () => {
    //reset form
    form.resetFields();
    setIsAddRoomVisible(false);
  };
  return (
    <Modal
      title="Tạo phòng"
      visible={isAddRoomVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Tên phòng" name="name">
          <Input placeholder="Nhập tên phòng" />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea placeholder="Nhập mô tả" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRoomModal;
