import React, { useEffect, useState ,useRef} from "react";
import { database} from "../firebase";
import { ref, onValue, update } from 'firebase/database'
import {Form,Button} from 'react-bootstrap'
export default function ChangeText() {
  const [text, setText] = useState();
  const textRef = ref(database, "botSettings/text");
  const textAreaRef = useRef()
  function handleChange(e) {
    update(ref(database, "botSettings"), { text: e.target.value });
  }
  useEffect(() => {
      onValue(textRef,(snapshot)=>{
          setText(snapshot.val())
          textAreaRef.current.value = snapshot.val()
          
      });console.log("31")
  }, [textRef])
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Tivit Texti</Form.Label>
          <Form.Control ref={textAreaRef} onChange = {handleChange}as="textarea" rows={3} />
        </Form.Group>
        {/* <Button type="submit">Yolllaa</Button> */}
      </Form>
    </div>
  );
}
