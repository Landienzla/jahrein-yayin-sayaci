import logo from "./logo.svg";
import "./App.css";
import { Container } from "react-bootstrap";
import UploadImage from "./components/uploadImage";
import Images from "./components/Images";
import TimePicker_ from "./components/timePicker";
import RealtimeDB from "./components/realtimedb";
import ImageToDate from "./components/imageToDate";
import ChangeText from "./components/changeText";
import { useEffect, useState } from "react";
import { update,ref,onValue } from "@firebase/database";
import { database } from "./firebase";
import axios from "axios";
function App() {
  return (
    <div className="App">
      <Container>
        <TimePicker_ />
        {/* <ImageToDate /> */}
        <ChangeText />
        <UploadImage />
        <Images />
      </Container>
    </div>
  );
}

export default App;
