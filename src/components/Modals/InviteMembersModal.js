import { Avatar, Form, Input, Modal, Select, Spin } from "antd";
import { debounce } from "lodash";
import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../../contexts/AppProvider";
import { AuthContext } from "../../contexts/AuthProvider";
import { db } from "../../fireBase/config";
import { addDocument } from "../../fireBase/services";

function DebounceSelect({
  fetchOptions,
  debounceTimeout = 300,
  currentMembers,
  ...props
}) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOption = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, currentMembers).then((newOption) => {
        setOptions(newOption);
        setFetching(false);
      });
    };

    return debounce(loadOption, debounceTimeout);
  }, [debounceTimeout, fetchOptions, currentMembers]);

  return (
    <Select
      filterOption={false}
      labelInValue
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin /> : null}
      {...props}
    >
      {options.map((opt) => (
        //[{label: ,value, photoURL}]
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar src={opt.photoURL} size="small">
            {opt.photoURL ? "" : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {`${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}

async function fetchUserList(search, currentMembers) {
  return db
    .collection("user")
    .where("keywords", "array-contains", search)
    .orderBy("displayName")
    .limit(20)
    .get()
    .then((snapshot) => {
      return snapshot.docs
        .map((doc) => ({
          label: doc.data().displayName,
          value: doc.data().uid,
          photoURL: doc.data().photoURL,
        }))
        .filter((opt) => !currentMembers.includes(opt.value));
    });
}

const InviteMembersModals = () => {
  const { isInviteVisible, setIsInviteVisible, selectedRoomId, selectedRoom } =
    useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [value, setValue] = useState([]);
  const [form] = Form.useForm();
  const handleOk = () => {
    //handle logic
    //add new room to firestore

    //reset form
    form.resetFields();

    //update member in current room
    const roomRef = db.collection("rooms").doc(selectedRoomId);
    roomRef.update({
      members: [...selectedRoom.members, ...value.map((val) => val.value)],
    });

    setIsInviteVisible(false);
  };

  const handleCancel = () => {
    //reset form
    form.resetFields();
    setIsInviteVisible(false);
  };

  console.log({ value });
  return (
    <Modal
      title="Mời thêm thành viên "
      visible={isInviteVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <DebounceSelect
          mode="multiple"
          label="Tên các thành viên"
          value={value}
          placeholder="Nhập tên thành viên"
          fetchOptions={fetchUserList}
          onChange={(newValue) => setValue(newValue)}
          style={{ width: "100%" }}
          currentMembers={selectedRoom.members}
        />
      </Form>
    </Modal>
  );
};

export default InviteMembersModals;
