
import  './dashboard.scss'; 
import { AuthContext } from '../../context/authContext';
import { makeRequest } from '../../axios.js';
import { useContext,  useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// import Update from "../../components/update/adminUpdate.jsx"
import { Modal, Button, Form } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';




const Dashboard = () => {

  // const [openUpdate, setOpenUpdate] = useState(false)
  // const [selectedUser, setSelectedUser] = useState(null);

    const { currentUser } = useContext(AuthContext);

    const [selectedUser, setSelectedUser] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [updatedUserInfo, setUpdatedUserInfo] = useState({
      username: ``,
      email: ``,
      name: ``,
      role: ``,
      profilePic: ``,
      coverPic: ``
    });

    const [cover, setCover] = useState(null);  
  const [profile, setProfile] = useState(null);  
    
    

    const usersQuery = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
          const res = await makeRequest.get("/dashboard/users"); 
          return res.data;
        },
        refetchOnWindowFocus: false
      });

      const userCount = usersQuery.data ? usersQuery.data.length : 0;

      const handleUpdateClick = (user) => {
        setSelectedUser(user);
        setUpdatedUserInfo({
          username: user.username || ``,
          name: user.name || ``,
          role: user.role || ``,
          email: user.email || ``,
          profilePic: user.profilePic || ``,
          coverPic: user.coverPic || ``
        }); 
        setShowUpdateModal(true);
      };


      const handleUpdateChange = (e) => {
        const {name, value} = e.target;
        setUpdatedUserInfo(prev => ({...prev, [name]: value}))
      };

      const handleImageChange = (e) => {
        const {id} = e.target;
        const file = e.target.files[0];
        if(id=== 'cover') setCover(file);
        if(id=== 'profile') setProfile(file);
      };

      const uploadImage = async (file) => {
        try{
          const formData = new FormData();
          formData.append("file", file);
          const res = await makeRequest.post("/upload", formData);
          return res.data;
        } catch (err) {
          console.log(err);
        }
      };

      const handleUpdateSubmit = async () => {
        try{
          let coverUrl = updatedUserInfo.coverPic;
          let profileUrl = updatedUserInfo.profilePic;

          if(cover) coverUrl = await uploadImage(cover);
          if(profile) profileUrl = await uploadImage(profile);

          await makeRequest.put(`/dashboard/users/${selectedUser.id}`, {
            ...updatedUserInfo,
            coverPic: coverUrl,
            profilePic: profileUrl
          });


          usersQuery.refetch();
          setShowUpdateModal(false);
        }catch(error){
          console.error(`Error updating user: `, error)
        }
      }

      const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
      }

      const handleDeleteSubmit = async () => {
        try{
          await makeRequest.delete(`/dashboard/users/${selectedUser.id}`);
          setShowDeleteModal(false);
          usersQuery.refetch();
        } catch (error){
          console.error("Error deleting user:", error);
        }
      };

      const handleLogout = async () => {
        try{
          await makeRequest.post("/auth/logout");
          navigate('/login');
        }catch (error){
          console.error("Error logging out: ", error);
        }
      };

      const navigate = useNavigate();

      const handleNavigateMain = () => {
        navigate('/');
      };


  return (
    <div className="dashboard">
    <div className="wrapper">
      <aside id="sidebar" className="js-sidebar" >
        {/* Sidebar */}
        <div className="h-100">
          <div className="sidebar-logo">
            <a href="#">UbtSocial</a>
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-header">Admin Elements</li>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link">
                <i className="fa-solid fa-list pe-2"></i>
                Dashboard
              </a>
            </li>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link collapsed" data-bs-target="#pages" data-bs-toggle="collapse">
                <i className="fa-solid fa-file-lines pe-2"></i>
                Pages
              </a>
              <ul id="pages" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Page 1</a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">Page 2</a>
                </li>
              </ul>
            </li>
            <li className="sidebar-navigate">
              <div className='navigate'>

            <Button className="mainPage" onClick={handleNavigateMain}> Main Page </Button>
            <Button className="logout" onClick={handleLogout}> Logout </Button>
            
              </div>
              </li>
            
            {/* More sidebar items... */}
          </ul>
        </div>
      </aside>

      <div className="main">
        <nav className="navbar navbar-expand px-3 border-bottom">
          <button className="btn" id="sidebar-toggle" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a href="#" data-bs-toggle="dropdown" className="nav-icon">
                  <img src={"/upload/" + currentUser.profilePic} className="avatar img-fluid rounded" alt="" />
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a href="#" className="dropdown-item">Profile</a>
                  <a href="#" className="dropdown-item">Setting</a>
                  
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <main className="content px-3 py-2">
          <div className="container-fluid">
            <div className="mb-3">
              <h4>Admin Dashboard</h4>
            </div>

            {/* Cards */}
            <div className="row">
              <div className="col-12 col-md-6 d-flex">
                <div className="card flex-fill border-0 illustration">
                  <div className="card-body p-0 d-flex flex-fill">
                    <div className="row g-0 w-100">
                      <div className="col-6">
                        <div className="p-3 m-1">
                          <h4>Welcome Back, {currentUser.name}</h4>
                          <p className="mb-0">Admin Dashboard, UbtSocial</p>
                        </div>
                      </div>
                      <div className="col-6 text-end">
                        <img src={"/upload/" + currentUser.profilePic} className="img-fluid" alt="/" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 d-flex">
                <div className="card flex-fill border-0">
                  <div className="card-body py-4">
                    <h4 className="mb-2">{usersQuery.isLoading ? "Loading..." : userCount}</h4> 
                    <p className="mb-2">Total Registered Users</p>
                    <div className="mb-0">
                      <span className="badge text-success me-2"></span>
                      <span className="text-muted"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
 {/* Table */}
 <div className="card border-0">
                <div className="card-header">
                  <h5 className="card-title">Basic Table</h5>
                  <h6 className="card-subtitle text-muted">
                    List of registered users.
                  </h6>
                </div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Name</th>
                        <th scope="col">Role</th>
                        <th scope="col">Profile Picture</th>
                        <th scope="col">Cover Picture</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersQuery.isLoading ? (
                        <tr>
                          <td colSpan="7">Loading...</td>
                        </tr>
                      ) : usersQuery.isError ? (
                        <tr>
                          <td colSpan="7">Error fetching data</td>
                        </tr>
                      ) : (
                        usersQuery.data.map((user) => (
                          <tr key={user.id}>
                            <th scope="row">{user.id}</th>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>
                              <img 
                                src={`/upload/${user.profilePic}`} 
                                alt={user.name} 
                                className="userPics" 
                                style={{ width: "50px", height: "50px" }}
                              />
                            </td>
                            <td>
                            <img 
                                src={`/upload/${user.coverPic}`} 
                                alt={user.name} 
                                className="UserPics" 
                                style={{ width: "50px", height: "50px" }}
                              />
                            </td>
                            <td>
                            <button className='update-btn' onClick={() => handleUpdateClick(user)}>Update</button>
                            <button className='delete-btn' onClick={() => handleDeleteClick(user)}>Delete</button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>

          <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} className='modal'>
            <Modal.Header closeButton>
              <Modal.Title>Update User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className='mb-3'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control 
                    type="text"
                    name="username"
                    value={updatedUserInfo.username || ``} 
                    onChange={handleUpdateChange}                 
                  /> 
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>email</Form.Label>
                  <Form.Control 
                    type="email"
                    name="email"
                    value={updatedUserInfo.email || ``}
                    onChange={handleUpdateChange}                 
                  /> 
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>name</Form.Label>
                  <Form.Control 
                    type="text"
                    name="name"
                    value={updatedUserInfo.name || ``}
                    onChange={handleUpdateChange}                 
                  /> 
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>role</Form.Label>
                  <Form.Control 
                    type="int"
                    name="role"
                    value={updatedUserInfo.role || ``}
                    onChange={handleUpdateChange}                 
                  /> 
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Profile Pic</Form.Label>
                  <Form.Control 
                    type="file"
                    id="profile"
                   
                    onChange={handleImageChange}                 
                  /> 
                  <div className='imgContainer'>
                    <img 
                    src={profile ? URL.createObjectURL(profile) :
                      `/upload/${updatedUserInfo.profilePic}`
                    }
                    alt=""
                    className='previewImage'
                    style={{ width: "50px", height: "50px" }}


                    />

                  </div>
                </Form.Group>
                <Form.Group className='mb-3'>
                <Form.Label>Cover Pic</Form.Label>
                  <Form.Control 
                    type="file"
                    id="cover"
                   
                    onChange={handleImageChange}                 
                  /> 
                  <div className='imgContainer'>
                    <img 
                    src={cover ? URL.createObjectURL(cover) :
                      `/upload/${updatedUserInfo.coverPic}`
                    }
                    alt=""
                    className='previewImage'
                    style={{ width: "50px", height: "50px" }}
                    />

                  </div>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                Close
              </Button>
              <Button variant='primary' onClick={handleUpdateSubmit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to delete this user?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={() => setShowDeleteModal(false)}>
                    Cancel
              </Button>
              <Button variant='danger' onClick={handleDeleteSubmit}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          <footer className="footer">
            <div className="container-fluid">
              <div className="row text-muted">
                <div className="col-6 text-start">
                  <p className="mb-0">
                    <a href="#" className="text-muted"><strong>UbtSocial</strong></a>
                  </p>
                </div>
                <div className="col-6 text-end">
                  <ul className="list-inline">
                    <li className="list-inline-item"><a href="#" className="text-muted">Contact</a></li>
                    <li className="list-inline-item"><a href="#" className="text-muted">About Us</a></li>
                    <li className="list-inline-item"><a href="#" className="text-muted">Terms</a></li>
                    <li className="list-inline-item"><a href="#" className="text-muted">Booking</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>

      </div>
  );
};


export default Dashboard;