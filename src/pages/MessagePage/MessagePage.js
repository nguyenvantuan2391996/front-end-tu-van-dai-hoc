import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import swal from '@sweetalert/with-react';
import moment from 'moment';
import _ from 'lodash';

class MessagePage extends Component {
	constructor(props){
		super(props);
		this.state = {
			message : '',
			role : '0',
			senderId : '',
			receiverId : '',
			messageContent : '',
			nameChat : '',
			listMessage : [],
			listIdReceiver : [],
			listReceiver : [],
			listCountMessageNoRead : [],
			listAccount : [],
			listSuggest : [],
			listTemp:[],
			textSearch : '',
			imageSelectChat : ''
		};
	}

	onChangeSearch = (e) => {
		var target = e.target;
		var name = target.name;
		var value = target.value;

		console.log(target.value);

		if (target.value === "") {
			this.setState({
				listSuggest: []
			});
			
			this.setState({
				[name]: value
			});
		} else {
			this.setState({
				[name]: value
			});

			var {listAccount,listTemp} = this.state;

			_.forEach(listAccount, function(data, index) {
				if (_.includes(data.name.toUpperCase(), e.target.value.toUpperCase())) {
					listTemp.push(data);
				}
			});

			this.setState({
				listSuggest: listTemp
			});

			this.setState({
				listTemp: []
			});
		}
	}

	onChange = (e) => {
		var target = e.target;
		var name = target.name;
		var value = target.value;
		this.setState({
			[name]: value
		});
	}

	onSignOut = (e) => {
		e.preventDefault();
		swal({
			title: "Are you sure ?",
			text: "Once sign out, you will redirect to home !",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {

				axios({
					method: 'POST',
					url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/logout',
					data: {
						refresh_token: localStorage.getItem('refresh_token'),
						token: localStorage.getItem('access_token')
					}
				}).then(res => {
					this.setState({
						message : "signout"
					});
					this.setState({
						role : localStorage.getItem('role')
					});
					localStorage.clear();

					swal("Sign out success!", {
						icon: "success",
						timer: 2000
					});
				}).catch(err => {
					swal("Fail !", err.response.data.message + " !", "error");
				});
			}
		});
	}

	refreshChat(senderId, receiverId) {
		axios({
			method: 'POST',
			url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/message/getmessage',
			data: {
				sender_id: senderId,
				receive_id: receiverId
			}
		}).then(res => {
			this.setState({
				listMessage : res.data
			});
			this.setState({
				messageContent : ''
			});

			this.getListId();
			this.getCountMessageNoRead();
		}).catch(err => {
			swal("Fail !", err.response.data.message + " !", "error");
		});
	}

	updateMessageNoRead (senderId, receiverId) {
		axios({
			method: 'PUT',
			url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/message/updatemessagenoread',
			data: {
				sender_id: senderId,
				receive_id: receiverId
			}
		}).then(res => {

		}).catch(err => {
			swal("Fail !", err.response.data.message + " !", "error");
		});
	}

	selectChat = (e) => {
		e.preventDefault();
		this.setState({
			receiverId : e.currentTarget.name
		});
		this.setState({
			nameChat : e.currentTarget.id
		});
		this.setState({
			imageSelectChat : e.currentTarget.getElementsByTagName("img")[0].getAttribute("src")
		});

		// Clear suggest
		this.setState({
			listSuggest: []
		});
		this.setState({
			textSearch: ''
		});

		this.refreshChat(localStorage.getItem('id'), e.currentTarget.name);
		this.updateMessageNoRead(localStorage.getItem('id'), e.currentTarget.name);
	}

	submitSend = (e) => {
		e.preventDefault();
		var {messageContent, receiverId} = this.state;

		axios({
			method: 'POST',
			url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/message/addmessage',
			data: {
				messageChat: {
					message_content : messageContent,
					message_time : moment().format(),
					is_read : "0"
				},
				senderReceive: {
					sender_id : localStorage.getItem('id'),
					receive_id : receiverId
				}
			}
		}).then(res => {
			axios({
				method: 'POST',
				url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/message/addfirstmessage',
				data: {
					messageChat: {
						message_content : "You will soon receive message reply",
						message_time : moment().format(),
						is_read : "0"
					},
					senderReceive: {
						sender_id : receiverId,
						receive_id : localStorage.getItem('id')
					}
				}
			}).then(res => {
				console.log();
			}).catch(err => {
				swal("Fail !", err.response.data.message + " !", "error");
			});
			this.refreshChat(localStorage.getItem('id'), receiverId);
		}).catch(err => {
			swal("Fail !", err.response.data.message + " !", "error");
		});
	}

	getListId () {
		axios({
			method: 'POST',
			url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/message/getreceiver',
			data: {
				sender_id : localStorage.getItem('id')
			}
		}).then(res => {
			this.setState({
				listIdReceiver : _.uniq(res.data)
			});
			this.getListReceiver();
			this.getCountMessageNoRead();
		}).catch(err => {
			swal("Fail !", err.response.data.message + " !", "error");
		});
	}

	getListReceiver () {
		var {listIdReceiver} = this.state;
		axios({
			method: 'POST',
			url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/account/getbylistid',
			data: {
				listId : listIdReceiver
			}
		}).then(res => {
			//console.log(_.sortBy(res.data, (v) => listIdReceiver.indexOf(v.id)));
			this.setState({
				listReceiver : _.sortBy(res.data, (v) => listIdReceiver.indexOf(v.id))
			});
		}).catch(err => {
			swal("Fail !", err.response.data.message + " !", "error");
		});
	}

	getCountMessageNoRead () {
		var {listIdReceiver} = this.state;
		axios({
			method: 'POST',
			url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/message/countmessagenoread',
			data: {
				listId : listIdReceiver,
				senderId : localStorage.getItem('id')
			}
		}).then(res => {
			this.setState({
				listCountMessageNoRead : res.data
			});
		}).catch(err => {
			swal("Fail !", err.response.data.message + " !", "error");
		});
	}

	getAccount () {
		axios({
			method: 'POST',
			url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/account/getaccounts',
			data: {
			},
			headers: { Authorization: "Bearer " + localStorage.getItem('access_token')}
		}).then(res => {
			this.setState({
				listAccount : res.data
			});
		}).catch(err => {
			if (err.response.status === 404) {
				swal("Fail !", err.response.data.message + " !", "error");
			}
			else if (err.response.status === 401) {
				axios({
					method: 'POST',
					url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/login/refreshToken',
					data: {
						refresh_token: localStorage.getItem('refresh_token'),
						token: localStorage.getItem('access_token')
					},
				}).then(res => {
					localStorage.setItem('access_token', res.data.access_token);
					localStorage.setItem('refresh_token', res.data.refresh_token);

					axios({
						method: 'POST',
						url: 'http://nguyenvantuan239-001-site1.itempurl.com/api/account/getaccounts',
						data: {
						},
						headers: { Authorization: "Bearer " + localStorage.getItem('access_token')}
					}).then(res => {
						this.setState({
							listAccount : res.data
						});
					}).catch(err => {
						this.setState({
							message : "signout"
						});
					});
				});
			}
		});
	}

	async componentDidMount () {
		// try {
		// 	setInterval(async () => {
		// 		this.getCountMessageNoRead();
		// 	}, 60000);
		// } catch(e) {
		// 	console.log(e);
		// }

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

				localStorage.setItem('id', res.data.user_id);

				this.getListId();
				this.getAccount();
			}).catch(err => {
				this.setState({
					message : "signout"
				});
			});
		} else {
			this.setState({
				message : "signout"
			});
		}
	}

	render() {
		var {imageSelectChat, textSearch, message, role, listMessage, listReceiver, nameChat, messageContent, listCountMessageNoRead, listSuggest} = this.state;

		if (message === "signout" || role !== "0") {
			return <Redirect to="/" />
		}

		return (
			<div>
		        <div className="page-topbar">
		          <div className="quick-area">
		            <ul className="pull-left info-menu  user-notify">
		              <button id="menu_icon"><i className="fa fa-bars" aria-hidden="true" /></button>
		            </ul>
		            <ul className="pull-right info-menu user-info">
		              <li className="profile">
		                <a href="/user" role="button">
		                  <img alt="avatar" src={localStorage.getItem('image_url')} className="img-circle img-inline avatar" />
		                  <span>{localStorage.getItem('name')}</span>
		                </a>
		              </li>
		            </ul>
		          </div>
		        </div>
		        <div className="page-sidebar expandit">
		          <div className="sidebar-inner" id="main-menu-wrapper">
		            <div className="profile-info row ">
		              <div className="profile-image ">
		                <img alt="avatar" src={localStorage.getItem('image_url')} className="img-circle img-inline avatar" />
		              </div>
		              <div className="profile-details">
		                <h3>
		                  <a href="/user">{localStorage.getItem('name')}</a> 
		                </h3>
		                <p className="profile-title">{localStorage.getItem('address')}</p>
		              </div>
		            </div>
		            <ul className="wraplist" style={{height: 'auto'}}>	
		              <li><a href="/user"><span className="sidebar-icon"><i className="fa fa-search" /></span> <span className="menu-title">Consulting Majors</span></a></li>
		              <li><a href="/message"><span className="sidebar-icon"><i className="fa fa-comment-o" /></span> <span className="menu-title">Message</span></a></li>
		              <li><a href="!#" role="button" data-title="feedback" data-toggle="modal" data-target="#feedback"><span className="sidebar-icon"><i className="fa fa-rss" /></span> <span className="menu-title">Feedback</span></a></li>
		              <li><a href="!#" role="button" onClick={this.onSignOut}><span className="sidebar-icon"><i className="fa fa-lock" /></span> <span className="menu-title">Sign Out</span></a></li>
		            </ul>
		          </div>
		        </div>							

		        <section id="main-content">
		        	<section className="wrapper main-wrapper row">
	        			<div className="col-md-12">
	        				<div className="card shadow">
	        					<div className="container">
						          <div className="messaging">
						            <div className="inbox_msg">
						              <div className="inbox_people">
						                <div className="headind_srch">
						                  <div className="recent_heading">
						                    <h4>Message</h4>
						                  </div>
						                  <div className="srch_bar">
						                    <div className="stylish-input-group">
						                    	<div className="md-form">
				                    				<input type="search" className="search-bar" name="textSearch" value={textSearch} onChange={this.onChangeSearch} placeholder="Search" />
						                    		{
						                    			<div className="list-group">
						                    			{
						                    				listSuggest.map((data, index) => {
						                    					return (
						                    						<a key={index} href="!#" name={data.id} id={data.name} role="button" onClick={this.selectChat} className="list-group-item list-group-item-action">
						                    							<div className="chat_img">
						                    								<img src={data.image_url} alt="sunil"/>
							                    						</div>
							                    						<div className="chat_ib">
							                    							<h5>{data.name}</h5>
							                    							<p>{data.address}</p>
							                    						</div>
						                    						</a>
						                    					);
						                    				})
						                    			}
						                    			</div>
						                    		}
						                    	</div>
						                     </div>
						                  </div>
						                </div>

						                <div className="inbox_chat">
						                  {
						                  	listReceiver.map((data, index) => {
						                  		return (
						                  			<div key={index}>
						                  			{
						                  				<div className="chat_list">
						                  					<div className="chat_people">
							                  					<a href="!#" name={data.id} id={data.name} onClick={this.selectChat} role="button">
								                  					<div className="chat_img">
									                  					<img src={data.image_url} alt="sunil" className="avatar" />
									                  				</div>
								                  					<div className="chat_ib">
								                  						<h5>{data.name}<span className="badge badge-pill badge-primary">{listCountMessageNoRead[index] !== 0 && listCountMessageNoRead[index]}</span></h5>
								                  						<p>{data.address}</p>
								                  					</div>
							                  					</a>
						                  					</div>
						                  				</div>
						                  			}
						                  			</div>					                			
						                  		);
						                  	})
						                  }
						                </div>
						              </div>

						              {
						              	nameChat !== '' &&
						              	<div className="card-header msg_head">
											<div className="d-flex bd-highlight">
												<div className="img_cont">
													<img src={imageSelectChat} alt="avatar" className="rounded-circle user_img" />
												</div>
												<div className="user_info">
													<span><b>Chat with {nameChat}</b></span>
												</div>
												<div className="video_cam">
													<span><i className="fa fa-video-camera"></i></span>
													<span><i className="fa fa-phone-square"></i></span>
												</div>
											</div>
										</div>
						              }


						              <div className="mesgs">
						                <div className="msg_history">
						                {
						                	listMessage.map((data, index) => {
						                		return (
						                			<div key={index}>
						                			{
						                				data.sender_id !== parseInt(localStorage.getItem('id')) ? (
						                					<div className="incoming_msg">
						                						<div className="incoming_msg_img">
						                							<img src={imageSelectChat} alt="sunil" className="rounded-circle user_img" />
						                						</div>
						                						<div className="received_msg">
						                							<div className="received_withd_msg">
						                								<p>{data.message_content}</p>
						                								<span className="time_date">{moment(data.message_time).format('DD-MM-YYYY HH:MM')}</span>
						                							</div>
						                						</div>
						                					</div>
						                				) : (
						                				<div className="outgoing_msg">
						                					<div className="sent_msg">
						                						<p>{data.message_content}</p>
						                						<span className="time_date">{moment(data.message_time).format('DD-MM-YYYY HH:MM')}</span>
						                					</div>
						                				</div>
						                				)
						                			}
						                			</div>					                			
						                		);
						                	})
						                }

						                  {
						                  	nameChat !== '' &&
						                  	<div className="type_msg">
							                    <div className="input_msg_write">
							                      <input type="text" className="write_msg" placeholder="Type a message" value={messageContent} name="messageContent" onChange={this.onChange} />
							                      <button onClick={this.submitSend} className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o" aria-hidden="true" /></button>
							                    </div>
						                  	</div>
						                  }

						                </div>
						              </div>
						            </div></div>
						        </div>
	        				</div>
			        	</div>
		        	</section>
		        </section>
	      	</div>
		);
	}
}
export default MessagePage;