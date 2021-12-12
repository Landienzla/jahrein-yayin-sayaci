import React, { useEffect, useState } from "react";
import { storage } from "../firebase";
import { ref, listAll, getDownloadURL } from "@firebase/storage";
import {
  Card,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Button,
} from "react-bootstrap";
import { database } from "../firebase";
import { set, update } from "@firebase/database";
import NumberPicker from "react-widgets/NumberPicker";
export default function Images() {
  //   const [images, setImages] = useState([]);
  //   const [names,setNames]= useState([])
  const [day, setDay] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [array, setArray] = useState([]);
  const imagesRef = ref(storage, "/images");

  useEffect(() => {
    listAll(imagesRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          //   console.log(itemRef);
          //   setNames((prevNames)=>[...prevNames,itemRef.name])
          getDownloadURL(ref(storage, itemRef._location.path_))
            .then((url) => {
              //   setImages((prevImages) => [...prevImages, url]);
              setArray((prevArray) => [...prevArray, [itemRef.name, url]]);
              //   console.log(url);
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  }, []);
  //   console.log(images);
  //   console.log(names)
  console.log(array);
  return (
    <div>
      {/* <Row>
        <Col>
          <DropdownButton id="dropdown-basic-button" title="Pick an Image">
            {array.map((image) => (
              <Dropdown.Item
                onClick={() => {
                  setSelectedImage(image[0]);
                }}
              >
                {image[0]}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
        <Col>
          <NumberPicker
            value={day}
            onChange={(value) => {
              setDay(value);
            }}
          />
        </Col>
        <Col>
          <Button
            onClick={() => {
              update(ref(database, "botSettings"), { selectedImage: day });
              
            }}
          >
            Update
          </Button>
        </Col>
      </Row> */}
      <Row>
        {array.map((image) => (
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={image[1]} />
            </Card>
            <Card.Body>
              <Card.Text>{image[0]}</Card.Text>
            </Card.Body>
          </Col>
        ))}
      </Row>
    </div>
  );
}
