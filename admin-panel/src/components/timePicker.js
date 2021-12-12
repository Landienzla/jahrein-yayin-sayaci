import React, { useState, useEffect } from "react";
import TimePicker from "react-time-picker";
import { ref, onValue, update, set } from "firebase/database";
import { database } from "../firebase";
import NumberPicker from "react-widgets/NumberPicker";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
export default function TimePicker_() {
  const [tweetTime, setTweeTime] = useState();
  const [dayCount, setDayCount] = useState();
  const [time, setTime] = useState(new Date());
  const tweetTimeRef = ref(database, "botSettings/tweetTime");
  const dayCountRef = ref(database, "botSettings/dayCount");
  useEffect(() => {
    onValue(tweetTimeRef, (snapshot) => {
      setTweeTime(snapshot.val());
    });
    onValue(dayCountRef, (snapshot) => {
      setDayCount(snapshot.val());
      console.log(dayCount);
      setInterval(() => {
        setTime(new Date());
      }, 1000);
      if (time.getSeconds() === 31) {
        update(ref(database, "botSettings"), { dayCount: dayCount + 1 });
        // axios
        //   .get("127.0.0.1:5000/")
        //   .then((resp) => console.log(resp.data))
        //   .catch((err) => console.log(err));
      }
    });
  }, []);

  return (
    <div>
      <h1>
        {time.getHours()}:{time.getMinutes()}:{time.getSeconds()}
      </h1>
      <Row>
        <Col>
          <Col>Tweet Zamanı Seç</Col>
          <Col>
            <TimePicker
              onChange={setTweeTime}
              onClockClose={() => {
                update(ref(database, "botSettings"), { tweetTime: tweetTime });
              }}
              value={tweetTime}
              clockIcon={null}
              format="HH:mm"

              // isOpen={true}
            />
          </Col>
        </Col>
        <Col>
          <Col> Kaç Gündür Yayın Yok?</Col>
          <Col>
            <NumberPicker
              value={dayCount}
              onChange={(value) => {
                update(ref(database, "botSettings"), { dayCount: value });
              }}
            />
          </Col>
        </Col>
      </Row>
    </div>
  );
}
