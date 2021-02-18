import React from 'react'
import {gql,useMutation} from "@apollo/client"
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {Link,useHistory} from "react-router-dom";


const LOGIN_MUTATION= gql`
	mutation login($email: String!, $password: String!) {
		signup(email: $email, password: $password) {
			token
		}
	}
`

interface LoginValeus {
	email: string,
	password: string
}

function Login() {
    const history = useHistory();
    const [login,{data}]= useMutation(LOGIN_MUTATION);
    
    const initialValues: LoginValeus = {
		email: "",
		password: "",
	}

    const validationSchema = Yup.object({
		email: Yup.string().email("Invalid email address").required("Email Required"),
		password: Yup.string().max(20, "Must be 20 characters or less").required("Password Required"),
	})

    
    return (
        <div>
            <h1>LOGIN PAGE FO FAKE TWITTER</h1>
            <Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={async (values, { setSubmitting }) => {
					setSubmitting(true)
					const response = await login({
						variables: values
					})
					localStorage.setItem("token", response.data.signup.token)
					setSubmitting(false)
					history.push("/")
				}}
			>
                <Form>
					<Field name="email" type="text" placeholder="Email" />
					<ErrorMessage name="email" component={"div"} />
					
					<Field name="password" type="password" placeholder="Password" />n
					<ErrorMessage name="password" component={"div"} />
					
					<button type="submit" className="login-button">
						<span>Login</span>
					</button>
				</Form>
            </Formik>
            <div className="register">
				<h4>Dont have an account? </h4>
				<Link to="/signup">Register</Link>
			</div>
        </div>
    )
}
  export default Login