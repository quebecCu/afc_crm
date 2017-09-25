import MyInput from './../components/Input';

import { connect } from "react-redux";

import { Form } from 'formsy-react';

var server = "http://localhost:3002";

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            canSubmit: false,
            token: null
        };
        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.submit = this.submit.bind(this);
    }

    submit(data) {
        axios.post(server + '/login', {
          username: data.username,
          password: data.password
        }) 
        .then((response) => {
            if (response.data.token) {
                var token = response.data.token;
                localStorage.setItem("token", token);
                this.setState({ token: token });
                console.log(this.state.token);
            } else {
                location.reload();
            }
        });
    }

    enableButton() {
        this.setState({ canSubmit: true })
    }
    disableButton() {
        this.setState({ canSubmit: false })
    }

    render() {
        return (
            <div className="loginForm">
                <h2 className="page-header">Login</h2>
                <Form onSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
                    <div className="form-group">
                        <label>Username: </label>
                        <MyInput name="username" validations="isExisty" validationError="Required" required />
                    </div>
                    <div class="form-group">
                        <label>Password: </label>
                        <MyInput type="password" name="password" validations="isExisty" validationError="Required" required />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!this.state.canSubmit}>
                        Login
                    </button>
                </Form>
                <br/>
                <a href="register">Create user!</a>
                <a id="forgot" href="forgot">Forgot password?</a>

            </div>);
    }
}
export default Login;