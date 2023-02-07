import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import classes from "./SubscribeForm.module.css";

const SubscribeForm = () => {
    const initialValues = {
        lastName: "",
        firstName: "",
        email: "",
        sudokuDifficulty: "easy",
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string()
            .required("Email is required")
            .email("Invalid email address"),
    });

    function onSubmit(values, actions) {
        console.log(values);
        actions.setSubmitting(false);
    }

    return (
        <section className={classes.form_container}>
            <h1 className={classes.sign_up_title}>Sign Up</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ values, setFieldValue, handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className={classes.input_field}>
                            <label htmlFor="firstName">First Name</label>
                            <Field
                                className={classes.text_input}
                                name="firstName"
                                placeholder="First Name"
                                id="firstName"
                            />
                            <ErrorMessage
                                className={classes.error_message}
                                name="firstName"
                                component="span"
                            />
                        </div>
                        <div className={classes.input_field}>
                            <label htmlFor="lastName">Last Name</label>
                            <Field
                                className={classes.text_input}
                                name="lastName"
                                placeholder="Last Name"
                                id="lastName"
                            />
                            <ErrorMessage
                                className={classes.error_message}
                                name="lastName"
                                component="span"
                            />
                        </div>
                        <div className={classes.input_field}>
                            <label htmlFor="email">Email</label>
                            <Field
                                className={classes.text_input}
                                name="email"
                                placeholder="Email"
                                id="email"
                            />
                            <ErrorMessage
                                className={classes.error_message}
                                name="email"
                                component="span"
                            />
                        </div>
                        <div
                            className={`${classes.input_field} ${classes.difficulty_container}`}
                        >
                            <Field name="sudokuDifficulty">
                                {({ field }) => (
                                    <>
                                        <input
                                            type="radio"
                                            id="easy"
                                            name="sudokuDifficulty"
                                            value="easy"
                                            checked={field.value === "easy"}
                                            onChange={() =>
                                                setFieldValue(
                                                    "sudokuDifficulty",
                                                    "easy"
                                                )
                                            }
                                        />
                                        <label htmlFor="easy">Easy</label>
                                    </>
                                )}
                            </Field>
                            <Field name="sudokuDifficulty">
                                {({ field }) => (
                                    <>
                                        <input
                                            type="radio"
                                            id="medium"
                                            name="sudokuDifficulty"
                                            value="medium"
                                            checked={field.value === "medium"}
                                            onChange={() =>
                                                setFieldValue(
                                                    "sudokuDifficulty",
                                                    "medium"
                                                )
                                            }
                                        />
                                        <label htmlFor="medium">Medium</label>
                                    </>
                                )}
                            </Field>
                            <Field name="sudokuDifficulty">
                                {({ field }) => (
                                    <>
                                        <input
                                            type="radio"
                                            id="hard"
                                            name="sudokuDifficulty"
                                            value="hard"
                                            checked={field.value === "hard"}
                                            onChange={() =>
                                                setFieldValue(
                                                    "sudokuDifficulty",
                                                    "hard"
                                                )
                                            }
                                        />
                                        <label htmlFor="hard">Hard</label>
                                    </>
                                )}
                            </Field>
                        </div>
                        <button
                            className={classes.submit_btn}
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </section>
    );
};

export default SubscribeForm;
