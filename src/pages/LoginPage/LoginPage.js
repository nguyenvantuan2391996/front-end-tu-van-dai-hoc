import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import {storage} from '../firebase';

class LoginPage extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      account_name : '',
      password : '',
      firstName : '',
      lastName : '',
      passwordRegister : '',
      confirmPasswordRegister : '',
      accountNameRegister : '',
      address : '',
      phone : '',
      language : '',
      role : '',
      fileImagePreview : './image/default_icon.jpg',
      fileImageUpload :'',
      image_url : ''
    };
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  }

  imageChange = (e) => {
    const fileImageUpload = e.target.files[0];
    this.setState({
      fileImageUpload : fileImageUpload
    });
    const allow_file = ["image/png", "image/jpeg", "image/jpg"];
    if (fileImageUpload && allow_file.includes(fileImageUpload.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          fileImagePreview : reader.result
        });
      }
      reader.readAsDataURL(fileImageUpload);
    }
  }

  onLogin = (e) => {
    e.preventDefault();
    var {account_name, password} = this.state; 
    axios({
      method: 'POST',
      url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/login',
      data: {
        account_name: account_name,
        password: password
      }
      
    }).then(res => {
      if (res.data.status === "0") {
        swal("Fail !", "Account is locked. Please contact to admin system !", "error");
      } else {
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('id', res.data.id);
        localStorage.setItem('language_id', res.data.languageId);
        localStorage.setItem('name', res.data.name);
        localStorage.setItem('address', res.data.address);
        localStorage.setItem('image_url', res.data.image_url);

        this.setState({
          access_token : res.data.access_token
        });
        this.setState({
          refresh_token : res.data.refresh_token
        });
        this.setState({
          role : res.data.role
        });
      }
    }).catch(err => {
      swal("Fail !", err.response.data.message + " !", "error");
    });
  }

  onRegister = (e) => {
    e.preventDefault();
    var {fileImageUpload, firstName, lastName, passwordRegister, confirmPasswordRegister, accountNameRegister, address, phone, language} = this.state;

    if (passwordRegister === confirmPasswordRegister) {
      // Upload image to firebase
      const uploadTask = storage.ref('image/' + accountNameRegister + fileImageUpload.name).put(fileImageUpload);
      uploadTask.on('state_changed', 
        (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      }, 
      (error) => {
           // error function ....
           console.log(error);
         }, 
         () => {
        // get url image from firebase
        storage.ref('image').child(accountNameRegister + fileImageUpload.name).getDownloadURL().then(url => {
          // Call API create account
          axios({
            method: 'POST',
            url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/account',
            data: {
              account_name: accountNameRegister,
              password: passwordRegister,
              name : firstName + " " + lastName,
              phone : phone,
              address : address,
              status : "1",
              language_id : language,
              image_url : url
            }
          }).then(res => {
            swal("Success !", "Account is registered successfully !", "success");
          }).catch(err => {
            swal("Fail !", err.response.data.message + " !", "error");
          });
        })
      });
    } else {
      swal("Fail !", "Password isn't as same as confirm password !", "error");
    }
  }

  componentDidMount () {
    if (localStorage.getItem('refresh_token') !== null && localStorage.getItem('access_token') !== null) {
      axios({
        method: 'POST',
        url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/login/getinfortoken',
        data: {
          refresh_token: localStorage.getItem('refresh_token'),
          token: localStorage.getItem('access_token')
        }
      }).then(res => {
        this.setState({
          role : res.data.role
        });
      }).catch(err => {
        if (err.response.status === 404) {
          console.log(err.response.data.message);
        }
      });
    }
  }

  render() {
      var {account_name, password, role, firstName, lastName, passwordRegister, confirmPasswordRegister, accountNameRegister, address, phone, language, fileImagePreview} = this.state;

      if (role === "0") {
        return <Redirect to="/user" />
      }

      if(role === "1") {
        return <Redirect to="/admin" />
      }

      return (
      <div>
          {/*---- Include the above in your HEAD tag --------*/}
          <div className="container register">
            <div className="row">
              <div className="col-md-3 register-left">
                <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                <h3>Welcome</h3>
                <p>Welcome to the consulting system majors university !</p>
              </div>
              <div className="col-md-9 register-right">
                <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                  <li className="nav-item">
                  <a className="nav-link active" id="login-tab" data-toggle="tab" href="#login" role="tab" aria-controls="home" aria-selected="true">Login</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="profile" aria-selected="false">Register</a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="home-tab">
                    <h3 className="register-heading">Login system</h3>
                    <div className="row register-form">
                      <div className="col-md-3">

                      </div>
                      <div className="col-md-6">
                        <form onSubmit={this.onLogin}>
                          <div className="form-group">
                            <input type="text" className="form-control" placeholder="Account Name *" name="account_name" value={account_name} onChange={this.onChange} required="required" />
                          </div>
                          <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password *" name="password" value={password} onChange={this.onChange} required="required" />
                          </div>
                          <div className="d-flex justify-content-center">
                            <button type="submit" className="btnRegister">Login</button>
                          </div>
                        </form>
                      </div>
                    </div>

                  </div>

                  <div className="tab-pane fade show" id="register" role="tabpanel" aria-labelledby="profile-tab">
                    <h3 className="register-heading">Register account</h3>
                    <form onSubmit={this.onRegister}>
                      <div className="row register-form">
                          <div className="col-md-4">
                            <div className="form-group">
                              <input type="text" className="form-control" placeholder="First Name *" name="firstName" value={firstName} onChange={this.onChange} required="required" />
                            </div>
                            <div className="form-group">
                              <input type="text" className="form-control" placeholder="Last Name *" name="lastName" value={lastName} onChange={this.onChange} required="required" />
                            </div>
                            <div className="form-group">
                              <input type="password" className="form-control" placeholder="Password *" name="passwordRegister" value={passwordRegister} onChange={this.onChange} required="required" />
                            </div>
                            <div className="form-group">
                              <input type="password" className="form-control" placeholder="Confirm Password *" name="confirmPasswordRegister" value={confirmPasswordRegister} onChange={this.onChange} required="required" />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <input type="text" className="form-control" placeholder="Account name *" name="accountNameRegister" value={accountNameRegister} onChange={this.onChange} required="required" />
                            </div>
                            <div className="form-group">
                              <input type="text" className="form-control" placeholder="Your Address *" name="address" value={address} onChange={this.onChange} required="required" />
                            </div>
                            <div className="form-group">
                              <input type="text" minLength={10} maxLength={10} className="form-control" placeholder="Your Phone *" name="phone" value={phone} onChange={this.onChange} required="required" />
                            </div>
                            <div className="form-group">
                              <select required="required" className="form-control" name="language" value={language} onChange={this.onChange} >
                                <option className="hidden" defaultValue>Please select your language *</option>
                                <option value="1">Viet Nam</option>
                                <option value="2">English</option>
                              </select>
                            </div>
                            <input type="submit" className="btnRegister" value="Register" />
                          </div>
                          <div className="col-md-4">
                            <img className="preview-img" src={fileImagePreview} alt="Preview Image" width="200" height="200"/>
                            <div className="browse-button">
                                <i className="fa fa-pencil-alt"></i>
                                <input className="browse-input" type="file" onChange={this.imageChange} required name="fileImage" id="fileImage" />
                            </div>
                          </div>
                      </div>
                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>  
    );
  }
}

export default LoginPage;
