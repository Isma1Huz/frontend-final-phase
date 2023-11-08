import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./EditProfile.css";
import {
  getHTTPHeaderWithToken,
  getLoggedInUserDetails,
  getSendingDataSpinner,
} from "../utils/functions";
import { MAIN_DOMAIN } from "../utils/constants";
import { alert_error } from "../utils/toast_messages";
import axios from "axios";

function CreateComment({ recipe_id, addRecipeComments }) {
  const authUser = getLoggedInUserDetails();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formSchema = yup.object().shape({
    comment: yup.string().required("comment is a required field"),
  });

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: formSchema,
    onSubmit: (comment) => {
      createComment(comment);
    },
  });

  const createComment = (comment) => {
    const data = {
      comment: comment.comment,
      user_id: authUser?.id,
      recipe_id: parseInt(recipe_id),
    };
    axios
      .post(`${MAIN_DOMAIN}/comments`, data, getHTTPHeaderWithToken())
      .then((resp) => {
        if (resp.status === 201) {
          addRecipeComments(resp.data);
          handleClose();
        }
      })
      .catch((error) => {
        formik.setSubmitting(false);
        handleClose();
        alert_error("Some error occured. Please try later!!");
      });
  };

  return (
    <>
      <button onClick={handleShow}>Add Comment</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                <small>Create a Comment.</small>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={7}
                name="comment"
                placeholder="Comment"
                onChange={formik.handleChange}
                value={formik.values.comment}
              />
              <p className="error">{formik.errors.comment}</p>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modalfooter">
          {formik.isSubmitting ? (
            <div className="spinner-loader">{getSendingDataSpinner()}</div>
          ) : (
            <Button onClick={formik.handleSubmit} className="button">
              Add Comment
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateComment;
