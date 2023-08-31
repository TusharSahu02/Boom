import React, { useState } from "react";
import Header from "../components/Header";
import {
  EuiFlexGroup,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiSwitch,
} from "@elastic/eui";
import MeetingNameField from "../components/FormComponents/MeetingNameField";
import MeetingUsersField from "../components/FormComponents/MeetingUsersField";
import useAuth from "../hooks/useAuth";
import useFetchUsers from "../hooks/useFetchUsers";
import moment from "moment";
import MeetingDateField from "../components/FormComponents/MeetingDateField";
import CreateMeetingButtons from "../components/FormComponents/CreateMeetingButtons";
import { FieldErrorType, Usertype } from "../utils/Types";
import { addDoc } from "firebase/firestore";
import { meetingsRef } from "../utils/FirebaseConfig";
import { genrateMeetingID } from "../utils/genrateMeetingID";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";
import MeetingMaximumUsersField from "../components/FormComponents/MeetingMaximumUsersField";

function VideoConference() {
  useAuth();
  const navigate = useNavigate();
  const [users] = useFetchUsers();
  const [createToast] = useToast();
  const [size, setSize] = useState(1);
  const uid = useAppSelector((zoom) => zoom.auth.userInfo?.uid);
  const [meetingName, setMeetingName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<Array<Usertype>>([]);
  const [startDate, setStartDate] = useState(moment());
  const [anyoneCanJoin, setAnyoneCanJoin] = useState(false);
  const [showErrors, setShowErrors] = useState<{
    meetingName: FieldErrorType;
    meetingUser: FieldErrorType;
  }>({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUser: {
      show: false,
      message: [],
    },
  });

  const validateForm = () => {
    let errors = false;
    const cloneShowErrors = { ...showErrors };
    if (!meetingName.length) {
      cloneShowErrors.meetingName.show = true;
      cloneShowErrors.meetingName.message = ["Please Enter meeting name"];
      errors = true;
    } else {
      cloneShowErrors.meetingName.show = false;
      cloneShowErrors.meetingName.message = [];
    }

    if (!selectedUsers.length) {
      cloneShowErrors.meetingUser.show = true;
      cloneShowErrors.meetingUser.message = [
        "Please Select someone to create meeting",
      ];
    } else {
      cloneShowErrors.meetingUser.show = false;
      cloneShowErrors.meetingUser.message = [];
    }
    setShowErrors(cloneShowErrors);
    return errors;
  };

  const onUserChange = (selectedOptions: any) => {
    setSelectedUsers(selectedOptions);
  };
  const createMeeting = async () => {
    if (!validateForm()) {
      const meetingId = genrateMeetingID();
      await addDoc(meetingsRef, {
        createdBy: uid,
        meetingId,
        meetingName,
        meetingType: anyoneCanJoin ? "anyone-can-join" : "video-conference",
        invitedUsers: anyoneCanJoin
          ? []
          : selectedUsers.map((user: Usertype) => user.uid),
        meetingDate: startDate.format("L"),
        maxUsers: anyoneCanJoin ? 100 : size,
        status: true,
      });
      createToast({
        title: anyoneCanJoin
          ? "Anyone can Join Meeting created successfully"
          : "Video Conference Meeting Created Successfully",
        type: "success",
      });
      navigate("/");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Header />
      <EuiFlexGroup justifyContent="center" alignItems="center">
        <EuiForm>
          <EuiFormRow display="columnCompressedSwitch" label="Anyone Can Join">
            <EuiSwitch
              showLabel={false}
              label="Anyone can Join"
              checked={anyoneCanJoin}
              onChange={(e) => setAnyoneCanJoin(e.target.checked)}
              compressed
            />
          </EuiFormRow>
          <MeetingNameField
            label="Meeting Name"
            placeholder="Meeting name"
            value={meetingName}
            setMeetingName={setMeetingName}
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
          />
          {anyoneCanJoin ? (
            <MeetingMaximumUsersField value={size} setValue={setSize} />
          ) : (
            <MeetingUsersField
              label="Invite User"
              options={users}
              onChange={onUserChange}
              selectedOptions={selectedUsers}
              singleSelection={false}
              isClearable={false}
              placeholder="Select a User"
              isInvalid={showErrors.meetingUser.show}
              error={showErrors.meetingUser.message}
            />
          )}

          <MeetingDateField selected={startDate} setStartDate={setStartDate} />
          <EuiSpacer />
          <CreateMeetingButtons createMeeting={createMeeting} />
        </EuiForm>
      </EuiFlexGroup>
    </div>
  );
}

export default VideoConference;
