import { EuiFieldNumber, EuiFormRow } from "@elastic/eui";
import React from "react";

function MeetingMaximumUsersField({
  value,
  setValue,
}: {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <EuiFormRow label="Maximum Users">
      <EuiFieldNumber
        placeholder="Maximum Users"
        min={1}
        max={50}
        value={value}
        onChange={(e) => {
          if (!e.target.value.length || +e.target.value === 0) {
            setValue(1);
          }else if(+e.target.value > 50){
            setValue(50)
          }else{
            setValue(+e.target.value)
          }
        }}
      />
    </EuiFormRow>
  );
}
// +e.target.value
// + opertor is alernative to parseInt --> +
export default MeetingMaximumUsersField;
