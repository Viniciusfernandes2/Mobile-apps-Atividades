import React from "react";
import { Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function PickerWeb({ selectedValue, onValueChange, items }) {
  if (Platform.OS === "web") {
    return (
      <select
        value={selectedValue}
        onChange={(e) => onValueChange(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          borderWidth: 1,
          borderColor: "#aaa",
          borderRadius: 8,
          marginBottom: 15,
        }}
      >
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
      {items.map((item) => (
        <Picker.Item key={item.value} label={item.label} value={item.value} />
      ))}
    </Picker>
  );
}
