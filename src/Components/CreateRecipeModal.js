import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import Modal from "react-bootstrap/Modal";
import "./EditProfile.css";
import { AuthContext } from "../contexts/AuthContext";
import { alert_error, alert_success } from "../utils/toast_messages";
import {
  getHTTPHeaderWithToken,
  getLoggedInUserDetails,
  getSendingDataSpinner,
} from "../utils/functions";
import { MAIN_DOMAIN } from "../utils/constants";
import { RecipeContext } from "../contexts/RecipeContext";

function CreateRecipeModal() {
  const recipeContext = useContext(RecipeContext);
  const userDetails = getLoggedInUserDetails();
  const [show, setShow] = useState(false);
  const [uploadingToCloudinary, setUploadingToCloudinary] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const storeProfileImageOnCloudinary = async (file) => {
    setUploadingToCloudinary(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "oyvighc5");
    await axios
      .post("https://api.cloudinary.com/v1_1/dzv8hj78f/image/upload", formData)
      .then((resp) => {
        console.log(resp.data.url);
        formik.setFieldValue("recipe_image", resp.data.url);
        setUploadingToCloudinary(false);
      })
      .catch((err) => {
        setUploadingToCloudinary(false);
        alert_error("Failed to load image. Try again later");
      });
  };
  const formSchema = yup.object().shape({
    name: yup.string().required("recipe name required"),
    procedure: yup.string().required("steps required"),
    recipe_image: yup.string(),
    ingredients: yup.string().required("ingredients required"),
    number_of_people_served: yup
      .number()
      .integer("please enter an integer")
      .min(1)
      .required("number_of_people_served required"),
    country: yup.string().required("country required"),
    time_in_minutes: yup
      .number()
      .integer("please enter an integer")
      .required("time_in_minutes required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      procedure: "",
      recipe_image: "",
      ingredients: "",
      number_of_people_served: 1,
      time_in_minutes: 0,
      country: "",
      user_id: userDetails?.id,
    },
    validationSchema: formSchema,
    onSubmit: (recipe) => {
      const tra_recipe = {
        ...recipe,
        ingredients: addSeparator(recipe.ingredients),
        procedure: addSeparator(recipe.procedure),
      };
      createRecipeOnServer(tra_recipe);
    },
  });

  const createRecipeOnServer = (recipe) => {
    axios
      .post(`${MAIN_DOMAIN}/recipes`, recipe, getHTTPHeaderWithToken())
      .then((resp) => {
        if (resp.status === 200) {
          formik.setSubmitting(false);
          recipeContext.addRecipe(resp.data);
          alert_success("Recipe created successfully!");
        } else {
          formik.setSubmitting(false);
          alert_error("Recipe not created. Check your details and try again.");
        }
      })
      .catch((error) => {
        formik.setSubmitting(false);
        alert_error("Error creating account. Try later");
      });
  };

  const addSeparator = (txt) => {
    return txt.replaceAll(".", "\n");
  };
  return (
    <>
      <button onClick={handleShow}>Create a recipe</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Recipe Title"
                autoFocus
                name="name"
                required
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Recipe country"
                autoFocus
                name="country"
                required
                onChange={formik.handleChange}
                value={formik.values.country}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Number of people served"
                autoFocus
                required
                name="number_of_people_served"
                onChange={formik.handleChange}
                value={formik.values.number_of_people_served}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Time in minutes"
                required
                autoFocus
                name="time_in_minutes"
                onChange={formik.handleChange}
                value={formik.values.time_in_minutes}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                <small>
                  NOTE : Please separate your ingredients lists with “ . ”
                  symbol{" "}
                </small>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                placeholder="Ingredients"
                name="ingredients"
                onChange={formik.handleChange}
                value={formik.values.ingredients}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                <small>
                  NOTE : Please separate your steps lists with “ . ” symbol{" "}
                </small>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Steps"
                name="procedure"
                onChange={formik.handleChange}
                value={formik.values.procedure}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                className="register-inp"
                type="file"
                onChange={(e) =>
                  storeProfileImageOnCloudinary(e.target.files[0])
                }
                value=""
                accept="image/png, image/jpeg"
              />
              {uploadingToCloudinary ? (
                <div className="spinner-loader">{getSendingDataSpinner()}</div>
              ) : null}
            </Form.Group>
            <input type="text" name="recipe_image" hidden />
            <Button
              className="button"
              disabled={uploadingToCloudinary ? true : false}
              onClick={formik.handleSubmit}
            >
              Add Recipe
            </Button>
          </Form>
        </Modal.Body>
        {/* <Modal.Footer className="modalfooter">
          <Button onClick={handleClose} className="button">
            Add Recipe
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default CreateRecipeModal;
